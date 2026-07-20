# OpenAI Build Week Submission Guide

## Submission facts

- **Track:** Education
- **Live demo:** https://edu-forge-ai-weld.vercel.app
- **Repository:** https://github.com/hasifvev/IlmuEducator
- **Repository access:** Public, Apache-2.0 licensed
- **Judge path:** Select a verified scenario, generate the lesson, launch an activity, then inspect Study Hub, curriculum review, and Material Intelligence.

## Devpost-ready fields

| Devpost field | Ready-to-use value |
|---|---|
| Project name | **IlmuEducator — Local-First Curriculum Intelligence for Teachers** |
| Track | **Education** |
| Project URL | https://edu-forge-ai-weld.vercel.app |
| Repository URL | https://github.com/hasifvev/IlmuEducator |
| Repository access | Public; no tester invitations required |
| License | Apache License 2.0 |
| Primary Codex Build Week session | `019f7a42-c8fa-7c63-9211-41e8af01b47c` |
| Private evidence manifest | `codex-doctor-report.json`, the July 19 rollout, and the matching auto-review rollout; names recorded in `docs/codex-log.md` |
| Short description | IlmuEducator turns a teacher's curriculum context and optional source material into reviewable lesson activities, printable practice, study resources, and local-first teaching guidance. |

### Suggested Devpost description

Teachers spend too much time turning curriculum requirements and source material into activities they can actually use. IlmuEducator is a local-first teaching workspace that accepts a subject, grade, region, learner profile, language, and optional material, then creates interactive practice, printable resources, study support, teaching guidance, and a quality review.

IlmuEducator is designed around transparent trust boundaries. It distinguishes reviewed curriculum matches from framework-only guidance, keeps lesson history and Teach Mode reflections on the teacher's device, and turns uploaded or linked material into Material Intelligence: a source-grounded summary, topics, evidence, and learner explain-goals. When source text is limited, IlmuEducator says so rather than inventing detail.

We used Codex with GPT-5.6 as an engineering partner for product and architecture decisions, implementation, and verification. A key decision was replacing per-request generated game HTML with reusable, self-contained browser game engines. That made interactive learning activities portable, faster, and more reliable. During Build Week we extended IlmuEducator with local-first Teach Mode, a worldwide curriculum catalog, source-registered standards boundaries, offline language packs, and Material Intelligence. The repository includes the contribution log, dated commits, setup instructions, and a live no-key demo path for judges.

## Required-submission ledger

| Requirement | Current state | Action / proof |
|---|---|---|
| Working project | Ready | Live demo works without an API key. |
| Education track | Ready | Select **Education** in Devpost. |
| Public code repository | Ready | `https://github.com/hasifvev/IlmuEducator` is public and Apache-2.0 licensed. |
| Setup and judge instructions | Ready | `README.md` and this document. |
| Codex/GPT-5.6 evidence | Ready | `docs/codex-log.md`, dated commits, and README evidence section. |
| Primary Codex session evidence | Ready | `019f7a42-c8fa-7c63-9211-41e8af01b47c`, from local July 19 rollout metadata. |
| `/feedback` Session ID | Confirmed externally | The primary build session has been submitted through the Codex feedback flow. Keep the Devpost value aligned with the identifier accepted by that flow. |
| Public YouTube demo | Manual | Upload the final narrated video, then test the exact link in a private/incognito window. |
| Team members | Manual / verify | Add every contributor in Devpost and verify each invitation was accepted before the deadline. |
| Devpost submit | Manual | Save the project early, then perform the final submit after the video and Session ID are attached. |

## Required manual actions before submission

1. Confirm the Devpost feedback field uses the accepted identifier for the primary Codex session shown above.
2. Create or update the Devpost project now; choose **Education**.
3. Upload a **public YouTube** video that is under three minutes and has an audible voiceover.
4. Open the YouTube link in an incognito/private browser before submitting.
5. Confirm every teammate is listed in Devpost and has accepted the invitation.

The repository is public, so it does not need to be shared with the two Devpost testing accounts.

## Final submission checklist

Copy this checklist into your notes and tick every box before selecting **Submit**:

- [ ] Track is **Education**.
- [ ] Project name, description, deployed URL, and GitHub URL are filled in.
- [x] Primary Codex Build Week session evidence is recorded: `019f7a42-c8fa-7c63-9211-41e8af01b47c`.
- [ ] Confirm the identifier accepted by the Devpost `/feedback` field matches the submitted feedback flow.
- [ ] Public YouTube URL is attached, runs in incognito, is under 3:00, and includes audible voiceover.
- [ ] Voiceover explicitly names both **Codex** and **GPT-5.6**, with the reusable-game-engine architecture decision as a concrete example.
- [ ] Every teammate is listed and has accepted their Devpost invitation.
- [ ] README evidence section and `docs/codex-log.md` are visible on the `main` branch.
- [ ] The live demo opens and a verified scenario completes successfully from a private/incognito window.
- [ ] Submission is saved before the deadline; final submission is completed before **July 21, 2026, 5:00 PM PDT**.

## Three-minute demo storyboard

| Time | Screen | Voiceover point |
|---:|---|---|
| 0:00–0:18 | IlmuEducator home | Teachers spend hours turning curriculum requirements and source material into usable activities. IlmuEducator creates a reviewable, classroom-ready lesson workspace. |
| 0:18–0:45 | Choose Malaysia Form 1 Sains or US Grade 5 Science scenario | The teacher chooses country, grade, subject, learner profile, language, and curriculum context. |
| 0:45–1:15 | Generate and dashboard | Five product stages create activities, printable work, study resources, teaching guidance, and a quality review. |
| 1:15–1:40 | Launch quiz or matching game | The interactive activities are reusable browser engines: fast, portable, and designed for classroom use. |
| 1:40–2:05 | Upload/link material and Material Intelligence | Source material becomes a grounded summary, topics, evidence, and learner explain-goals; limited extraction is labelled instead of invented. |
| 2:05–2:25 | Standards and Teach Mode / My Lessons | Alignment is transparent: only reviewed outcomes claim an exact match. Lessons and teaching reflections remain on the teacher's device. |
| 2:25–2:55 | Architecture/README or a brief Codex view | Codex with GPT-5.6 helped us make the key architecture decision: reusable game engines instead of repeatedly generated HTML, then extend the product with local-first teaching, standards boundaries, and source intelligence. |
| 2:55–3:00 | Live URL and repository | IlmuEducator: practical, local-first curriculum support for teachers worldwide. |

## Video safety checks

- Keep the final video below 3:00.
- Use only music, assets, and trademarks you are authorized to use; silence is acceptable.
- State specifically how Codex and GPT-5.6 influenced product and engineering decisions.
- Show the actual deployed product, not slides alone.

## Build Week evidence in this repository

- `docs/codex-log.md` documents Codex/GPT-5.6 contributions and the reusable-game-engine architecture decision.
- The Codex contribution log lists the private evidence artifact manifest without exposing raw session content in the public repository.
- Git history contains dated Build Week extensions from July 17–20, 2026.
- `README.md` contains setup, live demo, judge path, model/collaboration evidence, and source/standards boundaries.
