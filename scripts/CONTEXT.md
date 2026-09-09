# Scripts Context

## Purpose
`scripts/` contains small deterministic repository-maintenance utilities.

## Belongs here
Portable checks that inspect project-owned files without contacting external services or generating build output.

## Does not belong here
Application runtime code, secrets, provider SDKs, deployment credentials, or task reports.

## Current status
`check-context-coverage.mjs` verifies that every meaningful project-owned directory has a local `CONTEXT.md`.

## Before modifying
Read root `AGENTS.md`, `CONTEXT.md`, and `stages/03-validation/CONTEXT.md`.
