# Recovery Bridge: ACTS staff user guide

Version 2.0 · Fictional scenarios only. Do not enter real patient information.

## Open the referral register

The main record is a referral into the Addictions Team (ACTS). Each referral follows one fictional person's treatment journey, including ACTS follow-up after hospital discharge. A subsequent ACTS referral can be created as a separate journey; the prototype has no cross-referral patient index.

Search by referral identifier, fictional name, reason, goal, action or treatment event. Filter by journey status, site, ward, assigned practitioner, planned discharge date and action status. The default view shows open journeys: Awaiting assessment, Active treatment and Follow-up. Choose **All journeys** or **Closed** to retrieve earlier journeys. **My referrals** filters by the selected demonstration practitioner; it is not authentication.

Select an attention count to filter the same records used to calculate the counts. The ACTS referrals card clears the attention filter. All demonstration staff views can edit synthetic records.

## Create or edit an ACTS referral

Choose **New ACTS referral**. Record the fictional patient label, received date and optional time, referral route, reason, assigned ACTS practitioner, location and journey status. Add planned discharge when known. Dates can remain missing and are labelled Not recorded. **Edit referral** updates these fields. Journey status is staff controlled; closing it does not complete actions or prove clinical clearance.

## Record the treatment journey

The **Treatment journey** tab opens by default. Its milestone cards summarise recorded evidence for referral, assessment, treatment/support, discharge and follow-up. They are not clinical progress scores. A planned assessment remains Planned until its actual outcome is recorded.

Choose **Add treatment event** for triage, initial contact, initial/full assessment, review, detox start/end, recovery planning, support intervention, onward referral activity, discharge planning/discharge, follow-up, journey closure or another event. Enter a brief title, event date, optional time, status, practitioner, method/location, notes, outcome and next action. Contact duration and a previously assessed AUDIT score are optional; the app generates no interpretation or treatment recommendation.

A Completed, Planned or Not completed event requires a date. Completed and Not completed events cannot be after the demonstration date or before a known ACTS referral date. Planned events may have future dates. A passed planned date is flagged for review and is never automatically completed.

**Summary view** shows the full chronological list with brief context, status and practitioner. **Detailed view** shows contact details, notes, outcome, next action and recording timestamps. Both views use the same events. Filter by event type/status and select earliest or latest first. Undated entries remain visible at the end.

Changes to goals, support, barriers, actions, onward referrals, follow-up or referral metadata also appear as **Record updates**. These show the save time and demonstration account, not the clinical occurrence date or an authenticated author. Select Treatment events to focus on contacts and milestones. Editing a treatment event updates that event; this is not an immutable audit log.

## Recovery and discharge coordination

Under **Recovery support**, record the person's goals, preferences, resources, review and relevant barriers. Support discussion, offer, decision and arrangement are independent: Discussed, Offered, Accepted and Arranged are different stages. Keep declined decisions visible.

Under **Discharge actions**, add tasks or choose relevant example checklist items. Assign owners and due dates. Complete records a timestamp; Reopen restores Pending and clears its current completion timestamp. Missing owners/dates remain visible. Declined and Not applicable are distinct from Completed.

Under **Onward support**, track referrals ACTS makes to other fictional services. These are separate from the original ACTS referral. Record preparation, submission, acceptance, consent, response and next action. Submission does not demonstrate engagement. Record follow-up separately; confirmation requires date, method, details and practitioner. No referral is transmitted.

## Review and share the handover

**Handover** generates an editable preview with the ACTS referral details and dated treatment journey, recovery goals/preferences, agreed support, actions/owners, onward referral status, follow-up and unresolved barriers. Missing information stays visible. Save edited draft before leaving. Print/save as PDF or Export text uses the preview. When source details change, the preview refreshes rather than reusing a stale draft. Nothing is sent to a service.

## Count definitions

| Label | Definition |
| --- | --- |
| ACTS referrals | Records matching all current filters; the scope also states how many are open |
| Assessment to record | Open journeys without a Completed initial or full assessment event |
| Outstanding | Action status Not recorded, Pending or In progress |
| Overdue | Outstanding action with a due date before the demonstration date |
| Unassigned | Outstanding action without an owner |
| Onward response pending | Onward referral status Submitted |
| Follow-up to confirm | Follow-up arrangement status Pending or Not recorded |

Empty sections do not create fabricated tasks or pending referrals. The workspace and handover explicitly show the gaps.

## Saving and keyboard use

Forms save using their Save button. Successful feedback follows the storage write. Changes persist across refreshes in this browser only. Other computers have separate data. One tab per participant is recommended.

Tab and Shift+Tab move through controls. Enter/Space activate buttons. Arrow keys, Home and End navigate the five workspace tabs. Native modal forms support Escape, focus trapping and return focus. A skip link goes to main content.

Demo settings provides reusable checklist configuration, the reference date, JSON export and a confirmed reset. Saved version 1 plans are retained as ACTS referrals; earlier clinical history is not invented. Reset only if you want the new synthetic journey examples and have retained any edits you need.
