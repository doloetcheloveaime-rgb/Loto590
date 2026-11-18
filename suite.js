function out(){location.reload()}
let t=document.createElement('div');t.style.cssText='position:fixed;top:5px;right:5px;z-index:9999;display:flex;gap:5px';
t.innerHTML='<button onclick="history.back()">RETOUR</button><button onclick="out()">SE DECONNECTER</button>';document.body.appendChild(t);
let b=[...document.querySelectorAll('button')];b.forEach(x=>{if(x.textContent=='RETOUR')x.style.cssText='position:fixed;top:5px;left:5px;z-index:9999;padding:5px 8px;font-size:11px;background:#333;color:#fff;border:none;border-radius:8px';if(x.textContent=='SE DECONNECTER')x.style.cssText='position:fixed;top:5px;right:5px;z-index:9999;padding:5px 8px;font-size:11px;background:red;color:#fff;border:none;border-radius:8px'});
let e=[...document.querySelectorAll('div,span')];e.forEach(y=>{if((y.textContent.includes('Aujourd')||y.textContent.includes('Solde:'))&&y.children.length==0)y.style.display='none'});
let en=[...document.querySelectorAll('button')].find(x=>x.textContent.includes('ENTRER'));if(en&&!document.getElementById('liens')){let p=document.createElement('div');p.id='liens';p.style.cssText='text-align:center;margin-top:10px;color:#fff;font-size:13px';p.innerHTML='<div id="insc" style="color:yellow;cursor:pointer">Inscrivez-vous ici</div><div id="mdp" style="margin-top:6px;cursor:pointer">Mot de passe oublié ? Cliquez ici</div>';en.parentNode.appendChild(p);document.getElementById('mdp').onclick=function(){let e=prompt('Ton Gmail pour changer le mot de passe');if(e)alert('Lien envoyé à '+e)};document.getElementById('insc').onclick=function(){alert('Inscription bientôt disponible')};}
let r=[...document.querySelectorAll('button')].find(x=>x.textContent=='RETOUR');if(r)r.onclick=function(){if(window.history.length>1)history.back();else location.reload()};
let ins=document.querySelectorAll('input');if(ins[0])ins[0].placeholder='Code (1111 / 2222 / 9999)';if(ins[1]){ins[1].placeholder='Ton nom';ins[1].type='text';}
let ic=document.getElementById('insc');if(ic){ic.onclick=function(){alert('Pour avoir un code, demande à l admin. Client: 1111 Revendeur: 2222');};}
setTimeout(()=>{document.querySelectorAll('div,span,p,header').forEach(e=>{if((e.textContent||'').includes('LUNDI')&&e.textContent.length<100)e.style.display='none';});},1000);
setTimeout(()=>{let a=document.getElementById('panelAdmin');if(a){a.style.display='block';document.body.prepend(a);}},1000);
setTimeout(()=>{if(document.getElementById('caisseBox'))return;let a=document.getElementById('panelAdmin');if(!a)return;let c=localStorage.getItem('caisseAdmin')||'0';let d=document.createElement('div');d.id='caisseBox';d.style.cssText='background:#111;color:#fff;padding:12px;border-radius:10px;margin-bottom:10px;text-align:center';d.innerHTML='<b>💰 CAISSE ADMIN : <span id="caisseVal">'+c+'</span> FCFA</b><br><br><button id="btnCaisse" style="background:green;color:#fff;padding:10px 15px;border:none;border-radius:8px;font-weight:bold">+ RECHARGER CAISSE</button>';a.prepend(d);document.getElementById('btnCaisse').onclick=()=>{let m=prompt('Montant à mettre dans la Caisse ?');if(!m)return;let nv=Number(localStorage.getItem('caisseAdmin')||0)+Number(m);localStorage.setItem('caisseAdmin',nv);document.getElementById('caisseVal').textContent=nv;alert('Caisse rechargée : '+nv+' FCFA');};},1200);
setTimeout(()=>{document.querySelectorAll('button').forEach(b=>{let t=b.textContent.trim().toUpperCase();if(t.includes('RETOUR')||t.includes('DECONNECTER')||t.includes('DÉCONNECTER')){b.style.cssText='font-size:11px!important;padding:5px 8px!important;border-radius:20px!important;margin:2px!important';}});let c=document.getElementById('caisseBox');if(c){c.style.marginTop='8px';c.style.fontSize='15px';}},1500);
setTimeout(()=>{
let btn=[...document.querySelectorAll('button')].find(b=>b.textContent.includes('Contrôler'));
if(!btn||btn.dataset.ok)return; btn.dataset.ok='1';
btn.onclick=()=>{
  // 1. On récupère tous les tickets
  let tickets=JSON.parse(localStorage.getItem('tickets')||localStorage.getItem('coupons')||'[]');
  // Si tes tickets sont ailleurs, on prend aussi les paris
  if(!tickets.length){ try{tickets=JSON.parse(localStorage.getItem('paris')||'[]');}catch(e){} }
  let totalJoues=tickets.length;
  let gagnants=tickets.filter(t=>t.gain>0||t.statut==='gagnant'||t.gagnant===true);
  let totalGagnants=gagnants.length;
  let totalAPayer=gagnants.reduce((s,t)=>s+Number(t.gain||t.montantGain||0),0);

  let box=document.getElementById('payerBox');
  if(!box){ box=document.createElement('div'); box.id='payerBox'; box.style.cssText='background:#fff;color:#000;padding:15px;border-radius:12px;margin:10px 0;border:2px solid #000'; document.getElementById('panelAdmin').appendChild(box); }
  box.innerHTML='<b>📋 CONTRÔLE</b><br><br>'+
  'Total Tickets Joués : <b>'+totalJoues+'</b><br>'+
  'Total Tickets Gagnants : <b>'+totalGagnants+'</b><br>'+
  'Total Gains à Payer : <b>'+totalAPayer+' FCFA</b><br><br>'+
  '<button id="btnPayerGain" style="background:green;color:#fff;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold;font-size:16px">✅ PAYER / DISTRIBUER</button>'+
  '<div id="payerResult" style="margin-top:10px"></div>';
  box.scrollIntoView({behavior:'smooth'});

  document.getElementById('btnPayerGain').onclick=()=>{
    if(totalAPayer<=0){ alert('Aucun gain à payer'); return; }
    if(!confirm('Valider et payer '+totalAPayer+' FCFA à '+totalGagnants+' gagnant(s) ?')) return;
    // 2. DISTRIBUTION AUTOMATIQUE vers Solde Gain de chacun
    gagnants.forEach(t=>{
      let user=t.user||t.client||t.telephone||t.code||'client';
      let key='gain_'+user;
      let ancien=Number(localStorage.getItem(key)||0);
      localStorage.setItem(key, ancien + Number(t.gain||t.montantGain||0));
      t.paye=true; t.statut='paye';
    });
    localStorage.setItem('tickets', JSON.stringify(tickets));
    document.getElementById('payerResult').innerHTML='<b style="color:green">✅ Payé ! Chaque gagnant a reçu son gain dans son Solde Gain.<br>Ex: 2.000 -> 2.000, 3.000 -> 3.000, 100.000 -> 100.000</b>';
    alert('Paiement distribué ! Total payé : '+totalAPayer+' FCFA');
  };
};
},1500);
setTimeout(()=>{
let a=document.getElementById('panelAdmin'); if(!a||document.getElementById('resultatBox'))return;
let d=document.createElement('div'); d.id='resultatBox';
d.style.cssText='background:#fff;color:#000;padding:12px;border-radius:10px;margin:10px 0;border:2px solid #000';
d.innerHTML='<b>📢 PUBLIER LES RÉSULTATS</b><br><br>'+
'<label><b>🎯 Résultat NORMAL (5 numéros)</b></label><br>'+
'<input id="resNormal" placeholder="Ex: 12 - 23 - 34 - 45 - 56" style="width:100%;padding:10px;margin:5px 0;border:1px solid #000;border-radius:8px"><br>'+
'<button id="btnPubNormal" style="background:#000;color:#fff;padding:10px;width:100%;border:none;border-radius:8px;font-weight:bold">PUBLIER NORMAL</button><br><br>'+
'<label><b>🍀 Résultat DOUBLE CHANCE (5 numéros)</b></label><br>'+
'<input id="resDouble" placeholder="Ex: 03 - 11 - 22 - 40 - 49" style="width:100%;padding:10px;margin:5px 0;border:1px solid #000;border-radius:8px"><br>'+
'<button id="btnPubDouble" style="background:green;color:#fff;padding:10px;width:100%;border:none;border-radius:8px;font-weight:bold">PUBLIER DOUBLE CHANCE</button><br>'+
'<div id="resAffiche" style="margin-top:10px;font-weight:bold"></div>';
a.appendChild(d);

let aff=()=>{ let n=localStorage.getItem('resultatNormal')||'Pas encore publié'; let db=localStorage.getItem('resultatDouble')||'Pas encore publié'; document.getElementById('resAffiche').innerHTML='NORMAL : '+n+'<br>DOUBLE CHANCE : '+db; };
aff();
document.getElementById('btnPubNormal').onclick=()=>{ let v=document.getElementById('resNormal').value.trim(); if(!v) return alert('Mets les 5 numéros Normal'); localStorage.setItem('resultatNormal', v); aff(); alert('Résultat NORMAL publié : '+v); };
document.getElementById('btnPubDouble').onclick=()=>{ let v=document.getElementById('resDouble').value.trim(); if(!v) return alert('Mets les 5 numéros Double Chance'); localStorage.setItem('resultatDouble', v); aff(); alert('Résultat DOUBLE CHANCE publié : '+v); };
},1500);
setTimeout(()=>{
if(document.getElementById('btnMenu'))return;
// Bouton 3 traits en haut à gauche
let btn=document.createElement('button'); btn.id='btnMenu'; btn.textContent='☰';
btn.style.cssText='position:fixed;top:10px;left:10px;z-index:9999;background:#000;color:#fff;font-size:22px;width:42px;height:42px;border:none;border-radius:8px';
document.body.appendChild(btn);
// Menu caché
let menu=document.createElement('div'); menu.id='menuBox';
menu.style.cssText='position:fixed;top:0;left:0;height:100%;width:240px;background:#111;color:#fff;z-index:9998;padding:60px 15px 15px;display:none;box-shadow:2px 0 10px rgba(0,0,0,0.5)';
menu.innerHTML='<b style="font-size:18px">📋 MENU</b><br><br>'+
'<div class="menuItem" data-page="profil" style="padding:12px;background:#222;border-radius:8px;margin-bottom:8px;cursor:pointer">👤 Profil</div>'+
'<div class="menuItem" data-page="resultat" style="padding:12px;background:#222;border-radius:8px;margin-bottom:8px;cursor:pointer">🏆 Résultat</div>'+
'<div class="menuItem" data-page="archive" style="padding:12px;background:#222;border-radius:8px;margin-bottom:8px;cursor:pointer">📁 Archive</div>'+
'<div class="menuItem" data-page="aide" style="padding:12px;background:#222;border-radius:8px;margin-bottom:8px;cursor:pointer">❓ Aide</div>'+
'<div style="margin-top:20px;padding:10px;text-align:center;background:#333;border-radius:8px" onclick="document.getElementById(\'menuBox\').style.display=\'none\'">❌ Fermer</div>';
document.body.appendChild(menu);

btn.onclick=()=>{ menu.style.display = menu.style.display==='none' ? 'block' : 'none'; };
// Quand on clique sur un item
menu.querySelectorAll('.menuItem').forEach(item=>{
  item.onclick=()=>{
    let p=item.dataset.page;
    alert('Tu as cliqué sur : '+p.toUpperCase()+' - On mettra le contenu après boss');
    // Pour Résultat, on montre les résultats déjà publiés
    if(p==='resultat'){
      let n=localStorage.getItem('resultatNormal')||'Pas encore publié';
      let db=localStorage.getItem('resultatDouble')||'Pas encore publié';
      alert('🏆 RÉSULTAT\nNORMAL : '+n+'\nDOUBLE CHANCE : '+db);
    }
  };
});
},1500);
setTimeout(()=>{
let b=document.getElementById('btnMenu'); if(b){
b.style.cssText='position:fixed;top:5px;left:5px;z-index:9999;background:rgba(0,0,0,0.6);color:#fff;font-size:13px;width:26px;height:26px;border:none;border-radius:5px;padding:0;line-height:1';
}
let m=document.getElementById('menuBox'); if(m){ m.style.width='200px'; m.style.padding='45px 12px 12px'; }
},1000);
setInterval(()=>{
  // On regarde si on est sur la page de connexion
  let pageTexte = document.body.innerText || '';
  let surLogin = pageTexte.includes('NET LOTO AT 590') && pageTexte.includes('ENTRER');
  // On cherche si le panneau ADMIN est visible
  let adminVisible = document.getElementById('panelAdmin') && document.getElementById('panelAdmin').offsetParent !== null;

  let cacher = surLogin && !adminVisible;

  // Cacher / Montrer RETOUR et SE DECONNECTER
  document.querySelectorAll('button').forEach(b=>{
    let t=b.textContent.trim().toUpperCase();
    if(t.includes('RETOUR')||t.includes('DECONNECTER')||t.includes('DÉCONNECTER')){
      b.style.display = cacher ? 'none' : '';
    }
  });
  // Cacher / Montrer le menu ☰ et CAISSE
  let menuBtn=document.getElementById('btnMenu'); if(menuBtn) menuBtn.style.display = cacher ? 'none' : '';
  let caisse=document.getElementById('caisseBox'); if(caisse) caisse.style.display = cacher ? 'none' : '';
  // Cacher aussi 3D / Classic / NORMAL / MA CHANCE quand on est sur login
  document.querySelectorAll('button').forEach(b=>{
    let t=b.textContent.trim().toUpperCase();
    if(['3D','CLASSIC','NORMAL','MA CHANCE'].includes(t)){
      b.style.display = cacher ? 'none' : '';
    }
  });
},800);
setInterval(()=>{
  // 1. Enlever Basic
  document.querySelectorAll('button,div,span').forEach(el=>{
    if(el.textContent.trim()==='Basic' && el.children.length===0){
      el.style.display='none';
    }
  });
  // 2. Mettre Bienvenue dans le bleu en haut
  // Le bleu c'est la barre en haut de la page
  let bleu = document.querySelector('header') || document.body.firstElementChild;
  // On cherche la div bleue qui contenait Basic
  document.querySelectorAll('div').forEach(d=>{
    let bg = getComputedStyle(d).backgroundColor;
    if((bg.includes('0, 0, 255') || bg.includes('0, 102') || d.style.background==='blue' || d.style.backgroundColor==='blue') && d.offsetHeight<100 && d.offsetHeight>30){
      if(!d.dataset.bienvenue){
        d.dataset.bienvenue='1';
        d.innerHTML='<div style="color:#fff;font-weight:bold;font-size:16px;text-align:center;padding:12px 5px">👋 Bienvenue sur Net Loto at 5/90</div>';
      }
    }
  });
},800);
setTimeout(()=>{
let a=document.getElementById('panelAdmin'); if(!a||document.getElementById('creerRevBox'))return;
let d=document.createElement('div'); d.id='creerRevBox';
d.style.cssText='background:#fff;color:#000;padding:12px;border-radius:10px;margin:10px 0;border:2px solid #000';
d.innerHTML='<b>🏪 CRÉER UN REVENDEUR</b><br><br>'+
'<input id="revEtab" placeholder="Nom de l’établissement" style="width:100%;padding:10px;margin:4px 0;border:1px solid #000;border-radius:8px"><br>'+
'<input id="revNom" placeholder="Nom du revendeur" style="width:100%;padding:10px;margin:4px 0;border:1px solid #000;border-radius:8px"><br>'+
'<input id="revGmail" placeholder="Gmail du revendeur" style="width:100%;padding:10px;margin:4px 0;border:1px solid #000;border-radius:8px"><br>'+
'<input id="revWhats" placeholder="Numéro WhatsApp" style="width:100%;padding:10px;margin:4px 0;border:1px solid #000;border-radius:8px"><br>'+
'<input id="revPass" placeholder="Mot de passe" type="password" style="width:100%;padding:10px;margin:4px 0;border:1px solid #000;border-radius:8px"><br>'+
'<button id="btnCreerRev" style="background:#000;color:#fff;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold">+ CRÉER REVENDEUR</button>'+
'<div id="listeRev" style="margin-top:10px"></div>';
a.appendChild(d);

let afficher=()=>{
  let list=JSON.parse(localStorage.getItem('revendeurs')||'[]');
  let h='<b>Revendeurs créés : '+list.length+'</b><br>';
  list.forEach(r=>{ h+='🏪 '+r.etab+' - '+r.nom+' - '+r.whats+'<br>'; });
  document.getElementById('listeRev').innerHTML=h;
};
afficher();
document.getElementById('btnCreerRev').onclick=()=>{
  let etab=document.getElementById('revEtab').value.trim();
  let nom=document.getElementById('revNom').value.trim();
  let gmail=document.getElementById('revGmail').value.trim();
  let whats=document.getElementById('revWhats').value.trim();
  let pass=document.getElementById('revPass').value.trim();
  if(!etab||!nom||!whats||!pass) return alert('Remplis tout : Établissement, Nom, WhatsApp, Mot de passe');
  let list=JSON.parse(localStorage.getItem('revendeurs')||'[]');
  list.push({etab,nom,gmail,whats,pass});
  localStorage.setItem('revendeurs',JSON.stringify(list));
  alert('Revendeur créé : '+nom+' - '+etab);
  document.getElementById('revEtab').value='';document.getElementById('revNom').value='';document.getElementById('revGmail').value='';document.getElementById('revWhats').value='';document.getElementById('revPass').value='';
  afficher();
};
},1500);
setTimeout(()=>{
let a=document.getElementById('panelAdmin');
if(a && !document.getElementById('pronoAdminBox')){
let d=document.createElement('div'); d.id='pronoAdminBox';
d.style.cssText='background:#fff;color:#000;padding:12px;border-radius:10px;margin:10px 0;border:2px solid gold';
d.innerHTML='<b>PRONOSTIC DU JOUR</b><br><br><textarea id="pronoText" style="width:100%;height:60px;padding:10px"></textarea><br><button id="btnPubProno" style="background:gold;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold">PUBLIER</button>';
a.appendChild(d);
document.getElementById('btnPubProno').onclick=()=>{
let v=document.getElementById('pronoText').value;
localStorage.setItem('pronoJour',v);
alert('Pronostic publié !');
};
}
},1500);
