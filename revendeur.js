alert("REVENDEUR.JS EST BIEN CHARGE");
// FICHIER REVENDEUR.JS - PAGE REVENDEUR SEULE
setTimeout(()=>{

// 1. RETOUR / DECONNEXION TRES TRES PETIT POUR TOUT LE MONDE
if(!document.getElementById('barTopTous')){
  let bar=document.createElement('div'); bar.id='barTopTous';
  bar.style.cssText='display:flex;gap:4px;padding:2px 4px;position:fixed;top:0;left:0;right:0;z-index:10010;justify-content:flex-end;background:transparent;border:none';
  bar.innerHTML='<button id="btnRetourTous" style="padding:2px 6px;font-size:9px;height:22px;border-radius:4px;min-width:60px;background:#eee;border:1px solid #000;font-weight:bold">⬅ RETOUR</button><button id="btnDecoTous" style="padding:2px 6px;font-size:9px;height:22px;border-radius:4px;min-width:60px;background:#ff4444;color:#fff;border:none;font-weight:bold">🚪 DÉCONNEXION</button>';
  document.body.prepend(bar);
  document.getElementById('btnRetourTous').onclick=()=>{ history.back(); };
  document.getElementById('btnDecoTous').onclick=()=>{
    localStorage.removeItem('currentUser'); localStorage.removeItem('isAdmin'); localStorage.removeItem('isRevendeur');
    alert('Tu es déconnecté'); location.reload();
  };
}

// 2. PAGE REVENDEUR EN HAUT
let qui = localStorage.getItem('currentUser') || '';
let isRev = localStorage.getItem('isRevendeur')==='1' || qui.startsWith('REV');

if(isRev && !document.getElementById('pageRevendeur')){
  let p=document.createElement('div'); p.id='pageRevendeur';
  p.style.cssText='background:#fff;color:#000;padding:12px;border-radius:10px;margin:28px 10px 5px 10px;border:2px solid #000';
  p.innerHTML=
  '<div style="text-align:center"><b style="font-size:16px">NET LOTO AT 5/90<br>REVENDEUR</b><br><span style="font-size:12px">Bienvenue : '+qui+'</span></div><br>'+
  '<div style="background:#000;color:#fff;padding:10px;border-radius:10px;text-align:center"><span style="font-size:11px">SOLDE REVENDEUR</span><br><b id="soldeRev" style="font-size:24px">0 F</b></div><br>'+
  '<b style="font-size:12px">💰 RECHARGE</b><br>'+
  '<input id="montantRechargeRev" type="number" placeholder="Montant ex: 10000" style="width:100%;padding:10px;border:1px solid #000;border-radius:8px;margin:6px 0">'+
  '<button id="btnRechargeAdmin" style="background:green;color:#fff;padding:11px;width:100%;border:none;border-radius:8px;font-weight:bold;font-size:12px">📲 SE RECHARGER CHEZ L\'ADMINISTRATEUR</button><br><br>'+
  '<input id="telClientRecharge" type="tel" placeholder="N° WhatsApp du client ex: 229..." style="width:100%;padding:10px;border:1px solid #000;border-radius:8px;margin:6px 0">'+
  '<input id="montantClientRecharge" type="number" placeholder="Montant pour le client ex: 5000" style="width:100%;padding:10px;border:1px solid #000;border-radius:8px;margin:6px 0">'+
  '<button id="btnRechargerClient" style="background:orange;color:#000;padding:11px;width:100%;border:none;border-radius:8px;font-weight:bold;font-size:12px">💸 RECHARGER LE CLIENT</button>';
  document.body.prepend(p);
  document.body.prepend(document.getElementById('barTopTous'));

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
}
},1000);
// REVENDEUR.JS - VERSION 2 : RECHARGE EN HAUT, JEU EFFACE EN HAUT
setTimeout(()=>{

// 1. RETOUR / DECONNEXION TRES PETIT - DEJA EN PLACE, ON LAISSE
if(!document.getElementById('barTopTous')){
  let bar=document.createElement('div'); bar.id='barTopTous';
  bar.style.cssText='display:flex;gap:4px;padding:2px 4px;position:fixed;top:0;left:0;right:0;z-index:10010;justify-content:flex-end;background:#fff;border-bottom:1px solid #ccc';
  bar.innerHTML='<button id="btnRetourTous" style="padding:2px 6px;font-size:9px;height:22px;border-radius:4px;min-width:60px;background:#eee;border:1px solid #000;font-weight:bold">⬅ RETOUR</button><button id="btnDecoTous" style="padding:2px 6px;font-size:9px;height:22px;border-radius:4px;min-width:60px;background:#ff4444;color:#fff;border:none;font-weight:bold">🚪 DÉCONNEXION</button>';
  document.body.prepend(bar);
  document.getElementById('btnRetourTous').onclick=()=>{ history.back(); };
  document.getElementById('btnDecoTous').onclick=()=>{ localStorage.removeItem('currentUser'); localStorage.removeItem('isAdmin'); localStorage.removeItem('isRevendeur'); alert('Tu es déconnecté'); location.reload(); };
}

// 2. EFFACER NORMAL / MA CHANCE ET L'EN-TETE DE JEU EN HAUT - POUR REVENDEUR SEULEMENT
let qui = localStorage.getItem('currentUser') || '';
let isRev = localStorage.getItem('isRevendeur')==='1' || qui.startsWith('REV');
if(!isRev) return;

document.querySelectorAll('button').forEach(b=>{
  let t=b.textContent.trim().toUpperCase();
  if(t==='NORMAL' || t==='MA CHANCE' || t==='MACHANCE' || t==='TEST' || t==='3D' || t==='CLASSIC'){
    b.style.display='none';
  }
});
// Cacher aussi le bloc qui contient NORMAL + MA CHANCE
document.querySelectorAll('div').forEach(d=>{
  let txt=(d.textContent||'');
  if(txt.includes('MA CHANCE') && txt.includes('NORMAL') && txt.length<300){
    d.style.display='none';
  }
});

// 3. BOITE RECHARGE EN HAUT
if(document.getElementById('pageRevendeur')) document.getElementById('pageRevendeur').remove();

let p=document.createElement('div'); p.id='pageRevendeur';
p.style.cssText='background:#fff;color:#000;padding:12px;border-radius:10px;margin:28px 10px 5px 10px;border:2px solid #000';
p.innerHTML=
'<div style="text-align:center"><b style="font-size:16px">NET LOTO AT 5/90<br>REVENDEUR</b><br><span style="font-size:12px">Bienvenue : '+qui+'</span></div><br>'+
'<div style="background:#000;color:#fff;padding:10px;border-radius:10px;text-align:center"><span style="font-size:11px">SOLDE REVENDEUR</span><br><b id="soldeRev" style="font-size:24px">0 F</b></div><br>'+
'<input id="montantRechargeRev" type="number" placeholder="Montant ex: 10000" style="width:100%;padding:10px;border:1px solid #000;border-radius:8px;margin:6px 0">'+
'<button id="btnRechargeAdmin" style="background:green;color:#fff;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold;font-size:13px">📲 RECHARGER MON COMPTE REVENDEUR PAR ADMIN</button><br><br>'+
'<input id="telClientRecharge" type="tel" placeholder="N° WhatsApp du client ex: 229..." style="width:100%;padding:10px;border:1px solid #000;border-radius:8px;margin:6px 0">'+
'<input id="montantClientRecharge" type="number" placeholder="Montant pour le client ex: 5000" style="width:100%;padding:10px;border:1px solid #000;border-radius:8px;margin:6px 0">'+
'<button id="btnRechargerClient" style="background:orange;color:#000;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold;font-size:13px">💸 RECHARGER CLIENT</button>';

document.body.prepend(p);
document.body.prepend(document.getElementById('barTopTous'));

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

// Vérifier toutes les 2 secondes si NORMAL / MA CHANCE revient
setInterval(()=>{
  document.querySelectorAll('button').forEach(b=>{
    let t=b.textContent.trim().toUpperCase();
    if(t==='NORMAL' || t==='MA CHANCE' || t==='TEST' || t==='3D' || t==='CLASSIC'){
      b.style.display='none';
    }
  });
},2000);

},1000);
