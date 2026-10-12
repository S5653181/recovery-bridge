// Event-handler integration harness. No browser or layout engine is used.
import test from 'node:test';
import assert from 'node:assert/strict';
import {SEED} from '../dist/data.mjs';
const decode=s=>s.replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
class Element {
 constructor(id='',dataset={}){this.id=id;this.dataset=dataset;this.listeners={};this.value='';this.textContent='';this.isConnected=true;this.classList={add(){},remove(){}};}
 set innerHTML(html){this.html=html;this.children=new Map();this.form=null;}
 get innerHTML(){return this.html||'';}
 addEventListener(type,fn){(this.listeners[type]||=[]).push(fn);}
 emit(type,event={}){for(const fn of this.listeners[type]||[])fn(event);}
 focus(){document.activeElement=this;}
 setSelectionRange(){}
 closest(selector){if(selector==='[data-act]'&&this.dataset.act)return this;if(selector==='[role="tab"]'&&this.dataset.tab)return this;return null;}
 querySelector(selector){if(selector==='form'){if(!this.form)this.form=new Element('dialog-form');return this.form;}if(selector.startsWith('[data-act=')){const attrs=[...selector.matchAll(/\[([^=]+)="([^"]+)"\]/g)];for(const match of this.innerHTML.matchAll(/<button\b[^>]*>/g)){const text=match[0];if(!attrs.every(([,k,v])=>text.includes(k+'="'+v+'"')))continue;const el=new Element();for(const [,key,value] of text.matchAll(/data-([a-z-]+)="([^"]*)"/g))el.dataset[key]=decode(value);return el;}return null;}return new Element();}
 showModal(){this.open=true;}
 close(){this.open=false;this.emit('close');}
}
function harness(){const app=new Element('app'),dialog=new Element('editor'),feedback=new Element('feedback'),print=new Element('print-area');const roots=new Map([['app',app],['editor',dialog],['feedback',feedback],['print-area',print]]);const storage=new Map();let printed='';
 const find=id=>{if(roots.has(id))return roots.get(id);for(const root of [dialog,app]){if(root.children?.has(id))return root.children.get(id);const regex=new RegExp('<([a-z]+)[^>]*\\bid="'+id+'"[^>]*>');const match=root.innerHTML.match(regex);if(match){const el=new Element(id);const opening=match[0];el.dataset={};for(const attr of opening.matchAll(/data-([a-z-]+)="([^"]*)"/g))el.dataset[attr[1].replace(/-([a-z])/g,(_,x)=>x.toUpperCase())]=decode(attr[2]);el.value=decode(opening.match(/\bvalue="([^"]*)"/)?.[1]||'');if(match[1]==='textarea'){const rest=root.innerHTML.slice(match.index+opening.length);el.value=decode(rest.split('</textarea>')[0]);}root.children.set(id,el);return el;}}return null;};
 globalThis.document={activeElement:null,getElementById:find,querySelector:()=>new Element(),body:{append(){}},createElement:()=>({click(){},remove(){}})};
 globalThis.localStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)};globalThis.CSS={escape:s=>s};globalThis.confirm=()=>true;globalThis.window={print:()=>{printed=print.textContent}};
 globalThis.FormData=class{constructor(form){this.entries=Object.entries(form.values||{});}*[Symbol.iterator](){yield* this.entries}getAll(name){return this.entries.filter(([k])=>k===name).flatMap(([,v])=>Array.isArray(v)?v:[v]);}};
 const click=(act,data={})=>{const el=new Element('',{act,...data});el.focus();app.emit('click',{target:el});};
 const submit=values=>{dialog.form.values=values;dialog.form.emit('submit',{target:dialog.form,preventDefault(){}});};
 const saved=()=>JSON.parse(storage.get('recovery-bridge-v2'));
 return {app,dialog,find,click,submit,saved,storage,get printed(){return printed}};
}
test('UI event handlers create, edit, persist, update counts, validate and generate a handover',async()=>{
 const h=harness();await import('../dist/app.mjs?integration=1');
 assert.match(h.app.innerHTML,/Referral register/);assert.match(h.app.innerHTML,/<strong>9<\/strong>/);
 h.click('new-acts-referral');h.submit({journeyStatus:'Awaiting assessment',receivedDate:'2026-10-12',receivedTime:'',route:'Ward team',reasonForReferral:'Synthetic assessment request',alias:'Fictional Jordan',site:'Poole',ward:'Demo ward',practitioner:'priya',discharge:'2026-10-15'});
 assert.equal(h.saved().referrals.length,7);const id=h.saved().referrals.at(-1).id;assert.equal(id,'ACTS-DEMO-007');assert.match(h.app.innerHTML,/Fictional Jordan’s ACTS journey/);
 h.click('goal');h.submit({text:'Reconnect with local support.'});
 h.click('recovery-context');h.submit({preferences:'Written instructions',resources:'Fictional contact card',review:'2026-10-13',barrierReview:'Reviewed'});
 h.click('support');h.submit({option:'Community support',discussed:'Completed',offered:'Completed',decision:'Accepted',arrangement:'Pending',notes:'Agreed with the person.'});
 h.click('barrier');h.submit({type:'Transport',context:'No transport arranged.',status:'Action agreed',action:'Explore travel options.'});
 h.click('tab',{tab:'actions'});h.click('action');h.submit({description:'Arrange travel',owner:'',due:'2026-10-11',status:'Pending',notes:'Synthetic task'});
 assert.equal(h.saved().referrals.at(-1).actions.length,1);let aid=h.saved().referrals.at(-1).actions[0].id;
 h.click('action',{id:aid});h.submit({description:'Arrange travel',owner:'omar',due:'2026-10-14',status:'In progress',notes:'Owner allocated'});
 assert.equal(h.saved().referrals.at(-1).actions[0].owner,'omar');h.click('complete-action',{id:aid});assert.ok(h.saved().referrals.at(-1).actions[0].completedAt);assert.equal(document.activeElement.dataset.act,'reopen-action');h.click('reopen-action',{id:aid});assert.equal(h.saved().referrals.at(-1).actions[0].completedAt,null);assert.equal(document.activeElement.dataset.act,'complete-action');
 h.click('tab',{tab:'referrals'});h.click('referral');const r={service:'Harbour Recovery Service',purpose:'Fictional recovery support',consent:'Pending',date:'2026-10-12',owner:'priya',status:'Submitted',outcome:'',next:'Check response'};h.submit(r);assert.equal(h.dialog.open,true);assert.match(h.find('dialog-error').textContent,/consent/);r.consent='Agreed';h.submit(r);assert.equal(h.saved().referrals.at(-1).onwardReferrals[0].status,'Submitted');
 h.click('followup');const f={service:'Harbour Recovery Service',onwardReferralId:'',date:'2026-10-20',time:'14:00',method:'Telephone',owner:'',details:'Fictional worker will call.',status:'Confirmed',next:''};h.submit(f);assert.equal(h.dialog.open,true);f.owner='priya';h.submit(f);assert.equal(h.saved().referrals.at(-1).followups[0].status,'Confirmed');
 h.click('tab',{tab:'handover'});assert.match(h.find('summary-content').value,/Reconnect with local support/);assert.match(h.find('summary-content').value,/Owner: Omar Blake/);assert.match(h.find('summary-content').value,/Harbour Recovery Service: Submitted/);assert.match(h.find('summary-content').value,/20 Oct 2026 at 14:00/);
 const text=h.find('summary-content').value+'\nReviewed as a fictional scenario.';h.find('summary-content').value=text;h.click('save-summary');assert.equal(h.saved().referrals.at(-1).handoverDraft,text);h.click('print-summary');assert.equal(h.printed,text);
 h.click('tab',{tab:'recovery'});h.click('goal',{id:h.saved().referrals.at(-1).goals[0].id});h.submit({text:'Updated fictional goal'});h.click('tab',{tab:'handover'});assert.match(h.app.innerHTML,/The record has changed/);assert.match(h.find('summary-content').value,/Updated fictional goal/);assert.ok(!h.find('summary-content').value.includes('Reviewed as a fictional scenario.'));
 // A second module instance reads the same storage, simulating a refresh.
 await import('../dist/app.mjs?integration=2');assert.match(h.app.innerHTML,/Fictional Jordan/);assert.equal(h.saved().referrals.length,7);
});
test('Keyboard section handlers support Arrow, Home and End navigation',async()=>{
 const h=harness();await import('../dist/app.mjs?keyboard=1');h.click('open',{id:'ACTS-DEMO-001'});
 const key=k=>h.app.emit('keydown',{target:new Element('',{tab:'recovery'}),key:k,preventDefault(){}});
 key('ArrowRight');assert.match(h.app.innerHTML,/id="tab-recovery"[^>]*aria-selected="true"/);key('End');assert.match(h.app.innerHTML,/id="tab-handover"[^>]*aria-selected="true"/);key('Home');assert.match(h.app.innerHTML,/id="tab-journey"[^>]*aria-selected="true"/);
});
test('Reset restores the original dataset through the actual confirmation handler',async()=>{
 const h=harness();await import('../dist/app.mjs?reset=1');h.click('new-acts-referral');h.submit({journeyStatus:'Awaiting assessment',receivedDate:'2026-10-12',receivedTime:'',route:'Ward team',reasonForReferral:'Synthetic assessment request',alias:'Reset test',site:'',ward:'',practitioner:'',discharge:''});h.click('nav',{page:'settings'});h.click('reset');h.submit({});assert.deepEqual(h.saved(),SEED);assert.match(h.app.innerHTML,/Referral register/);
});
test('Checklist selection creates only relevant actions, skips existing items and preserves rationale',async()=>{
 const h=harness();await import('../dist/app.mjs?checklist=1');h.click('open',{id:'ACTS-DEMO-002'});h.click('tab',{tab:'actions'});h.click('checklist');h.submit({template:['goal','follow'],owner:'daniel',due:'2026-10-14'});
 const actions=h.saved().referrals[1].actions;assert.equal(actions.length,4);assert.equal(actions.at(-1).owner,'daniel');assert.equal(actions.at(-1).status,'Pending');assert.ok(actions.at(-1).why);h.click('checklist');assert.match(h.dialog.innerHTML,/already in plan/);assert.match(h.dialog.innerHTML,/disabled/);
});
test('Filtering, metric selection and staff view use the same records as rendered counts',async()=>{
 const h=harness();await import('../dist/app.mjs?filters=1');const change=(id,value,data={})=>{const el=new Element(id,data);el.value=value;h.app.emit('change',{target:el});};
 change('filter-site','Poole',{filter:'site'});assert.match(h.app.innerHTML,/<strong>5<\/strong>/);assert.ok(!h.app.innerHTML.includes('data-id="ACTS-DEMO-002"'));h.click('metric',{key:'unassigned'});assert.match(h.app.innerHTML,/<strong>3<\/strong>/);assert.ok(h.app.innerHTML.includes('data-id="ACTS-DEMO-004"'));assert.ok(!h.app.innerHTML.includes('data-id="ACTS-DEMO-001"'));
 h.click('clear-filters');change('demo-staff','ellis');assert.match(h.app.innerHTML,/Team lead view · work allocation/);h.click('my-referrals');assert.match(h.app.innerHTML,/No referrals match/);h.click('clear-filters');assert.match(h.app.innerHTML,/<strong>9<\/strong>/);
});
test('Storage failure keeps saved records unchanged and leaves the form open',async()=>{
 const h=harness();await import('../dist/app.mjs?failure=1');h.click('open',{id:'ACTS-DEMO-002'});h.click('goal');h.submit({text:'First fictional goal'});const before=structuredClone(h.saved());globalThis.localStorage.setItem=()=>{throw Error('Quota exceeded')};h.click('goal');h.submit({text:'This must not be saved'});assert.equal(h.dialog.open,true);assert.deepEqual(h.saved(),before);assert.match(h.find('dialog-error').textContent,/could not be saved/);
});
test('Untrusted fictional text is escaped rather than interpreted as HTML',async()=>{
 const h=harness();await import('../dist/app.mjs?escaping=1');h.click('new-acts-referral');h.submit({journeyStatus:'Awaiting assessment',receivedDate:'2026-10-12',receivedTime:'',route:'Ward team',reasonForReferral:'Synthetic assessment request',alias:'<img src=x onerror=alert(1)>',site:'',ward:'',practitioner:'',discharge:''});assert.ok(h.app.innerHTML.includes('&lt;img src=x onerror=alert(1)&gt;'));assert.ok(!h.app.innerHTML.includes('<img src=x'));
});
test('Treatment event handler validates dates, saves edits, switches timeline detail and survives refresh',async()=>{
 const h=harness();await import('../dist/app.mjs?journey=1');h.click('open',{id:'ACTS-DEMO-002'});assert.match(h.app.innerHTML,/Treatment journey timeline/);
 h.click('event');const data={type:'Initial assessment',title:'Fictional assessment completed',date:'2026-10-13',time:'11:00',status:'Completed',owner:'daniel',method:'In person',location:'Cedar ward',duration:'25',auditScore:'0',notes:'Discussed individual priorities.',outcome:'Agreed a review.',nextAction:'Review tomorrow'};
 h.submit(data);assert.equal(h.dialog.open,true);assert.match(h.find('dialog-error').textContent,/Planned/);data.date='2026-10-12';h.submit(data);assert.equal(h.saved().referrals[1].events.length,3);const e=h.saved().referrals[1].events.at(-1);assert.ok(e.recordedAt);h.click('timeline-view',{view:'detailed'});assert.equal(document.activeElement.dataset.view,'detailed');assert.match(h.app.innerHTML,/Contact duration/);assert.match(h.app.innerHTML,/25 minutes/);assert.match(h.app.innerHTML,/AUDIT score \(recorded\)/);
 h.click('event',{id:e.id});data.outcome='Updated fictional outcome';h.submit(data);assert.equal(h.saved().referrals[1].events.at(-1).recordedAt,e.recordedAt);assert.equal(h.saved().referrals[1].events.at(-1).outcome,data.outcome);
 h.click('tab',{tab:'handover'});assert.match(h.find('summary-content').value,/Updated fictional outcome/);await import('../dist/app.mjs?journey=2');h.click('open',{id:'ACTS-DEMO-002'});assert.match(h.app.innerHTML,/Fictional assessment completed/);
});
