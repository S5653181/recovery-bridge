# Feature-to-requirement mapping

The implementation is intentionally limited to staff evaluation with synthetic ACTS referrals.

| Requirement | Implemented feature | Where / evidence |
| --- | --- | --- |
| A: ACTS referrals and planned discharge dates | Filtered ACTS referral list, explicit missing dates, discharge-date ordering | ACTS referral register |
| A: Outstanding, overdue and unassigned actions | Shared count functions; unresolved statuses explicitly defined | Overview and ACTS referral action plan; count tests |
| A: Awaiting responses and unconfirmed follow-up | Submitted referral count; Pending / Not recorded follow-up count | Overview; separate referral and follow-up entities |
| A: Search and filters | Search, site, ward, worker, inclusive discharge range, action status and attention filter | Overview; filter tests |
| A: Labelled, reconciling counts | Counts derive from the exact ACTS referral collection displayed | Domain tests plus rendered-count assertions |
| B: Coherent workspace | ACTS referral metadata, five section tabs and next-step prompt | ACTS referral workspace |
| B: Create and edit ACTS referrals | Fictional name, generated identifier, location, practitioner and discharge date | New ACTS referral / Edit referral; interaction and storage tests |
| C: Goals and preferences | Multiple goal entities; short context, resources and review fields | Recovery support |
| C: Separate support stages | Independent discussion, offer, decision and arrangement values | Recovery support forms and cards |
| C: Barriers and agreed actions | Structured type/status with short context and agreed action | Recovery support; barrier review status |
| D: Action lifecycle | Add, edit, assign, date, status, notes, Complete and Reopen | Discharge actions; timestamp tests |
| D: Configurable checklist | Select relevant items, initial owner/date; editable descriptions and purpose; new items | Example checklist / Demo settings |
| D: No clinical clearance claim | Coordination-only progress language and explicit clinical responsibility text | ACTS referral notice, overview footer and summary |
| E: Referral detail | Service, purpose, consent, date, practitioner, status, response and next action | Referral form |
| E: Separate confirmation | Follow-up entity with optional referral link; confirmation details validated | Follow-up form; validation tests |
| E: Demonstration directory | Four clearly fictional organisations and ACTS referral-selection workflow | Service directory |
| F: Generated editable handover | Record-derived preview, separate saved draft and stale-source check | Handover; interaction tests |
| F: Print / export and visible missingness | Browser print / PDF, text export, explicit unknowns | Handover; generated-text and print-handler tests |
| Behavioural design | Ownership, next steps, defaults, checklist, progress, contextual validation | Separate behavioural rationale |
| Interface and accessibility | Semantic controls, labels, status text, focus styles, responsive rules, native dialog, keyboard tabs | Accessibility verification report; browser checks pending |
| Data and persistence | Versioned browser storage; structured entities; storage failure feedback | `core.mjs`; round-trip and refresh-handler tests |
| Varied synthetic scenarios | Completed planning, incomplete context, unanswered referral, barriers, declined support, proposed follow-up | ACTS-DEMO-001 through ACTS-DEMO-006 |
| Demonstration role switching | Practitioner view, coordinator context and team-lead workload | Staff selector; no authentication claim |
| Dataset reset | Explicit confirmation restores all six scenarios and configuration | Demo settings; reset-handler test |
| Evaluation support | Scenario tasks, measures, instruments and interview guide | Separate staff evaluation guide |

## Data model

| Entity | Fields and relationship |
| --- | --- |
| State | schema 2, reference date, selected demonstration account, staff, templates, ACTS referrals |
| ACTS referral | stable id, fictional alias, receivedDate/time, route, reasonForReferral, journeyStatus, site, ward, practitioner, planned discharge, goals, preferences, support, barriers, actions, onward referrals, follow-up, treatment events, recorded updates, handover draft |
| Treatment event | id, type, title, event date/time, status, owner, method/location, optional duration and recorded AUDIT score, notes, outcome, nextAction, recordedAt, updatedAt |
| Record update | id, descriptive change, save timestamp, demonstration account; displayed separately from treatment contacts |
| Onward referral | id, fictional service, purpose, consent, referral date, practitioner, status, response/outcome, next action |
| Follow-up arrangement | id, service, optional onwardReferralId, proposed/confirmed date/time, method, details, owner, status, next action |
| Recovery goal / support / barrier | Separate person-centred context and independent decisions within the ACTS referral |
| Action | id, description, owner or blank, due date, status, notes, rationale, completedAt |
| Handover draft | editable text, generating source text, saved timestamp; separate from source data |
| Demonstration staff / checklist | fictional staff identifiers and reusable selected planning prompts; no authentication |

No NHS number, hospital number, real patient details, prescribing instructions or live endpoints are collected. One ACTS referral represents one journey, not a hospital admission. Discharge and ACTS closure are separate events.

## Referral journey additions

| Requested behaviour | Implementation / evidence |
| --- | --- |
| Centre the app on referrals | ACTS referral register, referral creation/metadata, journey status, default treatment workspace |
| Follow the full ACTS journey | Explicit dated event types from triage/assessment through treatment, discharge, ACTS follow-up and closure |
| Summary and detailed event timeline | Same ordered event collection in two views; detail includes context, outcome, next action and save timestamps |
| Show changes across coordination work | Plan changes recorded as labelled updates, separate from clinical event dates |
| Retain completed journeys | All/Closed/Not accepted filters; closing does not finish actions |
| Avoid invented history | Legacy migration preserves plans and leaves unknown referral dates/history not recorded |
| Accurate counts and handover | Shared domain rules, independently hand-counted fixtures, timeline and migration tests |

## Baseline reconciliation

Reference date: 12 October 2026. Default filter: All open journeys. Choose All journeys to include Casey.

| ACTS referral | Status | Actions | Completed | Declined / N/A | Outstanding | Overdue | Unassigned | Onward response | Follow-up to confirm |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| ACTS-DEMO-001 Alex | Follow-up | 4 | 4 | 0 | 0 | 0 | 0 | 0 | 0 |
| ACTS-DEMO-002 Sam | Awaiting assessment | 2 | 0 | 0 | 2 | 1 | 1 | 0 | 0 |
| ACTS-DEMO-003 Robin | Active treatment | 2 | 0 | 0 | 2 | 1 | 0 | 1 | 1 |
| ACTS-DEMO-004 Jamie | Active treatment | 3 | 0 | 0 | 3 | 1 | 1 | 1 | 1 |
| ACTS-DEMO-005 Casey | Closed | 5 | 2 | 3 | 0 | 0 | 0 | 0 | 0 |
| ACTS-DEMO-006 Taylor | Active treatment | 2 | 0 | 0 | 2 | 0 | 0 | 0 | 1 |
| **All journeys: 6** | **5 open** | **18** | **6** | **3** | **9** | **3** | **2** | **2** | **3** |
| **Default open view: 5** | **1 assessment to record** | **13** | **4** | **0** | **9** | **3** | **2** | **2** | **3** |

6 completed + 3 declined/not applicable + 9 outstanding = 18 actions across all journeys. Missing sections and planned treatment events are separate from action counts.
