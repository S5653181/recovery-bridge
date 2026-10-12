# Feature-to-requirement mapping

The implementation is intentionally limited to staff evaluation with synthetic episodes.

| Requirement | Implemented feature | Where / evidence |
| --- | --- | --- |
| A: Active episodes and discharge dates | Filtered episode list, explicit missing dates, discharge-date ordering | Team overview |
| A: Outstanding, overdue and unassigned actions | Shared count functions; unresolved statuses explicitly defined | Overview and episode action plan; count tests |
| A: Awaiting responses and unconfirmed follow-up | Submitted referral count; Pending / Not recorded follow-up count | Overview; separate referral and follow-up entities |
| A: Search and filters | Search, site, ward, worker, inclusive discharge range, action status and attention filter | Overview; filter tests |
| A: Labelled, reconciling counts | Counts derive from the exact episode collection displayed | Domain tests plus rendered-count assertions |
| B: Coherent workspace | Episode metadata, four section tabs and next-step prompt | Episode workspace |
| B: Create and edit episodes | Fictional name, generated identifier, location, practitioner and discharge date | New episode / Edit episode; interaction and storage tests |
| C: Goals and preferences | Multiple goal entities; short context, resources and review fields | Recovery support |
| C: Separate support stages | Independent discussion, offer, decision and arrangement values | Recovery support forms and cards |
| C: Barriers and agreed actions | Structured type/status with short context and agreed action | Recovery support; barrier review status |
| D: Action lifecycle | Add, edit, assign, date, status, notes, Complete and Reopen | Discharge actions; timestamp tests |
| D: Configurable checklist | Select relevant items, initial owner/date; editable descriptions and purpose; new items | Example checklist / Demo settings |
| D: No clinical clearance claim | Coordination-only progress language and explicit clinical responsibility text | Episode notice, overview footer and summary |
| E: Referral detail | Service, purpose, consent, date, practitioner, status, response and next action | Referral form |
| E: Separate confirmation | Follow-up entity with optional referral link; confirmation details validated | Follow-up form; validation tests |
| E: Demonstration directory | Four clearly fictional organisations and episode-selection workflow | Service directory |
| F: Generated editable handover | Record-derived preview, separate saved draft and stale-source check | Handover; interaction tests |
| F: Print / export and visible missingness | Browser print / PDF, text export, explicit unknowns | Handover; generated-text and print-handler tests |
| Behavioural design | Ownership, next steps, defaults, checklist, progress, contextual validation | Separate behavioural rationale |
| Interface and accessibility | Semantic controls, labels, status text, focus styles, responsive rules, native dialog, keyboard tabs | Accessibility verification report; browser checks pending |
| Data and persistence | Versioned browser storage; structured entities; storage failure feedback | `core.mjs`; round-trip and refresh-handler tests |
| Varied synthetic scenarios | Completed planning, incomplete context, unanswered referral, barriers, declined support, proposed follow-up | DEMO-001 through DEMO-006 |
| Demonstration role switching | Practitioner view, coordinator context and team-lead workload | Staff selector; no authentication claim |
| Dataset reset | Explicit confirmation restores all six scenarios and configuration | Demo settings; reset-handler test |
| Evaluation support | Scenario tasks, measures, instruments and interview guide | Separate staff evaluation guide |

## Data model

| Entity | Main fields / relationship |
| --- | --- |
| State | schema version, reference date, selected staff view, staff, checklist templates and episodes |
| Episode | id, fictional alias, site, ward, practitioner id, planned discharge, Active state, preferences, resources, review, barrierReview, updatedAt |
| Recovery goal | id, text; belongs to one episode |
| Support option | id, option, discussed, offered, decision, arrangement, notes; belongs to episode |
| Practical barrier | id, type, context, status, agreed action; belongs to episode |
| Discharge action | id, description, owner staff id or blank, due, status, notes, rationale, completedAt |
| Referral | id, service, purpose, consent, date, owner staff id, status, outcome, next action |
| Follow-up | id, service, optional referral id, date, time, method, details, owner, status, next action |
| Handover draft | text, generating source text and saved timestamp on the episode; distinct from source fields |
| Demonstration staff | id, fictional name, role, initials; no credentials or access permissions |
| Checklist template | id, description and rationale; copied into a new action only when selected |

Identifiers relate actions and arrangements to staff and referrals without duplicating demographic data. No NHS number, hospital number, real patient name, diagnosis, prescribing field or real service endpoint is collected.

## Baseline reconciliation

Clear all filters and use the original reference date, 12 October 2026.

| Episode / scenario | Actions | Completed | Declined / N/A | Outstanding | Overdue | Unassigned | Awaiting response | Follow-up to confirm |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| DEMO-001 · Alex | 4 | 3 | 0 | 1 | 0 | 0 | 0 | 0 |
| DEMO-002 · Sam | 2 | 0 | 0 | 2 | 1 | 1 | 0 | 0 |
| DEMO-003 · Robin | 2 | 0 | 0 | 2 | 1 | 0 | 1 | 1 |
| DEMO-004 · Jamie | 3 | 0 | 0 | 3 | 1 | 1 | 1 | 1 |
| DEMO-005 · Casey | 5 | 2 | 2 | 1 | 0 | 0 | 0 | 0 |
| DEMO-006 · Taylor | 2 | 0 | 0 | 2 | 0 | 0 | 0 | 1 |
| **Total: 6 active episodes** | **18** | **5** | **2** | **11** | **3** | **2** | **2** | **3** |

The action categories reconcile: 5 completed + 2 declined / not applicable + 11 outstanding = 18. The pending support arrangement and missing sections are visible separately; they do not generate extra action records or false confirmations.
