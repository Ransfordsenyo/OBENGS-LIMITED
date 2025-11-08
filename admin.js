// Admin JS v2
const loginBtn = document.getElementById('loginBtn');
const loginMsg = document.getElementById('loginMsg');
const adminPanel = document.getElementById('adminPanel');
const loginBox = document.getElementById('loginBox');
const logout = document.getElementById('logout');
const adminList = document.getElementById('adminList');

function requireAuth(){ const ok = sessionStorage.getItem('obeng_admin_v2')==='1'; if(ok){ loginBox.style.display='none'; adminPanel.style.display='block'; renderList(); } }
requireAuth();

loginBtn.addEventListener('click', ()=>{
  const u = document.getElementById('adminUser').value, p = document.getElementById('adminPass').value;
  if(u==='admin' && p==='1234'){ sessionStorage.setItem('obeng_admin_v2','1'); requireAuth(); } else loginMsg.textContent='Invalid credentials (demo: admin / 1234)';
});
logout && logout.addEventListener('click', ()=>{ sessionStorage.removeItem('obeng_admin_v2'); adminPanel.style.display='none'; loginBox.style.display='block'; });

function renderList(){ const raw = localStorage.getItem('obeng_projects_v2'); const arr = raw?JSON.parse(raw):[]; adminList.innerHTML=''; arr.forEach(p=>{ const el=document.createElement('div'); el.innerHTML=`<strong>${p.title}</strong> — ${p.type} <button data-id="${p.id}" class="del">Delete</button>`; adminList.appendChild(el); }); document.querySelectorAll('.del').forEach(b=> b.addEventListener('click', (e)=>{ const id=Number(e.target.dataset.id); const arr=JSON.parse(localStorage.getItem('obeng_projects_v2')||'[]').filter(x=>x.id!==id); localStorage.setItem('obeng_projects_v2', JSON.stringify(arr)); renderList(); window.dispatchEvent(new Event('storage')); })); }

document.getElementById('addProj').addEventListener('click', ()=>{
  const title = document.getElementById('projTitle').value.trim();
  const type = document.getElementById('projType').value;
  const file = document.getElementById('projFile').files[0];
  if(!title||!file){ alert('Title and file required'); return; }
  const reader = new FileReader();
  reader.onload = function(e){
    const dataUrl = e.target.result;
    const raw = localStorage.getItem('obeng_projects_v2');
    const arr = raw?JSON.parse(raw):[];
    const id = Date.now();
    arr.push({id:id,title:title,type:type,media:dataUrl});
    localStorage.setItem('obeng_projects_v2', JSON.stringify(arr));
    renderList();
    alert('Project added locally. Visit main page to see it.'); window.dispatchEvent(new Event('storage'));
  };
  reader.readAsDataURL(file);
});
