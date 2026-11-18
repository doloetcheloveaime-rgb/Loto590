function out(){location.reload()}
let t=document.createElement('div');t.style.cssText='position:fixed;top:5px;right:5px;z-index:9999;display:flex;gap:5px';
t.innerHTML='<button onclick="history.back()">RETOUR</button><button onclick="out()">SE DECONNECTER</button>';document.body.appendChild(t);
let b=[...document.querySelectorAll('button')];b.forEach(x=>{if(x.textContent.trim()=='RETOUR'){x.style.cssText='background:#2b2b2b!important;color:#fff!important';}});
let e=[...document.querySelectorAll('div,span')];e.forEach(y=>{if((y.textContent.includes('Aujourd')||y.textContent.includes('Solde:'))&&y.children.length==0)y.style.display='none'});
let en=[...document.querySelectorAll('button')].find(x=>x.textContent.trim()=='ENTRER');if(en){let p=document.createElement('div');p.style.cssText='margin-top:10px;text-align:center';p.innerHTML='<div id="insc" style="color:#2196f3;cursor:pointer;font-weight:bold">S INSCRIRE</div><div style="color:#666;font-size:13px;margin-top:6px">Mot de passe oublié ? Cliquez ici</div>';en.parentNode.appendChild(p);}
let r=[...document.querySelectorAll('button')].find(x=>x.textContent.trim()=='RETOUR');if(r){r.onclick=()=>history.back();}
let ins=document.querySelectorAll('input');if(ins[0])ins[0].placeholder='Code (1111 / 2222 / 9999)';if(ins[1]){ins[1].placeholder='Ton nom';ins[1].type='text';}
let ic=document.getElementById('insc');if(ic){ic.onclick=function(){alert('Pour avoir un code, demande à l admin. Client: 1111 Revendeur: 2222');};}
setTimeout(()=>{document.querySelectorAll('div,span,p,header').forEach(e=>{if((e.textContent||'').includes('LUNDI')&&e.textContent.length<100)e.style.display='none';});},1000);
setInterval(()=>{let a=document.getElementById('panelAdmin'),r=document.getElementById('panelRev');if((a&&!a.classList.contains('hidden'))||(r&&!r.classList.contains('hidden'))){document.querySelectorAll('button.tab').forEach(b=>b.style.display='none');let g=document.getElementById('grille');if(g)g.style.display='none';document.querySelectorAll('input').forEach(i=>{if(i.id==='mise')i.parentElement.style.display='none';});}},1000);
