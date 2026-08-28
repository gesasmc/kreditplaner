(()=>{'use strict';
const $=s=>document.querySelector(s);
function markOptional(){
 const privateName=$('#name');
 if(privateName){const lab=privateName.closest('.field')?.querySelector('label');if(lab)lab.textContent='Name (optional)';privateName.placeholder='z. B. Autokredit (optional)'}
 const shName=$('#shName');
 if(shName){const wrap=shName.closest('.sharedFieldWrap'),lab=wrap?.querySelector('label');if(lab)lab.textContent='Name (optional)';shName.placeholder='z. B. Hauskredit (optional)'}
}
function defaultName(input,prefix='Kredit'){
 if(!input||input.value.trim())return;
 input.value=prefix;
 input.dispatchEvent(new Event('input',{bubbles:true}));
}
// Capture-Phase: setzt bei leerem Namen einen neutralen Standardnamen,
// bevor die bestehenden Speicher-Handler ihre Pflichtfeldprüfung ausführen.
document.addEventListener('click',e=>{
 const t=e.target.closest('button');if(!t)return;
 if(t.id==='saveLoan')defaultName($('#name'),'Kredit');
 if(t.id==='saveSharedLoan'||t.id==='saveSharedEdit')defaultName($('#shName'),'Kredit');
},true);
function start(){markOptional();new MutationObserver(markOptional).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class']})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();