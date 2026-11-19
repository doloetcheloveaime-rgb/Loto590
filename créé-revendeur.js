// CREER-REVENDEUR.JS - REPRIS A ZERO - PROPRE
// 1 seul travail : ADMIN crée le revendeur, le revendeur ne crée rien

function getData(){
  return JSON.parse(localStorage.getItem('adminData') || '{"caisse":2000000,"revendeurs":{},"archiveAdmin":[]}');
}
function saveData(d){ localStorage.setItem('adminData', JSON.stringify(d)); }

// QUAND ADMIN APPUIE SUR + CREER REVENDEUR
function brancherCreation(){
  document.querySelectorAll('button').forEach(b=>{
    let t = (b.textContent||'').toUpperCase();
    if(t.includes('CREER REVENDEUR') || t.includes('CRÉER REVENDEUR')){
      if(b.dataset.ok) return;
      b.dataset.ok = '1';
      b.onclick = ()=>{
        let inputs = document.querySelectorAll('input');
        let etab = inputs[0]?.value || '';
        let nom = inputs[1]?.value || '';
        let gmail = inputs[2]?.value || '';
        let whatsapp = inputs[3]?.value || '';
        let mdp = inputs[4]?.value || '';
        if(!nom || !whatsapp || !mdp){ alert('Remplis Nom + WhatsApp + Mot de passe'); return; }

        let code = 'REV-' + Math.floor(10000 + Math.random()*90000);
        let data = getData();
        data.revendeurs[whatsapp] = { etab: etab, nom: nom, gmail: gmail, whatsapp: whatsapp, mdp: mdp, code: code, solde: 0, archive: [] };
        data.archiveAdmin.push('Tu as créé revendeur '+nom+' Code '+code);
        saveData(data);

        alert('Revendeur créé ! Code : '+code);
        let msg = 'Bonjour '+nom+', ton compte revendeur NET LOTO est créé.\nCode : '+code+'\nMot de passe : '+mdp+'\nTape ton WhatsApp + ton code + ton mot de passe pour ouvrir TA page.';
        window.open('https://wa.me/'+whatsapp.replace(/\D/g,'')+'?text='+encodeURIComponent(msg),'_blank');
      };
    }
  });
}
brancherCreation();
setInterval(brancherCreation, 1000);
