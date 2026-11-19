// REVENDEUR.JS V8 - ADMIN ET REVENDEUR SEPARES, MEME HAUT
function quiEstConnecte(){
  let txt = (document.body.innerText||"").toUpperCase();
  if(txt.includes('REV1') || txt.includes('REVENDEUR')) return 'REV';
  if(txt.includes('ADMIN')) return 'ADMIN';
  return '';
}

function lancer(){
  let role = quiEstConnecte();
  if(!role) return;
  if(document.getElementById('pageRevendeur')) return;

  // 1. BARRE HAUT POUR LES 2 : 3 BARRES A GAUCHE, RETOUR + DECONNEXION A DROITE
  if(!document.getElementById('barTopTous')){
    let bar=document.createElement('div'); bar.id='barTopTous';
    bar.style.cssText='display:flex;gap:4px;padding:2px 4px;position:fixed;top:0;left:0;right:0;z-index:99999;justify-content:space-between;align-items:center;background:#fff;border-bottom:1px solid #ccc;height:30px';
    bar.innerHTML='<button id="btnMenuTous" style="padding:2px 8px;font-size:16px;height:24px;border-radius:4px;background:#eee;border:1px solid #000;font-weight:bold">☰</button><div style="display:flex;gap:4px"><button id="btnRetourTous" style="padding:2px 6px;font-size:9px;height:22px;border-radius:4px;min-width:60px;background:#eee;border:1px solid #000;font-weight:bold">⬅ RETOUR</button><button id="btnDecoTous" style="padding:2px 6px;font-size:9px;height:22px;border-radius:4px;min-width:60px;background:#ff4444;color:#fff;border:none;font-weight:bold">🚪 DÉCONNEXION</button></div>';
    document.body.prepend(bar);
    document.getElementById('btnRetourTous').onclick=()=>{ history.back(); };
    document.getElementById('btnDecoTous').onclick=()=>{ localStorage.clear(); sessionStorage.clear(); alert('Tu es déconnecté'); location.reload(); };
    document.getElementById('btnMenuTous').onclick=()=>{
      let menu=document.getElementById('menuTous');
      if(menu){ menu.style.display = menu.style.display==='none' ? 'block' : 'none'; return; }
      let m=document.createElement('div'); m.id='menuTous';
      m.style.cssText='position:fixed;top:32px;left:4px;z-index:100000;background:#fff;border:1px solid #000;border-radius:8px;padding:8px;width:200px';
      m.innerHTML='<b>MENU</b><br><br><button onclick="location.reload()" style="width:100%;padding:8px;margin:2px">🔄 Actualiser</button><br><button onclick="document.getElementById(\'menuTous\').style.display=\'none\'" style="width:100%;padding:8px;margin:2px">❌ Fermer</button>';
      document.body.appendChild(m);
    };
  }

  // 2. NETTOYAGE - On enlève le jeu, on garde nos boutons
  document.querySelectorAll('button').forEach(b=>{
    let t=(b.textContent||'').trim().toUpperCase();
    if(['btnRetourTous','btnDecoTous','btnMenuTous','btnRechargeAdmin','btnRechargerClient','btnValiderRev','btnArchive'].includes(b.id)) return;
    if(t==='☰' || t==='MENU') return;
    if(t.includes('RETOUR') || t.includes('DÉCONNEXION') || t.includes('DECONNEXION') || t==='NORMAL' || t==='MA CHANCE' || t==='TWO SURE' || t==='PERMUTATION' || t==='NAP' || t==='AGAINST' || t==='ANAGRAMME' || t==='CHANCE +' || t==='TOTAL RÉSULTAT'){
      b.remove();
    }
  });

  // 3. PAGE - MEME HAUT POUR LES 2, SEULE L'ARCHIVE CHANGE
  let p=document.createElement('div'); p.id='pageRevendeur';
  p.style.cssText='background:#fff;color:#000;padding:12px;border-radius:10px;margin:38px 10px 5px 10px;border:2px solid #000;position:relative;z-index:99998';

  if(role==='ADMIN'){
    // ===== ADMIN =====
    let caisse = parseInt(localStorage.getItem('caisseAdmin')||'0');
    let histoAdmin = JSON.parse(localStorage.getItem('archive_ADMIN')||'[]');
    p.innerHTML=
    '<div style="text-align:center"><b style="font-size:18px">BIENVENUE SUR<br>NET LOTO AT 5/90</b><br><span style="font-size:14px;font-weight:bold;color:red">COMPTE ADMIN</span></div><br>'+
    '<div style="background:#000;color:#fff;padding:10px;border-radius:10px;text-align:center"><span style="font-size:11px">CAISSE ADMIN</span><br><b style="font-size:24px">'+caisse.toLocaleString()+' F</b></div><br>'+
    '<input id="telClientRecharge" type="tel" placeholder="N° Revendeur / Client ex: 229..." style="width:100%;padding:10px;border:1px solid #000;border-radius:8px;margin:6px 0">'+
    '<input id="montantClientRecharge" type="number" placeholder="Montant à recharger ex: 10000" style="width:100%;padding:10px;border:1px solid #000;border-radius:8px;margin:6px 0">'+
    '<button id="btnRechargerClient" style="background:green;color:#fff;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold">💸 RECHARGER REVENDEUR / CLIENT</button><br><br>'+
    '<button id="btnValiderRev" style="background:blue;color:#fff;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold">✅ VALIDER LA RECHARGE</button><br><br>'+
    '<button id="btnArchive" style="background:#eee;padding:10px;width:100%;border:1px solid #000;border-radius:8px;font-weight:bold">📁 ARCHIVE ADMIN - Voir mes activités</button>'+
    '<div id="zoneArchive" style="display:none;margin-top:8px;border:1px solid #ccc;padding:8px;border-radius:8px;font-size:12px"></div>';
    document.body.prepend(p);
    document.getElementById('btnRechargerClient').onclick=()=>{
      let tel=document.getElementById('telClientRecharge').value;
      let mont=document.getElementById('montantClientRecharge').value;
      if(!tel||!mont){ alert('Mets numéro + montant'); return; }
      let code=Math.floor(100000+Math.random()*900000);
      localStorage.setItem('demande_'+tel, code+'|'+mont);
      let h=JSON.parse(localStorage.getItem('archive_ADMIN')||'[]'); h.push('Recharge '+mont+' F vers '+tel+' - Code '+code); localStorage.setItem('archive_ADMIN', JSON.stringify(h));
      alert('Code '+code+' créé pour '+tel+'. Appuie sur VALIDER pour confirmer.');
    };
    document.getElementById('btnValiderRev').onclick=()=>{
      alert('Recharge validée par ADMIN. Caisse mise à jour.');
      let c=parseInt(localStorage.getItem('caisseAdmin')||'0'); localStorage.setItem('caisseAdmin', c+1000);
      location.reload();
    };
    document.getElementById('btnArchive').onclick=()=>{
      let z=document.getElementById('zoneArchive'); z.style.display=z.style.display==='none'?'block':'none';
      let h=JSON.parse(localStorage.getItem('archive_ADMIN')||'[]');
      z.innerHTML = h.length? h.map(x=>'<div>• '+x+'</div>').join('') : 'Aucune activité pour le moment';
    };

  } else {
    // ===== REVENDEUR REV1 =====
    let solde = parseInt(localStorage.getItem('soldeRev_REV1')||'0');
    p.innerHTML=
    '<div style="text-align:center"><b style="font-size:18px">BIENVENUE SUR<br>NET LOTO AT 5/90</b><br><span style="font-size:14px;font-weight:bold;color:green">COMPTE REVENDEUR : REV1</span></div><br>'+
    '<div style="background:#000;color:#fff;padding:10px;border-radius:10px;text-align:center"><span style="font-size:11px">SOLDE REVENDEUR</span><br><b id="soldeRev" style="font-size:24px">'+solde.toLocaleString()+' F</b></div><br>'+
    '<input id="montantRechargeRev" type="number" placeholder="Montant ex: 10000" style="width:100%;padding:10px;border:1px solid #000;border-radius:8px;margin:6px 0">'+
    '<button id="btnRechargeAdmin" style="background:green;color:#fff;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold;font-size:13px">📲 RECHARGER MON COMPTE REVENDEUR PAR ADMIN</button><br><br>'+
    '<input id="telClientRecharge" type="tel" placeholder="N° WhatsApp du client ex: 229..." style="width:100%;padding:10px;border:1px solid #000;border-radius:8px;margin:6px 0">'+
    '<input id="montantClientRecharge" type="number" placeholder="Montant pour le client ex: 5000" style="width:100%;padding:10px;border:1px solid #000;border-radius:8px;margin:6px 0">'+
    '<button id="btnRechargerClient" style="background:orange;color:#000;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold;font-size:13px">💸 RECHARGER CLIENT</button><br><br>'+
    '<button id="btnArchive" style="background:#eee;padding:10px;width:100%;border:1px solid #000;border-radius:8px;font-weight:bold">📁 MON ARCHIVE - Mes propres activités</button>'+
    '<div id="zoneArchive" style="display:none;margin-top:8px;border:1px solid #ccc;padding:8px;border-radius:8px;font-size:12px"></div>';
    document.body.prepend(p);
    document.getElementById('btnRechargeAdmin').onclick=()=>{
      let m=document.getElementById('montantRechargeRev').value;
      if(!m){ alert('Mets le montant'); return; }
      let h=JSON.parse(localStorage.getItem('archive_REV1')||'[]'); h.push('Demande recharge '+m+' F à ADMIN'); localStorage.setItem('archive_REV1', JSON.stringify(h));
      window.open('https://wa.me/22900000000?text='+encodeURIComponent('Bonjour ADMIN, je suis REV1, je veux '+m+' F'),'_blank');
    };
    document.getElementById('btnRechargerClient').onclick=()=>{
      let tel=document.getElementById('telClientRecharge').value;
      let mont=document.getElementById('montantClientRecharge').value;
      if(!tel||!mont){ alert('Mets numéro + montant'); return; }
      let code=Math.floor(100000+Math.random()*900000);
      let h=JSON.parse(localStorage.getItem('archive_REV1')||'[]'); h.push('Recharge client '+tel+' : '+mont+' F - Code '+code); localStorage.setItem('archive_REV1', JSON.stringify(h));
      window.open('https://wa.me/'+tel.replace(/\D/g,'')+'?text='+encodeURIComponent('Ton code recharge '+mont+' F est : '+code),'_blank');
      alert('Code '+code+' envoyé. C\'est dans TON archive.');
    };
    document.getElementById('btnArchive').onclick=()=>{
      let z=document.getElementById('zoneArchive'); z.style.display=z.style.display==='none'?'block':'none';
      let h=JSON.parse(localStorage.getItem('archive_REV1')||'[]');
      z.innerHTML = h.length? h.map(x=>'<div>• '+x+'</div>').join('') : 'Aucune activité pour le moment. Tout ce que tu fais reste ici.';
    };
  }
  document.body.prepend(document.getElementById('barTopTous'));
}

setInterval(()=>{
  if(!document.getElementById('pageRevendeur')){
    lancer();
  }
},1000);
