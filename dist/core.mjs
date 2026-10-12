export const ACTION_STATUSES=['Not recorded','Pending','In progress','Completed','Declined','Not applicable'];
export const REFERRAL_STATUSES=['Not recorded','Preparation','Submitted','Accepted','Declined','Not applicable'];
export const FOLLOW_STATUSES=['Not recorded','Pending','Confirmed','Completed','Declined','Not applicable'];
export const TERMINAL=['Completed','Declined','Not applicable'];
export const unresolved=a=>!TERMINAL.includes(a.status);
export const overdue=(a,today)=>unresolved(a)&&!!a.due&&a.due<today;
export const waiting=r=>r.status==='Submitted';
export const followWaiting=f=>['Not recorded','Pending'].includes(f.status);
export const uid=prefix=>`${prefix}-${globalThis.crypto?.randomUUID?.()||Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8)}`;
export const fmt=d=>d?new Date(d+'T12:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}):'Not recorded';
export const stamp=s=>s?new Date(s).toLocaleString('en-GB',{dateStyle:'medium',timeStyle:'short',timeZone:'Europe/London'}):'Not recorded';
export const staffName=(id,staff)=>staff.find(s=>s.id===id)?.name||'Unassigned';
export function counts(episodes,today){
 const actions=episodes.flatMap(e=>e.actions),referrals=episodes.flatMap(e=>e.referrals),follow=episodes.flatMap(e=>e.followups);
 return {episodes:episodes.length,outstanding:actions.filter(unresolved).length,overdue:actions.filter(a=>overdue(a,today)).length,unassigned:actions.filter(a=>unresolved(a)&&!a.owner).length,referrals:referrals.filter(waiting).length,followups:follow.filter(followWaiting).length};
}
export function filterEpisodes(episodes,f,today){
 return episodes.filter(e=>e.state==='Active').filter(e=>{
 const query=(f.search||'').trim().toLowerCase();
 const hay=[e.id,e.alias,e.site,e.ward,e.preferences,...e.goals.map(g=>g.text),...e.actions.map(a=>a.description)].join(' ').toLowerCase();
 return (!query||hay.includes(query))&&(!f.site||e.site===f.site)&&(!f.ward||e.ward===f.ward)&&(!f.worker||e.practitioner===f.worker)&&(!f.from||(e.discharge&&e.discharge>=f.from))&&(!f.to||(e.discharge&&e.discharge<=f.to))&&(!f.status||e.actions.some(a=>a.status===f.status))&&(!f.attention||({outstanding:e.actions.some(unresolved),overdue:e.actions.some(a=>overdue(a,today)),unassigned:e.actions.some(a=>unresolved(a)&&!a.owner),referrals:e.referrals.some(waiting),followups:e.followups.some(followWaiting)}[f.attention]));
 }).sort((a,b)=>(a.discharge||'9999').localeCompare(b.discharge||'9999')||a.id.localeCompare(b.id));
}
export function changeActionStatus(action,status,now=new Date().toISOString()){
 if(!ACTION_STATUSES.includes(status))throw new Error('Unknown action status');
 return {...action,status,completedAt:status==='Completed'?(action.completedAt||now):null};
}
export function nextStep(e,today){
 const unowned=e.actions.find(a=>unresolved(a)&&!a.owner);
 if(unowned)return {tab:'actions',title:'Assign an action owner',detail:unowned.description,why:'A named owner makes the next step clear to colleagues.'};
 const late=e.actions.find(a=>overdue(a,today));
 if(late)return {tab:'actions',title:'Review an overdue action',detail:late.description,why:'Check progress or agree a new date with the responsible colleague.'};
 if(e.referrals.some(waiting))return {tab:'referrals',title:'Check a referral response',detail:e.referrals.find(waiting).service,why:'Submission does not confirm acceptance or engagement.'};
 if(e.followups.some(followWaiting))return {tab:'referrals',title:'Confirm follow-up arrangements',detail:e.followups.find(followWaiting).service,why:'Record who will make contact, when and how.'};
 if(!e.goals.length||!e.preferences||e.barrierReview==='Not recorded')return {tab:'recovery',title:'Review recovery priorities',detail:'Some recovery context has not been recorded.',why:'Planning starts with what matters to the person.'};
 if(e.actions.some(unresolved))return {tab:'actions',title:'Review the remaining actions',detail:e.actions.find(unresolved).description,why:'Keep the plan current before sharing a handover.'};
 return {tab:'handover',title:'Review the handover',detail:'Check the recorded plan and any missing information.',why:'This is coordination feedback, not a clinical discharge decision.'};
}
export function newEpisode(alias){return {id:uid('DEMO'),alias,site:'',ward:'',practitioner:'',discharge:'',state:'Active',goals:[],preferences:'',barrierReview:'Not recorded',barriers:[],supports:[],resources:'',review:'',actions:[],referrals:[],followups:[],handoverDraft:null,handoverSource:null,handoverSavedAt:null,updatedAt:new Date().toISOString()};}
export function summary(e,staff){
 const val=s=>s?.trim()||'Not recorded';
 const list=(arr,fn,empty='Not recorded')=>arr.length?arr.map(fn).join('\n'):empty;
 const outstanding=e.actions.filter(unresolved),agreed=e.supports.filter(s=>s.decision==='Accepted');
 const confirmed=e.followups.filter(f=>f.status==='Confirmed');
 const missing=[];
 if(!e.discharge)missing.push('Planned discharge date');if(!e.practitioner)missing.push('Assigned practitioner');if(!e.goals.length)missing.push('Recovery goals');if(!e.preferences)missing.push('Preferences');if(!e.review)missing.push('Planned recovery review');if(!e.supports.length)missing.push('Support discussion');if(!e.actions.length)missing.push('Discharge actions');if(!e.referrals.length)missing.push('Referrals (no records; this does not mean none needed)');if(!e.followups.length)missing.push('Follow-up (no records; this does not mean none needed)');
 return `RECOVERY BRIDGE · FICTIONAL HANDOVER\nResearch prototype — synthetic scenario only\n\n${e.id} · ${e.alias}\nSite: ${val(e.site)} | Ward: ${val(e.ward)}\nPractitioner: ${staffName(e.practitioner,staff)}\nPlanned discharge: ${fmt(e.discharge)}\n\nRECOVERY GOALS & PREFERENCES\n${list(e.goals,g=>'- '+g.text)}\nPreferences: ${val(e.preferences)}\nPlanned review: ${fmt(e.review)}\nResources provided: ${val(e.resources)}\n\nSUPPORT AGREED\n${list(agreed,s=>`- ${s.option}: accepted; arrangement ${s.arrangement.toLowerCase()}. ${val(s.notes)}`,'No accepted support recorded.')}\n\nOTHER SUPPORT DISCUSSIONS\n${list(e.supports.filter(s=>s.decision!=='Accepted'),s=>`- ${s.option}: discussion ${s.discussed.toLowerCase()}; offer ${s.offered.toLowerCase()}; decision ${s.decision.toLowerCase()}; arrangement ${s.arrangement.toLowerCase()}. ${val(s.notes)}`)}\n\nOUTSTANDING ACTIONS & OWNERS\n${list(outstanding,a=>`- ${a.description} | ${a.status} | Owner: ${staffName(a.owner,staff)} | Due: ${fmt(a.due)} | Notes: ${val(a.notes)}`,e.actions.length?'No outstanding actions recorded.':'No actions recorded — planning completeness is unknown.')}\n\nCOMPLETED / DECLINED / NOT APPLICABLE ACTIONS\n${list(e.actions.filter(a=>!unresolved(a)),a=>`- ${a.description}: ${a.status} | Owner: ${staffName(a.owner,staff)}${a.status==='Completed'?' | Completed: '+stamp(a.completedAt):''} | Notes: ${val(a.notes)}`,'None recorded.')}\n\nREFERRALS\n${list(e.referrals,r=>`- ${r.service}: ${r.status} | Purpose: ${val(r.purpose)} | Consent: ${r.consent} | Referral date: ${fmt(r.date)} | Owner: ${staffName(r.owner,staff)} | Outcome: ${val(r.outcome)} | Next action: ${val(r.next)}`)}\n\nCONFIRMED FOLLOW-UP\n${list(confirmed,f=>`- ${f.service} | ${fmt(f.date)}${f.time?' at '+f.time:''} | ${val(f.method)} | Details: ${val(f.details)} | Owner: ${staffName(f.owner,staff)}`,'No confirmed follow-up recorded.')}\n\nOTHER FOLLOW-UP\n${list(e.followups.filter(f=>f.status!=='Confirmed'),f=>`- ${f.service}: ${f.status} | Proposed date: ${fmt(f.date)}${f.time?' at '+f.time:''} | ${val(f.method)} | Owner: ${staffName(f.owner,staff)} | Details: ${val(f.details)} | Next action: ${val(f.next)}`,'None recorded.')}\n\nUNRESOLVED PRACTICAL BARRIERS\nBarrier review: ${e.barrierReview}\n${list(e.barriers.filter(b=>!['Resolved','Not applicable'].includes(b.status)),b=>`- ${b.type}: ${val(b.context)} | ${b.status} | Agreed action: ${val(b.action)}`,e.barrierReview==='Not recorded'?'Barriers have not been reviewed.':'No unresolved barriers recorded.')}\n\nMISSING INFORMATION TO REVIEW\n${missing.length?missing.map(x=>'- '+x).join('\n'):'No missing items in the basic record check. Review all detail before sharing.'}\n\nStaff retain responsibility for clinical decisions. Checklist completion is not evidence of clinical fitness for discharge.`;
}
export function validateReferral(r){
 if(!r.service?.trim())return 'Enter a fictional service or organisation.';
 if(['Submitted','Accepted'].includes(r.status)&&!r.date)return 'Record the referral date before marking it submitted or accepted.';
 if(['Submitted','Accepted'].includes(r.status)&&!['Agreed','Not applicable'].includes(r.consent))return 'Review consent: use Agreed or Not applicable before recording submission.';
 return '';
}
export function validateFollow(f){
 if(!f.service?.trim())return 'Enter a fictional service or organisation.';
 if(['Confirmed','Completed'].includes(f.status)&&(!f.date||!f.method?.trim()||!f.details?.trim()||!f.owner))return 'Confirmed or completed follow-up needs a date, method, details and responsible practitioner.';
 return '';
}
export function saveState(storage,state){storage.setItem('recovery-bridge-v1',JSON.stringify(state));}
export function loadState(storage,seed){const raw=storage.getItem('recovery-bridge-v1');if(!raw)return structuredClone(seed);const state=JSON.parse(raw);if(state.schema!==1||!Array.isArray(state.episodes)||!Array.isArray(state.staff)||!Array.isArray(state.templates)||!state.today||!state.staff.length||state.episodes.some(e=>!e.id||!['goals','barriers','supports','actions','referrals','followups'].every(k=>Array.isArray(e[k]))))throw new Error('The saved demonstration data could not be read.');return state;}
