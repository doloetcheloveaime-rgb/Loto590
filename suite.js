function out(){location.reload()}
let t=document.createElement('div');t.style.cssText='position:fixed;top:5px;right:5px;z-index:9999;display:flex;gap:5px';
t.innerHTML='<button onclick="history.back()">RETOUR</button><button onclick="out()">SE DECONNECTER</button>';document.body.appendChild(t);
let b=[...document.querySelectorAll('button')];b.forEach(x=>{if(x.textContent.trim()=='RETOUR'){x.style.cssText='background:#2b2b2b!important;color:#fff!important';}});
let e=[...document.querySelectorAll('div,span')];e.forEach(y=>{if((y.textContent.includes('Aujourd')||y.textContent.includes('Solde:'))&&y.children.length==0)y.style.display='none'});
let en=[...document.querySelectorAll('button')].find(x=>x.textContent.trim()=='ENTRER');if(en){let p=document.createElement('div');p.style.cssText='margin-top:10px;text-align:center';p.innerHTML='<div id="insc" style="color:#2196f3;cursor:pointer;font-weight:bold">S INSCRIRE</div><div style="color:#666;font-size:13px;margin-top:6px">Mot de passe oublié ? Cliquez ici</div>';en.parentNode.appendChild(p);}
let r=[...document.querySelectorAll('button')].find(x=>x.textContent.trim()=='RETOUR');if(r){r.onclick=()=>history.back();}
let ins=document.querySelectorAll('input');if(ins[0])ins[0].placeholder='Ton Gmail';if(ins[1]){ins[1].placeholder='Ton mot de passe';ins[1].type='password';}
let ic=document.getElementById('insc');if(ic){ic.onclick=function(){alert('Inscription : envoie ton nom + Gmail à l admin pour créer ton compte.');};}
