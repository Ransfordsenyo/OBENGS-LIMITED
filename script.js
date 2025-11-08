
// Enhanced interactions v2
document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());

// Hero slider auto-rotation
let slides = document.querySelectorAll('.hero-slider .slide');
let cur = 0;
function showSlide(i){
  slides.forEach(s=>s.classList.remove('active'));
  slides[i].classList.add('active');
}
if(slides.length>0){
  showSlide(0);
  setInterval(()=>{ cur=(cur+1)%slides.length; showSlide(cur); },5000);
}

// Counters when visible
const counters = document.querySelectorAll('.counter');
const options = {threshold:0.5};
const counterObs = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const el = entry.target;
      const target = +el.dataset.target;
      let n=0; const step = Math.ceil(target/60);
      const t = setInterval(()=>{ n+=step; if(n>=target){ el.textContent = target; clearInterval(t);} else el.textContent = n; },20);
      counterObs.unobserve(el);
    }
  });
}, options);
counters.forEach(c=>counterObs.observe(c));

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle && themeToggle.addEventListener('click', ()=>{ document.body.classList.toggle('dark'); themeToggle.textContent = document.body.classList.contains('dark') ? '☀️':'🌙'; });

// Mobile nav
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.querySelector('.main-nav');
menuToggle && menuToggle.addEventListener('click', ()=>{ if(getComputedStyle(mainNav).display==='none') mainNav.style.display='flex'; else mainNav.style.display='none'; });

// Expand service details
document.querySelectorAll('.service-card .expand').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const parent = btn.closest('.service-card');
    const ex = parent.querySelector('.expanded');
    ex.style.display = ex.style.display === 'block' ? 'none' : 'block';
  });
});

// Before/after simple toggle (click divider)
document.querySelectorAll('.before-after .divider').forEach(div=>{
  div.addEventListener('click', ()=>{
    const wrapper = div.parentElement;
    wrapper.classList.toggle('swapped');
    const imgs = wrapper.querySelectorAll('img');
    if(wrapper.classList.contains('swapped')){ wrapper.insertBefore(imgs[1], imgs[0]); } else { wrapper.insertBefore(imgs[1], imgs[0]); }
  });
});

// Lightbox for videos
const lightbox = document.getElementById('lightbox');
const lbContent = document.getElementById('lbContent');
const lbClose = document.getElementById('lbClose');
document.querySelectorAll('.play-video').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const src = btn.dataset.video;
    lbContent.innerHTML = `<video controls autoplay src="${src}"></video>`;
    lightbox.style.display='flex'; lightbox.setAttribute('aria-hidden','false');
  });
});
lbClose && lbClose.addEventListener('click', ()=>{ closeLightbox(); });
lightbox && lightbox.addEventListener('click', (e)=>{ if(e.target===lightbox) closeLightbox(); });
function closeLightbox(){ lightbox.style.display='none'; lbContent.innerHTML=''; lightbox.setAttribute('aria-hidden','true'); }

// Projects - load from localStorage (or seed)
function loadProjects(){
  const grid = document.getElementById('projectsGrid');
  const raw = localStorage.getItem('obeng_projects_v2');
  const projects = raw ? JSON.parse(raw) : [
    {id:1,title:'Culvert restoration',type:'culvert',media:'assets/proj1.jpg'},
    {id:2,title:'Residential housing',type:'building',media:'assets/proj2.jpg'},
    {id:3,title:'Excavation site',type:'building',media:'assets/proj3.jpg'},
    {id:4,title:'Commercial tiling',type:'tiling',media:'assets/proj4.jpg'}
  ];
  grid.innerHTML='';
  projects.forEach(p=>{
    const el = document.createElement('div'); el.className='project'; el.dataset.type=p.type;
    if(p.media.endsWith('.mp4')) el.innerHTML=`<video controls src="${p.media}"></video><div class="proj-meta">${p.title}</div>`;
    else el.innerHTML=`<img src="${p.media}" alt="${p.title}"><div class="proj-meta">${p.title}</div>`;
    grid.appendChild(el);
  });
}
loadProjects();

// Filter projects
document.querySelectorAll('.filter').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const t = btn.dataset.type;
    document.querySelectorAll('#projectsGrid .project').forEach(p=>{
      p.style.display = (t==='all' || p.dataset.type===t) ? 'block' : 'none';
    });
  });
});

// Testimonials carousel (simple)
let tSlides = document.querySelectorAll('#testimonials .slide'), tIndex=0;
function showTest(i){ tSlides.forEach(s=>s.classList.remove('active')); tSlides[i].classList.add('active'); }
if(tSlides.length>0){ showTest(0); setInterval(()=>{ tIndex=(tIndex+1)%tSlides.length; showTest(tIndex); },4000); }

// Contact form message
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
form && form.addEventListener('submit',(e)=>{
  formMsg.textContent='Sending...';
  setTimeout(()=>{ formMsg.textContent='Submitted — you will be redirected by Formspree if configured.'; },700);
});

// Scroll-to-top and call button
const toTop = document.getElementById('toTop');
toTop.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));
const callNow = document.getElementById('callNow');
callNow.addEventListener('click', ()=>{ window.location.href='tel:+233200000000'; });

// Admin interop: if projects changed, reload main page
window.addEventListener('storage', (e)=>{ if(e.key==='obeng_projects_v2') loadProjects(); });
