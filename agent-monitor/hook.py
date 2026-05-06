#!/usr/bin/env python3
"""Claude Code Hook - captures tool events to events.jsonl"""
import sys, json, time, os

LOGFILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "events.jsonl")

# Hook type from argv
hook_type = sys.argv[1] if len(sys.argv) > 1 else "pre"

# Read JSON from stdin
try:
    data = json.load(sys.stdin)
except:
    sys.exit(0)

tool = data.get("tool_name", "unknown")
inp = data.get("tool_input", {})

# Extract short description
detail = ""
if isinstance(inp, dict):
    for key in ["description", "pattern", "command", "file_path", "prompt", "query", "content", "skill"]:
        val = inp.get(key)
        if val:
            detail = str(val)
            if len(detail) > 80:
                detail = detail[:77] + "..."
            break

# Map tool to agent role
ROLE_MAP = {
    "Glob": "explorer",
    "Grep": "explorer",
    "Read": "explorer",
    "Agent": "explorer",
    "Edit": "coder",
    "Write": "coder",
    "NotebookEdit": "coder",
    "Bash": "tester",
    "EnterPlanMode": "planner",
    "ExitPlanMode": "planner",
    "TodoWrite": "planner",
    "AskUserQuestion": "planner",
    "Skill": "planner",
}

role = ROLE_MAP.get(tool, "reviewer")

# Check for MCP/preview/figma/canva tools → assign to specific roles
tool_lower = tool.lower()
if "preview" in tool_lower:
    role = "tester"
elif "figma" in tool_lower or "get_design_context" in tool_lower or "get_screenshot" in tool_lower or "search_design_system" in tool_lower:
    role = "uxui"
elif "canva" in tool_lower or "generate-design" in tool_lower or "editing-transaction" in tool_lower or "design-content" in tool_lower:
    role = "uxwriter"

# Session role from env variable (set per session)
# Usage: AGENT_ROLE=storybook claude
# Roles: storybook, agent-mgr, web-ltp, bo-ltp, writer
session_role = os.environ.get("AGENT_ROLE", "")

event = {
    "timestamp": int(time.time() * 1000),
    "hook": hook_type,
    "tool": tool,
    "role": role,
    "session_role": session_role,
    "detail": detail,
}

with open(LOGFILE, "a") as f:
    f.write(json.dumps(event) + "\n")
