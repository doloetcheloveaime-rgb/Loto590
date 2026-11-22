// ===== SUITE.JS COMPLET - NETLOTO CLIENT - DEPOT BRANCHE =====
(function(){
  function getUser(){
    try{ return window.__userActuel || JSON.parse(localStorage.getItem('netloto_user')||'{}'); }catch(e){ return {}; }
  }
  function saveUser(u){ window.__userActuel = u; try{ localStorage.setItem('netloto_user', JSON.stringify(u)); }catch(e){} }

  // --- PAGE CLIENT ---
  window.afficherPageClient = function(user){
    if(user) saveUser(user);
    let u = getUser();
    let vieux = document.getElementById('pageClient'); if(vieux) vieux.remove();
    let d = document.createElement('div');
    d.id = 'pageClient';
    d.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:#f2f6ff;z-index:1000;overflow:auto;padding-bottom:20px;font-family:Arial';
    d.innerHTML = `
    <div style="background:#0b4fd8;color:#fff;padding:12px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div><b>NET LOTO</b><br><span style="font-size:12px">BONJOUR, ${u.gmail||'CLIENT'}</span></div>
        <button onclick="alert('Message - Etape 2')" style="background:#fff;color:#0b4fd8;border:0;border-radius:20px;padding:8px 12px;font-weight:bold">✉ Message</button>
      </div>
      <div style="background:#fff;color:#000;border-radius:14px;padding:12px;margin-top:12px;display:flex;justify-content:space-between;align-items:center">
        <div><div style="font-size:12px;color:#666">SOLDE</div><b style="font-size:22px">${u.soldeJeu||0} FCFA</b><div style="font-size:12px;color:#666">SOLDE TIRAGE : ${u.soldeTirage||0}</div></div>
        <button onclick="ouvrirDepot()" style="background:#0b4fd8;color:#fff;border:0;border-radius:12px;padding:10px 14px;font-weight:bold">+ Dépôt</button>
      </div>
      <div style="display:flex;gap:8px;margin-top:10px">
        <button onclick="alert('Historique - Etape 2')" style="flex:1;background:#fff;color:#0b4fd8;border:0;border-radius:10px;padding:10px;font-weight:bold">Historique</button>
        <button onclick="alert('Retrait - Etape 2')" style="flex:1;background:#fff;color:#0b4fd8;border:0;border-radius:10px;padding:10px;font-weight:bold">Retrait</button>
      </div>
    </div>
    <div style="padding:12px">
      <div style="display:flex;gap:10px;margin-bottom:10px">
        <button onclick="alert('CHANCE 8H - Etape 2')" style="flex:1;background:#0b4fd8;color:#fff;border:0;border-radius:14px;padding:18px 0;font-weight:bold">CHANCE<br>8H</button>
        <button onclick="alert('CHANCE 11H - Etape 2')" style="flex:1;background:#0b4fd8;color:#fff;border:0;border-radius:14px;padding:18px 0;font-weight:bold">CHANCE<br>11H</button>
        <button onclick="alert('CHANCE 14H - Etape 2')" style="flex:1;background:#0b4fd8;color:#fff;border:0;border-radius:14px;padding:18px 0;font-weight:bold">CHANCE<br>14H</button>
      </div>
      <div style="display:flex;gap:10px;margin-bottom:10px">
        <button onclick="alert('BÉNIN - Etape 2')" style="flex:1;background:#0b4fd8;color:#fff;border:0;border-radius:14px;padding:18px 0;font-weight:bold">BÉNIN</button>
        <button onclick="alert('TOGO - Etape 2')" style="flex:1;background:#0b4fd8;color:#fff;border:0;border-radius:14px;padding:18px 0;font-weight:bold">TOGO</button>
        <button onclick="alert('COTE DIVOIRE - Etape 2')" style="flex:1;background:#0b4fd8;color:#fff;border:0;border-radius:14px;padding:18px 0;font-weight:bold">COTE<br>D'IVOIRE</button>
      </div>
      <div style="display:flex;gap:10px">
        <button onclick="alert('GHANA - Etape 2')" style="flex:1;background:#0b4fd8;color:#fff;border:0;border-radius:14px;padding:18px 0;font-weight:bold">GHANA</button>
        <button onclick="alert('NIGERIA - Etape 2')" style="flex:1;background:#0b4fd8;color:#fff;border:0;border-radius:14px;padding:18px 0;font-weight:bold">NIGERIA</button>
        <button onclick="alert('FRANCE - Etape 2')" style="flex:1;background:#0b4fd8;color:#fff;border:0;border-radius:14px;padding:18px 0;font-weight:bold">FRANCE</button>
      </div>
      <div style="text-align:center;color:#888;margin-top:14px;font-size:12px">Solde jeu = argent pour jouer</div>
    </div>
    `;
    document.body.appendChild(d);
  };

  // --- DEPOT ---
  window.ouvrirDepot = function(){
    let vieux = document.getElementById('pageDepot'); if(vieux) vieux.remove();
    let u = getUser();
    let d = document.createElement('div');
    d.id = 'pageDepot';
    d.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:#f2f6ff;z-index:9999;overflow:auto;padding-bottom:20px;font-family:Arial';
    d.innerHTML = `
    <div style="background:#0b4fd8;color:#fff;padding:12px;display:flex;justify-content:space-between;align-items:center">
      <button onclick="document.getElementById('pageDepot').remove()" style="background:#fff;color:#0b4fd8;border:0;border-radius:20px;padding:8px 14px;font-weight:bold">← Retour</button>
      <b>DÉPÔT</b><span>SOLDE ${u.soldeJeu||0}</span>
    </div>
    <div style="padding:12px;font-weight:bold">1. Choisir un revendeur par pays</div>
    <div id="listeRevendeurs" style="padding:0 12px">Chargement des revendeurs...</div>
    <div style="padding:12px;font-weight:bold">2. Recharge Automatique - Momo ADMIN / REVENDEUR</div>
    <div style="margin:0 12px;background:#fff;border:2px solid #0b4fd8;border-radius:14px;padding:12px">
      <div>🇧🇯 BÉNIN - ADMIN : <b>+229 01 66 72 69 58</b></div>
      <div>🇹🇬 TOGO - REVENDEUR : <b>+228 0000</b> <span style="font-size:12px;color:#888">(à changer après)</span></div>
      <div>🇨🇮 CÔTE D'IVOIRE - REVENDEUR : <b>+225 0000</b> <span style="font-size:12px;color:#888">(à changer après)</span></div>
      <div>🇬🇭 GHANA - REVENDEUR : <b>+233 0000</b> <span style="font-size:12px;color:#888">(à changer après)</span></div>
      <div>🇳🇬 NIGÉRIA - REVENDEUR : <b>+234 0000</b> <span style="font-size:12px;color:#888">(à changer après)</span></div>
      <div>🇫🇷 FRANCE - REVENDEUR : <b>+33 0000</b> <span style="font-size:12px;color:#888">(à changer après)</span></div>
      <p style="font-size:13px;color:#555">1. Fais le transfert sur le numéro de ton pays.<br>2. Mets le montant ici, et appuie sur J'AI PAYÉ.<br>3. Le message arrive chez ADMIN, il recharge ton Gmail : <b>${u.gmail||''}</b></p>
      <input id="depMontant" type="number" placeholder="Montant ex: 5000" style="width:100%;padding:12px;border-radius:10px;border:1px solid #ccc;margin-bottom:8px;box-sizing:border-box">
      <input id="depNomMomo" placeholder="Ton nom sur Momo" style="width:100%;padding:12px;border-radius:10px;border:1px solid #ccc;margin-bottom:8px;box-sizing:border-box">
      <input id="depRef" placeholder="Référence Momo (si tu as)" style="width:100%;padding:12px;border-radius:10px;border:1px solid #ccc;margin-bottom:8px;box-sizing:border-box">
      <button onclick="envoyerDemandeDepot()" style="width:100%;background:#0b4fd8;color:#fff;border:0;border-radius:12px;padding:14px;font-weight:bold">J'AI PAYÉ - PRÉVENIR ADMIN</button>
    </div>
    `;
    document.body.appendChild(d);
    chargerRevendeurs();
  };

  window.chargerRevendeurs = async function(){
    let box = document.getElementById('listeRevendeurs'); if(!box) return;
    try{
      let db = window.db || (window.firebase && firebase.firestore ? firebase.firestore() : null);
      if(!db) throw new Error('no db');
      let snap = await db.collection('utilisateurs').where('role','==','REVENDEUR').get();
      if(snap.empty){ box.innerHTML = 'Aucun revendeur pour le moment. Utilise la Recharge Automatique en bas.'; return; }
      let html = '';
      snap.forEach(function(doc){
        let r = doc.data();
        let pays = r.pays || r.paysRevendeur || 'PAYS';
        let nom = r.nom || r.gmail || 'Revendeur';
        let wa = (r.whatsapp || r.telephone || '').toString();
        html += `<div style="background:#fff;border:2px solid #0b4fd8;border-radius:14px;padding:12px;margin-bottom:8px">
          <b>${pays} - ${nom}</b><br><span style="font-size:13px;color:#555">${r.gmail||''} ${wa ? ' - '+wa : ''}</span><br>
          ${wa ? `<button onclick="window.open('https://wa.me/${wa.replace(/[^0-9]/g,'')}','_blank')" style="margin-top:8px;background:#25D366;color:#fff;border:0;border-radius:10px;padding:10px 14px;font-weight:bold">Contacter WhatsApp</button>` : ''}
        </div>`;
      });
      box.innerHTML = html;
    }catch(e){ box.innerHTML = 'Aucun revendeur pour le moment. Utilise la Recharge Automatique en bas.'; }
  };

  window.envoyerDemandeDepot = async function(){
    let montant = document.getElementById('depMontant').value;
    let nomMomo = document.getElementById('depNomMomo').value;
    let ref = document.getElementById('depRef').value;
    if(!montant || montant <= 0){ alert('Mets le montant, boss'); return; }
    try{
      let u = getUser();
      let db = window.db || (window.firebase && firebase.firestore ? firebase.firestore() : null);
      if(db){
        await db.collection('demandesRecharge').add({
          gmailClient: u.gmail || '',
          montant: Number(montant),
          nomMomo: nomMomo || '',
          reference: ref || '',
          statut: 'EN ATTENTE',
          date: new Date()
        });
      }
      alert('Demande envoyée ! ADMIN a reçu le message. Il va recharger ton Gmail : ' + (u.gmail||''));
      let p = document.getElementById('pageDepot'); if(p) p.remove();
    }catch(e){ alert('Erreur, réessaie : ' + e.message); }
  };

  // Si l'utilisateur est déjà connecté, on affiche la page
  try{
    let u = getUser();
    if(u && u.gmail){ setTimeout(function(){ window.afficherPageClient(u); }, 500); }
  }catch(e){}
})();
