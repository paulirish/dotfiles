---
name: create-subagents
description: Teaches the agent how to define, create, and invoke custom subagents (specialist agents). Trigger this skill when the user asks to create a subagent, how to make a subagent, or wants to define a new specialist agent for a specific task.
---

# Create Subagents Skill

When the user wants to create a new subagent, follow these guidelines to define and set it up:

1. **Agent Definition File**: Custom subagents are defined as Markdown files (`.md`) with YAML frontmatter.
   - Place them in project-level `.gemini/agents/*.md` (shared with the team) or user-level `~/.gemini/agents/*.md` (personal agents).

2. **File Format**: The file MUST start with YAML frontmatter enclosed in triple-dashes `---`. The body of the markdown file becomes the agent's System Prompt.
   Example structure:
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

3. **Enable Subagents**: Ensure subagents are enabled in the project or user `.gemini/settings.json`:
   ```json
   {
     "experimental": {
       "enableAgents": true
     }
   }
   ```

4. **Activation Requirements**: Always inform the user that they MUST run `/agents refresh` in their CLI to load the newly created subagents before they can be used.

5. **Invocation**: Once refreshed, the subagent becomes available as a tool matching its `name`. You can delegate tasks to it by calling that tool and passing instructions to it.
