# Recovery Bridge: staff evaluation guide

Research prototype · Fictional scenarios only · Version 2.0

## Aim and boundaries

Evaluate whether inpatient alcohol care staff can use the prototype to document recovery priorities, coordinate actions, distinguish referral and follow-up states, and prepare a clear handover. Assess usability, perceived acceptability, appropriateness and feasibility. Do not infer clinical effectiveness, improved recovery or real discharge safety from prototype performance.

This is a proposed study procedure, not a report of completed evaluation. No participant data or results have been collected.

## Participants and session plan

Recruit staff who carry out or coordinate inpatient alcohol recovery and discharge planning. Include nurses/practitioners with varied digital confidence and, where relevant, coordinators or leads. Agree the dissertation's sampling, approvals, consent, recording and data handling with the supervisor and service before recruitment. Participation should be voluntary; individual performance should not be reported to line managers.

A practical formative round could involve 5–8 staff, followed by revision and a second small round if time permits. This is a planning assumption, not a powered effectiveness study. A purposive sample and role balance matter more than a fixed target. Record relevant work experience and digital confidence without collecting unnecessary identifiers.

Allow approximately 50–60 minutes: 5 minutes introduction, 30–35 minutes tasks, 5–10 minutes questionnaires and 10 minutes interview. Pilot timing first. Use a separate local browser profile or reset between participants; do not expose a previous participant's edited scenarios.

Keep the reference date at **12 October 2026**. Use only the synthetic names and services. Do not ask staff to reconstruct a real patient case. Explain that the staff selector changes a demonstration view and that all views can edit.

Read a standard introduction: “We are testing the prototype, not your performance. Please work with these fictional scenarios and say what you are looking for or expecting. You can skip a task or stop. The tool does not make clinical decisions.”

Use task wording, not click instructions. Offer neutral encouragement; record any assistance rather than silently helping. Stop and discuss if a participant enters real information. Store research observations separately from the app, with participant codes rather than staff names.

## Scenario-based tasks and expected evidence

| Task given to the participant | Expected outcome / observer check | Important error to record |
| --- | --- | --- |
| 1. Find the Poole ACTS referral planned for discharge on the demo date whose community referral has not been answered. Explain what still needs checking. | Identifies Robin, ACTS-DEMO-003; submitted referral, unresolved response and pending follow-up identified. | Treats submission as successful engagement or confirmed follow-up. |
| 2. Open Sam's plan. Record the fictional goal “Build a daily routine”, a preference for written information, and a review for 13 Oct 2026. Allocate the unassigned goal discussion to Daniel and mark it completed. | Goal/preferences/review saved; owner Daniel; one completed action with timestamp; Sam's outstanding count falls from 2 to 1. | Missing information interpreted as already completed; wrong ACTS referral or owner. |
| 3. For Jamie, review the housing, transport and communication barriers. Assign the alternative contact-route action to Omar and record that the team will agree a written contact route. | Action owner and notes saved; barriers remain visible until actually resolved. | Marks housing resolved just because a referral was submitted. |
| 4. For Robin, the fictional service has now accepted the referral. Record the response, then arrange a confirmed telephone call on 16 Oct 2026 at 14:00, owned by Morgan; the named fictional worker will call using the agreed contact route. | Referral Accepted; follow-up separately Confirmed with date/time/method/details/owner; awaiting response falls by 1 and follow-up-to-confirm falls by 1. | Changes one status and assumes the other automatically updated. |
| 5. Review Casey's declined group support. Prepare a handover without converting declined support into completed or accepted support. | Declined decision and written information preference preserved; no invented group appointment. | Overrides the person's recorded choice or conflates Declined with Completed. |
| 6. Create a fictional ACTS referral for Jordan received on 12 Oct 2026 from the Ward team, assigned to Priya. During discharge planning, record Poole, Demo ward and planned discharge 18 Oct 2026 in the separate inpatient/discharge context. Select only the recovery-goals and follow-up items from the example checklist. | New record saved; two relevant Pending actions with reviewed owner/date; remaining sections explicitly missing. | Copies all irrelevant checklist items or invents referral details. |
| 7. Open Alex's handover. Check the dated discharge event, planned ACTS follow-up and confirmed community appointment; edit the preview to add “Reviewed in fictional team discussion”. Save, refresh the page, reopen Alex and export the handover as text. | Draft persists unchanged across refresh; planned ACTS contact and 16 Oct 14:00 appointment still accurate; exported text matches preview. | Loses edits, exports stale information, or assumes the plan proves clinical readiness. |
| 8. Using the keyboard only, open Taylor, review the proposed follow-up and navigate to the handover. Explain why the follow-up is still pending. | Core controls reachable; tab navigation and dialog behaviour usable; proposed date not interpreted as confirmed. | Cannot reach a control, loses focus, or calls the proposed appointment confirmed. |

Tasks 2–7 change records. Use the expected deltas within a task, not the untouched baseline totals. Reset before another participant; record the start state if task order is changed. Do not request Reset until the observer has retained any agreed synthetic evidence.

## Measures and observation sheet

Record participant code, role category, task, start/end time, outcome, errors, assistance and comments. Avoid patient information and unnecessary staff identifiers. Collect recordings only if consented and approved.

| Measure | Definition / recording rule |
| --- | --- |
| Task completion | Independent success, assisted success, partial completion or failure against the specified outcome |
| Completion rate | Independent successes ÷ tasks attempted; show numerator and denominator. Report assisted successes separately. |
| Time on task | Seconds from reading the task to the participant declaring completion or stopping; keep assisted and failed-task times labelled separately. |
| Data accuracy | Expected fields correctly saved ÷ expected fields checked; retain the field-level checklist so the denominator is reproducible. |
| Significant errors | Wrong ACTS referral, false confirmation, lost saved data, invented information, overriding declined support, or interpreting checklist completion as clinical clearance |
| Recoverable errors | Navigation mistakes, validation corrections, wrong initial filter or corrected owner/date |
| Assistance | Number and nature of prompts; record a neutral hint separately from direct click guidance |
| Interpretation | Can the participant explain Not recorded, Pending, Declined, Not applicable, submission, acceptance and confirmed follow-up? |
| Keyboard completion | Whether essential actions can be performed without pointer input; record focus location and any unreachable controls. |

Suggested observer columns: `Participant code | Task | Outcome | Seconds | Significant errors | Recoverable errors | Assistance | Correct fields / checked fields | Quote or observation | Proposed change`.

## Clarity, usefulness and workflow fit

Ask after relevant tasks: “What does this status mean?”, “What would you do next?”, “Who is responsible?”, “What is missing?”, and “Would you trust this summary enough to review it for handover?” Avoid leading questions such as whether the app improves recovery.

For brief study-specific ratings, use a consistent 1–5 agreement scale and label them as custom items, not validated instrument items:

- The next coordination action was clear.
- I could tell what support had been agreed and what remained unconfirmed.
- The information supported a useful handover.
- This workflow would fit the way our team coordinates discharge planning.

Do not combine these into a validated score. Report item-level distributions and comments.

## Questionnaires: proposed use and checks

SUS provides a general usability score; TAM informs perceived usefulness and ease of use; AIM, IAM and FIM address acceptability, fit and practicality respectively. Their scopes differ and should not be collapsed into a single “success” score. [1–3]

| Instrument / construct | Proposed administration | Scoring and use checks |
| --- | --- | --- |
| SUS | After participants have used the core workflow; use the authoritative 10 items and original response format. | For odd items subtract 1; for even items subtract the response from 5. Sum contributions and multiply by 2.5. Score range 0–100, not a percentage. Predefine a missing-response rule; do not silently impute. [1] |
| TAM: perceived usefulness and perceived ease of use | Use these constructs to structure interview questions; use an authorised scale if quantitative assessment is justified. | Verify selected scale wording, anchors and permissions. Record prototype-specific adaptations. Behavioural intention can be exploratory, but does not measure actual adoption. [2] |
| AIM / IAM / FIM | After use; obtain the final four-item versions from the authors' supplementary material. | Confirm authorised wording, anchors, attribution and intended referent before administration. Report each scale separately; if using a complete-item mean, retain the published response range and state this rule in the protocol. Report missingness instead of inventing a score. [3] |

Instrument wording is deliberately not reproduced here. The SUS chapter and original TAM publication have been located. The AIM/IAM/FIM article links to its final instrument in Additional file 3 and displays a CC BY 4.0 article licence; confirm the supplementary instrument's applicable terms before reproducing it. Do not presume that adaptation to this prototype preserves validation. The researcher should check current wording, permissions, licensing, translations and local requirements before distributing a questionnaire.

Avoid questionnaire burden: select measures that answer the dissertation questions, pilot their duration and agree the final protocol with the supervisor. A short prototype session offers **perceived** feasibility, not demonstrated feasibility under full ward workload.

## Short qualitative interview

1. Where did the prototype fit naturally into your work, and where would it interrupt it?
2. Which information was hardest to find or record?
3. Did any wording confuse discussion, offer, agreement, arrangement or engagement?
4. How would your team allocate and review actions in practice?
5. Did the next-step prompt help, feel unnecessary or create pressure?
6. What would you need to check before using a generated handover?
7. What technical, organisational or external-service barriers would limit use?
8. What is the single most useful change to make next?

## Analysis and revision

Summarise task completion and errors with counts and denominators; show time distributions with task outcomes. Use descriptive questionnaire results and uncertainty appropriate to the actual sample. Avoid hypothesis testing or clinical claims from a small formative convenience sample.

Analyse interview and observation notes systematically: familiarise, code, develop and refine themes, retain an audit trail and anonymised examples. Compare themes with usability observations and the behavioural hypotheses, including contradictory findings. Record researcher assumptions, especially if the researcher works with participants.

Prioritise revisions: first misleading statuses, wrong-record risks or data loss; then blocked tasks and focus problems; then workflow effort and visual clarity. Repeat relevant tasks after changes. Report version, participant mix, context, missing responses, assistance, sampling limitations and researcher relationship. No evaluation results should be reported until data are collected.

## Primary sources

1. Brooke, J. (1996). *SUS: A quick and dirty usability scale*. [Chapter hosted by AHRQ](https://digital.ahrq.gov/sites/default/files/docs/survey/systemusabilityscale%2528sus%2529_comp%255B1%255D.pdf).
2. Davis, F. D. (1989). *Perceived Usefulness, Perceived Ease of Use, and User Acceptance of Information Technology*. MIS Quarterly, 13(3), 319–340. [Publisher record](https://aisel.aisnet.org/misq/vol13/iss3/6/).
3. Weiner, B. J. et al. (2017). *Psychometric assessment of three newly developed implementation outcome measures*. Implementation Science, 12, 108. [Open-access article and supplementary instrument](https://link.springer.com/article/10.1186/s13012-017-0635-3).

Sources checked 12 October 2026. Exact instrument administration remains subject to the checks above.

## Additional referral journey tasks

| Scenario task | Expected evidence | Errors / observations |
| --- | --- | --- |
| In Sam's referral, identify why the initial contact did not happen and when assessment is planned. Record a fictional completed initial assessment on 12 Oct 2026 at 15:00 with Daniel, including an outcome and next action. | Distinguishes Not completed contact from Planned assessment; new dated event saved; assessment-to-record count reduces by one; journey status remains independently editable. | Treats a planned assessment as completed; records an impossible future completion; wrong journey. |
| Use Alex's summary timeline to explain the ACTS journey; switch to detailed view to inspect the recorded recovery planning. | Receipt, assessment, treatment start/end, discharge and planned ACTS follow-up reconstructed accurately. | Mistakes save timestamp for occurrence date or discharge for ACTS closure. |
| Find Casey's earlier journey and explain the support decision without changing it. | Retrieves Closed via filter; recognises declined support and separate discharge/closure events. | Assumes closed records were deleted; equates Declined with Completed. |
| Update Robin's onward referral response, then find that change in the timeline. | Record update appears with save time, independently of clinical contacts; no automatic successful engagement claim. | Interprets the update timestamp as when the service clinically accepted the referral. |
| Reopen a saved fictional referral after refreshing; verify a new event in both timeline views and handover. | Same stored date, status, owner, context and outcome preserved and shown. | Lost edits, missing chronology or inconsistent summary/detail. |

For journey tasks measure chronological interpretation accuracy, correct separation of ACTS/onward referrals, event date versus save time, planned versus completed, task time, assistance and errors. Interview: “Does one referral represent the way ACTS follows a person's journey?”, “Which events are missing?”, “When would you use summary or detail?”, “What would you expect to happen when someone is discharged or re-referred?”

Use these alongside the SUS, TAM and AIM/IAM/FIM plan above; verify original instrument wording and use requirements before administration. No instrument results or staff findings are fabricated.

Referral intake observation: confirm staff can create a referral without site, ward or planned discharge, and can find the optional context form later when inpatient/discharge coordination becomes relevant. Record any assumption that these details must be known before ACTS can accept a referral.
