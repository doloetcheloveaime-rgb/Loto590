// REVENDEUR.JS V7 - ON REGARDE L'ECRAN, PAS LOCALSTORAGE
function estRevendeurSurEcran(){
  let txt = (document.body.innerText||"").toLowerCase();
  return txt.includes('rev1') || txt.includes('revendeur');
}

function lancerRevendeur(){
  if(document.getElementById('pageRevendeur')) return; // Déjà lancé
  if(!estRevendeurSurEcran()) return; // Pas encore REV1, on attend SE CONNECTER

  // 1. BARRE HAUT : 3 BARRES + RETOUR + DECONNEXION
  if(!document.getElementById('barTopTous')){
    let bar=document.createElement('div'); bar.id='barTopTous';
    bar.style.cssText='display:flex;gap:4px;padding:2px 4px;position:fixed;top:0;left:0;right:0;z-index:99999;justify-content:space-between;align-items:center;background:#fff;border-bottom:1px solid #ccc;height:28px';
    bar.innerHTML='<button id="btnMenuTous" style="padding:2px 8px;font-size:14px;height:22px;border-radius:4px;background:#eee;border:1px solid #000;font-weight:bold">☰</button><div style="display:flex;gap:4px"><button id="btnRetourTous" style="padding:2px 6px;font-size:9px;height:22px;border-radius:4px;min-width:60px;background:#eee;border:1px solid #000;font-weight:bold">⬅ RETOUR</button><button id="btnDecoTous" style="padding:2px 6px;font-size:9px;height:22px;border-radius:4px;min-width:60px;background:#ff4444;color:#fff;border:none;font-weight:bold">🚪 DÉCONNEXION</button></div>';
    document.body.prepend(bar);
    document.getElementById('btnRetourTous').onclick=()=>{ history.back(); };
    document.getElementById('btnDecoTous').onclick=()=>{ localStorage.clear(); sessionStorage.clear(); alert('Tu es déconnecté'); location.reload(); };
    document.getElementById('btnMenuTous').onclick=()=>{ alert('Menu : RETOUR - DECONNEXION - RECHARGER'); };
  }

  // 2. NETTOYAGE - On enlève le jeu, mais on garde nos boutons + ☰
  document.querySelectorAll('button').forEach(b=>{
    let t=(b.textContent||'').trim().toUpperCase();
    if(b.id==='btnRetourTous' || b.id==='btnDecoTous' || b.id==='btnMenuTous' || b.id==='btnRechargeAdmin' || b.id==='btnRechargerClient') return;
    if(t==='☰' || t==='MENU') return;
    if(t.includes('RETOUR') || t.includes('DÉCONNEXION') || t.includes('DECONNEXION') || t==='NORMAL' || t==='MA CHANCE' || t==='TWO SURE' || t==='PERMUTATION' || t==='NAP' || t==='AGAINST' || t==='ANAGRAMME' || t==='CHANCE +' || t==='TOTAL RÉSULTAT' || t.includes('NAPPE')){
      b.remove();
    }
  });

  // 3. PAGE REVENDEUR
  let p=document.createElement('div'); p.id='pageRevendeur';
  p.style.cssText='background:#fff;color:#000;padding:12px;border-radius:10px;margin:35px 10px 5px 10px;border:2px solid #000;position:relative;z-index:99998';
  p.innerHTML=
  '<div style="text-align:center"><b style="font-size:18px">BIENVENUE SUR<br>NET LOTO AT 5/90</b><br><span style="font-size:14px;font-weight:bold;color:green">COMPTE REVENDEUR : REV1</span></div><br>'+
  '<div style="background:#000;color:#fff;padding:10px;border-radius:10px;text-align:center"><span style="font-size:11px">SOLDE REVENDEUR</span><br><b id="soldeRev" style="font-size:24px">0 F</b></div><br>'+
  '<input id="montantRechargeRev" type="number" placeholder="Montant ex: 10000" style="width:100%;padding:10px;border:1px solid #000;border-radius:8px;margin:6px 0">'+
  '<button id="btnRechargeAdmin" style="background:green;color:#fff;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold;font-size:13px">📲 RECHARGER MON COMPTE REVENDEUR PAR ADMIN</button><br><br>'+
  '<input id="telClientRecharge" type="tel" placeholder="N° WhatsApp du client ex: 229..." style="width:100%;padding:10px;border:1px solid #000;border-radius:8px;margin:6px 0">'+
  '<input id="montantClientRecharge" type="number" placeholder="Montant pour le client ex: 5000" style="width:100%;padding:10px;border:1px solid #000;border-radius:8px;margin:6px 0">'+
  '<button id="btnRechargerClient" style="background:orange;color:#000;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold;font-size:13px">💸 RECHARGER CLIENT</button>';
  document.body.prepend(p);
  document.body.prepend(document.getElementById('barTopTous'));

  document.getElementById('btnRechargeAdmin').onclick=()=>{
    let m=document.getElementById('montantRechargeRev').value;
    if(!m){ alert('Mets le montant'); return; }
    window.open('https://wa.me/22900000000?text='+encodeURIComponent('Bonjour ADMIN, je suis REVENDEUR REV1, je veux '+m+' F'),'_blank');
  };
  document.getElementById('btnRechargerClient').onclick=()=>{
    let tel=document.getElementById('telClientRecharge').value;
    let mont=document.getElementById('montantClientRecharge').value;
    if(!tel||!mont){ alert('Mets numéro + montant'); return; }
    let code=Math.floor(100000+Math.random()*900000);
    window.open('https://wa.me/'+tel.replace(/\D/g,'')+'?text='+encodeURIComponent('Ton code recharge '+mont+' F est : '+code),'_blank');
    alert('Code '+code+' envoyé');
  };
}

// On regarde toutes les 1 seconde : est-ce que REV1 est apparu sur l'écran ?
setInterval(()=>{
  if(!document.getElementById('pageRevendeur')){
    lancerRevendeur();
  } else {
    // Si déjà lancé, continuer à nettoyer le jeu qui revient
    document.querySelectorAll('button').forEach(b=>{
      let t=(b.textContent||'').trim().toUpperCase();
      if(b.id==='btnRetourTous' || b.id==='btnDecoTous' || b.id==='btnMenuTous' || b.id==='btnRechargeAdmin' || b.id==='btnRechargerClient') return;
      if(t==='☰' || t==='MENU') return;
      if(t.includes('RETOUR') || t.includes('DÉCONNEXION') || t.includes('DECONNEXION') || t==='NORMAL' || t==='MA CHANCE'){
        b.remove();
      }
    });
    // Si la barre a disparu, on la recrée
    if(!document.getElementById('barTopTous')){
      document.getElementById('pageRevendeur').remove();
      lancerRevendeur();
    }
  }
},1000);
