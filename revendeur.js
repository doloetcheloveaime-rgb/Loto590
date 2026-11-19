// REVENDEUR.JS V4 - FORCÉ, NE CHERCHE PLUS LE NOM
setTimeout(()=>{

// 1. VOIR CE QUE LE JEU A VRAIMENT ENREGISTRE
let toutesCles = Object.keys(localStorage);
let toutTexte = "";
toutesCles.forEach(k=>{ toutTexte += k+":"+localStorage.getItem(k)+" | "; });

// Si on trouve REV quelque part, c'est revendeur, sinon on force quand même pour tester
let estRev = toutTexte.toLowerCase().includes('rev');
// Pour le test, on FORCE à true pour voir si ça nettoie
// Si après ça, ça nettoie, c'est bien le nom qui bloquait
estRev = true; 

if(!estRev) return;

// 2. ENLEVER LES GROS BOUTONS RETOUR / DECONNEXION DE SUITE.JS
// On les enlève par leur texte, même si suite.js les recrée
function nettoyer(){
  document.querySelectorAll('button').forEach(b=>{
    let t=(b.textContent||'').trim().toUpperCase();
    // Garder nos 2 petits boutons
    if(b.id==='btnRetourTous' || b.id==='btnDecoTous' || b.id==='btnRechargeAdmin' || b.id==='btnRechargerClient') return;
    if(t.includes('RETOUR') || t.includes('DÉCONNEXION') || t.includes('DECONNEXION') || t.includes('SE DECONNECTER') || t==='NORMAL' || t==='MA CHANCE' || t==='TWO SURE' || t==='PERMUTATION' || t==='NAP' || t==='AGAINST' || t==='ANAGRAMME' || t==='CHANCE +' || t==='TOTAL RÉSULTAT' || t.includes('NAPPE')){
      b.remove();
    }
  });
  // Cacher les div qui contiennent le jeu : Choisir 01 à 90, PARI : DIRECT
  document.querySelectorAll('div').forEach(d=>{
    let txt=d.textContent||'';
    if((txt.includes('Choisir 01') || txt.includes('PARI : DIRECT')) && txt.length<2000 && d.id!=='pageRevendeur'){
      // On ne cache que si c'est un petit bloc de jeu, pas le body
      if(d.children.length<5) d.style.display='none';
    }
  });
}
nettoyer();
setInterval(nettoyer, 500); // Toutes les 0.5 sec, pour empêcher suite.js de les remettre

// 3. CREER NOS 2 PETITS BOUTONS - 1 SEUL FOIS
if(document.getElementById('barTopTous')) document.getElementById('barTopTous').remove();
let bar=document.createElement('div'); bar.id='barTopTous';
bar.style.cssText='display:flex;gap:4px;padding:2px 4px;position:fixed;top:0;left:0;right:0;z-index:99999;justify-content:flex-end;background:#fff;border-bottom:1px solid #ccc';
bar.innerHTML='<button id="btnRetourTous" style="padding:2px 6px;font-size:9px;height:22px;border-radius:4px;min-width:60px;background:#eee;border:1px solid #000;font-weight:bold">⬅ RETOUR</button><button id="btnDecoTous" style="padding:2px 6px;font-size:9px;height:22px;border-radius:4px;min-width:60px;background:#ff4444;color:#fff;border:none;font-weight:bold">🚪 DÉCONNEXION</button>';
document.body.prepend(bar);
document.getElementById('btnRetourTous').onclick=()=>{ history.back(); };
document.getElementById('btnDecoTous').onclick=()=>{ localStorage.clear(); alert('Tu es déconnecté'); location.reload(); };

// 4. PAGE REVENDEUR
if(document.getElementById('pageRevendeur')) document.getElementById('pageRevendeur').remove();
let p=document.createElement('div'); p.id='pageRevendeur';
p.style.cssText='background:#fff;color:#000;padding:12px;border-radius:10px;margin:35px 10px 5px 10px;border:2px solid #000;position:relative;z-index:99998';
let qui = localStorage.getItem('currentUser')||'REV1';
p.innerHTML=
'<div style="text-align:center"><b style="font-size:18px">BIENVENUE SUR<br>NET LOTO AT 5/90</b><br><span style="font-size:14px;font-weight:bold;color:green">COMPTE REVENDEUR : '+qui+'</span></div><br>'+
'<div style="background:#000;color:#fff;padding:10px;border-radius:10px;text-align:center"><span style="font-size:11px">SOLDE REVENDEUR</span><br><b id="soldeRev" style="font-size:24px">0 F</b></div><br>'+
'<input id="montantRechargeRev" type="number" placeholder="Montant ex: 10000" style="width:100%;padding:10px;border:1px solid #000;border-radius:8px;margin:6px 0">'+
'<button id="btnRechargeAdmin" style="background:green;color:#fff;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold;font-size:13px">📲 RECHARGER MON COMPTE REVENDEUR PAR ADMIN</button><br><br>'+
'<input id="telClientRecharge" type="tel" placeholder="N° WhatsApp du client ex: 229..." style="width:100%;padding:10px;border:1px solid #000;border-radius:8px;margin:6px 0">'+
'<input id="montantClientRecharge" type="number" placeholder="Montant pour le client ex: 5000" style="width:100%;padding:10px;border:1px solid #000;border-radius:8px;margin:6px 0">'+
'<button id="btnRechargerClient" style="background:orange;color:#000;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold;font-size:13px">💸 RECHARGER CLIENT</button>'+
'<br><br><div style="font-size:10px;color:#999;text-align:center">DEBUG: '+toutTexte.substring(0,200)+'</div>';
document.body.prepend(p);
document.body.prepend(bar);

let solde = parseInt(localStorage.getItem('soldeRev_'+qui)||'0');
document.getElementById('soldeRev').textContent = solde.toLocaleString()+' F';
document.getElementById('btnRechargeAdmin').onclick=()=>{
  let m=document.getElementById('montantRechargeRev').value;
  if(!m){ alert('Mets le montant'); return; }
  window.open('https://wa.me/22900000000?text='+encodeURIComponent('Bonjour ADMIN, je suis REVENDEUR '+qui+', je veux '+m+' F'),'_blank');
};
document.getElementById('btnRechargerClient').onclick=()=>{
  let tel=document.getElementById('telClientRecharge').value;
  let mont=document.getElementById('montantClientRecharge').value;
  if(!tel||!mont){ alert('Mets numéro + montant'); return; }
  let code=Math.floor(100000+Math.random()*900000);
  window.open('https://wa.me/'+tel.replace(/\D/g,'')+'?text='+encodeURIComponent('Ton code recharge '+mont+' F est : '+code),'_blank');
  alert('Code '+code+' envoyé');
};

},800);
