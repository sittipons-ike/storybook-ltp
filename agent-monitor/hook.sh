#!/bin/bash
# Claude Code Hook - captures tool events and writes to event log
# Receives JSON on stdin with tool_name, tool_input, etc.

LOGFILE="$(dirname "$0")/events.jsonl"

# Read stdin (hook event JSON)
INPUT=$(cat)

# Extract tool name from the JSON
TOOL_NAME=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tool_name','unknown'))" 2>/dev/null || echo "unknown")
TOOL_INPUT=$(echo "$INPUT" | python3 -c "
import sys,json
d=json.load(sys.stdin)
inp = d.get('tool_input',{})
# Extract meaningful short description
if isinstance(inp, dict):
    desc = inp.get('description', inp.get('pattern', inp.get('command', inp.get('file_path', inp.get('prompt', inp.get('query', ''))))))
    if desc and len(str(desc)) > 80:
        desc = str(desc)[:80] + '...'
    print(desc or '')
else:
    print('')
" 2>/dev/null || echo "")

# Hook type from first arg
HOOK_TYPE="${1:-pre}"

# Map tool to agent role
ROLE="coder"
case "$TOOL_NAME" in
  Glob|Grep|Read) ROLE="explorer" ;;
  Edit|Write|NotebookEdit) ROLE="coder" ;;
  Bash) ROLE="tester" ;;
  Agent) ROLE="explorer" ;;
  EnterPlanMode|ExitPlanMode|TodoWrite) ROLE="planner" ;;
  AskUserQuestion) ROLE="planner" ;;
  *preview*|*Preview*) ROLE="tester" ;;
  *figma*|*Figma*) ROLE="reviewer" ;;
  *) ROLE="coder" ;;
esac

# Create event JSON
TIMESTAMP=$(date +%s%3N 2>/dev/null || python3 -c "import time; print(int(time.time()*1000))")

python3 -c "
import json, sys
event = {
    'timestamp': $TIMESTAMP,
    'hook': '$HOOK_TYPE',
    'tool': '$TOOL_NAME',
    'role': '$ROLE',
    'detail': '''$TOOL_INPUT'''
}
print(json.dumps(event))
" >> "$LOGFILE" 2>/dev/null

exit 0
