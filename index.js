// ===== DOM =====
const $ = (q) => document.querySelector(q);
const field = $('#field');
const bgm = $('#bgm');
const finalBubble = $('#finalBubble');
const finalMessage = $('#finalMessage');

// 初始并发数量 39；总共要点碎 99 个
const BUBBLE_ACTIVE = 39;
const TOTAL_TO_POP  = 99;

const COLORS = [
    '#FF7AA2','#FFAA64','#FFD166','#9AECDB','#A29BFE','#6EC3FF','#7AF1B2','#FF9CEE',
    '#FFD6A5','#B9FBC0','#A0C4FF','#BDB2FF','#FFC6FF','#FFADAD','#FDFFB6','#CAFFBF',
    '#9BF6FF','#A0E7E5','#B4F8C8','#FBE7C6','#F1C0E8','#B8E0D2','#F6A6FF','#FFBCBC'
];

// 99 条温馨文案（保持不变）
const MESSAGES = [
    "今天的风很温柔，像你一样。","想把整个春天揉进一封信寄给你。","你一笑，世界就亮了一秒。",
    "早安，把好心情递给你。","晚安，月亮替我亲亲你。","借我一个拥抱，还你一整片星海。",
    "你是我见过最温柔的奇迹。","有你在的地方，风都变甜了。","和你聊天比奶茶还上头。",
    "想把所有温柔都攒给你。","今天也要做你的骄傲。","你的名字，写在风里也不会散。",
    "你是我永远说不腻的小朋友。","认真生活，也认真喜欢你。","你一出现，夏天就来啦。",
    "我把喜欢装进口袋，见到你就偷偷拿出来。","月亮不营业时，我来照亮你。","把烦恼丢进晚风里吧。",
    "有你的日子，连云都在发光。","给你一颗草莓味的心。","我对你的喜欢，不止“喜欢”。",
    "你是答案，也是例外。","你比星星更会发光。","把你写进日记，偷偷变成整本书。",
    "想把全世界的好天气都给你。","我在每一个想你的瞬间，都在发光。","见到你就想把手机调成飞行模式，只看你。",
    "你是我每天都会偷看的心上人。","宇宙浪漫不及你回头一眼。","和你在一起，连沉默都很可爱。",
    "你是我心里的小宇宙。","你笑的时候，风都停下来听。","把所有的温柔和月亮都给你。",
    "你是我奔赴的意义。","我在等风，也在等你。","见你一面，心就住下了。",
    "你像晚风一样，吹来了温柔。","我把喜欢寄存在你的每条消息里。","想把你放进口袋，带回家给猫看看。",
    "和你走在一起，连影子都在笑。","你是我日复一日的心动。","我想把星星摘下来给你当耳环。",
    "你一出现，烦恼就自愈了。","你的名字，是我打字最稳的词。","我想和你，在余生里慢慢长大。",
    "你是我所有计划里最确定的那一项。","我对你的喜欢，正在路上不打烊。","你是四季里最温柔的风。",
    "我把每次心跳都写成你的名字。","给你一朵特别的云，专门用来做梦。","我不等星星了，等你就好。",
    "希望以后，月亮也认得你。","想和你看遍人间灯火。","你的眼睛里有星河滚烫。",
    "把不开心丢进海里，让我带你看浪。","世界很吵，幸好你很温柔。","我喜欢你，从眉眼到心里。",
    "你是我长长人生里最短的心动。","这世间美好与你环环相扣。","想把所有的“惊喜”都变成“常有”。",
    "你是我小小宇宙的引力源。","想和你在雨里散步，在风里相拥。","你是我偷偷收藏的快乐。",
    "我看到你，像看见了春天。","你的每一句晚安，都有小鹿踩过我的心。","我想给你写一整年的情书。",
    "你的手，应该被我牵着。","你是我躲不开的温柔。","在最平凡的日子里，也要和你一起发光。",
    "想和你一起把日子过成诗。","我把明天的好运都分你一点。","你是我不敢声张的小欢喜。",
    "晴天雨天，有你都是好天气。","你一回头，所有花都开了。","我的心，正在给你让座。",
    "想和你去看一次最美的极光。","你是我心里最柔软的那一页。","我会把所有温暖都留给你。",
    "听风都在替我说喜欢你。","你是我的不二选择。","我想把余生的糖分都给你。",
    "你走进我心里时，带来了一整片晴空。","你是我写给世界的情诗。","你的笑，是我每天的期待。",
    "我在等一个和你一起的未来。","你比照片里更好看，比故事里更温柔。","想把每天的第一缕阳光分给你。",
    "你是我没说出口的惊叹号。","我的眼里只有你，这不公平，却很真。","把拥抱寄给你，温柔保温到达。",
    "想把我所有的勇气都给你。","山海可以跨，你也可以拥抱。","你是我梦里最明亮的灯。",
    "我想和你一起把平凡，过成不凡。","你的爱，是我最好的盔甲与软肋。","我在每个清晨醒来，想到的都是你。",
    "你是我心上最柔软的那块糖。","想和你一起变老，再一起变成小孩。","只要你在，远方就不远。",
    "我愿意做你的专属晴天。","你是宇宙写给我的温柔答案。"
];

// 运行时计数
let activeCount = 0;     // 当前场上泡泡数量
let poppedCount = 0;     // 已经点碎的总数
let nextIndex   = 0;     // 将要使用的文案索引（0~98）

// 正在随机移动的泡泡集合
const movers = new Set();

// ===== 生成一个泡泡（中心透明 → 散开到安全范围 → 加入随机移动）=====
function spawnOne(i){
    if (i >= MESSAGES.length) return; // 文案只有 99 条
    const W = window.innerWidth, H = window.innerHeight;
    const marginX = 40, marginY = 80;
    const centerX = W/2, centerY = H/2;

    const el = document.createElement('div');
    el.className = 'bubble';
    el.textContent = MESSAGES[i];

    const targetX = clamp(random(marginX, W - 300), marginX, W - 300); // 泡泡更大，留出 300 宽
    const targetY = clamp(random(marginY, H - 160), marginY, H - 160);

    // CSS 变量：先从中心过渡到目标位
    el.style.setProperty('--tx', `${targetX - centerX}px`);
    el.style.setProperty('--ty', `${targetY - centerY}px`);

    // === 速度：比上一版再慢 10 倍 ===
    el.dataset.vx  = (Math.random()*0.36 - 0.18).toFixed(3); // ±0.18
    el.dataset.vy  = (Math.random()*0.36 - 0.18).toFixed(3);
    el.dataset.avx = '0';
    el.dataset.avy = '0';
    el.dataset.tx  = (targetX - centerX).toFixed(3);
    el.dataset.ty  = (targetY - centerY).toFixed(3);

    // 外观（柔和彩色边）
    const color = COLORS[Math.floor(Math.random()*COLORS.length)];
    el.style.border = `1px solid ${hexToRgba(color, .55)}`;
    el.style.boxShadow = `0 6px 18px ${hexToRgba(color, .18)}, inset 0 0 24px rgba(255,255,255,.28)`;

    // 点击：音效 + 快速消失 + 统计 + 可能补位
    el.addEventListener('click', ()=>{
        if(el.classList.contains('vanish')) return;
        playPop();
        movers.delete(el);
        el.classList.add('vanish');
        setTimeout(()=>{
            el.remove();
            activeCount--;
            poppedCount++;

            // 补位：若还没达到 99，就继续生成下一条
            if (poppedCount < TOTAL_TO_POP && nextIndex < MESSAGES.length){
                spawnOne(nextIndex++);
            } else {
                // 不再补位：当场上已全部清空时，显示最终按钮
                if (activeCount === 0){
                    setTimeout(()=> finalBubble.classList.remove('hidden'), 200);
                }
            }
        }, 220);
    });

    field.appendChild(el);

    // 触发散开过渡
    requestAnimationFrame(()=> el.classList.add('scatter'));

    // 过渡结束 → 交给 JS 驱动
    const toMover = ()=>{
        if(movers.has(el)) return;
        el.style.transition = 'transform 1ms linear';
        const tx = parseFloat(el.dataset.tx);
        const ty = parseFloat(el.dataset.ty);
        el.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`;
        movers.add(el);
    };
    el.addEventListener('transitionend', (ev)=>{
        const p = ev.propertyName || '';
        if(p.includes('transform')) toMover();
    });
    setTimeout(toMover, 1000); // 兜底

    activeCount++;
}

// 首批生成 39 个
function spawnBubbles(){
    nextIndex = 0;
    activeCount = 0;
    poppedCount = 0;
    for (let i = 0; i < BUBBLE_ACTIVE; i++){
        spawnOne(nextIndex++);
    }
}

// ===== 随机移动（更慢 10x，惯性 + 反弹，不出屏）=====
let _lastTs = 0;
function animateMove(ts = performance.now()){
    // 降帧到 ~30fps，更省资源
    if (ts - _lastTs < 33) { requestAnimationFrame(animateMove); return; }
    _lastTs = ts;

    const W = window.innerWidth, H = window.innerHeight;
    const marginX = 60, marginY = 100;
    const minX = -W/2 + marginX, maxX =  W/2 - marginX;
    const minY = -H/2 + marginY, maxY =  H/2 - marginY;

    // —— 比上一版慢 10 倍 ——
    const INERTIA   = 0.06;
    const FRICTION  = 0.997;
    const MAX_SPEED = 1.6;  // 16 → 1.6
    const MIN_SPEED = 0.3;  // 3  → 0.3

    movers.forEach(el=>{
        let vx  = parseFloat(el.dataset.vx);
        let vy  = parseFloat(el.dataset.vy);
        let avx = parseFloat(el.dataset.avx);
        let avy = parseFloat(el.dataset.avy);
        let tx  = parseFloat(el.dataset.tx);
        let ty  = parseFloat(el.dataset.ty);

        // 方向微调：频率低、力度很轻（保持慢慢游走）
        if (Math.random() < 0.02){
            avx += (Math.random() - 0.5) * 0.22;
            avy += (Math.random() - 0.5) * 0.22;
            const as = Math.hypot(avx, avy);
            if (as > MAX_SPEED){ avx = avx/as*MAX_SPEED; avy = avy/as*MAX_SPEED; }
            el.dataset.avx = avx.toFixed(3);
            el.dataset.avy = avy.toFixed(3);
        }

        // 低通跟随 + 阻尼
        vx += (avx - vx) * INERTIA;
        vy += (avy - vy) * INERTIA;
        vx *= FRICTION; vy *= FRICTION;

        // 限速 & 保底
        let sp = Math.hypot(vx, vy);
        if (sp > MAX_SPEED){ vx = vx/sp*MAX_SPEED; vy = vy/sp*MAX_SPEED; sp = MAX_SPEED; }
        if (sp < MIN_SPEED){ const k = MIN_SPEED / (sp || 1); vx*=k; vy*=k; sp = MIN_SPEED; }

        // 移动
        tx += vx; ty += vy;

        // 边界反弹
        if (tx > maxX){ tx = maxX; vx = -Math.abs(vx); avx = -Math.abs(avx); }
        if (tx < minX){ tx = minX; vx =  Math.abs(vx); avx =  Math.abs(avx); }
        if (ty > maxY){ ty = maxY; vy = -Math.abs(vy); avy = -Math.abs(avy); }
        if (ty < minY){ ty = minY; vy =  Math.abs(vy); avy =  Math.abs(avy); }

        // 存回
        el.dataset.vx = vx.toFixed(3);
        el.dataset.vy = vy.toFixed(3);
        el.dataset.avx = avx.toFixed(3);
        el.dataset.avy = avy.toFixed(3);
        el.dataset.tx = tx.toFixed(3);
        el.dataset.ty = ty.toFixed(3);

        // 仅位移（去掉每帧滤镜/缩放，稳帧率）
        el.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`;
    });

    requestAnimationFrame(animateMove);
}

// ===== 最终按钮：爆发粒子 + 显示文案 =====
finalBubble.addEventListener('click', ()=>{
    const r = finalBubble.getBoundingClientRect();
    const cx = r.left + r.width/2;
    const cy = r.top  + r.height/2;
    finalBubble.classList.add('hidden');
    spawnBurst(cx, cy);
    setTimeout(()=>{
        finalMessage.classList.remove('hidden');
        finalMessage.classList.add('show');
        rainHearts();
    }, 260);
});

// ===== 粒子（DOM 实现）=====
function spawnBurst(x,y){
    const palette = ['#ff8fab','#ffd166','#8ecae6','#bde0fe','#caffbf','#f1c0e8','#a0e7e5','#ffb3c6'];
    for(let i=0;i<80;i++){
        const p = document.createElement('span');
        p.className = i%2 ? 'particle heart' : 'particle square';
        p.style.left = x+'px'; p.style.top = y+'px';
        const a = Math.random()*Math.PI*2; const d = 120 + Math.random()*180;
        p.style.setProperty('--dx', `${Math.cos(a)*d}px`);
        p.style.setProperty('--dy', `${Math.sin(a)*d}px`);
        p.style.color = palette[i%palette.length];
        document.body.appendChild(p);
        setTimeout(()=>p.remove(), 950);
    }
}
function rainHearts(){
    const total = 80, W = window.innerWidth, H = window.innerHeight;
    for(let i=0;i<total;i++){
        setTimeout(()=>{
            const p = document.createElement('span');
            p.className = 'particle heart';
            p.style.left = Math.random()*W + 'px';
            p.style.top  = '-10px';
            const dx = (Math.random()*2-1)*120;
            const dy = H + 120 + Math.random()*120;
            p.style.setProperty('--dx', `${dx}px`);
            p.style.setProperty('--dy', `${dy}px`);
            p.style.color = COLORS[i%COLORS.length];
            document.body.appendChild(p);
            setTimeout(()=>p.remove(), 1000);
        }, i*25);
    }
}

// ===== 音乐自动播放（淡入）=====
function tryPlay(){
    bgm.muted = true;
    bgm.volume = 0.6;
    const start = () => {
        bgm.play().then(()=>{
            let vol = 0;
            bgm.volume = 0;
            bgm.muted = false;
            const t = setInterval(()=>{
                vol += 0.06;
                bgm.volume = Math.min(0.6, vol);
                if (vol >= 0.6) clearInterval(t);
            }, 120);
            window.removeEventListener('pointerdown', resumeOnce);
            window.removeEventListener('keydown', resumeOnce);
            document.removeEventListener('visibilitychange', resumeOnce);
        }).catch(()=>{
            window.addEventListener('pointerdown', resumeOnce, {once:true});
            window.addEventListener('keydown',     resumeOnce, {once:true});
            document.addEventListener('visibilitychange', resumeOnce, {once:true});
        });
    };
    const resumeOnce = () => start();
    start();
}

// 点击音效（与 index.html 同目录的 pop.mp3）
function playPop(){
    const a = new Audio('pop.mp3');
    a.volume = 1.0;
    a.currentTime = 0;
    a.play().catch(()=>{});
}

// 工具
function random(min, max){ return Math.random()*(max-min)+min; }
function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }
function hexToRgba(hex, a=1){
    const c = hex.replace('#',''); const n = parseInt(c,16);
    const r=(n>>16)&255, g=(n>>8)&255, b=n&255;
    return `rgba(${r},${g},${b},${a})`;
}

// 初始化
document.addEventListener('DOMContentLoaded', ()=>{
    spawnBubbles();
    tryPlay();
    requestAnimationFrame(animateMove);
});

// 视口变化：夹紧位置（不出屏）
window.addEventListener('resize', ()=>{
    const W = window.innerWidth, H = window.innerHeight;
    const marginX = 60, marginY = 100;
    const minX = -W/2 + marginX, maxX =  W/2 - marginX;
    const minY = -H/2 + marginY, maxY =  H/2 - marginY;
    movers.forEach(el=>{
        let tx = clamp(parseFloat(el.dataset.tx), minX, maxX);
        let ty = clamp(parseFloat(el.dataset.ty), minY, maxY);
        el.dataset.tx = tx.toFixed(3);
        el.dataset.ty = ty.toFixed(3);
        el.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`;
    });
});
