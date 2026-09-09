# Decision 0002: Static Public Website Boundary

## Context
The first public website is deployed on GitHub Pages, which cannot execute server-side application logic.

## Decision
Keep the current public experience static-export compatible. Future identity, progress, AI, safeguarding, and structured data capabilities remain conceptual boundaries until a backend target is selected.

## Consequences
The public site can deploy cheaply and reliably. Dynamic functionality must later use explicit backend adapters without embedding secrets or server assumptions in public routes.

## Status
Accepted
