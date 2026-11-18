function out(){location.reload()}
let t=document.createElement('div');t.style.cssText='position:fixed;top:5px;right:5px;z-index:9999;display:flex;gap:5px';
t.innerHTML='<button onclick="history.back()">RETOUR</button><button onclick="out()">SE DECONNECTER</button>';document.body.appendChild(t);
