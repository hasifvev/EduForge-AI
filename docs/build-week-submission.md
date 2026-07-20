# OpenAI Build Week Submission Guide

## Submission facts

- **Track:** Education
- **Live demo:** https://edu-forge-ai-weld.vercel.app
- **Repository:** https://github.com/hasifvev/EduForge-AI
- **Repository access:** Public, Apache-2.0 licensed
- **Judge path:** Select a verified scenario, generate the lesson, launch an activity, then inspect Study Hub, curriculum review, and Material Intelligence.

## Required manual actions before submission

1. In the primary Codex build thread, run `/feedback` and copy the resulting Session ID into Devpost.
2. Create or update the Devpost project now; choose **Education**.
3. Upload a **public YouTube** video that is under three minutes and has an audible voiceover.
4. Open the YouTube link in an incognito/private browser before submitting.
5. Confirm every teammate is listed in Devpost and has accepted the invitation.

The repository is public, so it does not need to be shared with the two Devpost testing accounts.

## Three-minute demo storyboard

| Time | Screen | Voiceover point |
|---:|---|---|
| 0:00–0:18 | EduForge home | Teachers spend hours turning curriculum requirements and source material into usable activities. EduForge creates a reviewable, classroom-ready lesson workspace. |
| 0:18–0:45 | Choose Malaysia Form 1 Sains or US Grade 5 Science scenario | The teacher chooses country, grade, subject, learner profile, language, and curriculum context. |
| 0:45–1:15 | Generate and dashboard | Five product stages create activities, printable work, study resources, teaching guidance, and a quality review. |
| 1:15–1:40 | Launch quiz or matching game | The interactive activities are reusable browser engines: fast, portable, and designed for classroom use. |
| 1:40–2:05 | Upload/link material and Material Intelligence | Source material becomes a grounded summary, topics, evidence, and learner explain-goals; limited extraction is labelled instead of invented. |
| 2:05–2:25 | Standards and Teach Mode / My Lessons | Alignment is transparent: only reviewed outcomes claim an exact match. Lessons and teaching reflections remain on the teacher's device. |
| 2:25–2:55 | Architecture/README or a brief Codex view | Codex with GPT-5.6 helped us make the key architecture decision: reusable game engines instead of repeatedly generated HTML, then extend the product with local-first teaching, standards boundaries, and source intelligence. |
| 2:55–3:00 | Live URL and repository | EduForge AI: practical, local-first curriculum support for teachers worldwide. |

## Video safety checks

- Keep the final video below 3:00.
- Use only music, assets, and trademarks you are authorized to use; silence is acceptable.
- State specifically how Codex and GPT-5.6 influenced product and engineering decisions.
- Show the actual deployed product, not slides alone.

## Build Week evidence in this repository

- `docs/codex-log.md` documents Codex/GPT-5.6 contributions and the reusable-game-engine architecture decision.
- Git history contains dated Build Week extensions from July 17–20, 2026.
- `README.md` contains setup, live demo, judge path, model/collaboration evidence, and source/standards boundaries.
