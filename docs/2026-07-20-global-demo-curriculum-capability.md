# Global Demo Curriculum Capability

## Capability

Demo mode produces a usable, device-safe lesson starter for any valid country, subject, year, topic, and selected interface language without calling an AI provider.

## Constraints

- Demo mode must never fabricate a curriculum-standard code.
- Known regional frameworks are named with their official curriculum source; their topic-to-standard alignment remains **inferred** unless the teacher supplies an exact standard.
- A teacher-supplied standard is preserved verbatim and marked for teacher review, not validated as official.
- Every country and language is accepted as input. The deterministic lesson content is a teacher-editable starter, not a certified translation or official curriculum resource.

## Implementation Contract

- Demo requests always return a complete dashboard payload.
- Malaysia, United States, United Kingdom, Australia, Singapore, India, and IB/Cambridge use curated framework metadata already exposed by the product.
- Other countries use the teacher-provided standard when present, otherwise an International Framework fallback.
- The response carries a clear notice explaining the confidence boundary.

## Non-goals

- Verifying every national curriculum or translating generated material into every language.
- Claiming official endorsement, assessment equivalence, or standard-code accuracy.

## Handoff

Ready for deterministic fallback implementation and representative API tests.

[product-capability complete]
