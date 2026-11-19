// REVENDEUR.JS V6 - RETOUR + 3 BARRES REMIS
setTimeout(()=>{

let txtLocal = "";
Object.keys(localStorage).forEach(k=>{ txtLocal += localStorage.getItem(k)+" "; });
let txtSession = "";
try{ Object.keys(sessionStorage).forEach(k=>{ txtSession += sessionStorage.getItem(k)+" "; }); }catch(e){}
let bas = (txtLocal+" "+txtSession).toLowerCase();
let estConnecteRev = bas.includes('rev1') || bas.includes('revendeur');
if(!estConnecteRev) return;

// 1. CREER LA BARRE DU HAUT AVEC LES 3 BARRES + RETOUR + DECONNEXION
function creerBarre(){
  if(document.getElementById('barTopTous')) return;
  let bar=document.createElement('div'); bar.id='barTopTous';
  bar.style.cssText='display:flex;gap:4px;padding:2px 4px;position:fixed;top:0;left:0;right:0;z-index:99999;justify-content:space-between;align-items:center;background:#fff;border-bottom:1px solid #ccc;height:28px';
  bar.innerHTML=
    '<button id="btnMenuTous" style="padding:2px 8px;font-size:14px;height:22px;border-radius:4px;background:#eee;border:1px solid #000;font-weight:bold">☰</button>'+
    '<div style="display:flex;gap:4px">'+
    '<button id="btnRetourTous" style="padding:2px 6px;font-size:9px;height:22px;border-radius:4px;min-width:60px;background:#eee;border:1px solid #000;font-weight:bold">⬅ RETOUR</button>'+
    '<button id="btnDecoTous" style="padding:2px 6px;font-size:9px;height:22px;border-radius:4px;min-width:60px;background:#ff4444;color:#fff;border:none;font-weight:bold">🚪 DÉCONNEXION</button>'+
    '</div>';
  document.body.prepend(bar);
  document.getElementById('btnRetourTous').onclick=()=>{ history.back(); };
  document.getElementById('btnDecoTous').onclick=()=>{
    localStorage.clear(); sessionStorage.clear();
    alert('Tu es déconnecté');
    location.href = location.origin + location.pathname;
    setTimeout(()=>location.reload(), 500);
  };
  // Les 3 barres : ouvre le menu d'origine si il existe, sinon alerte
  document.getElementById('btnMenuTous').onclick=()=>{
    // Cherche un bouton menu caché de suite.js
    let trouve = false;
    document.querySelectorAll('button').forEach(b=>{
      let t=(b.textContent||'').trim();
      if(t==='☰' || t.includes('MENU')){
        if(b.id!=='btnMenuTous' && b.style.display==='none'){ b.style.display=''; b.click(); trouve=true; }
      }
    });
    if(!trouve) alert('Menu : RETOUR - DECONNEXION - RECHARGER');
  };
}
creerBarre();

// 2. NETTOYAGE - MAIS ON NE TOUCHE PLUS A RETOUR / 3 BARRES / MENU
function nettoyer(){
  // Si la barre a disparu, on la recrée
  creerBarre();
  document.querySelectorAll('button').forEach(b=>{
    let t=(b.textContent||'').trim().toUpperCase();
    // NE JAMAIS ENLEVER NOS BOUTONS + LE MENU
    if(b.id==='btnRetourTous' || b.id==='btnDecoTous' || b.id==='btnMenuTous' || b.id==='btnRechargeAdmin' || b.id==='btnRechargerClient') return;
    if(t==='☰' || t==='MENU') return; // Garder les 3 barres d'origine
    // Enlever seulement les GROS boutons de suite.js, pas les nôtres
    if((t.includes('RETOUR') && b.id!=='btnRetourTous') || (t.includes('DÉCONNEXION') && b.id!=='btnDecoTous') || (t.includes('DECONNEXION') && b.id!=='btnDecoTous') || t==='NORMAL' || t==='MA CHANCE' || t==='TWO SURE' || t==='PERMUTATION' || t==='NAP' || t==='AGAINST' || t==='ANAGRAMME' || t==='CHANCE +' || t==='TOTAL RÉSULTAT' || t.includes('NAPPE')){
      b.remove();
    }
  });
  document.querySelectorAll('div').forEach(d=>{
    let txt=d.textContent||'';
    if((txt.includes('Choisir 01') || txt.includes('PARI : DIRECT')) && txt.length<2000 && d.id!=='pageRevendeur'){
      if(d.children.length<5) d.style.display='none';
    }
  });
}
nettoyer();
setInterval(nettoyer, 800);

// 3. PAGE REVENDEUR
if(document.getElementById('pageRevendeur')) document.getElementById('pageRevendeur').remove();
let p=document.createElement('div'); p.id='pageRevendeur';
p.style.cssText='background:#fff;color:#000;padding:12px;border-radius:10px;margin:35px 10px 5px 10px;border:2px solid #000;position:relative;z-index:99998';
let qui = 'REV1';
p.innerHTML=
'<div style="text-align:center"><b style="font-size:18px">BIENVENUE SUR<br>NET LOTO AT 5/90</b><br><span style="font-size:14px;font-weight:bold;color:green">COMPTE REVENDEUR : '+qui+'</span></div><br>'+
'<div style="background:#000;color:#fff;padding:10px;border-radius:10px;text-align:center"><span style="font-size:11px">SOLDE REVENDEUR</span><br><b id="soldeRev" style="font-size:24px">0 F</b></div><br>'+
'<input id="montantRechargeRev" type="number" placeholder="Montant ex: 10000" style="width:100%;padding:10px;border:1px solid #000;border-radius:8px;margin:6px 0">'+
'<button id="btnRechargeAdmin" style="background:green;color:#fff;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold;font-size:13px">📲 RECHARGER MON COMPTE REVENDEUR PAR ADMIN</button><br><br>'+
'<input id="telClientRecharge" type="tel" placeholder="N° WhatsApp du client ex: 229..." style="width:100%;padding:10px;border:1px solid #000;border-radius:8px;margin:6px 0">'+
'<input id="montantClientRecharge" type="number" placeholder="Montant pour le client ex: 5000" style="width:100%;padding:10px;border:1px solid #000;border-radius:8px;margin:6px 0">'+
'<button id="btnRechargerClient" style="background:orange;color:#000;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold;font-size:13px">💸 RECHARGER CLIENT</button>';
document.body.prepend(p);
document.body
