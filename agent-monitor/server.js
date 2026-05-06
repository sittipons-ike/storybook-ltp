#!/usr/bin/env node
/**
 * Agent Monitor Server
 * - Watches events.jsonl for new hook events
 * - Serves dashboard HTML
 * - Broadcasts events via WebSocket
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { WebSocketServer } = require('ws');

const PORT = 3847;
const EVENTS_FILE = path.join(__dirname, 'events.jsonl');
const DASHBOARD_FILE = path.join(__dirname, 'dashboard.html');

// Ensure events file exists
if (!fs.existsSync(EVENTS_FILE)) {
  fs.writeFileSync(EVENTS_FILE, '');
}

// ─── HTTP Server ────────────────────────────────────
const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/dashboard') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(fs.readFileSync(DASHBOARD_FILE, 'utf-8'));
  } else if (req.url === '/events') {
    // Return last 100 events as JSON
    const lines = fs.readFileSync(EVENTS_FILE, 'utf-8').trim().split('\n').filter(Boolean);
    const events = lines.slice(-100).map(l => {
      try { return JSON.parse(l); } catch { return null; }
    }).filter(Boolean);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(events));
  } else if (req.url === '/clear') {
    fs.writeFileSync(EVENTS_FILE, '');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

// ─── WebSocket Server ───────────────────────────────
const wss = new WebSocketServer({ server });
const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);
  console.log(`Client connected (${clients.size} total)`);

  // Send recent events on connect
  const lines = fs.readFileSync(EVENTS_FILE, 'utf-8').trim().split('\n').filter(Boolean);
  const recent = lines.slice(-30).map(l => {
    try { return JSON.parse(l); } catch { return null; }
  }).filter(Boolean);

  ws.send(JSON.stringify({ type: 'history', events: recent }));

  ws.on('close', () => {
    clients.delete(ws);
    console.log(`Client disconnected (${clients.size} total)`);
  });
});

function broadcast(data) {
  const msg = JSON.stringify(data);
  for (const ws of clients) {
    if (ws.readyState === 1) ws.send(msg);
  }
}

// ─── File Watcher ───────────────────────────────────
let lastSize = fs.statSync(EVENTS_FILE).size;

fs.watchFile(EVENTS_FILE, { interval: 200 }, (curr) => {
  if (curr.size > lastSize) {
    const fd = fs.openSync(EVENTS_FILE, 'r');
    const buf = Buffer.alloc(curr.size - lastSize);
    fs.readSync(fd, buf, 0, buf.length, lastSize);
    fs.closeSync(fd);

    const newLines = buf.toString('utf-8').trim().split('\n').filter(Boolean);
    for (const line of newLines) {
      try {
        const event = JSON.parse(line);
        broadcast({ type: 'event', event });
      } catch {}
    }
    lastSize = curr.size;
  } else if (curr.size < lastSize) {
    // File was cleared
    lastSize = curr.size;
    broadcast({ type: 'clear' });
  }
});

// ─── Start ──────────────────────────────────────────
server.listen(PORT, () => {
  console.log('');
  console.log('  ╔═══════════════════════════════════════╗');
  console.log('  ║   Agent Monitor Dashboard Running     ║');
  console.log(`  ║   http://localhost:${PORT}               ║`);
  console.log('  ╚═══════════════════════════════════════╝');
  console.log('');
  console.log('  Watching for agent events...');
  console.log('  Press Ctrl+C to stop');
  console.log('');
});
