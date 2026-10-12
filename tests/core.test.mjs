import test from 'node:test';
import assert from 'node:assert/strict';
import {SEED} from '../dist/data.mjs';
import {counts,filterEpisodes,overdue,unresolved,changeActionStatus,summary,newEpisode,validateReferral,validateFollow,saveState,loadState,nextStep} from '../dist/core.mjs';
const clone=()=>structuredClone(SEED);
test('Seed counts reconcile to a hand-counted scenario fixture',()=>{
 assert.deepEqual(counts(SEED.episodes,SEED.today),{episodes:6,outstanding:11,overdue:3,unassigned:2,referrals:2,followups:3});
 const fixture=[['DEMO-001',1,0,0,0,0],['DEMO-002',2,1,1,0,0],['DEMO-003',2,1,0,1,1],['DEMO-004',3,1,1,1,1],['DEMO-005',1,0,0,0,0],['DEMO-006',2,0,0,0,1]];
 for(const [id,outstanding,late,unassigned,referrals,followups] of fixture){assert.deepEqual(counts(SEED.episodes.filter(e=>e.id===id),SEED.today),{episodes:1,outstanding,overdue:late,unassigned,referrals,followups});}
});
test('Date, site, ward, worker, search, status and attention filters compose',()=>{
 assert.deepEqual(filterEpisodes(SEED.episodes,{site:'Poole',worker:'priya'},SEED.today).map(e=>e.id),['DEMO-001','DEMO-004']);
 assert.deepEqual(filterEpisodes(SEED.episodes,{ward:'Cedar ward',status:'Declined'},SEED.today).map(e=>e.id),['DEMO-005']);
 assert.deepEqual(filterEpisodes(SEED.episodes,{from:'2026-10-12',to:'2026-10-13'},SEED.today).map(e=>e.id),['DEMO-003','DEMO-001']);
 assert.deepEqual(filterEpisodes(SEED.episodes,{search:'structured community'},SEED.today).map(e=>e.id),['DEMO-003']);
 assert.equal(filterEpisodes(SEED.episodes,{attention:'unassigned'},SEED.today).length,2);
 assert.equal(filterEpisodes(SEED.episodes,{from:'2026-10-17'},SEED.today).length,0);
 assert.equal(counts(filterEpisodes(SEED.episodes,{site:'Bournemouth'},SEED.today),SEED.today).outstanding,5);
});
test('Missing fields are neither completed nor automatically overdue',()=>{
 const a={status:'Not recorded',due:'',owner:''};assert.equal(unresolved(a),true);assert.equal(overdue(a,SEED.today),false);
 for(const status of ['Completed','Declined','Not applicable']){assert.equal(unresolved({status}),false);assert.equal(overdue({status,due:'2000-01-01'},SEED.today),false);}
 assert.equal(overdue({status:'Pending',due:SEED.today},SEED.today),false);
 const empty=newEpisode('Blank fictional case');assert.match(summary(empty,SEED.staff),/No actions recorded — planning completeness is unknown/);assert.match(summary(empty,SEED.staff),/No confirmed follow-up recorded/);assert.match(summary(empty,SEED.staff),/Barriers have not been reviewed/);
});
test('Action completion and reopening update the timestamp and counts',()=>{
 const state=clone(),e=state.episodes[1],a=e.actions[0],time='2026-10-12T10:00:00Z';
 e.actions[0]=changeActionStatus(a,'Completed',time);assert.equal(e.actions[0].completedAt,time);assert.equal(counts(state.episodes,state.today).outstanding,10);assert.equal(counts(state.episodes,state.today).overdue,2);
 e.actions[0]=changeActionStatus(e.actions[0],'Completed','2026-10-13T10:00:00Z');assert.equal(e.actions[0].completedAt,time);
 e.actions[0]=changeActionStatus(e.actions[0],'Pending');assert.equal(e.actions[0].completedAt,null);assert.equal(counts(state.episodes,state.today).outstanding,11);
 assert.throws(()=>changeActionStatus(a,'Done'));
});
test('Referral submission does not confirm follow-up or engagement',()=>{
 const e=clone().episodes[2],text=summary(e,SEED.staff);assert.match(text,/Harbour Recovery Service: Submitted/);assert.match(text,/No confirmed follow-up recorded/);assert.equal(counts([e],SEED.today).referrals,1);
 e.referrals[0].status='Accepted';assert.equal(counts([e],SEED.today).referrals,0);assert.equal(counts([e],SEED.today).followups,1);
 assert.match(summary(e,SEED.staff),/No confirmed follow-up recorded/);
});
test('Referral and follow-up validation reject false confirmation',()=>{
 assert.match(validateReferral({service:'Demo',status:'Submitted',date:'',consent:'Agreed'}),/date/);
 assert.match(validateReferral({service:'Demo',status:'Submitted',date:SEED.today,consent:'Pending'}),/consent/);
 assert.equal(validateReferral({service:'Demo',status:'Preparation',date:'',consent:'Not recorded'}),'');
 assert.equal(validateReferral({service:'Demo',status:'Submitted',date:SEED.today,consent:'Not applicable'}),'');
 assert.match(validateFollow({service:'Demo',status:'Confirmed',date:SEED.today,method:'Telephone',details:'',owner:'priya'}),/details/);
 assert.equal(validateFollow({service:'Demo',status:'Confirmed',date:SEED.today,method:'Telephone',details:'Fictional named worker will call.',owner:'priya'}),'');
 assert.equal(validateFollow({service:'Demo',status:'Pending',date:'',method:'',details:'',owner:''}),'');
});
test('Handover preserves recovery, decisions, referrals, barriers, dates and owners',()=>{
 const state=clone();for(const e of state.episodes){const s=summary(e,state.staff);assert.ok(s.includes(e.id));for(const g of e.goals)assert.ok(s.includes(g.text));for(const r of e.referrals)assert.ok(s.includes(r.service+': '+r.status));for(const a of e.actions)assert.ok(s.includes(a.description));}
 const casey=summary(state.episodes[4],state.staff);assert.match(casey,/decision declined/);assert.match(casey,/Refer to a peer support group: Declined/);assert.match(casey,/Arrange group transport: Not applicable/);
 const jamie=summary(state.episodes[3],state.staff);assert.match(jamie,/Housing: Accommodation after discharge has not been confirmed/);assert.match(jamie,/Owner: Unassigned/);
 const alex=summary(state.episodes[0],state.staff);assert.match(alex,/16 Oct 2026 at 14:00/);assert.match(alex,/Written appointment|written appointment/);
});
test('Browser storage round trip preserves independently edited entities',()=>{
 const mem=new Map(),storage={getItem:k=>mem.get(k)||null,setItem:(k,v)=>mem.set(k,v)};const state=clone();const e=newEpisode('Created fictional case');state.episodes.push(e);e.preferences='Written information';e.goals.push({id:'g-new',text:'Reconnect with a friend'});e.actions.push(changeActionStatus({id:'a-new',description:'Arrange fictional support',owner:'priya',due:SEED.today},'Completed','2026-10-12T09:00:00Z'));saveState(storage,state);assert.deepEqual(loadState(storage,SEED),state);assert.deepEqual(loadState({getItem:()=>null},SEED),SEED);assert.throws(()=>loadState({getItem:()=>'{broken'},SEED));
 assert.throws(()=>loadState({getItem:()=>JSON.stringify({schema:1,episodes:[{id:'bad'}],staff:SEED.staff,templates:[],today:SEED.today})},SEED));
});
test('Next-step prompts prioritise ownership and unfinished coordination',()=>{
 assert.equal(nextStep(SEED.episodes[1],SEED.today).title,'Assign an action owner');assert.equal(nextStep(SEED.episodes[2],SEED.today).title,'Review an overdue action');assert.equal(nextStep(SEED.episodes[5],SEED.today).title,'Confirm follow-up arrangements');
});
