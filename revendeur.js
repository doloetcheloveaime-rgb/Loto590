// REVENDEUR.JS - VERSION 3 : PROPRE, SANS SUPERPOSITION
setTimeout(()=>{

let qui = (localStorage.getItem('currentUser')||'').trim();
let q = qui.toLowerCase();
let isRev = localStorage.getItem('isRevendeur')==='1' || q.includes('rev') || q==='rev1';
if(!isRev) return;

// 1. ENLEVER TOUS LES ANCIENS BOUTONS QUI FONT SUPERPOSITION
// On enlève : RETOUR, SE DECONNECTER, 3D, Classic, Basic, NORMAL, MA CHANCE
document.querySelectorAll('button').forEach(b=>{
  let t=(b.textContent||'').trim().toUpperCase();
  if(t.includes('RETOUR') || t.includes('DECONNECTER') || t.includes('DÉCONNECTER') || t.includes('DECONNEXION') || t==='3D' || t==='CLASSIC' || t==='BASIC' || t==='NORMAL' || t==='MA CHANCE' || t==='TEST'){
    b.remove();
  }
});

// 2. ENLEVER LA VIEILLE PAGE AVEC SE RETIRER EN ROUGE + EN-TETE DE JEU
// On cache tous les div qui contiennent SE RETIRER ou NET LOTO AT 590
document.querySelectorAll('div').forEach(d=>{
  let txt=(d.textContent||'');
  // Petits blocs d'en-tête seulement, pas toute la page
  if(txt.includes('SE RETIRER') && txt.length<500){
    d.style.display='none';
  }
  if(txt.includes('NET LOTO AT 590') && txt.length<500){
    // On garde pas l'ancien, on va mettre le nouveau
    d.style.display='none';
  }
});

// Enlever aussi les anciens barTopTous en double
document.querySelectorAll('#barTopTous').forEach((el,i)=>{
  if(i>0) el.remove();
});

// 3. CREER LA NOUVELLE BARRE PROPRE : 1 SEUL RETOUR + 1 SEUL DECONNEXION, TOUT PETIT
if(document.getElementById('barTopTous')) document.getElementById('barTopTous').remove();
let bar=document.createElement('div'); bar.id='barTopTous';
bar.style.cssText='display:flex;gap:4px;padding:2px 4px;position:fixed;top:0;left:0;right:0;z-index:10010;justify-content:flex-end;background:#fff;border-bottom:1px solid #ccc';
bar.innerHTML='<button id="btnRetourTous" style="padding:2px 6px;font-size:9px;height:22px;border-radius:4px;min-width:60px;background:#eee;border:1px solid #000;font-weight:bold">⬅ RETOUR</button><button id="btnDecoTous" style="padding:2px 6px;font-size:9px;height:22px;border-radius:4px;min-width:60px;background:#ff4444;color:#fff;border:none;font-weight:bold">🚪 DÉCONNEXION</button>';
document.body.prepend(bar);
document.getElementById('btnRetourTous').onclick=()=>{ history.back(); };
document.getElementById('btnDecoTous').onclick=()=>{ localStorage.removeItem('currentUser'); localStorage.removeItem('isRevendeur'); localStorage.removeItem('isAdmin'); alert('Tu es déconnecté'); location.reload(); };

// 4. CREER LA NOUVELLE PAGE REVENDEUR PROPRE
if(document.getElementById('pageRevendeur')) document.getElementById('pageRevendeur').remove();
let p=document.createElement('div'); p.id='pageRevendeur';
p.style.cssText='background:#fff;color:#000;padding:12px;border-radius:10px;margin:30px 10px 5px 10px;border:2px solid #000';
p.innerHTML=
'<div style="text-align:center">'+
'<b style="font-size:18px">BIENVENUE SUR<br>NET LOTO AT 5/90</b><br>'+
'<span style="font-size:14px;font-weight:bold;color:green">COMPTE REVENDEUR : '+qui+'</span>'+
'</div><br>'+
'<div style="background:#000;color:#fff;padding:10px;border-radius:10px;text-align:center"><span style="font-size:11px">SOLDE REVENDEUR</span><br><b id="soldeRev" style="font-size:24px">0 F</b></div><br>'+
'<input id="montantRechargeRev" type="number" placeholder="Montant ex: 10000" style="width:100%;padding:10px;border:1px solid #000;border-radius:8px;margin:6px 0">'+
'<button id="btnRechargeAdmin" style="background:green;color:#fff;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold;font-size:13px">📲 RECHARGER MON COMPTE REVENDEUR PAR ADMIN</button><br><br>'+
'<input id="telClientRecharge" type="tel" placeholder="N° WhatsApp du client ex: 229..." style="width:100%;padding:10px;border:1px solid #000;border-radius:8px;margin:6px 0">'+
'<input id="montantClientRecharge" type="number" placeholder="Montant pour le client ex: 5000" style="width:100%;padding:10px;border:1px solid #000;border-radius:8px;margin:6px 0">'+
'<button id="btnRechargerClient" style="background:orange;color:#000;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold;font-size:13px">💸 RECHARGER CLIENT</button>';

document.body.prepend(p);
document.body.prepend(bar);

let solde = parseInt(localStorage.getItem('soldeRev_'+qui)||'0');
document.getElementById('soldeRev').textContent = solde.toLocaleString()+' F';

document.getElementById('btnRechargeAdmin').onclick=()=>{
  let m=document.getElementById('montantRechargeRev').value;
  if(!m){ alert('Mets le montant d\'abord'); return; }
  let msg='Bonjour ADMIN, je suis le REVENDEUR '+qui+', je veux me recharger de '+m+' F. Merci de recharger mon compte.';
  let numAdmin='22900000000';
  window.open('https://wa.me/'+numAdmin+'?text='+encodeURIComponent(msg),'_blank');
  alert('Message envoyé à l\'admin sur WhatsApp.');
};
document.getElementById('btnRechargerClient').onclick=()=>{
  let tel=document.getElementById('telClientRecharge').value;
  let mont=document.getElementById('montantClientRecharge').value;
  if(!tel || !mont){ alert('Mets le numéro du client et le montant'); return; }
  let s=parseInt(localStorage.getItem('soldeRev_'+qui)||'0');
  if(s < parseInt(mont)){ alert('Ton solde est insuffisant. Recharge-toi chez l\'admin d\'abord.'); return; }
  let code=Math.floor(100000+Math.random()*900000);
  localStorage.setItem('codeRecharge_'+tel, code+'|'+mont+'|'+qui);
  let msg='Bonjour, ton revendeur '+qui+' veut te recharger de '+mont+' F. Ton code est : '+code+'. Donne ce code au revendeur pour valider.';
  window.open('https://wa.me/'+tel.replace(/\D/g,'')+'?text='+encodeURIComponent(msg),'_blank');
  alert('Code '+code+' envoyé sur WhatsApp du client.');
};

// Re-vérifier toutes les 2 sec pour enlever les anciens qui reviennent
setInterval(()=>{
  document.querySelectorAll('button').forEach(b=>{
    let t=(b.textContent||'').trim().toUpperCase();
    if(b.id==='btnRetourTous' || b.id==='btnDecoTous' || b.id==='btnRechargeAdmin' || b.id==='btnRechargerClient') return;
    if(t.includes('RETOUR') || t.includes('DECONNECTER') || t.includes('DÉCONNECTER') || t==='3D' || t==='CLASSIC' || t==='BASIC' || t==='NORMAL' || t==='MA CHANCE'){
      b.remove();
    }
  });
},2000);

},1000);
