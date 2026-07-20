# Curriculum Source Register

IlmuEducator uses a local, grade-aware planning catalog for the regions shown in the UI. It links teachers to the official framework for final verification; it does not claim to reproduce every local syllabus, state variation, or school sequence. A source-registered pack means the framework boundary is documented; it does **not** mean every subject and outcome has been reviewed.

| Region | Planning framework | Official source |
|---|---|---|
| Malaysia | KSPK, KSSR Semakan 2017, KSSM | [Malaysia Ministry of Education](https://www.moe.gov.my/) |
| United States | NGSS for adopting states/districts; state packs required otherwise | [Next Generation Science Standards](https://www.nextgenscience.org/) |
| England | National Curriculum in England; separate packs required for Scotland, Wales and Northern Ireland | [GOV.UK National Curriculum](https://www.gov.uk/national-curriculum) |
| Australia | Australian Curriculum v9.0 | [Australian Curriculum](https://www.australiancurriculum.edu.au/f-10-curriculum/) |
| Singapore | Singapore MOE Syllabus | [Singapore MOE primary curriculum](https://www.moe.gov.sg/primary/curriculum) |
| India | NCF-SE / NCERT / CBSE; separate packs required for state boards | [NCERT](https://ncert.nic.in/) and [CBSE Academic](https://cbseacademic.nic.in/curriculum_2027.html) |
| International / IB | Separate PYP, MYP and DP programme packs | [International Baccalaureate programmes](https://www.ibo.org/programmes/) |

## Catalog Behavior

- Early-years, primary, lower-secondary, and upper-secondary selections receive different subject lists and topic starters.
- Teachers can override the suggested topic, curriculum standard, objectives, and language.
- The app exposes an official guide link after a region, subject, and year are selected.
- Generated content remains a draft: teachers must check the current official syllabus, local/state requirements, and classroom suitability.
- Registry metadata is available from `GET /api/curriculum/coverage`; reviewed outcomes are reported separately from framework-only packs.

## Reviewed Standards Seed Coverage

Only the records below can receive the **Reviewed curriculum match** label. All other country, subject, year, and topic combinations remain teacher-review practice and link to their official framework source.

| Jurisdiction | Framework | Subject / level | Reviewed record |
|---|---|---|---|
| Malaysia | KSSM | Form 1 Science | `5.1.3` — physical and chemical properties of matter |
| United States | NGSS | Grade 5 Science | `5-PS1-1` — particle model of matter |
| England | National Curriculum | Key Stage 3 Science | particle model of states of matter |

Australia, Singapore, India/CBSE, and IB are source-registered framework packs; they do not yet contain reviewed subject/outcome records. This boundary prevents IlmuEducator from claiming universal official alignment before the underlying records have been independently reviewed.
