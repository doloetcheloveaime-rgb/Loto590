function out(){location.reload()}
let t=document.createElement('div');t.style.cssText='position:fixed;top:5px;right:5px;z-index:9999;display:flex;gap:5px';
t.innerHTML='<button onclick="history.back()">RETOUR</button><button onclick="out()">SE DECONNECTER</button>';document.body.appendChild(t);
let b=[...document.querySelectorAll('button')];b.forEach(x=>{if(x.textContent=='RETOUR')x.style.cssText='position:fixed;top:5px;left:5px;z-index:9999;padding:5px 8px;font-size:11px;background:#333;color:#fff;border:none;border-radius:8px';if(x.textContent=='SE DECONNECTER')x.style.cssText='position:fixed;top:5px;right:5px;z-index:9999;padding:5px 8px;font-size:11px;background:red;color:#fff;border:none;border-radius:8px'});
