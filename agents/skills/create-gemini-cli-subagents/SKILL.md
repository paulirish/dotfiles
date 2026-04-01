---
name: create-gemini-cli-subagents
description: Expert guide for defining, creating, and invoking custom subagents in Gemini CLI. Trigger this skill when the user wants to create a new specialist agent, define a custom subagent, or learn how to delegate tasks to specialist agents within the Gemini CLI environment.
---

# Create Gemini CLI Subagents

This skill provides the instructions for creating custom **Subagents** (specialist agents) within the **Gemini CLI**.

## 1. Agent Definition
Subagents are defined as Markdown files (`.md`) with YAML frontmatter. These files act as the system instructions for a new specialist agent that can be invoked as a tool.

### Location
- **Project-level**: `.gemini/agents/*.md` (shared with the team via git).
- **User-level**: `~/.gemini/agents/*.md` (personal agents available in all sessions).

### File Format
The file MUST start with YAML frontmatter. The body of the markdown file becomes the agent's **System Prompt**.

```markdown
---
name: my-special-agent
description: Specialized in doing specific tasks. This description is used by the main agent to decide when to invoke this subagent.
kind: local
tools:
  - read_file
  - grep_search
model: inherit
temperature: 0.2
max_turns: 10
---
You are a specialist agent. Your job is to...
```

*Note: `name` (unique slug, a-z, 0-9, -, _) and `description` are required.*

## 2. Configuration
Ensure subagents are enabled in the Gemini CLI settings (either in the project or user `.gemini/settings.json`):

```json
{
  "experimental": {
    "enableAgents": true
  }
}
```

## 3. Activation
After creating or modifying a subagent file, you **MUST** inform the user to run the following command in their CLI to load the new definitions:

```bash
/agents refresh
```

## 4. Usage & Delegation
Once refreshed, the subagent becomes available as a tool matching its `name`. 

- **Delegation**: You can delegate complex, repetitive, or high-volume tasks to the subagent by calling its tool.
- **Reporting**: Subagents return a summary of their work, which keeps the main session context clean and focused.
