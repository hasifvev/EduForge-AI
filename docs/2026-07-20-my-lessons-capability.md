# My Lessons Capability

## Capability

Teachers can return to generated EduForge lessons and their Teach Mode progress on the same browser, without an account or cloud database.

## Constraints

- Lesson content, reflections, and progress stay in browser `localStorage` on the device where they were created.
- A lesson is automatically saved after successful generation.
- The library retains at most 20 entries, newest first.
- Storage can be cleared by the browser or user; JSON export and restore are the recovery path.
- Storage failures are surfaced to the teacher rather than silently discarding work.

## Implementation Contract

- **Actors:** a teacher using the lesson builder, dashboard, Teach Mode, and My Lessons.
- **Surfaces:** a My Lessons entry point on the builder and dashboard; a local-library view; a shared lesson record for Teach Mode.
- **States:** generated → saved; saved → opened; saved → duplicated/deleted; saved → exported; backup → restored; Teach Mode ready → in progress → completed.
- **Data:** a versioned local record contains lesson metadata, the generated lesson response, timestamps, and optional Teach Mode session state.
- **Recovery:** malformed backups and unavailable storage show a visible message; import only accepts an EduForge-shaped lesson list.

## Non-goals

- No accounts, cross-device sync, collaboration, analytics, or cloud backup.
- No automatic browser-data recovery.
- No lesson-editor workflow in this capability.

## Open Questions

- Whether the 20-lesson local retention limit should become a user preference after real teacher testing.
- Whether an encrypted export option is warranted for schools with stricter device policies.

## Handoff

Ready for direct implementation and local browser verification.

[product-capability complete]
