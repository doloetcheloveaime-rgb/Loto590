// REVENDEUR.JS V9 - ON SAIT QUI TU ES AU MOMENT DU LOGIN
// 1. CAPTURER LE NOM QUAND TU APPUIES SUR SE CONNECTER
function capturerLogin(){
  document.querySelectorAll('button').forEach(b=>{
    let t=(b.textContent||'').trim().toUpperCase();
    if(t.includes('SE CONNECTER') || t.includes('CONNEXION') || t.includes('ENTRER') || t.includes('VALIDER')){
      if(b.dataset.capture) return;
      b.dataset.capture='1';
      b.addEventListener('click', ()=>{
        setTimeout(()=>{
          // On prend ce que tu as tapé dans les inputs
          let vals=[];
          document.querySelectorAll('input').forEach(i=>{ if(i.value) vals.push(i.value); });
          let tout = vals.join(' ').toUpperCase();
          console.log('LOGIN TAPÉ :', tout);
          if(tout.includes('REV1') || tout.includes('REV')){
            localStorage.setItem('monRole','REV');
          } else if(tout.includes('ADMIN')){
            localStorage.setItem('monRole','ADMIN');
          }
          // On attend 1 sec et on relance
          setTimeout(()=>{ location.reload(); }, 800);
        },300);
      });
    }
  });
  // Aussi capturer avec Entrée dans les inputs
  document.querySelectorAll('input').forEach(inp=>{
    if(inp.dataset.capture) return;
    inp.dataset.capture='1';
    inp.addEventListener('change', ()=>{
      let v=(inp.value||'').toUpperCase();
      if(v.includes('REV')) localStorage.setItem('monRole','REV');
      if(v.includes('ADMIN')) localStorage.setItem('monRole','ADMIN');
    });
  });
}
capturerLogin();
setInterval(capturerLogin, 1000);

// 2. QUI TU ES ? On regarde SEULEMENT ce qu'on a capturé, pas le texte de la page
let monRole = localStorage.getItem('monRole') || '';
// Si on est sur la page SE CONNECTER, on ne fait rien, on attend
let surLogin = (document.body.innerText||'').toUpperCase().includes('SE CONNECTER') && !document.getElementById('pageRevendeur') && !monRole;
if(monRole && !document.getElementById('pageRevendeur')){

  // 3. CACHER TOUTE L'ANCIENNE PAGE DE SUITE.JS - ADMIN + REVENDEUR ENSEMBLE
  // On cache tout sauf notre future page
  document.querySelectorAll('body > div').forEach(d=>{
    if(d.id==='barTopTous' || d.id==='pageRevendeur') return;
    // On garde seulement si c'est notre barre, sinon on cache
    d.style.display='none';
  });
  document.querySelectorAll('body > button').forEach(b=>{ b.style.display='none'; });

  // 4. BARRE HAUT : 3 BARRES + RETOUR + DECONNEXION - POUR LES 2
  let bar=document.createElement('div'); bar.id='barTopTous';
  bar.style.cssText='display:flex;gap:4px;padding:2px 4px;position:fixed;top:0;left:0;right:0;z-index:99999;justify-content:space-between;align-items:center;background:#fff;border-bottom:1px solid #ccc;height:30px';
  bar.innerHTML='<button id="btnMenuTous" style="padding:2px 8px;font-size:16px;height:24px;border-radius:4px;background:#eee;border:1px solid #000;font-weight:bold">☰</button><div style="display:flex;gap:4px"><button id="btnRetourTous" style="padding:2px 6px;font-size:9px;height:22px;border-radius:4px;min-width:60px;background:#eee;border:1px solid #000;font-weight:bold">⬅ RETOUR</button><button id="btnDecoTous" style="padding:2px 6px;font-size:9px;height:22px;border-radius:4px;min-width:60px;background:#ff4444;color:#fff;border:none;font-weight:bold">🚪 DÉCONNEXION</button></div>';
  document.body.prepend(bar);
  document.getElementById('btnRetourTous').onclick=()=>{ history.back(); };
  document.getElementById('btnDecoTous').onclick=()=>{ localStorage.removeItem('monRole'); localStorage.clear(); alert('Tu es déconnecté'); location.reload(); };
  document.getElementById('btnMenuTous').onclick=()=>{
    let m=document.getElementById('menuTous');
    if(m){ m.style.display=m.style.display==='none'?'block':'none'; return; }
    let mm=document.createElement('div'); mm.id='menuTous';
    mm.style.cssText='position:fixed;top:32px;left:4px;z-index:100000;background:#fff;border:1px solid #000;border-radius:8px;padding:8px;width:200px';
    mm.innerHTML='<b>MENU</b><br><br><button onclick="location.reload()" style="width:100%;padding:8px">🔄 Actualiser</button><br><button onclick="document.getElementById(\'menuTous\').style.display=\'none\'" style="width:100%;padding:8px">❌ Fermer</button>';
    document.body.appendChild(mm);
  };

  // 5. UNE SEULE PAGE, SELON TON ROLE
  let p=document.createElement('div'); p.id='pageRevendeur';
  p.style.cssText='background:#fff;color:#000;padding:12px;border-radius:10px;margin:38px 10px 5px 10px;border:2px solid #000;position:relative;z-index:99998';

  if(monRole==='ADMIN'){
    let caisse = parseInt(localStorage.getItem('caisseAdmin')||'0');
    p.innerHTML='<div style="text-align:center"><b style="font-size:18px">BIENVENUE SUR<br>NET LOTO AT 5/90</b><br><span style="font-size:14px;font-weight:bold;color:red">COMPTE ADMIN</span></div><br>'+
    '<div style="background:#000;color:#fff;padding:10px;border-radius:10px;text-align:center"><span style="font-size:11px">CAISSE ADMIN</span><br><b style="font-size:24px">'+caisse.toLocaleString()+' F</b></div><br>'+
    '<input id="telClientRecharge" type="tel" placeholder="N° Revendeur / Client" style="width:100%;padding:10px;border:1px solid #000;border-radius:8px;margin:6px 0">'+
    '<input id="montantClientRecharge" type="number" placeholder="Montant ex: 10000" style="width:100%;padding:10px;border:1px solid #000;border-radius:8px;margin:6px 0">'+
    '<button id="btnRechargerClient" style="background:green;color:#fff;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold">💸 RECHARGER REVENDEUR / CLIENT</button><br><br>'+
    '<button id="btnValiderRev" style="background:blue;color:#fff;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold">✅ VALIDER LA RECHARGE</button><br><br>'+
    '<button id="btnArchive" style="background:#eee;padding:10px;width:100%;border:1px solid #000;border-radius:8px;font-weight:bold">📁 ARCHIVE ADMIN</button>'+
    '<div id="zoneArchive" style="display:none;margin-top:8px;border:1px solid #ccc;padding:8px;border-radius:8px;font-size:12px"></div>';
    document.body.prepend(p);
    document.getElementById('btnRechargerClient').onclick=()=>{
      let tel=document.getElementById('telClientRecharge').value; let mont=document.getElementById('montantClientRecharge').value;
      if(!tel||!mont){ alert('Mets numéro + montant'); return; }
      let code=Math.floor(100000+Math.random()*900000);
      let h=JSON.parse(localStorage.getItem('archive_ADMIN')||'[]'); h.push('Recharge '+mont+' F vers '+tel+' Code '+code); localStorage.setItem('archive_ADMIN', JSON.stringify(h));
      alert('Code '+code+' créé pour '+tel);
    };
    document.getElementById('btnValiderRev').onclick=()=>{ alert('Validé par ADMIN'); location.reload(); };
    document.getElementById('btnArchive').onclick=()=>{
      let z=document.getElementById('zoneArchive'); z.style.display=z.style.display==='none'?'block':'none';
      let h=JSON.parse(localStorage.getItem('archive_ADMIN')||'[]'); z.innerHTML=h.length?h.map(x=>'<div>• '+x+'</div>').join(''):'Aucune activité ADMIN';
    };
  } else {
    // REV1 SEUL
    let solde = parseInt(localStorage.getItem('soldeRev_REV1')||'0');
    p.innerHTML='<div style="text-align:center"><b style="font-size:18px">BIENVENUE SUR<br>NET LOTO AT 5/90</b><br><span style="font-size:14px;font-weight:bold;color:green">COMPTE REVENDEUR : REV1</span></div><br>'+
    '<div style="background:#000;color:#fff;padding:10px;border-radius:10px;text-align:center"><span style="font-size:11px">SOLDE REVENDEUR</span><br><b style="font-size:24px">'+solde.toLocaleString()+' F</b></div><br>'+
    '<input id="montantRechargeRev" type="number" placeholder="Montant ex: 10000" style="width:100%;padding:10px;border:1px solid #000;border-radius:8px;margin:6px 0">'+
    '<button id="btnRechargeAdmin" style="background:green;color:#fff;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold">📲 RECHARGER MON COMPTE PAR ADMIN</button><br><br>'+
    '<input id="telClientRecharge" type="tel" placeholder="N° Client ex: 229..." style="width:100%;padding:10px;border:1px solid #000;border-radius:8px;margin:6px 0">'+
    '<input id="montantClientRecharge" type="number" placeholder="Montant pour client ex: 5000" style="width:100%;padding:10px;border:1px solid #000;border-radius:8px;margin:6px 0">'+
    '<button id="btnRechargerClient" style="background:orange;color:#000;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold">💸 RECHARGER CLIENT</button><br><br>'+
    '<button id="btnArchive" style="background:#eee;padding:10px;width:100%;border:1px solid #000;border-radius:8px;font-weight:bold">📁 MON ARCHIVE - Mes propres activités</button>'+
    '<div id="zoneArchive" style="display:none;margin-top:8px;border:1px solid #ccc;padding:8px;border-radius:8px;font-size:12px"></div>';
    document.body.prepend(p);
    document.getElementById('btnRechargeAdmin').onclick=()=>{
      let m=document.getElementById('montantRechargeRev').value; if(!m){ alert('Mets montant'); return; }
      let h=JSON.parse(localStorage.getItem('archive_REV1')||'[]'); h.push('Demande recharge '+m+' F à ADMIN'); localStorage.setItem('archive_REV1', JSON.stringify(h));
      window.open('https://wa.me/22900000000?text='+encodeURIComponent('Bonjour ADMIN, je suis REV1, je veux '+m+' F'),'_blank');
    };
    document.getElementById('btnRechargerClient').onclick=()=>{
      let tel=document.getElementById('telClientRecharge').value; let mont=document.getElementById('montantClientRecharge').value;
      if(!tel||!mont){ alert('Mets numéro + montant'); return; }
      let code=Math.floor(100000+Math.random()*900000);
      let h=JSON.parse(localStorage.getItem('archive_REV1')||'[]'); h.push('Recharge client '+tel+' : '+mont+' F Code '+code); localStorage.setItem('archive_REV1', JSON.stringify(h));
      window.open('https://wa.me/'+tel.replace(/\D/g,'')+'?text='+encodeURIComponent('Ton code '+mont+' F est : '+code),'_blank');
      alert('Code '+code+' envoyé, dans TON archive');
    };
    document.getElementById('btnArchive').onclick=()=>{
      let z=document.getElementById('zoneArchive'); z.style.display=z.style.display==='none'?'block':'none';
      let h=JSON.parse(localStorage.getItem('archive_REV1')||'[]'); z.innerHTML=h.length?h.map(x=>'<div>• '+x+'</div>').join(''):'Aucune activité. Tout ce que tu fais reste ici.';
    };
  }
  document.body.prepend(document.getElementById('barTopTous'));
      }
