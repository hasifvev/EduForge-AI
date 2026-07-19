# 2026-07-19 — Local-first Teach Mode

**Status:** Accepted

## Decision

Use browser localStorage for the Teach Mode pilot. It keeps lesson progress private, has no service cost, and requires no accounts or cloud configuration.

## Consequences

Teach Mode is limited to one device: it cannot join students by QR code, collect cross-device responses, or provide a live class dashboard. Those capabilities require an explicit future opt-in sharing architecture.
