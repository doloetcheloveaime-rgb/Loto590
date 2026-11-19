// CREER-REVENDEUR.JS - A PART, SEPARÉ DE ADMIN.JS
// Ce fichier ne fait QU'UNE chose : créer un revendeur

function getData(){
  return JSON.parse(localStorage.getItem('adminData') || '{"caisse":2000000,"revendeurs":{},"archiveAdmin":[]}');
}
function saveData(d){ localStorage.setItem('adminData', JSON.stringify(d)); }

function brancherCreation(){
  document.querySelectorAll('button').forEach(b=>{
    let t=(b.textContent||'').toUpperCase();
    if(t.includes('CRÉER REVENDEUR') || t.includes('CREER REVENDEUR')){
      if(b.dataset.branche) return;
      b.dataset.branche='1';
      b.onclick=()=>{
        let inputs=document.querySelectorAll('input');
        let etab=inputs[0]?.value||'';
        let nom=inputs[1]?.value||'';
        let gmail=inputs[2]?.value||'';
        let whatsapp=inputs[3]?.value||'';
        let mdp=inputs[4]?.value||'';
        if(!nom || !whatsapp || !mdp){ alert('Remplis Nom + WhatsApp + Mot de passe'); return; }

        let code='REV-'+Math.floor(10000+Math.random()*90000);
        let data=getData();
        data.revendeurs[whatsapp]={etab:etab,nom:nom,gmail:gmail,whatsapp:whatsapp,mdp:mdp,code:code,solde:0,archive:[]};
        data.archiveAdmin.push('Tu as créé revendeur '+nom+' ('+whatsapp+') Code '+code);
        saveData(data);

        alert('Revendeur créé ! Code : '+code);
        let msg='Bonjour '+nom+', ton compte revendeur NET LOTO est créé.\n\nEtablissement : '+etab+'\nTon code : '+code+'\nTon mot de passe : '+mdp+'\n\nVa sur le site, tape ton WhatsApp + ton code + ton mot de passe pour ouvrir TA page.';
        window.open('https://wa.me/'+whatsapp.replace(/\D/g,'')+'?text='+encodeURIComponent(msg),'_blank');
      };
    }
  });
}
brancherCreation();
setInterval(brancherCreation, 1000);
