// SUITE.JS - PAGE CLIENT BLEUE - NET LOTO AT 590
(function(){
  // 1. On crée la page CLIENT
  let div = document.createElement('div');
  div.id = 'clientHome';
  div.style.display = 'none';
  div.innerHTML = `
  <style>
  #clientHome{font-family:Arial;background:#f2f6ff;padding-bottom:90px}
  .ch-top{display:flex;justify-content:space-between;align-items:center;background:#0b4fd8;color:#fff;padding:12px}
  .ch-top button{background:#fff;color:#0b4fd8;border:0;border-radius:20px;padding:8px 14px;font-weight:bold;cursor:pointer}
  .ch-salut{padding:12px;font-weight:bold}
  .ch-marquee{background:#0b4fd8;color:#fff;padding:8px;overflow:hidden;white-space:nowrap}
  .ch-marquee span{display:inline-block;animation:defile 12s linear infinite}
  @keyframes defile{from{transform:translateX(100%)}to{transform:translateX(-100%)}}
  .ch-3{display:flex;gap:8px;padding:12px}
  .ch-3 button{flex:1;background:#0b4fd8;color:#fff;border:0;border-radius:12px;padding:12px;font-weight:bold;cursor:pointer}
  .ch-titre{padding:0 12px;font-weight:bold}
  .ch-cards{display:flex;gap:10px;overflow-x:auto;padding:12px}
  .ch-cards button{min-width:150px;background:#fff;border:2px solid #0b4fd8;border-radius:14px;padding:12px;text-align:left;cursor:pointer}
  .ch-pays{padding:12px}
  .ch-pays button{width:100%;background:#fff;border:2px solid #0b4fd8;border-radius:14px;padding:14px;text-align:left;margin-bottom:10px;cursor:pointer;font-weight:bold}
  .ch-bottom{position:fixed;bottom:0;left:0;right:0;display:flex;background:#0b4fd8;padding:8px}
  .ch-bottom button{flex:1;background:transparent;color:#fff;border:0;font-weight:bold;cursor:pointer}
  </style>
  <div class="ch-top">
    <button onclick="alert('Message Admin - Etape 2')">✉️ Message</button>
    <button onclick="alert(onclick="ouvrirDepot()")">SOLDE <span id="chSolde">0</span> XOF +</button>
    <button onclick="alert('Menu - Etape 2')">☰ Menu</button>
  </div>
  <div class="ch-salut">Salut <span id="chNom">Client</span></div>
  <div class="ch-marquee"><span>NET LOTO AT 590 partout dans le monde ! Bonne chance !</span></div>
  <div class="ch-3">
    <button onclick="alert(onclick="ouvrirDepot()")">+ Dépôt</button>
    <button onclick="alert('Historique - Etape 2')">Historique</button>
    <button onclick="alert('Retrait - Etape 2')">Retrait</button>
  </div>
  <div class="ch-titre">Ferme bientôt ⏳</div>
  <div class="ch-cards">
    <button onclick="alert('CHANCE 8H')">CHANCE 8H<br>8:00</button>
    <button onclick="alert('CHANCE 11H')">CHANCE 11H<br>11:00</button>
    <button onclick="alert('CHANCE 14H')">CHANCE 14H<br>14:00</button>
    <button onclick="alert('CHANCE 18H')">CHANCE 18H<br>18:00</button>
    <button onclick="alert('CHANCE 21H')">CHANCE 21H<br>21:00</button>
    <button onclick="alert('CHANCE 0H')">CHANCE 0H<br>00:00</button>
  </div>
  <div class="ch-titre">Choisir un pays</div>
  <div class="ch-pays">
    <button onclick="alert('BENIN')">🇧🇯 BÉNIN - 6 tirages ouverts ▶</button>
    <button onclick="alert('COTE D IVOIRE')">🇨🇮 CÔTE D'IVOIRE ▶</button>
    <button onclick="alert('FRANCE')">🇫🇷 FRANCE ▶</button>
    <button onclick="alert('GHANA')">🇬🇭 GHANA ▶</button>
    <button onclick="alert('NIGERIA')">🇳🇬 NIGÉRIA ▶</button>
    <button onclick="alert('TOGO')">🇹🇬 TOGO ▶</button>
  </div>
  <div class="ch-3">
    <button onclick="alert('Mes tickets')">Mes tickets</button>
    <button onclick="alert('Resultats')">Résultats</button>
    <button onclick="alert('Pronostics')">Pronostics</button>
    <button onclick="alert('Aide')">Aide</button>
  </div>
  <div class="ch-bottom">
    <button>Accueil</button><button>Tirages</button><button>Coupon</button><button>Tickets</button><button>Solde</button>
  </div>
  `;
  document.body.appendChild(div);

  // 2. Fonction qui montre CLIENT et cache TOUT le reste
  window.montrerClientHome = function(u){
    let c = document.getElementById('clientHome');
    if(!u || u.role === 'ADMIN'){ if(c) c.style.display='none'; return; }
    let enfants = document.body.children;
    for(let i=0;i<enfants.length;i++){
      let el = enfants[i];
      if(el.id === 'clientHome') continue;
      if(el.tagName === 'SCRIPT' || el.tagName === 'STYLE') continue;
      el.style.display = 'none';
    }
    if(c) c.style.display='block';
    let nom = document.getElementById('chNom'); if(nom) nom.innerText = u.gmail || 'Client';
    let s = document.getElementById('chSolde'); if(s) s.innerText = u.soldeJeu || 0;
  };

  // 3. On branche automatiquement sur showDash, sans toucher à index
  let essai = 0;
  let timer = setInterval(function(){
    essai++;
    if(typeof window.showDash === 'function' && !window.showDash._clientBranche){
      let ancien = window.showDash;
      window.showDash = function(u){
        let r = ancien(u);
        try{ window.montrerClientHome(u); }catch(e){}
        return r;
      };
      window.showDash._clientBranche = true;
      clearInterval(timer);
    }
    if(essai > 50) clearInterval(timer);
  }, 200);
  // --- DEPOT ---
window.ouvrirDepot = function(){
  let vieux = document.getElementById('pageDepot'); if(vieux) vieux.remove();
  let d = document.createElement('div');
  d.id = 'pageDepot';
  d.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:#f2f6ff;z-index:9999;overflow:auto;padding-bottom:20px;font-family:Arial';
  d.innerHTML = `
  <div style="background:#0b4fd8;color:#fff;padding:12px;display:flex;justify-content:space-between;align-items:center">
    <button onclick="document.getElementById('pageDepot').remove()" style="background:#fff;color:#0b4fd8;border:0;border-radius:20px;padding:8px 14px;font-weight:bold">← Retour</button>
    <b>DÉPÔT</b><span>SOLDE <span id="depSolde">0</span></span>
  </div>
  <div style="padding:12px;font-weight:bold">1. Choisir un revendeur par pays</div>
  <div id="listeRevendeurs" style="padding:0 12px">Chargement des revendeurs...</div>
  <div style="padding:12px;font-weight:bold">2. Recharge Automatique - Momo ADMIN</div>
  <div style="margin:0 12px;background:#fff;border:2px solid #0b4fd8;border-radius:14px;padding:12px">
    <div>🇧🇯 MTN Bénin ADMIN : <b id="momoBenin">+229 01 XX XX XX XX</b></div>
    <div>🇹🇬 Moov Togo ADMIN : <b id="momoTogo">+228 XX XX XX XX</b></div>
    <div>🇨🇮 Orange CI ADMIN : <b id="momoCI">+225 XX XX XX XX</b></div>
    <div>🇬🇭 MTN Ghana ADMIN : <b id="momoGhana">+233 XX XX XX XX</b></div>
    <p style="font-size:13px;color:#555">1. Fais le transfert sur le numéro de ton pays.<br>2. Mets le montant ici, et appuie sur J'AI PAYÉ.<br>3. Le message arrive chez ADMIN, il recharge ton Gmail.</p>
    <input id="depMontant" type="number" placeholder="Montant ex: 5000" style="width:100%;padding:12px;border-radius:10px;border:1px solid #ccc;margin-bottom:8px">
    <input id="depNomMomo" placeholder="Ton nom sur Momo" style="width:100%;padding:12px;border-radius:10px;border:1px solid #ccc;margin-bottom:8px">
    <input id="depRef" placeholder="Référence Momo (si tu as)" style="width:100%;padding:12px;border-radius:10px;border:1px solid #ccc;margin-bottom:8px">
    <button onclick="envoyerDemandeDepot()" style="width:100%;background:#0b4fd8;color:#fff;border:0;border-radius:12px;padding:14px;font-weight:bold">J'AI PAYÉ - PRÉVENIR ADMIN</button>
  </div>
  `;
  document.body.appendChild(d);
  try{
    let u = window.__userActuel || JSON.parse(localStorage.getItem('netloto_user')||'{}');
    let s = document.getElementById('depSolde'); if(s) s.innerText = u.soldeJeu || 0;
  }catch(e){}
  chargerRevendeurs();
};

window.chargerRevendeurs = async function(){
  let box = document.getElementById('listeRevendeurs'); if(!box) return;
  try{
    // On lit les revendeurs dans ta base : collection utilisateurs, role = REVENDEUR
    let snap = await db.collection('utilisateurs').where('role','==','REVENDEUR').get();
    if(snap.empty){ box.innerHTML = 'Aucun revendeur pour le moment. Utilise la Recharge Automatique en bas.'; return; }
    let html = '';
    snap.forEach(function(doc){
      let r = doc.data();
      let pays = r.pays || r.paysRevendeur || 'PAYS';
      let nom = r.nom || r.gmail || 'Revendeur';
      let wa = r.whatsapp || r.telephone || '';
      html += `<div style="background:#fff;border:2px solid #0b4fd8;border-radius:14px;padding:12px;margin-bottom:8px">
        <b>${pays} - ${nom}</b><br><span style="font-size:13px;color:#555">${r.gmail||''} ${wa ? ' - '+wa : ''}</span><br>
        <button onclick="window.open('https://wa.me/${wa.replace(/[^0-9]/g,'')}','_blank')" style="margin-top:8px;background:#25D366;color:#fff;border:0;border-radius:10px;padding:10px 14px;font-weight:bold">Contacter WhatsApp</button>
      </div>`;
    });
    box.innerHTML = html;
  }catch(e){ box.innerHTML = 'Impossible de charger les revendeurs. Utilise la Recharge Automatique en bas.'; }
};

window.envoyerDemandeDepot = async function(){
  let montant = document.getElementById('depMontant').value;
  let nomMomo = document.getElementById('depNomMomo').value;
  let ref = document.getElementById('depRef').value;
  if(!montant || montant <= 0){ alert('Mets le montant, boss'); return; }
  try{
    let u = window.__userActuel || JSON.parse(localStorage.getItem('netloto_user')||'{}');
    await db.collection('demandesRecharge').add({
      gmailClient: u.gmail || '',
      montant: Number(montant),
      nomMomo: nomMomo || '',
      reference: ref || '',
      statut: 'EN ATTENTE',
      date: new Date()
    });
    alert('Demande envoyée ! ADMIN a reçu le message. Il va recharger ton Gmail : ' + (u.gmail||''));
    document.getElementById('pageDepot').remove();
  }catch(e){ alert('Erreur, réessaie : ' + e.message); }
};
})();
