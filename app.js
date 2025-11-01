// 99 sweet lines (customizable)
// Helper bounds
const W = () => layer.clientWidth; const H = () => layer.clientHeight;


// random color triple
function rainbow(){
    const hue = Math.floor(Math.random()*360);
    return [`hsl(${hue} 92% 72%)`, `hsl(${(hue+60)%360} 92% 70%)`, `hsl(${(hue+300)%360} 92% 74%)`];
}


// Spawn 99 DOM bubbles (no canvas)
const bubbles = [];
function spawnBubble(text){
    const el = document.createElement('div');
    el.className = 'bubble';
    el.textContent = text;
// rainbow halo via CSS variables
    const [c1,c2,c3] = rainbow();
    el.style.setProperty('--c1', c1);
    el.style.setProperty('--c2', c2);
    el.style.setProperty('--c3', c3);
    el.style.setProperty('--rnd', (Math.random()*1.2+0.2).toFixed(2));
    layer.appendChild(el);


    const rect = el.getBoundingClientRect();
    const w = rect.width, h = rect.height;
    const x = Math.random() * (W()-w);
    const y = Math.random() * (H()-h);
    const vx = (1 + Math.random()*1.6) * (Math.random()>.5?1:-1);
    const vy = (1 + Math.random()*1.6) * (Math.random()>.5?1:-1);


    const b = {el, x, y, w, h, vx, vy, alive:true};
    el.style.setProperty('--tx', x+"px");
    el.style.setProperty('--ty', y+"px");


// click pop
    el.addEventListener('click', (ev)=> popBubble(b, ev.clientX, ev.clientY));
    el.addEventListener('keydown', (e)=>{ if(e.key==='Enter') el.click(); });
    bubbles.push(b);
}


function popBubble(b, cx, cy){
    if(!b.alive) return; b.alive=false;
    b.el.classList.add('popping');
    ring(cx, cy); sparkles(cx, cy);
    setTimeout(()=>{ b.el.remove(); checkFinish(); }, 440);
}


function ring(x,y){
    const r = document.createElement('div'); r.className='ring anim';
    r.style.left = x+'px'; r.style.top = y+'px'; r.style.width=r.style.height='64px'; r.style.position='fixed'; r.style.transform='translate(-50%,-50%)';
    document.body.appendChild(r); setTimeout(()=> r.remove(), 600);
}
function sparkles(x,y){
    for(let i=0;i<6;i++){
        const s=document.createElement('div'); s.className='spark'; s.style.left=x+'px'; s.style.top=y+'px'; s.style.position='fixed'; s.style.transform='translate(-50%,-50%)';
        const ang = Math.random()*Math.PI*2; const dist = 30+Math.random()*40;
        s.style.setProperty('--sx', Math.cos(ang)*dist+'px'); s.style.setProperty('--sy', Math.sin(ang)*dist+'px');
        document.body.appendChild(s); setTimeout(()=> s.remove(), 650);
    }
}


// move with rAF
function tick(){
    const w=W(), h=H();
    for(const b of bubbles){ if(!b.alive) continue;
        b.x += b.vx; b.y += b.vy;
        if(b.x <= 0 || b.x + b.w >= w){ b.vx *= -1; b.x = Math.max(0, Math.min(b.x, w-b.w)); }
        if(b.y <= 0 || b.y + b.h >= h){ b.vy *= -1; b.y = Math.max(0, Math.min(b.y, h-b.h)); }
        b.el.style.setProperty('--tx', b.x+"px");
        b.el.style.setProperty('--ty', b.y+"px");
    }
    requestAnimationFrame(tick);
}


messages.slice(0,99).forEach(spawnBubble);
tick();


function checkFinish(){
    const left = bubbles.filter(b=>b.alive).length;
    if(left===0){ cta.classList.add('show'); }
}


// CTA reveal final
cta.addEventListener('click', (e)=>{
// make the button also "pop"
    const rect = cta.getBoundingClientRect();
    ring(rect.left+rect.width/2, rect.top+rect.height/2);
    cta.style.transition='transform .3s ease, opacity .3s ease';
    cta.style.transform='translateX(-50%) scale(.7)'; cta.style.opacity='0';
    setTimeout(()=>{ cta.remove(); final.classList.add('show'); final.setAttribute('aria-hidden','false'); }, 320);
});


// resize: update bubble sizes
window.addEventListener('resize', ()=>{
    for(const b of bubbles){ if(!b.alive) continue; const r=b.el.getBoundingClientRect(); b.w=r.width; b.h=r.height; }
});