# Behavioural design rationale

Target behaviour: staff record a person-centred recovery plan, allocate and update coordination actions, verify referral and follow-up progress, and review a clear handover.

This is a design hypothesis for staff behaviour, not evidence of an effect on staff performance or recovery outcomes. The mapping below is an applied interpretation of Persuasive Systems Design (PSD) and COM-B, to be tested through staff evaluation. It is not a completed behavioural diagnosis of the service.

COM-B considers capability, opportunity and motivation in relation to behaviour. PSD offers design principles including reduction, tunnelling, tailoring, self-monitoring, reminders and suggestions. The prototype applies selected principles with low-pressure prompts rather than rewards or competitive feedback. [1,2]

| Implemented feature | Intended staff behaviour | PSD interpretation | COM-B hypothesis | Evaluation question |
| --- | --- | --- | --- | --- |
| One ACTS referral workspace with four sections | Find context and update the plan without repeated navigation | Reduction; tunnelling through a recognisable workflow | Psychological capability: reduce memory demand; physical opportunity: convenient access | Where did you have to search or duplicate work? |
| Next useful step card | Review ownership gaps, overdue work, referral responses or confirmation details | Suggestion; contextual reminder | Psychological capability and reflective motivation: clarify the next action and its purpose | Was the prompt relevant, understandable and proportionate? |
| Relevant checklist selection and reusable items | Create a consistent action plan while excluding irrelevant items | Reduction; tailoring | Capability: recall planning domains; opportunity: reduce entry effort | Did useful defaults save effort or encourage inappropriate copying? |
| Visible owner and due date; Unassigned state | Allocate responsibility and coordinate with colleagues | Reduction of ambiguity; social support interpretation, without comparison or pressure | Social opportunity: agree responsibility and communication | Could you tell who would take the next step? |
| Counts and labelled action progress | Review unresolved coordination work | Self-monitoring of the recorded plan | Reflective motivation: see the remaining work; capability: interpret status | Did the progress view imply clinical readiness? |
| Separate discussion, offer, decision and arrangement | Preserve what was discussed and what the person agreed to | Reduction through structured distinctions | Psychological capability: avoid conflating stages | Could you distinguish an offer from an arranged service? |
| Separate referral and follow-up records | Record submission, acceptance and confirmation accurately | Reduction; suggestion through validation | Capability: recognise different events; opportunity: capture them at the point of work | Did you assume a submitted referral meant an appointment existed? |
| Brief checklist explanations | Understand the purpose of coordination actions | Suggestion; credibility through transparent reasoning | Reflective motivation: connect the task with a clear practical purpose | Did the explanation help, or add clutter? |
| Generated handover with explicit missingness | Review and share an accurate account without retyping | Reduction; self-monitoring | Capability and physical opportunity: lower transcription effort and expose gaps | What did you correct or check before export? |
| Declined and not applicable remain visible | Respect choices and avoid irrelevant work | Tailoring; transparent system behaviour | Capability: recognise different reasons for an unfinished plan | Did status language feel respectful and useful? |

No behavioural mechanism is presumed proven by this mapping. Verify actual barriers through interviews: lack of knowledge, time pressure, fragmented systems, unclear responsibilities or competing demands may require different interventions. Digital prompts alone cannot resolve staffing or external-service constraints.

## Guardrails

Prompts appear in context and explain why the information matters. There are no pop-up reminder streams, scores, badges, streaks, leaderboards or claims of improved recovery. Missing fields remain visible rather than being auto-completed. Staff can leave sections empty, mark them not applicable or record declined support. Defaults are proposals that staff review.

The progress measure reports action completion only. Declined and not applicable actions are excluded from outstanding work but remain distinct from Completed. Completion never labels the person clinically ready for discharge.

The team-lead workload view supports allocation, not performance ranking. Role views do not impose permissions or represent authenticated users.

## Sources

1. Oinas-Kukkonen, H. & Harjumaa, M. (2009). *Persuasive Systems Design: Key Issues, Process Model, and System Features*. Communications of the Association for Information Systems, 24, Article 28. [Publisher record](https://aisel.aisnet.org/cais/vol24/iss1/28/).
2. Michie, S., van Stralen, M. M. & West, R. (2011). *The behaviour change wheel: a new method for characterising and designing behaviour change interventions*. Implementation Science, 6, 42. [Open-access article](https://pmc.ncbi.nlm.nih.gov/articles/PMC3096582/).

Sources checked 12 October 2026. The feature mapping is the prototype designer's interpretation and should be refined with staff findings.

## ACTS referral journey design

| Feature | Intended staff behaviour | COM-B | Persuasive Systems Design | Evaluation question |
| --- | --- | --- | --- | --- |
| Referral-centred default workspace | Review the ongoing ACTS journey, including post-discharge contact | Psychological capability; physical opportunity | Reduction; tunnelling | Can staff distinguish ACTS referral, admission/discharge and onward referral? |
| Summary/detail timeline with shared data | Orient quickly, then inspect event context when needed | Psychological capability | Reduction; tailoring | Can staff reconstruct what happened and what is still planned without losing context? |
| Named event responsibility and next action | Identify who should act next | Social opportunity | Cooperation; social facilitation | Is ownership clear, including unassigned events? |
| Evidence-based milestone labels | Distinguish recorded activity from planned or missing history | Psychological capability; reflective motivation | Self-monitoring; feedback | Do staff understand that milestones are documentation, not clinical clearance? |
| Date validation and missing-history prompts | Record events accurately rather than infer them | Psychological capability | Reminders; error prevention within reduction | Can staff correct dates without unnecessary interruption? |
| Visible record updates with separate save times | Understand changes to coordination plans without mistaking them for clinical contacts | Psychological capability; social opportunity | Transparency; feedback | Can staff tell the event date from the recording time? |

These mappings are hypotheses for evaluation, not evidence of behaviour change or recovery benefit. No gamification or clinical effectiveness claim is added.
