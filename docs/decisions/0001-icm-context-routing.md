# Decision 0001: Recursive Context Routing

## Context
The repository must be understandable to future human and autonomous agents without loading the entire project into one context.

## Decision
Use root routing documents plus concise recursive `CONTEXT.md` files at project-owned directory boundaries. Keep stable references under `references/` and run/implementation state in its owning area.

## Consequences
Agents can scope context by directory. Documentation must be updated when architecture changes, and generated/vendor directories remain excluded.

## Status
Accepted
