alert('SUITE.JS CHARGE');
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
<button onclick="localStorage.clear();location.reload()" style="background:#ff3b30;color:#fff">Déconnexion</button>
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
    <button onclick="ouvrirPaysBenin()">🇧🇯 BÉNIN - 6 tirages ouverts ▶</button>
    <button onclick="ouvrirPaysCoteDivoire()">🇨🇮 CÔTE D'IVOIRE ▶</button>
    <button onclick="ouvrirPaysFrance()">🇫🇷 FRANCE ▶</button>
    <button onclick="ouvrirPaysGhana()">🇬🇭 GHANA ▶</button>
    <button onclick="ouvrirPaysNigeria()">🇳🇬 NIGÉRIA ▶</button>
    <button onclick="ouvrirPaysTogo()">🇹🇬 TOGO ▶</button>
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
  }, 200); // --- PAYS BENIN - 6 TIRAGES ---
window.ouvrirPaysBenin = function(){
  let vieux = document.getElementById('pageBenin'); if(vieux) vieux.remove();
  let d = document.createElement('div');
  d.id = 'pageBenin';
  d.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:#f2f6ff;z-index:9999;overflow:auto;padding-bottom:20px;font-family:Arial';
  d.innerHTML = `
  <div style="background:#0b4fd8;color:#fff;padding:12px;display:flex;align-items:center;gap:10px">
    <button onclick="document.getElementById('pageBenin').remove()" style="background:#fff;color:#0b4fd8;border:0;border-radius:20px;padding:8px 14px;font-weight:bold">←</button>
    <b>Bénin</b>
  </div>
  <div style="padding:12px">
    <div style="background:#fff;border-radius:14px;padding:6px;display:flex;gap:6px">
      <button id="btnAuj" onclick="afficherTiragesBenin('auj')" style="flex:1;background:#0b4fd8;color:#fff;border:0;border-radius:10px;padding:12px;font-weight:bold">Aujourd'hui 5</button>
      <button id="btnVen" onclick="afficherTiragesBenin('venir')" style="flex:1;background:#fff;color:#0b4fd8;border:0;border-radius:10px;padding:12px;font-weight:bold">À venir 1</button>
    </div>
    <div id="listeTiragesBenin" style="margin-top:12px"></div>
  </div>
  `;
  document.body.appendChild(d);
  afficherTiragesBenin('auj');
};
window.afficherTiragesBenin = function(type){
  let box = document.getElementById('listeTiragesBenin'); if(!box) return;
  let bA = document.getElementById('btnAuj'); let bV = document.getElementById('btnVen');
  if(type === 'auj'){
    if(bA){ bA.style.background = '#0b4fd8'; bA.style.color = '#fff'; }
    if(bV){ bV.style.background = '#fff'; bV.style.color = '#0b4fd8'; }
    box.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      ${carteTirageBenin('VENDREDI 11H','Auj. 09:50','27 min')}
      ${carteTirageBenin('VENDREDI 14H','Auj. 12:50','3h27')}
      ${carteTirageBenin('VENDREDI 18H','Auj. 16:50','7h27')}
      ${carteTirageBenin('VENDREDI 21H','Auj. 18:50','9h27')}
      ${carteTirageBenin('VENDREDI 00H','Auj. 22:50','13h27')}
    </div>`;
  } else {
    if(bA){ bA.style.background = '#fff'; bA.style.color = '#0b4fd8'; }
    if(bV){ bV.style.background = '#0b4fd8'; bV.style.color = '#fff'; }
    box.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      ${carteTirageBenin('SAMEDI 08H','Dem. 06:50','21h27')}
    </div>`;
  }
};

function carteTirageBenin(nom, heure, reste){
  return `<div onclick="alert('Jouer ${nom} - on fait ça juste après, boss')" style="background:#fff;border-radius:14px;padding:12px;border:1px solid #ddd">
    <div style="font-weight:bold">🇧🇯 ${nom}</div>
    <div style="display:flex;justify-content:space-between;margin-top:8px;font-size:13px;color:#555"><span>${heure}</span><span style="background:#eee;border-radius:10px;padding:3px 8px">${reste}</span></div>
  </div>`;
}
})();
