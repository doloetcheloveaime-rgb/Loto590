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
    <button onclick="alert('Depot - Etape 2')">SOLDE <span id="chSolde">0</span> XOF +</button>
    <button onclick="alert('Menu - Etape 2')">☰ Menu</button>
  </div>
  <div class="ch-salut">Salut <span id="chNom">Client</span></div>
  <div class="ch-marquee"><span>NET LOTO AT 590 partout dans le monde ! Bonne chance !</span></div>
  <div class="ch-3">
    <button onclick="alert('Depot - Etape 2')">+ Dépôt</button>
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
})();
