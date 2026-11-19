// ADMIN.JS - L'ADMINISTRATEUR CONTROLE TOUT
// C'est ce fichier qui décide. Revendeur ne décide rien.

function getData(){
  let d = JSON.parse(localStorage.getItem('adminData') || '{"caisse":2000000,"revendeurs":{"REV1":{"solde":0,"archive":[]}},"archiveAdmin":[]}');
  return d;
}
function saveData(d){ localStorage.setItem('adminData', JSON.stringify(d)); }

// Qui tu es ? On le demande UNE FOIS au login, et on le verrouille
let monRole = localStorage.getItem('monRole') || '';
if(!monRole){
  // On attend SE CONNECTER
  setInterval(()=>{
    if(localStorage.getItem('monRole')) return;
    document.querySelectorAll('button').forEach(b=>{
      if((b.textContent||'').trim().toUpperCase()==='SE CONNECTER' && !b.dataset.cap){
        b.dataset.cap='1';
        b.addEventListener('click', ()=>{
          setTimeout(()=>{
            let vals=[]; document.querySelectorAll('input').forEach(i=>{ if(i.value) vals.push(i.value); });
            let tout = vals.join(' ').toUpperCase();
            if(tout.includes('REV1')) localStorage.setItem('monRole','REV');
            else if(tout.includes('ADMIN')) localStorage.setItem('monRole','ADMIN');
            setTimeout(()=>location.reload(), 500);
          },400);
        });
      }
    });
  },1000);
} else {
  // ON EFFACE TOUTE L'ANCIENNE PAGE suite.js, ON NE SE BAT PLUS AVEC ELLE
  document.addEventListener('DOMContentLoaded', ()=>{
    document.body.innerHTML = '';
    
    // Barre haut : pareille pour tout le monde
    let bar = document.createElement('div');
    bar.style.cssText='display:flex;justify-content:space-between;align-items:center;padding:4px;background:#fff;border-bottom:1px solid #ccc;position:fixed;top:0;left:0;right:0;z-index:9999;height:30px';
    bar.innerHTML='<button onclick="alert(\'Menu\')" style="padding:4px 10px;font-size:16px">☰</button><div><button onclick="history.back()" style="padding:4px 8px">⬅ RETOUR</button> <button onclick="localStorage.removeItem(\'monRole\');location.reload()" style="padding:4px 8px;background:red;color:#fff;border:none">🚪 DÉCONNEXION</button></div>';
    document.body.appendChild(bar);

    let box = document.createElement('div');
    box.style.cssText='margin:40px 10px;padding:12px;background:#fff;color:#000;border:2px solid #000;border-radius:10px';
    document.body.appendChild(box);

    let data = getData();

    if(monRole==='ADMIN'){
      // ADMIN VOIT TOUT, IL CONTROLE TOUT
      box.innerHTML='<div style="text-align:center"><b>BIENVENUE SUR<br>NET LOTO AT 5/90</b><br><b style="color:red">COMPTE ADMIN</b></div><br>'+
      '<div style="background:#000;color:#fff;padding:10px;border-radius:10px;text-align:center">CAISSE ADMIN<br><b style="font-size:24px">'+data.caisse.toLocaleString()+' F</b></div><br>'+
      '<b>Solde REV1 : '+data.revendeurs.REV1.solde.toLocaleString()+' F</b><br><br>'+
      '<input id="montant" type="number" placeholder="Montant ex: 10000" style="width:100%;padding:10px;margin:4px 0">'+
      '<button id="btnRech" style="background:green;color:#fff;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold">💸 RECHARGER REV1</button><br><br>'+
      '<button id="btnVal" style="background:blue;color:#fff;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold">✅ VALIDER - Caisse à jour</button><br><br>'+
      '<button id="btnArch" style="width:100%;padding:10px">📁 ARCHIVE ADMIN</button><div id="zArch" style="display:none;margin-top:8px;font-size:12px"></div>';
      document.getElementById('btnRech').onclick=()=>{
        let m=parseInt(document.getElementById('montant').value||'0');
        if(!m) return alert('Mets montant');
        // ADMIN décide : il enlève de sa caisse, il met chez REV1
        data.caisse -= m;
        data.revendeurs.REV1.solde += m;
        data.revendeurs.REV1.archive.push('ADMIN t\'a rechargé '+m+' F');
        data.archiveAdmin.push('Tu as rechargé REV1 de '+m+' F');
        saveData(data);
        alert('REV1 rechargé de '+m+' F. Son nouveau solde : '+data.revendeurs.REV1.solde+' F');
        location.reload();
      };
      document.getElementById('btnVal').onclick=()=>{ alert('Validé. Caisse : '+data.caisse+' F'); };
      document.getElementById('btnArch').onclick=()=>{
        let z=document.getElementById('zArch'); z.style.display=z.style.display==='none'?'block':'none';
        z.innerHTML=data.archiveAdmin.map(x=>'<div>• '+x+'</div>').join('')||'Aucune activité';
      };

    } else {
      // REVENDEUR VOIT SEULEMENT CE QUE ADMIN LUI A DONNE
      let moi = data.revendeurs.REV1;
      box.innerHTML='<div style="text-align:center"><b>BIENVENUE SUR<br>NET LOTO AT 5/90</b><br><b style="color:green">COMPTE REVENDEUR : REV1</b></div><br>'+
      '<div style="background:#000;color:#fff;padding:10px;border-radius:10px;text-align:center">SOLDE REVENDEUR - Donné par ADMIN<br><b style="font-size:24px">'+moi.solde.toLocaleString()+' F</b></div><br>'+
      '<input id="montant" type="number" placeholder="Montant à demander ex: 10000" style="width:100%;padding:10px;margin:4px 0">'+
      '<button id="btnDem" style="background:green;color:#fff;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold">📲 DEMANDER RECHARGE À ADMIN</button><br><br>'+
      '<input id="tel" type="tel" placeholder="N° Client" style="width:100%;padding:10px;margin:4px 0">'+
      '<input id="montC" type="number" placeholder="Montant client" style="width:100%;padding:10px;margin:4px 0">'+
      '<button id="btnCli" style="background:orange;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold">💸 RECHARGER CLIENT</button><br><br>'+
      '<button id="btnArch" style="width:100%;padding:10px">📁 MON ARCHIVE</button><div id="zArch" style="display:none;margin-top:8px;font-size:12px"></div>';
      document.getElementById('btnDem').onclick=()=>{
        let m=document.getElementById('montant').value; if(!m) return alert('Mets montant');
        window.open('https://wa.me/22900000000?text='+encodeURIComponent('Bonjour ADMIN, je suis REV1, je veux '+m+' F'),'_blank');
        alert('Demande envoyée à ADMIN. Lui seul peut valider.');
      };
      document.getElementById('btnCli').onclick=()=>{
        let tel=document.getElementById('tel').value; let mont=parseInt(document.getElementById('montC').value||'0');
        if(!tel||!mont) return alert('Mets numéro + montant');
        if(moi.solde < mont) return alert('Solde insuffisant. Demande à ADMIN d\'abord.');
        // On enlève chez REV1, c'est ADMIN qui a donné, on respecte
        data.revendeurs.REV1.solde -= mont;
        data.revendeurs.REV1.archive.push('Tu as rechargé client '+tel+' de '+mont+' F');
        saveData(data);
        alert('Client rechargé. Ton nouveau solde : '+data.revendeurs.REV1.solde+' F');
        location.reload();
      };
      document.getElementById('btnArch').onclick=()=>{
        let z=document.getElementById('zArch'); z.style.display=z.style.display==='none'?'block':'none';
        z.innerHTML=moi.archive.map(x=>'<div>• '+x+'</div>').join('')||'Aucune activité. Tout ce que tu fais reste ici.';
      };
    }
  });
}
// BARRE HAUT TRES PETITE - NE CACHE PLUS LE SOLDE
let bar = document.createElement('div');
bar.id = 'barTopTous';
bar.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:1px 3px;background:#fff;border-bottom:1px solid #ccc;position:fixed;top:0;left:0;right:0;z-index:99999;height:24px';

bar.innerHTML =
  // 3 BARRES A GAUCHE, TRES PETIT
  '<button id="btnMenuTous" style="padding:0px 5px;font-size:11px;height:18px;line-height:18px;border-radius:3px;background:#eee;border:1px solid #000;font-weight:bold;min-width:24px">☰</button>' +
  // RETOUR + DECONNEXION A DROITE, TRES PETIT
  '<div style="display:flex;gap:3px">' +
  '<button id="btnRetourTous" style="padding:0px 5px;font-size:8px;height:18px;line-height:18px;border-radius:3px;background:#eee;border:1px solid #000;font-weight:bold">⬅ RETOUR</button>' +
  '<button id="btnDecoTous" style="padding:0px 5px;font-size:8px;height:18px;line-height:18px;border-radius:3px;background:#ff4444;color:#fff;border:none;font-weight:bold">🚪 DÉCONNEXION</button>' +
  '</div>';

document.body.prepend(bar);

document.getElementById('btnRetourTous').onclick = ()=>{ history.back(); };
document.getElementById('btnDecoTous').onclick = ()=>{ localStorage.removeItem('monRole'); localStorage.clear(); alert('Tu es déconnecté'); location.reload(); };
document.getElementById('btnMenuTous').onclick = ()=>{
  let m = document.getElementById('menuTous');
  if(m){ m.style.display = m.style.display==='none' ? 'block' : 'none'; return; }
  let mm = document.createElement('div'); mm.id='menuTous';
  mm.style.cssText='position:fixed;top:26px;left:3px;z-index:100000;background:#fff;border:1px solid #000;border-radius:6px;padding:6px;width:180px;font-size:12px';
  mm.innerHTML='<b>MENU</b><br><br><button onclick="location.reload()" style="width:100%;padding:6px;margin:2px">🔄 Actualiser</button><br><button onclick="document.getElementById(\'menuTous\').style.display=\'none\'" style="width:100%;padding:6px;margin:2px">❌ Fermer</button>';
  document.body.appendChild(mm);
};
// ENLEVER LES GROS RETOUR / DECONNEXION DE SUITE.JS QUI CACHENT LE SOLDE
setInterval(()=>{
  document.querySelectorAll('button').forEach(b=>{
    let t=(b.textContent||'').trim().toUpperCase();
    if(b.id==='btnRetourTous' || b.id==='btnDecoTous' || b.id==='btnMenuTous') return;
    // Si un bouton RETOUR ou DECONNEXION est GROS (plus de 30px de haut), on l'enlève
    if((t.includes('RETOUR') || t.includes('DÉCONNEXION') || t.includes('DECONNEXION')) && b.offsetHeight > 25){
      b.remove();
    }
  });
},800);
// IMPORTANT : On pousse la page vers le bas pour que la barre ne cache plus le SOLDE
document.body.style.paddingTop = '28px';
// ADMIN.JS - ADMIN DECIDE CE QUE LA PAGE REVENDEUR VA MONTRER
// Quand ADMIN crée un revendeur, son compte devient ce que ADMIN a dit ici

// 1. CE QUE ADMIN VEUT QUE LE REVENDEUR VOIT - C'EST ICI QUE TU DECIDES
const MODELE_REVENDEUR = {
  voirSolde: true,              // Il voit son solde
  demanderRechargeAdmin: true,  // Il peut demander recharge à ADMIN
  rechargerClient: true,        // Il peut recharger un client
  voirArchive: true,            // Il voit SON archive
  voirCaisseAdmin: false,       // Il ne voit JAMAIS la caisse ADMIN
  voirValider: false,           // Il ne valide RIEN, c'est ADMIN qui valide
  voirCreerRevendeur: false     // Il ne crée JAMAIS un autre revendeur
};

function getData(){
  return JSON.parse(localStorage.getItem('adminData') || '{"caisse":2000000,"revendeurs":{},"archiveAdmin":[]}');
}
function saveData(d){ localStorage.setItem('adminData', JSON.stringify(d)); }

// 2. QUAND ADMIN CREE LE REVENDEUR, ON LUI COLLE CE MODELE
// Le fichier creer-revendeur.js appelle cette fonction
function creerRevendeurDepuisAdmin(etab, nom, gmail, whatsapp, mdp){
  let code = 'REV-' + Math.floor(10000 + Math.random()*90000);
  let data = getData();
  data.revendeurs[whatsapp] = {
    etab: etab,
    nom: nom,
    gmail: gmail,
    whatsapp: whatsapp,
    mdp: mdp,
    code: code,
    solde: 0,
    archive: [],
    // SON COMPTE DEVIENT CE QUE ADMIN A DIT
    droits: { ...MODELE_REVENDEUR }
  };
  data.archiveAdmin.push('Tu as créé revendeur '+nom+' ('+whatsapp+') Code '+code);
  saveData(data);
  return code;
}

// 3. QUAND LE REVENDEUR SE CONNECTE, SA PAGE MONTRE SEULEMENT CE QUE ADMIN A DIT
function afficherPageRevendeur(whatsapp){
  let data = getData();
  let r = data.revendeurs[whatsapp];
  if(!r) return alert('Ce revendeur n\'existe pas');

  let droits = r.droits || MODELE_REVENDEUR;
  let html = '<div style="text-align:center"><b>BIENVENUE SUR<br>NET LOTO AT 5/90</b><br><b style="color:green">COMPTE REVENDEUR : '+r.nom+'</b><br><span style="font-size:11px">'+r.etab+'</span></div><br>';

  if(droits.voirSolde){
    html += '<div style="background:#000;color:#fff;padding:10px;border-radius:10px;text-align:center">SOLDE REVENDEUR<br><b style="font-size:24px">'+r.solde.toLocaleString()+' F</b></div><br>';
  }
  if(droits.demanderRechargeAdmin){
    html += '<input id="montDem" type="number" placeholder="Montant à demander ex: 10000" style="width:100%;padding:10px;margin:4px 0">'+
    '<button id="btnDem" style="background:green;color:#fff;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold">📲 DEMANDER RECHARGE À ADMIN</button><br><br>';
  }
  if(droits.rechargerClient){
    html += '<input id="telCli" type="tel" placeholder="N° Client ex: 229..." style="width:100%;padding:10px;margin:4px 0">'+
    '<input id="montCli" type="number" placeholder="Montant client ex: 5000" style="width:100%;padding:10px;margin:4px 0">'+
    '<button id="btnCli" style="background:orange;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold">💸 RECHARGER CLIENT</button><br><br>';
  }
  if(droits.voirArchive){
    html += '<button id="btnArch" style="width:100%;padding:10px">📁 MON ARCHIVE</button><div id="zArch" style="display:none;margin-top:8px;font-size:12px"></div>';
  }

  // On affiche cette page, pas une autre
  let box = document.getElementById('pageRevendeur') || document.createElement('div');
  box.id='pageRevendeur';
  box.style.cssText='margin:40px 10px;padding:12px;background:#fff;color:#000;border:2px solid #000;border-radius:10px';
  box.innerHTML = html;
  document.body.appendChild(box);

  // Branchements
  if(document.getElementById('btnDem')) document.getElementById('btnDem').onclick=()=>{
    let m=document.getElementById('montDem').value; if(!m) return alert('Mets montant');
    window.open('https://wa.me/22900000000?text='+encodeURIComponent('Bonjour ADMIN, je suis '+r.nom+', je veux '+m+' F'),'_blank');
    alert('Demande envoyée à ADMIN. Lui seul valide.');
  };
  if(document.getElementById('btnCli')) document.getElementById('btnCli').onclick=()=>{
    let tel=document.getElementById('telCli').value; let mont=parseInt(document.getElementById('montCli').value||'0');
    if(!tel||!mont) return alert('Mets numéro + montant');
    if(r.solde < mont) return alert('Solde insuffisant. Demande à ADMIN.');
    let d=getData(); d.revendeurs[whatsapp].solde -= mont; d.revendeurs[whatsapp].archive.push('Tu as rechargé client '+tel+' de '+mont+' F'); saveData(d);
    alert('Client rechargé. Nouveau solde : '+d.revendeurs[whatsapp].solde+' F'); location.reload();
  };
  if(document.getElementById('btnArch')) document.getElementById('btnArch').onclick=()=>{
    let z=document.getElementById('zArch'); z.style.display=z.style.display==='none'?'block':'none';
    z.innerHTML=r.archive.map(x=>'<div>• '+x+'</div>').join('')||'Aucune activité';
  };
}

// ===== A COLLER TOUT EN BAS DE admin.js - ADMIN DECIDE CE QUE REVENDEUR VOIT =====
const MODELE_REVENDEUR = {
  voirSolde: true,
  demanderRechargeAdmin: true,
  rechargerClient: true,
  voirArchive: true,
  voirCaisseAdmin: false,
  voirValider: false,
  voirCreerRevendeur: false
};

function creerRevendeurDepuisAdmin(etab, nom, gmail, whatsapp, mdp){
  let code = 'REV-' + Math.floor(10000 + Math.random()*90000);
  let data = JSON.parse(localStorage.getItem('adminData') || '{"caisse":2000000,"revendeurs":{},"archiveAdmin":[]}');
  data.revendeurs[whatsapp] = { etab: etab, nom: nom, gmail: gmail, whatsapp: whatsapp, mdp: mdp, code: code, solde: 0, archive: [], droits: { ...MODELE_REVENDEUR } };
  data.archiveAdmin.push('Tu as créé revendeur '+nom+' ('+whatsapp+') Code '+code);
  localStorage.setItem('adminData', JSON.stringify(data));
  return code;
}
