// REVENDEUR.JS V10 - UNE FOIS ADMIN, TU RESTES ADMIN. UNE FOIS REV1, TU RESTES REV1.
// 1. SI ON EST DEJA CONNECTE, ON NE RE-CAPTURE PLUS JAMAIS
let monRole = localStorage.getItem('monRole') || '';

if(!monRole){
  // On capture UNE SEULE FOIS, seulement sur le bouton SE CONNECTER
  let dejaCapture = false;
  setInterval(()=>{
    if(dejaCapture || localStorage.getItem('monRole')) return;
    document.querySelectorAll('button').forEach(b=>{
      let t=(b.textContent||'').trim().toUpperCase();
      // SEULEMENT le vrai bouton de connexion, pas VALIDER, pas RECHARGER
      if(t==='SE CONNECTER' || t==='SE CONNECTER '){
        if(b.dataset.capture) return;
        b.dataset.capture='1';
        b.addEventListener('click', ()=>{
          dejaCapture = true;
          setTimeout(()=>{
            let vals=[];
            document.querySelectorAll('input').forEach(i=>{ if(i.value) vals.push(i.value); });
            let tout = vals.join(' ').toUpperCase();
            // On regarde ce que TU as tapé, pas ce qui est écrit sur la page
            if(tout.includes('REV1')) localStorage.setItem('monRole','REV');
            else if(tout.includes('ADMIN')) localStorage.setItem('monRole','ADMIN');
            setTimeout(()=>location.reload(), 500);
          },400);
        });
      }
    });
  },1000);
  // Si pas encore connecté, on s'arrête là, on laisse SE CONNECTER
  // On ne fait RIEN d'autre
} else {
  // 2. ON EST CONNECTE, ON AFFICHE UNE SEULE PAGE, ET ON NE CHANGE PLUS
  // Cacher TOUTE l'ancienne page suite.js
  document.querySelectorAll('body > div').forEach(d=>{
    if(d.id==='barTopTous' || d.id==='pageRevendeur') return;
    d.style.display='none';
  });
  document.querySelectorAll('body > button').forEach(b=>{ b.style.display='none'; });

  // Barre haut : 3 barres + RETOUR + DECONNEXION
  if(!document.getElementById('barTopTous')){
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
      mm.innerHTML='<b>MENU - '+monRole+'</b><br><br><button onclick="location.reload()" style="width:100%;padding:8px">🔄 Actualiser</button><br><button onclick="document.getElementById(\'menuTous\').style.display=\'none\'" style="width:100%;padding:8px">❌ Fermer</button>';
      document.body.appendChild(mm);
    };
  }

  // Une seule page
  if(!document.getElementById('pageRevendeur')){
    let p=document.createElement('div'); p.id='pageRevendeur';
    p.style.cssText='background:#fff;color:#000;padding:12px;border-radius:10px;margin:38px 10px 5px 10px;border:2px solid #000;position:relative;z-index:99998';

    if(monRole==='ADMIN'){
      let caisse = parseInt(localStorage.getItem('caisseAdmin')||'0');
      p.innerHTML='<div style="text-align:center"><b style="font-size:18px">BIENVENUE SUR<br>NET LOTO AT 5/90</b><br><span style="font-size:14px;font-weight:bold;color:red">COMPTE ADMIN - SEUL</span></div><br>'+
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
      document.getElementById('btnValiderRev').onclick=()=>{ alert('Validé par ADMIN'); };
      document.getElementById('btnArchive').onclick=()=>{
        let z=document.getElementById('zoneArchive'); z.style.display=z.style.display==='none'?'block':'none';
        let h=JSON.parse(localStorage.getItem('archive_ADMIN')||'[]'); z.innerHTML=h.length?h.map(x=>'<div>• '+x+'</div>').join(''):'Aucune activité ADMIN';
      };
    } else {
      let solde = parseInt(localStorage.getItem('soldeRev_REV1')||'0');
      p.innerHTML='<div style="text-align:center"><b style="font-size:18px">BIENVENUE SUR<br>NET LOTO AT 5/90</b><br><span style="font-size:14px;font-weight:bold;color:green">COMPTE REVENDEUR : REV1 - SEUL</span></div><br>'+
      '<div style="background:#000;color:#fff;padding:10px;border-radius:10px;text-align:center"><span style="font-size:11px">SOLDE REVENDEUR</span><br><b style="font-size:24px">'+solde.toLocaleString()+' F</b></div><br>'+
      '<input id="montantRechargeRev" type="number" placeholder="Montant ex: 10000" style="width:100%;padding:10px;border:1px solid #000;border-radius:8px;margin:6px 0">'+
      '<button id="btnRechargeAdmin" style="background:green;color:#fff;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold">📲 RECHARGER MON COMPTE PAR ADMIN</button><br><br>'+
      '<input id="telClientRecharge" type="tel" placeholder="N° Client ex: 229..." style="width:100%;padding:10px;border:1px solid #000;border-radius:8px;margin:6px 0">'+
      '<input id="montantClientRecharge" type="number" placeholder="Montant pour client ex: 5000" style="width:100%;padding:10px;border:1px solid #000;border-radius:8px;margin:6px 0">'+
      '<button id="btnRechargerClient" style="background:orange;color:#000;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold">💸 RECHARGER CLIENT</button><br><br>'+
      '<button id="btnArchive" style="background:#eee;padding:10px;width:100%;border:1px solid #000;border-radius:8px;font-weight:bold">📁 MON ARCHIVE</button>'+
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
}
