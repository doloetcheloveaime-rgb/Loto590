// DEBUT - NET LOTO AT 590 - VERSION FINALE V13
function out(){location.reload()}
let t=document.createElement('div');t.style.cssText='position:fixed;top:5px;right:5px;z-index:9999;display:flex;gap:5px';
t.innerHTML='<button onclick="document.getElementById(\'menuBox\').style.display=\'block\'" style="background:#000;color:#fff;padding:10px 14px;border:none;border-radius:8px;font-weight:bold">☰ MENU</button><button onclick="out()" style="background:red;color:#fff;padding:10px 14px;border:none;border-radius:8px;font-weight:bold">SORTIR</button>';
document.body.appendChild(t);

// MENU
if(!document.getElementById('menuBox')){
  let m=document.createElement('div'); m.id='menuBox';
  m.style.cssText='background:#fff;color:#000;padding:15px;border-radius:10px;display:none;position:fixed;top:50px;left:10px;z-index:10000;width:220px;border:2px solid #000';
  m.innerHTML='<b>MENU</b><br><br><button id="menuProfil" style="width:100%;padding:12px;margin:4px 0">👤 Profil</button><br><button id="menuProno" style="width:100%;padding:12px;margin:4px 0;background:gold;border:none;border-radius:8px;font-weight:bold">🔮 Pronostic du Jour</button><br><button onclick="document.getElementById(\'menuBox\').style.display=\'none\'" style="width:100%;padding:10px;margin:4px 0">FERMER</button>';
  document.body.appendChild(m);
}

// PROFIL BOX
if(!document.getElementById('profilBox')){
  let b=document.createElement('div'); b.id='profilBox';
  b.style.cssText='background:#fff;color:#000;padding:15px;border-radius:10px;display:none;position:fixed;top:60px;left:10px;right:10px;z-index:10001;max-width:400px;border:2px solid #000';
  b.innerHTML='<b>👤 MON PROFIL</b><br><br>Nom<br><input id="pNom" style="width:100%;padding:10px;margin:4px 0;border:1px solid #000;border-radius:8px"><br>Prénom<br><input id="pPrenom" style="width:100%;padding:10px;margin:4px 0;border:1px solid #000;border-radius:8px"><br>Date de naissance<br><input id="pNaiss" type="date" style="width:100%;padding:10px;margin:4px 0;border:1px solid #000;border-radius:8px"><br>Gmail<br><input id="pGmail" style="width:100%;padding:10px;margin:4px 0;border:1px solid #000;border-radius:8px"><br>Mot de passe<br><input id="pPass" type="password" style="width:100%;padding:10px;margin:4px 0;border:1px solid #000;border-radius:8px"><br><button id="btnSaveProfil" style="background:#000;color:#fff;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold">💾 ENREGISTRER PROFIL</button><button id="btnPassOublie" style="background:#fff;color:blue;padding:10px;width:100%;border:none;text-decoration:underline">Mot de passe oublié ?</button><button onclick="document.getElementById(\'profilBox\').style.display=\'none\'" style="background:#ccc;padding:10px;width:100%;border:none;border-radius:8px">FERMER</button>';
  document.body.appendChild(b);
  let prof=JSON.parse(localStorage.getItem('monProfil')||'{}');
  if(prof.nom) document.getElementById('pNom').value=prof.nom;
  if(prof.prenom) document.getElementById('pPrenom').value=prof.prenom;
  if(prof.naiss) document.getElementById('pNaiss').value=prof.naiss;
  if(prof.gmail) document.getElementById('pGmail').value=prof.gmail;
  if(prof.pass) document.getElementById('pPass').value=prof.pass;
  document.getElementById('btnSaveProfil').onclick=()=>{
    let p={nom:document.getElementById('pNom').value, prenom:document.getElementById('pPrenom').value, naiss:document.getElementById('pNaiss').value, gmail:document.getElementById('pGmail').value, pass:document.getElementById('pPass').value};
    localStorage.setItem('monProfil',JSON.stringify(p)); alert('Profil enregistré : '+p.prenom+' '+p.nom); b.style.display='none';
  };
  document.getElementById('btnPassOublie').onclick=()=>{
    let g=document.getElementById('pGmail').value; if(!g) return alert('Mets ton Gmail d\'abord');
    alert('Lien envoyé à : '+g+'\nVérifie ton Gmail.');
  };
}

// GAIN PAYE BOX
if(!document.getElementById('gainPayeBox')){
  let gbox=document.createElement('div'); gbox.id='gainPayeBox';
  gbox.style.cssText='background:#fff;color:#000;padding:12px;border-radius:10px;display:none;position:fixed;top:60px;left:10px;right:10px;z-index:10001;max-width:400px;border:2px solid green';
  gbox.innerHTML='<b>💰 GAIN PAYÉ HORS APPLICATION (Preuve)</b><br><br>Numéro coupon<br><input id="gainCoupon" style="width:100%;padding:10px;margin:4px 0;border:1px solid #000;border-radius:8px"><br>Montant<br><input id="gainMontant" type="number" style="width:100%;padding:10px;margin:4px 0;border:1px solid #000;border-radius:8px"><br>Date<br><input id="gainDate" type="date" style="width:100%;padding:10px;margin:4px 0;border:1px solid #000;border-radius:8px"><br>Nom client<br><input id="gainNom" style="width:100%;padding:10px;margin:4px 0;border:1px solid #000;border-radius:8px"><br><button id="btnSaveGain" style="background:green;color:#fff;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold">✅ ENREGISTRER GAIN PAYÉ</button><button onclick="document.getElementById(\'gainPayeBox\').style.display=\'none\'" style="background:#ccc;padding:10px;width:100%;border:none;border-radius:8px;margin-top:6px">FERMER</button><div id="listeGains" style="margin-top:10px"></div>';
  document.body.appendChild(gbox);
  document.getElementById('gainDate').value=new Date().toISOString().slice(0,10);
  document.getElementById('btnSaveGain').onclick=()=>{
    let coupon=document.getElementById('gainCoupon').value.trim(), montant=document.getElementById('gainMontant').value.trim(), date=document.getElementById('gainDate').value, nom=document.getElementById('gainNom').value.trim();
    if(!coupon||!montant||!date) return alert('Mets Coupon + Montant + Date');
    let list=JSON.parse(localStorage.getItem('gainsPayes')||'[]'); list.push({coupon,montant,date,nom:nom||'Client'}); localStorage.setItem('gainsPayes',JSON.stringify(list));
    alert('Gain enregistré : '+coupon+' - '+montant+' FCFA'); afficherGains();
  };
}
function afficherGains(){
  let list=JSON.parse(localStorage.getItem('gainsPayes')||'[]'); let h='<b>Gains enregistrés : '+list.length+'</b><br>';
  list.forEach(g=>{ h+='<div style="border:1px solid #ccc;padding:8px;border-radius:8px;margin:5px 0">✅ Coupon : <b>'+g.coupon+'</b><br>👤 '+g.nom+'<br>💰 '+g.montant+' FCFA<br>📅 '+g.date+'</div>'; });
  let l=document.getElementById('listeGains'); if(l) l.innerHTML=h;
}

// PANEL ADMIN - PRONOSTIC + GAIN BOUTON
setTimeout(()=>{
  let a=document.getElementById('panelAdmin');
  if(a && !document.getElementById('pronoAdminBox')){
    let d=document.createElement('div'); d.id='pronoAdminBox';
    d.style.cssText='background:#fff;color:#000;padding:12px;border-radius:10px;margin:10px 0;border:2px solid gold';
    d.innerHTML='<b>🔮 PRONOSTIC DU JOUR (ADMIN)</b><br><br><textarea id="pronoText" style="width:100%;height:60px;padding:10px" placeholder="Ex: Jouez 12-23-34..."></textarea><br><button id="btnPubProno" style="background:gold;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold">📢 PUBLIER PRONOSTIC</button><div id="pronoActuel" style="margin-top:8px"></div>';
    a.appendChild(d);
    let aff=()=>{ let p=localStorage.getItem('pronoJour')||'Aucun'; document.getElementById('pronoActuel').innerHTML='<b>Actuel :</b> '+p; }; aff();
    document.getElementById('btnPubProno').onclick=()=>{ let v=document.getElementById('pronoText').value.trim(); if(!v) return alert('Écris le pronostic'); localStorage.setItem('pronoJour',v); localStorage.setItem('pronoDate',new Date().toLocaleDateString('fr-FR')); aff(); alert('Pronostic publié !'); };
  }
},1200);

// CLICS GLOBAUX
document.addEventListener('click', function(e){
  let txt=(e.target.textContent||'').trim().toUpperCase();
  if(e.target.id==='menuProfil'){ document.getElementById('profilBox').style.display='block'; document.getElementById('menuBox').style.display='none'; }
  if(e.target.id==='menuProno'){
    let p=localStorage.getItem('pronoJour'); let date=localStorage.getItem('pronoDate')||'';
    if(!p) alert('Pas encore de pronostic aujourd\'hui');
    else alert('🔮 PRONOSTIC DU JOUR ('+date+')\n\n'+p);
    document.getElementById('menuBox').style.display='none';
  }
  if(txt==='GAIN' || txt.includes('GAIN')){
    if(txt.includes('ENREGISTRER')) return;
    let gb=document.getElementById('gainPayeBox'); if(gb){ gb.style.display='block'; afficherGains(); }
  }
});

// VERSION
let v=document.createElement('div'); v.textContent='VERSION V13 - FINALE';
v.style.cssText='position:fixed;bottom:5px;right:5px;background:#000;color:yellow;font-size:10px;padding:4px 6px;border-radius:5px;z-index:99999';
document.body.appendChild(v);
// FIN
