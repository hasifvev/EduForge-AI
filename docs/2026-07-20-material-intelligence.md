# Material Intelligence

## Purpose

Give a teacher an immediate, inspectable understanding of uploaded or linked material without storing it in the cloud or pretending that weak extraction is authoritative.

## Response

When `extractedText` is supplied to `POST /api/generate`, the source-preview workflow adds `material_intelligence` with a summary, topic explanations, key terms, essential points, learner explain-goals, short source evidence, and a confidence label.

## Safety boundary

The analyzer is deterministic and works only from extracted text. It does not enrich the material with external claims. Brief or poorly extracted sources are labelled as limited so the teacher can inspect the original.
