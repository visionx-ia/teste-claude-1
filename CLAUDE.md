# CLAUDE.md

This file provides guidance for AI assistants (Claude Code and similar) working in this repository.

## Repository Overview

**Repository:** visionx-ia/teste-claude-1
**Status:** Newly initialized — no source code has been committed yet.

This repository was created with an empty state. As the project evolves, update this file to reflect the actual codebase structure, conventions, and workflows.

---

## Current State

- No source language or framework has been established.
- No dependency files (package.json, requirements.txt, etc.) exist.
- No CI/CD pipelines are configured.
- No tests, linters, or build scripts are in place.

When code is first added, update the sections below accordingly.

---

## Git Conventions

### Branch Naming
- Feature branches: `feature/<short-description>`
- Bug fixes: `fix/<short-description>`
- Documentation: `docs/<short-description>`
- AI-assisted work: `claude/<task-description>` (e.g., `claude/add-claude-documentation-v7kul`)

### Commit Messages
Write commit messages in the imperative mood, focused on *why* not *what*:

```
Add user authentication module

Implement JWT-based auth to support stateless API sessions.
Replaces the prior session-cookie approach for better scalability.
```

- Keep the subject line under 72 characters.
- Leave a blank line between subject and body.
- Reference issue numbers where applicable: `Closes #42`

### Push Workflow
```bash
git push -u origin <branch-name>
```

Retry up to 4 times with exponential backoff (2s, 4s, 8s, 16s) on network failures.

---

## Development Workflow (to be updated as project grows)

### Bootstrapping a New Project
When this repo gains a stack, document the setup steps here. Example template:

```bash
# Install dependencies
<install command>

# Run development server
<dev command>

# Run tests
<test command>

# Lint and format
<lint command>
```

### Environment Variables
- Copy `.env.example` to `.env` before running locally (create `.env.example` when secrets are needed).
- Never commit `.env` or secrets.

---

## Code Style Conventions

These should be updated once a language/framework is chosen:

- Follow the formatter/linter enforced by the project toolchain (e.g., Prettier, Black, rustfmt, gofmt).
- Prefer explicit over implicit.
- Keep functions small and single-purpose.
- Write tests alongside new features — do not add features without coverage.
- Avoid speculative abstractions; build only what the current task requires.

---

## AI Assistant Guidelines

### What to do
- Read existing files before modifying them.
- Match the style and patterns already present in the codebase.
- Prefer editing existing files over creating new ones.
- Keep changes scoped to what was asked — no drive-by refactors.
- Mark tasks complete in TodoWrite as each one is finished.

### What to avoid
- Do not add error handling for impossible scenarios.
- Do not add docstrings or comments to unchanged code.
- Do not introduce backwards-compatibility shims for code that doesn't need them.
- Do not commit or push without explicit instruction from the user.
- Do not create new files unless strictly necessary.
- Do not add emoji to files unless explicitly requested.

### Risky actions requiring confirmation
Always pause and confirm before:
- Deleting files or branches
- Force-pushing
- Modifying CI/CD pipelines
- Posting to external services or GitHub (PRs, comments, issues)
- Any operation that is hard to reverse

---

## Repository Contacts

Update this section with team or maintainer information as the project grows.

---

*Last updated: 2026-04-07 — Repository is in initial empty state. Update this file as the project evolves.*
