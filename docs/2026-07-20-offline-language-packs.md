# Offline Language Packs

## Decision

Use bundled, reviewed deterministic templates for multilingual demo scaffolds instead of extracting Google Translate data or relying on Windows language packs. The app stays local-first and needs no translation key, account, or cloud storage.

## Current coverage

English, Bahasa Melayu, French, and Spanish localize reusable instructional copy in objectives, resources, study materials, and teacher guidance. Topics and subject names stay exactly as entered because a bundled template cannot safely translate arbitrary teacher input.

## Fallback rule

Any language without a reviewed pack renders the English pack and returns `language_pack.exact_match: false`. The source notice tells the teacher the requested language was not rendered, preventing a misleading translation claim.

## Next packs

Prioritize Arabic, Chinese, Hindi, Tamil, Japanese, and Korean after native-speaker review.
