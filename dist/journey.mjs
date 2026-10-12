export const JOURNEY_STATUSES=['Awaiting assessment','Active treatment','Follow-up','Closed','Not accepted'];
export const EVENT_TYPES=['Triage','Initial contact','Initial assessment','Full assessment','Review','Detox started','Detox ended','Recovery planning','Support intervention','Onward referral','Discharge planning','Discharged','Follow-up contact','Journey closed','Other event'];
export const EVENT_STATUSES=['Not recorded','Planned','Completed','Not completed','Declined','Not applicable'];
export const isOpen=r=>!['Closed','Not accepted'].includes(r.journeyStatus);
export const assessed=r=>r.events.some(e=>['Initial assessment','Full assessment'].includes(e.type)&&e.status==='Completed');
const id=()=>globalThis.crypto?.randomUUID?.()||Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
export function validDate(d){return /^\d{4}-\d{2}-\d{2}$/.test(d||'')&&!Number.isNaN(Date.parse(d+'T12:00:00Z'))&&new Date(d+'T12:00:00Z').toISOString().slice(0,10)===d;}
export function validateEvent(e,r,today){
 if(!EVENT_TYPES.includes(e.type)||!EVENT_STATUSES.includes(e.status))return 'Choose a recognised event type and status.';
 if(!e.title?.trim())return 'Enter a short event title.';
 if(e.date&&!validDate(e.date))return 'Enter a valid event date.';
 if(['Completed','Planned','Not completed'].includes(e.status)&&!e.date)return 'Record a date for a completed, planned or not completed event.';
 if(e.date&&r.receivedDate&&e.date<r.receivedDate)return 'The event date cannot be before this ACTS referral was received.';
 if(['Completed','Not completed'].includes(e.status)&&e.date>today)return 'This event is after the demonstration date. Record it as Planned or update the reference date.';
 if(e.time&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(e.time))return 'Enter a valid event time.';
 if(e.duration!==''&&e.duration!=null&&(!Number.isInteger(Number(e.duration))||Number(e.duration)<0||Number(e.duration)>720))return 'Contact duration must be a whole number from 0 to 720 minutes.';
 if(e.auditScore!==''&&e.auditScore!=null&&(!Number.isInteger(Number(e.auditScore))||Number(e.auditScore)<0||Number(e.auditScore)>40))return 'An AUDIT score must be a whole number from 0 to 40.';
 return '';
}
export function validateACTSReferral(r,today){
 if(!r.alias?.trim())return 'Enter a fictional patient or scenario name.';
 if(!JOURNEY_STATUSES.includes(r.journeyStatus))return 'Choose an ACTS journey status.';
 if(r.receivedDate&&(!validDate(r.receivedDate)||r.receivedDate>today))return 'The referral received date must be valid and no later than the demonstration date.';
 if(r.receivedDate&&r.events?.some(e=>e.date&&e.date<r.receivedDate))return 'An existing event is earlier than this referral date. Review the event dates first.';
 if(r.receivedTime&&!r.receivedDate)return 'Record the referral date before adding its time.';
 return '';
}
function londonDateTime(iso){const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/London',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date(iso));const p=Object.fromEntries(parts.map(v=>[v.type,v.value]));return {date:p.year+'-'+p.month+'-'+p.day,time:p.hour+':'+p.minute};}
export function timeline(r,{scope='',type='',status='',order='oldest'}={}){
 const receipt={id:'receipt',type:'Referral received',title:'Referral received by ACTS',date:r.receivedDate||'',time:r.receivedTime||'',status:r.receivedDate?'Completed':'Not recorded',owner:r.practitioner,notes:r.reasonForReferral||'',outcome:r.route||'',source:'Referral record'};
 const events=[receipt,...r.events.map(e=>({...e,source:'Treatment event'})),...(r.activityEvents||[]).map(e=>({...e,source:'Record update',type:'Record update',...londonDateTime(e.recordedAt),status:'Recorded'}))];
 return events.filter(e=>(!scope||(scope==='treatment'?e.source!=='Record update':e.source==='Record update'))&&(!type||e.type===type)&&(!status||e.status===status)).sort((a,b)=>{
  if(!a.date||!b.date)return a.date?-1:b.date?1:a.id.localeCompare(b.id);
  const result=(a.date+'T'+(a.time||'00:00')).localeCompare(b.date+'T'+(b.time||'00:00'))||a.id.localeCompare(b.id);return order==='newest'?-result:result;
 });
}
export function milestones(r){
 const groups=[['Referral',['Referral received']],['Assessment',['Initial assessment','Full assessment']],['Treatment & support',['Detox started','Detox ended','Review','Recovery planning','Support intervention']],['Discharge',['Discharged']],['Follow-up',['Follow-up contact']]];
 const events=timeline(r,{scope:'treatment'});
 return groups.map(([label,types])=>{const list=events.filter(e=>types.includes(e.type)),done=list.filter(e=>e.status==='Completed'),planned=list.filter(e=>e.status==='Planned');return {label,status:done.length?'Recorded':planned.length?'Planned':'Not recorded',date:(done.at(-1)||planned[0])?.date||''};});
}
export function recordChanges(before,after,actor,now=new Date().toISOString()){
 const changes=[];
 for(const [key,label,title] of [['goals','Recovery goal','text'],['supports','Support decision','option'],['barriers','Practical barrier','type'],['actions','Action','description'],['onwardReferrals','Onward referral','service'],['followups','Follow-up arrangement','service']]){
  for(const item of after[key]){const old=before[key].find(x=>x.id===item.id);if(JSON.stringify(old)===JSON.stringify(item))continue;
   const detail=key==='supports'?`Discussion: ${item.discussed}; offer: ${item.offered}; decision: ${item.decision}; arrangement: ${item.arrangement}.`:key==='actions'?`Status: ${item.status}; owner: ${item.owner||'Unassigned'}; due: ${item.due||'Not recorded'}.`:key==='onwardReferrals'?`Status: ${item.status}; referral date: ${item.date||'Not recorded'}; consent: ${item.consent}.`:key==='followups'?`Status: ${item.status}; date: ${item.date||'Not recorded'}; ${item.method||'Method not recorded'}.`:key==='barriers'?`Status: ${item.status}; agreed action: ${item.action||'Not recorded'}.`:item.text;
   changes.push({title:`${label} ${old?'updated':'added'}: ${item[title]}`,notes:detail+[item.notes,item.outcome,item.next,item.details].filter(Boolean).map(x=>' '+x).join('')});
  }
 }
 const keys=['alias','site','ward','practitioner','discharge','receivedDate','receivedTime','route','reasonForReferral','journeyStatus','preferences','resources','review','barrierReview'];
 const changed=keys.filter(k=>before[k]!==after[k]);if(changed.length)changes.push({title:'Referral plan details updated',notes:changed.map(k=>`${({alias:'Fictional name',site:'Site',ward:'Ward',practitioner:'Assigned practitioner',discharge:'Planned discharge',receivedDate:'Referral received date',receivedTime:'Received time',route:'Referral route',reasonForReferral:'Reason for referral',journeyStatus:'Journey status',preferences:'Preferences',resources:'Resources provided',review:'Planned review',barrierReview:'Barrier review'})[k]}: ${after[k]||'Not recorded'}`).join('; ')});
 after.activityEvents.push(...changes.map(c=>({id:'change-'+id(),...c,owner:actor,status:'Recorded',recordedAt:now})));
}
