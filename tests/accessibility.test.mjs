import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const css=readFileSync(new URL('../dist/styles.css',import.meta.url),'utf8').replace(/#([0-9a-f]{3})(?![0-9a-f])/g,(_,v)=>'#'+[...v].map(c=>c+c).join(''));
const lum=hex=>{const channels=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return channels.reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);};
const ratio=(a,b)=>{const [x,y]=[lum(a),lum(b)].sort((a,b)=>b-a);return (x+.05)/(y+.05);};
test('Selected text and status colour pairs meet the normal-text AA contrast threshold',()=>{
 for(const [fg,bg] of [['#203c3a','#ffffff'],['#536662','#ffffff'],['#ffffff','#17665a'],['#d2ded6','#173b38'],['#4f6259','#eef1ed'],['#256348','#e6f1eb'],['#845414','#fff2d9'],['#a43b32','#fff0ed'],['#335e87','#edf3fa'],['#405644','#eef1e7']]){assert.ok(css.includes(fg)&&css.includes(bg));assert.ok(ratio(fg,bg)>=4.5,`${fg} on ${bg}`);}
});
test('Input boundaries and focus rings meet a 3:1 contrast check against their surroundings',()=>{
 for(const [fg,bg] of [['#7c8e83','#ffffff'],['#b9661b','#ffffff'],['#f0c574','#173b38'],['#f0c574','#365a50']]){assert.ok(css.includes(fg)&&css.includes(bg));assert.ok(ratio(fg,bg)>=3,`${fg} on ${bg}`);}
});
