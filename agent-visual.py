#!/usr/bin/env python3
"""
Agent Visual Dashboard - 8-bit style terminal visualization
Shows animated characters representing different Claude Code agent roles.
"""

import sys
import time
import os
import random
import signal

# ─── ANSI Colors ──────────────────────────────────────────────
class C:
    RESET   = "\033[0m"
    BOLD    = "\033[1m"
    DIM     = "\033[2m"
    BLINK   = "\033[5m"

    BLACK   = "\033[30m"
    RED     = "\033[31m"
    GREEN   = "\033[32m"
    YELLOW  = "\033[33m"
    BLUE    = "\033[34m"
    MAGENTA = "\033[35m"
    CYAN    = "\033[36m"
    WHITE   = "\033[37m"

    BG_BLACK   = "\033[40m"
    BG_RED     = "\033[41m"
    BG_GREEN   = "\033[42m"
    BG_YELLOW  = "\033[43m"
    BG_BLUE    = "\033[44m"
    BG_MAGENTA = "\033[45m"
    BG_CYAN    = "\033[46m"
    BG_WHITE   = "\033[47m"

    # 256 color
    ORANGE  = "\033[38;5;208m"
    PINK    = "\033[38;5;205m"
    LIME    = "\033[38;5;118m"
    SKY     = "\033[38;5;117m"
    PURPLE  = "\033[38;5;141m"
    GOLD    = "\033[38;5;220m"
    GRAY    = "\033[38;5;245m"
    DARK    = "\033[38;5;236m"

# ─── 8-bit Agent Characters ──────────────────────────────────

AGENTS = {
    "explorer": {
        "color": C.CYAN,
        "name": "Explorer",
        "frames": [
            [
                "   ╔══╗   ",
                "   ║@@║   ",
                "   ╚╤╤╝   ",
                "  ┌─┼┼─┐  ",
                "  │ ┼┼ │  ",
                " ─┤ ┼┼ ├▶ ",
                "  │ ┼┼ │  ",
                "  └─┼┼─┘  ",
                "    ││    ",
                "   ═╧╧═   ",
            ],
            [
                "   ╔══╗   ",
                "   ║@@║   ",
                "   ╚╤╤╝   ",
                "  ┌─┼┼─┐  ",
                " ◀┤ ┼┼ │  ",
                "  │ ┼┼ ├─ ",
                "  │ ┼┼ │  ",
                "  └─┼┼─┘  ",
                "    ││    ",
                "   ═╧╧═   ",
            ],
        ],
        "tasks": [
            "Scanning codebase...",
            "Finding components...",
            "Mapping file tree...",
            "Searching patterns...",
            "Reading directories...",
        ]
    },
    "planner": {
        "color": C.YELLOW,
        "name": "Planner",
        "frames": [
            [
                "   ╔══╗   ",
                "   ║▓▓║   ",
                "   ╚╤╤╝   ",
                " ┌──┼┼──┐ ",
                " │  ┼┼  │ ",
                " │  ┼┼  │ ",
                " │  ┼┼  │ ",
                " └──┼┼──┘ ",
                "    ││    ",
                "   ═╧╧═   ",
            ],
            [
                "   ╔══╗   ",
                "   ║▓▓║   ",
                "   ╚╤╤╝   ",
                " ┌──┼┼──┐ ",
                " │  ┼┼  │ ",
                " │  ┼┼  │ ",
                " │  ┼┼  │ ",
                " └──┼┼──┘ ",
                "    ││    ",
                "   ═╧╧═   ",
            ],
        ],
        "tasks": [
            "Designing approach...",
            "Analyzing trade-offs..",
            "Drafting plan...",
            "Reviewing architecture",
            "Estimating scope...",
        ]
    },
    "coder": {
        "color": C.GREEN,
        "name": "Coder",
        "frames": [
            [
                "   ╔══╗   ",
                "   ║><║   ",
                "   ╚╤╤╝   ",
                "  ┌─┼┼─┐  ",
                "  │ ┼┼ ├╌╌",
                "  │ ┼┼ │  ",
                "  │ ┼┼ │  ",
                "  └─┼┼─┘  ",
                "    ││    ",
                "   ═╧╧═   ",
            ],
            [
                "   ╔══╗   ",
                "   ║><║   ",
                "   ╚╤╤╝   ",
                "  ┌─┼┼─┐  ",
                "╌╌┤ ┼┼ │  ",
                "  │ ┼┼ │  ",
                "  │ ┼┼ │  ",
                "  └─┼┼─┘  ",
                "    ││    ",
                "   ═╧╧═   ",
            ],
        ],
        "tasks": [
            "Writing component...",
            "Editing source file..",
            "Implementing logic...",
            "Refactoring code...",
            "Adding types...",
        ]
    },
    "tester": {
        "color": C.MAGENTA,
        "name": "Tester",
        "frames": [
            [
                "   ╔══╗   ",
                "   ║&&║   ",
                "   ╚╤╤╝   ",
                "  ┌─┼┼─┐  ",
                "  │ ┼┼ │  ",
                "  │ ┼┼ │  ",
                "  │ ┼┼ │  ",
                "  └─┼┼─┘  ",
                "   /  \\   ",
                "  ═╧  ╧═  ",
            ],
            [
                "   ╔══╗   ",
                "   ║&&║   ",
                "   ╚╤╤╝   ",
                "  ┌─┼┼─┐  ",
                "  │ ┼┼ │  ",
                "  │ ┼┼ │  ",
                "  │ ┼┼ │  ",
                "  └─┼┼─┘  ",
                "   \\  /   ",
                "  ═╧  ╧═  ",
            ],
        ],
        "tasks": [
            "Running test suite...",
            "Checking assertions..",
            "Validating output...",
            "Testing edge cases...",
            "Verifying build...",
        ]
    },
    "reviewer": {
        "color": C.SKY,
        "name": "Reviewer",
        "frames": [
            [
                "   ╔══╗   ",
                "   ║OO║   ",
                "   ╚╤╤╝   ",
                "  ┌─┼┼─┐  ",
                "  │ ┼┼ │  ",
                "  │ ┼┼ │  ",
                "  │ ┼┼ │  ",
                "  └─┼┼─┘  ",
                "    ││    ",
                "   ═╧╧═   ",
            ],
            [
                "   ╔══╗   ",
                "   ║oo║   ",
                "   ╚╤╤╝   ",
                "  ┌─┼┼─┐  ",
                "  │ ┼┼ │  ",
                "  │ ┼┼ │  ",
                "  │ ┼┼ │  ",
                "  └─┼┼─┘  ",
                "    ││    ",
                "   ═╧╧═   ",
            ],
        ],
        "tasks": [
            "Reviewing changes...",
            "Checking quality...",
            "Scanning for issues..",
            "Approving merge...",
            "Reading diff...",
        ]
    },
}

# ─── Status indicators ───────────────────────────────────────

STATUS_ICONS = {
    "working":   f"{C.GREEN}●{C.RESET}",
    "thinking":  f"{C.YELLOW}◐{C.RESET}",
    "waiting":   f"{C.GRAY}○{C.RESET}",
    "done":      f"{C.GREEN}✔{C.RESET}",
    "error":     f"{C.RED}✘{C.RESET}",
}

PROGRESS_CHARS = ["░", "▒", "▓", "█"]

# ─── Rendering ────────────────────────────────────────────────

def clear_screen():
    sys.stdout.write("\033[2J\033[H")
    sys.stdout.flush()

def hide_cursor():
    sys.stdout.write("\033[?25l")
    sys.stdout.flush()

def show_cursor():
    sys.stdout.write("\033[?25h")
    sys.stdout.flush()

def move_to(row, col):
    sys.stdout.write(f"\033[{row};{col}H")

def get_terminal_size():
    try:
        cols, rows = os.get_terminal_size()
        return rows, cols
    except:
        return 40, 120

def draw_box(row, col, width, height, color=C.WHITE, title=""):
    move_to(row, col)
    sys.stdout.write(f"{color}╔{'═' * (width - 2)}╗{C.RESET}")
    if title:
        move_to(row, col + 2)
        sys.stdout.write(f"{color}{C.BOLD} {title} {C.RESET}")
    for i in range(1, height - 1):
        move_to(row + i, col)
        sys.stdout.write(f"{color}║{' ' * (width - 2)}║{C.RESET}")
    move_to(row + height - 1, col)
    sys.stdout.write(f"{color}╚{'═' * (width - 2)}╝{C.RESET}")

def draw_agent_card(row, col, agent_key, frame_idx, status, progress, task_text):
    agent = AGENTS[agent_key]
    color = agent["color"]
    name = agent["name"]
    card_width = 32
    card_height = 16

    # Draw card box
    draw_box(row, col, card_width, card_height, color, name)

    # Draw character
    frame = agent["frames"][frame_idx % len(agent["frames"])]
    for i, line in enumerate(frame):
        move_to(row + 2 + i, col + 11)
        sys.stdout.write(f"{color}{line}{C.RESET}")

    # Status line
    status_icon = STATUS_ICONS.get(status, STATUS_ICONS["waiting"])
    status_label = status.upper()
    move_to(row + 12, col + 2)
    sys.stdout.write(f" {status_icon} {C.BOLD}{status_label:<10}{C.RESET}")

    # Progress bar
    bar_width = 20
    filled = int(progress * bar_width)
    bar = ""
    for i in range(bar_width):
        if i < filled:
            bar += f"{color}█{C.RESET}"
        else:
            bar += f"{C.DARK}░{C.RESET}"
    move_to(row + 13, col + 2)
    pct = int(progress * 100)
    sys.stdout.write(f" {bar} {color}{pct:>3}%{C.RESET}")

    # Task text
    move_to(row + 14, col + 2)
    task_display = task_text[:card_width - 4]
    sys.stdout.write(f" {C.DIM}{task_display:<{card_width - 4}}{C.RESET}")

def draw_header(cols):
    title = "  CLAUDE CODE AGENT DASHBOARD  "
    move_to(1, 1)
    pad = (cols - len(title)) // 2
    sys.stdout.write(f"{C.BOLD}{C.BG_BLUE}{C.WHITE}{' ' * pad}{title}{' ' * (cols - pad - len(title))}{C.RESET}")

    move_to(2, 1)
    subtitle = "  8-bit Agent Visual Monitor  "
    pad2 = (cols - len(subtitle)) // 2
    sys.stdout.write(f"{C.DIM}{' ' * pad2}{subtitle}{C.RESET}")

def draw_activity_log(row, col, width, logs):
    draw_box(row, col, width, 8, C.GRAY, "Activity Log")
    for i, log in enumerate(logs[-6:]):
        move_to(row + 1 + i, col + 2)
        sys.stdout.write(f"{log:<{width - 4}}")

def draw_stats(row, col, stats):
    draw_box(row, col, 50, 4, C.GOLD, "Session Stats")
    move_to(row + 1, col + 2)
    sys.stdout.write(
        f" Files: {C.GREEN}{stats['files']}{C.RESET}  "
        f"Lines: {C.CYAN}{stats['lines']}{C.RESET}  "
        f"Tasks: {C.YELLOW}{stats['tasks']}{C.RESET}  "
        f"Time: {C.MAGENTA}{stats['time']}{C.RESET}"
    )
    move_to(row + 2, col + 2)
    # mini sparkline
    spark = ""
    for v in stats.get("sparkline", []):
        if v > 7: spark += f"{C.GREEN}▇{C.RESET}"
        elif v > 5: spark += f"{C.LIME}▆{C.RESET}"
        elif v > 3: spark += f"{C.YELLOW}▄{C.RESET}"
        elif v > 1: spark += f"{C.ORANGE}▂{C.RESET}"
        else: spark += f"{C.DARK}▁{C.RESET}"
    sys.stdout.write(f" Activity: {spark}")


# ─── Simulation ───────────────────────────────────────────────

def run_demo():
    clear_screen()
    hide_cursor()

    rows, cols = get_terminal_size()

    # Agent states
    agent_keys = ["explorer", "planner", "coder", "tester", "reviewer"]
    states = {}
    for key in agent_keys:
        states[key] = {
            "status": "waiting",
            "progress": 0.0,
            "task": "",
            "frame": 0,
            "speed": random.uniform(0.01, 0.04),
            "delay": random.randint(0, 30),
        }

    logs = [
        f" {C.DIM}[system]{C.RESET} Dashboard initialized",
        f" {C.DIM}[system]{C.RESET} Waiting for agents...",
    ]

    stats = {
        "files": 0,
        "lines": 0,
        "tasks": 0,
        "time": "0:00",
        "sparkline": [0] * 30,
    }

    tick = 0
    start_time = time.time()

    # Activation sequence
    activation_order = [
        (5,  "explorer"),
        (15, "planner"),
        (30, "coder"),
        (50, "tester"),
        (70, "reviewer"),
    ]

    try:
        while True:
            rows, cols = get_terminal_size()

            # Header
            draw_header(cols)

            # Calculate card positions
            card_width = 32
            total_width = card_width * 3 + 4
            start_col = max(1, (cols - total_width) // 2)

            # Row 1: Explorer, Planner, Coder
            row1_agents = ["explorer", "planner", "coder"]
            for i, key in enumerate(row1_agents):
                s = states[key]
                draw_agent_card(
                    4, start_col + i * (card_width + 2),
                    key, s["frame"], s["status"], s["progress"], s["task"]
                )

            # Row 2: Tester, Reviewer (centered)
            row2_start = start_col + (card_width + 2) // 2
            row2_agents = ["tester", "reviewer"]
            for i, key in enumerate(row2_agents):
                s = states[key]
                draw_agent_card(
                    21, row2_start + i * (card_width + 2),
                    key, s["frame"], s["status"], s["progress"], s["task"]
                )

            # Activity log
            log_row = 38
            log_width = min(cols - 4, total_width)
            draw_activity_log(log_row, start_col, log_width, logs)

            # Stats
            elapsed = int(time.time() - start_time)
            stats["time"] = f"{elapsed // 60}:{elapsed % 60:02d}"
            draw_stats(log_row + 9, start_col, stats)

            # Footer
            move_to(log_row + 14, start_col)
            sys.stdout.write(f"{C.DIM}Press Ctrl+C to exit{C.RESET}")

            sys.stdout.flush()

            # ── Update states ──
            for at_tick, key in activation_order:
                s = states[key]
                agent = AGENTS[key]

                if tick == at_tick:
                    s["status"] = "thinking"
                    s["task"] = random.choice(agent["tasks"])
                    logs.append(f" {agent['color']}[{agent['name']}]{C.RESET} Starting: {s['task']}")
                    stats["tasks"] += 1

                if tick > at_tick and s["status"] in ("thinking", "working"):
                    s["frame"] = tick // 3

                    if tick == at_tick + 5:
                        s["status"] = "working"

                    s["progress"] += s["speed"]

                    if s["progress"] >= 1.0:
                        s["progress"] = 0.0
                        s["status"] = "done"
                        old_task = s["task"]
                        logs.append(f" {C.GREEN}[{agent['name']}]{C.RESET} Completed: {old_task}")
                        stats["files"] += random.randint(1, 3)
                        stats["lines"] += random.randint(10, 150)

                        # Restart after a pause
                        s["delay"] = tick + random.randint(10, 25)

                if s["status"] == "done" and tick >= s.get("delay", 0):
                    s["status"] = "thinking"
                    s["task"] = random.choice(agent["tasks"])
                    s["speed"] = random.uniform(0.01, 0.04)
                    logs.append(f" {agent['color']}[{agent['name']}]{C.RESET} Starting: {s['task']}")
                    stats["tasks"] += 1

            # Sparkline update
            if tick % 5 == 0:
                active = sum(1 for s in states.values() if s["status"] == "working")
                stats["sparkline"].append(active * 2 + random.randint(0, 3))
                stats["sparkline"] = stats["sparkline"][-30:]

            tick += 1
            time.sleep(0.15)

    except KeyboardInterrupt:
        pass
    finally:
        show_cursor()
        clear_screen()
        print(f"\n{C.BOLD}Dashboard closed.{C.RESET}\n")


# ─── Entry ────────────────────────────────────────────────────

if __name__ == "__main__":
    signal.signal(signal.SIGINT, lambda *_: None)  # let KeyboardInterrupt handle it

    print(f"\n{C.BOLD}{C.CYAN}Starting Agent Visual Dashboard...{C.RESET}")
    print(f"{C.DIM}Tip: Make your terminal at least 100 cols x 50 rows for best experience{C.RESET}\n")
    time.sleep(1)

    run_demo()
