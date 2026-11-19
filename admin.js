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
