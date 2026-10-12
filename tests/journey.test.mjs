import test from 'node:test';
import assert from 'node:assert/strict';
import {SEED,LEGACY_SEED} from '../dist/data.mjs';
import {timeline,milestones,validateEvent,validateACTSReferral,recordChanges} from '../dist/journey.mjs';
import {loadState,saveState,counts,filterReferrals,summary,newReferral} from '../dist/core.mjs';
test('ACTS journey timeline orders treatment dates, includes receipt, retains planned and undated events',()=>{
 const r=structuredClone(SEED.referrals[0]);r.events.reverse();r.events.push({id:'undated',type:'Other event',title:'Unknown date',date:'',status:'Not recorded'});
 const events=timeline(r,{scope:'treatment'});assert.equal(events[0].type,'Referral received');assert.equal(events.at(-1).id,'undated');assert.equal(events.at(-2).status,'Planned');assert.equal(timeline(r,{order:'newest'})[0].type,'Follow-up contact');
 assert.equal(timeline(r,{type:'Detox started',status:'Completed'}).length,1);assert.equal(timeline(r,{status:'Planned'}).length,1);
});
test('Milestones use recorded evidence rather than journey status or action completion',()=>{
 const r=newReferral('Blank');r.journeyStatus='Closed';r.actions.push({status:'Completed'});assert.ok(milestones(r).every(m=>m.status==='Not recorded'));
 const alex=milestones(SEED.referrals[0]);assert.equal(alex[3].status,'Recorded');assert.equal(alex[4].status,'Planned');assert.equal(milestones(SEED.referrals[1])[1].status,'Planned');
});
test('Completed events require a valid date within the actual referral journey',()=>{
 const r=SEED.referrals[0],e={type:'Review',title:'Review',status:'Completed',date:'',time:'',duration:'',auditScore:''};
 assert.match(validateEvent(e,r,SEED.today),/date/);e.date='2026-10-13';assert.match(validateEvent(e,r,SEED.today),/Planned/);e.status='Planned';assert.equal(validateEvent(e,r,SEED.today),'');
 e.date='2026-10-05';assert.match(validateEvent(e,r,SEED.today),/before/);e.date='2026-02-30';assert.match(validateEvent(e,r,SEED.today),/valid/);e.date='2026-10-12';e.auditScore='41';assert.match(validateEvent(e,r,SEED.today),/AUDIT/);e.auditScore='0';e.duration='1.5';assert.match(validateEvent(e,r,SEED.today),/duration/);e.duration='30';assert.equal(validateEvent(e,r,SEED.today),'');
});
test('Changing receipt date cannot move it after existing events or into the future',()=>{
 const r=structuredClone(SEED.referrals[0]);r.receivedDate='2026-10-08';assert.match(validateACTSReferral(r,SEED.today),/existing event/);r.receivedDate='2026-10-13';assert.match(validateACTSReferral(r,SEED.today),/demonstration date/);
});
test('Legacy local plans migrate without lost entities or invented treatment history',()=>{
 const old=structuredClone(LEGACY_SEED);old.episodes[0].goals[0].text='Edited fictional goal';const mem=new Map([['recovery-bridge-v1',JSON.stringify(old)]]),storage={getItem:k=>mem.get(k)||null,setItem:(k,v)=>mem.set(k,v)};
 const migrated=loadState(storage,SEED);assert.equal(migrated.schema,2);assert.equal(migrated.referrals.length,6);assert.equal(migrated.referrals[0].goals[0].text,'Edited fictional goal');assert.deepEqual(migrated.referrals[0].onwardReferrals,old.episodes[0].referrals);assert.equal(migrated.referrals[0].followups[0].onwardReferralId,'r1');assert.ok(migrated.referrals.every(r=>!r.receivedDate&&!r.events.length));assert.equal(timeline(migrated.referrals[0])[0].status,'Not recorded');
 saveState(storage,migrated);assert.deepEqual(loadState(storage,SEED),migrated);assert.equal(mem.get('recovery-bridge-v1'),JSON.stringify(old));
});
test('Saved plan updates enter timeline with recording time, distinct from clinical contacts',()=>{
 const before=structuredClone(SEED.referrals[2]),after=structuredClone(before);after.onwardReferrals[0].status='Accepted';after.actions[0].owner='omar';const now='2026-10-12T14:10:00Z';recordChanges(before,after,'priya',now);
 assert.equal(after.activityEvents.length,2);assert.equal(after.events.length,before.events.length);assert.ok(after.activityEvents.every(v=>v.owner==='priya'&&v.recordedAt===now));assert.equal(timeline(after,{scope:'updates'}).length,2);assert.match(timeline(after,{scope:'updates'})[1].notes,/Accepted|omar/);
 const copy=structuredClone(after);copy.handoverDraft='Reviewed';recordChanges(after,copy,'priya',now);assert.equal(copy.activityEvents.length,2);
});
test('Closed journey filtering and handover retain declined support and actual chronology',()=>{
 const list=filterReferrals(SEED.referrals,{journey:'Closed'},SEED.today);assert.equal(list.length,1);assert.equal(list[0].alias,'Casey');assert.equal(counts(list,SEED.today).outstanding,0);
 const text=summary(list[0],SEED.staff);assert.match(text,/ACTS journey status: Closed/);assert.match(text,/Journey closed/);assert.match(text,/Support intervention.*Declined/);assert.match(text,/ONWARD REFERRALS/);
 const planned=summary(SEED.referrals[0],SEED.staff);assert.match(planned,/14 Oct 2026 at 14:00.*Follow-up contact.*Planned/);
});
