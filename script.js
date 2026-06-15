/* ============================================================================
   INVITACIÓN 15 AÑOS - GUADALUPE
   script.js — Paleta Renovada: #C38380 (Rosy Blush) | #9C7164 (Rose Taupe) 
               #D8B69F (Soft Peach) | #E8E1D1 (Antique Lace) | #4B342C (Deep Umber)
============================================================================ */

/* ===== CONFIGURACIÓN Y SISTEMA DE NAVEGACIÓN ===== */
const PAGES = 7; 
let current = 0; 
let typingTimeout; 

// Inicialización: Forzar que solo la página inicial esté visible físicamente al cargar
document.addEventListener("DOMContentLoaded", () => {
  for (let i = 1; i <= PAGES; i++) {
    const page = document.getElementById('p' + i);
    if (page) {
      if (i === 1) {
        page.style.display = 'flex';
      } else {
        page.style.display = 'none';
      }
    }
  }
});

// Función principal para cambiar de página (CORREGIDA para evitar bloqueos de clicks)
function goTo(n) {
  // 1. Desactivar y ocultar por completo la página anterior
  const activePage = document.getElementById('p' + (current + 1));
  if (activePage) {
    activePage.classList.remove('active');
    activePage.style.display = 'none'; // Desaparece físicamente para liberar clicks
  }

  // 2. Actualizar el índice de la página actual
  current = n; 

  // 3. Activar y mostrar la nueva página
  const nextPage = document.getElementById('p' + (current + 1));
  if (nextPage) {
    nextPage.style.display = 'flex'; // Aparece en el DOM
    // Pequeño delay imperceptible para que el navegador asimile el display antes de la animación de opacidad
    setTimeout(() => {
      nextPage.classList.add('active');
    }, 10);
  }

  // ===== CONTROL CENTRALIZADO DE EFECTOS MÁQUINA DE ESCRIBIR =====
  if (n === 1) { 
    clearTimeout(typingTimeout); 
    const textoPagina2 = "Hoy el universo se detuvo para celebrar a la niña que se convirtió en una princesa. Guadalupe, tu sonrisa ilumina todo rincón y tu corazón es pura magia.";
    typeWriter('typing-text-p2', textoPagina2, 45); 
  }

  if (n === 2) { 
    clearTimeout(typingTimeout); 
    const textoPagina3Part1 = "Hace 15 años mis padres daban gracias a Dios por mi, hoy doy gracias a Dios por ellos, por cuidarme, tenerme paciencia y aconsejarme.\n\nDoy gracias a toda mi familia por hacer más especial este día y a todos mis amigos por enseñarme el valor de una verdadera amistad.\n\nDeleite en el señor y él te concederá los deseos de tu corazón. Salmos 37:4";
    typeWriter('typing-text-p3', textoPagina3Part1, 45);
  }

  if (n === 3) {
    clearTimeout(typingTimeout);
    const parte1 = "El momento tan esperado ha llegado, y no sería igual sin tu presencia, por lo cual la familia Roman Bedoya nos complace invitarte este:";
    const parte2 = "19 de julio a las 7:00pm";
    const parte3 = "¡Te esperamos para celebrar juntos este día tan especial!";

    typeWriter('typing-text-p4-intro', parte1, 45, function() {
      typeWriter('typing-text-p4-fecha', parte2, 45, function() {
        typeWriter('typing-text-p4-cierre', parte3, 45);
      });
    });
  }
}

/* ===== FUNCIÓN EFECTO MÁQUINA DE ESCRIBIR CON CALLBACK ===== */
function typeWriter(elementId, text, speed, onComplete) {
  let i = 0; 
  const elem = document.getElementById(elementId); 
  if (!elem) return; 
  elem.innerHTML = ''; 
  
  function type() {
    if (i < text.length) { 
      elem.innerHTML += text.charAt(i); 
      i++; 
      typingTimeout = setTimeout(type, speed); 
    } else { 
      if (typeof onComplete === 'function') {
        onComplete(); 
      }
    }
  }
  type(); 
}

/* ===== GESTIÓN DE DIRECCIÓN Y MAPA INTERACTIVO ===== */
let mapUrl = 'https://maps.app.goo.gl/pMKetZa7aC31dRAT6'; 

function openMap() {
  window.open(mapUrl, '_blank');
}

/* ===== REPRODUCTOR DE MÚSICA DE FONDO ===== */
let musicPlaying = false; 

function toggleMusic() {
  const audio = document.getElementById('bg-music'); 
  const musicBtn = document.getElementById('music-btn'); 
  if (!audio) return;

  if (musicPlaying) { 
    audio.pause(); 
    if (musicBtn) musicBtn.textContent = '🎵'; 
  } else { 
    audio.play().catch(err => console.log("Error al activar música:", err)); 
    if (musicBtn) musicBtn.textContent = '⏸'; 
  }
  musicPlaying = !musicPlaying; 
}

function handleFirstOpen() {
  const audio = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-btn');
  
  if (audio && !musicPlaying) { 
    audio.currentTime = 0; 
    audio.play().then(() => { 
      if (musicBtn) musicBtn.textContent = '⏸';
      musicPlaying = true; 
    }).catch(err => {
      console.log("El navegador bloqueó el auto-play inicial, reintentando...", err); 
      audio.muted = false;
      audio.play().catch(() => {});
    });
  }
  
  if (typeof goTo === 'function') {
    goTo(1); 
  }
}

/* ===== CUENTA REGRESIVA EN TIEMPO REAL ===== */
function updateCountdown() {
  const target = new Date('2026-07-19T19:00:00'); 
  const now    = new Date(); 
  const diff   = target - now; 

  const countdownElem = document.getElementById('countdown');
  if (!countdownElem) return;

  if (diff <= 0) { 
    countdownElem.innerHTML =
      '<div style="color:#4B342C; font-family:\'Dancing Script\',cursive; font-size:1.4rem; text-align:center; text-shadow: 0 0 8px #FFF;">¡Llegó el gran día! 🎉</div>';
    return;
  }

  const days = Math.floor(diff / 86400000); 
  const hrs  = Math.floor((diff % 86400000) / 3600000); 
  const mins = Math.floor((diff % 3600000) / 60000); 
  const secs = Math.floor((diff % 60000) / 1000); 

  const blocks = [
    { n: days, l: 'días' },
    { n: hrs,  l: 'horas' },
    { n: mins, l: 'minutos' },
    { n: secs, l: 'segundos' }
  ];

  countdownElem.innerHTML = blocks.map(b =>
    `<div class="cd-block">
       <div class="cd-num">${String(b.n).padStart(2, '0')}</div>
       <div class="cd-label">${b.l}</div>
     </div>`
  ).join('');
}

updateCountdown(); 
setInterval(updateCountdown, 1000); 

/* ===== ANIMACIÓN GRÁFICA AVANZADA EN CANVAS (BOSQUE CLARO LUMINOSO) ===== */
const canvas        = document.getElementById('forest-bg');
const ctx           = canvas.getContext('2d'); 
const sparkleCanvas = document.getElementById('sparkle-layer');
const sctx          = sparkleCanvas.getContext('2d'); 

function resizeCanvas() {
  const root = document.getElementById('inv-root');
  if(!root) return;
  canvas.width        = sparkleCanvas.width  = root.offsetWidth;
  canvas.height       = sparkleCanvas.height = root.offsetHeight;
}

const stars = Array.from({ length: 80 }, () => ({
  x:     Math.random(),
  y:     Math.random() * 0.5,
  r:     Math.random() * 1.5 + 0.3,
  a:     Math.random(),
  speed: Math.random() * 0.01 + 0.003
}));

function drawTree(cx, groundY, h, w, dark) {
  ctx.fillStyle = dark ? '#CBB6A8' : '#DCC8BC'; 
  ctx.beginPath();
  ctx.moveTo(cx, groundY - h);
  ctx.lineTo(cx - w / 2, groundY);
  ctx.lineTo(cx + w / 2, groundY);
  ctx.closePath(); ctx.fill();
  
  ctx.beginPath();
  ctx.moveTo(cx, groundY - h * 0.7);
  ctx.lineTo(cx - w * 0.6, groundY - h * 0.25);
  ctx.lineTo(cx + w * 0.6, groundY - h * 0.25);
  ctx.closePath(); ctx.fill();
}

function drawMushroom(x, y, r, col) {
  ctx.fillStyle = '#E3D7CE'; 
  ctx.fillRect(x - r * 0.18, y - r * 0.4, r * 0.36, r * 0.5);
  ctx.fillStyle = col; 
  ctx.beginPath();
  ctx.arc(x, y - r * 0.4, r * 0.48, Math.PI, 0, false);
  ctx.closePath(); ctx.fill();
  
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(x - r * 0.2 + i * r * 0.2, y - r * 0.55, r * 0.08, 0, Math.PI * 2);
    ctx.fill();
  }
}

const fairy = { x: -60, y: 0.3, vx: 1.2, trail: [] };

function drawFairy(W, H) {
  const fx = fairy.x, fy = fairy.y * H;
  fairy.trail.push({ x: fx, y: fy, a: 1 }); 
  if (fairy.trail.length > 30) fairy.trail.shift(); 

  fairy.trail.forEach((pt, i) => {
    const ratio = i / fairy.trail.length;
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 2.5 * ratio, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(195,131,128,${0.6 * ratio})`; 
    ctx.fill();
    pt.a -= 0.03;
  });

  if (Math.random() < 0.3)
    addSparkle(fx + (Math.random() - 0.5) * 20, fy + (Math.random() - 0.5) * 20);

  ctx.save();
  ctx.translate(fx, fy);
  ctx.fillStyle = '#C38380'; 
  ctx.beginPath(); ctx.arc(0, 0, 6, 0, Math.PI * 2); ctx.fill(); 
  ctx.fillStyle = 'rgba(216, 182, 159, 0.7)'; 
  ctx.beginPath(); ctx.ellipse(-8, -4, 10, 6, -0.4, 0, Math.PI * 2); ctx.fill(); 
  ctx.beginPath(); ctx.ellipse(8,  -4, 10, 6,  0.4, 0, Math.PI * 2); ctx.fill(); 
  ctx.restore();
}

let sparkles = []; 

function addSparkle(x, y) {
  for (let i = 0; i < 4; i++) {
    const col = Math.random() < 0.6
      ? `hsl(${355 + Math.random() * 15}, 42%, ${65 + Math.random() * 10}%)`
      : `hsl(0, 0%, ${95 + Math.random() * 5}%)`;
    sparkles.push({
      x, y,
      vx:   (Math.random() - 0.5) * 2, 
      vy:   (Math.random() - 0.5) * 2 - 1, 
      life: 1, 
      size: Math.random() * 4 + 1, 
      col
    });
  }
}

function drawSparkles() {
  sctx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height); 
  sparkles = sparkles.filter(s => s.life > 0); 
  sparkles.forEach(s => {
    sctx.globalAlpha = s.life; 
    sctx.fillStyle    = s.col;
    sctx.beginPath();
    sctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2); 
    s.x    += s.vx; 
    s.y    += s.vy; 
    s.life -= 0.04; 
  });
  sctx.globalAlpha = 1; 
}

let t = 0; 

function drawForest() {
  if (!canvas.getContext) return; 
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H); 

  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0,   '#FDFBF7'); 
  sky.addColorStop(0.5, '#E8E1D1'); 
  sky.addColorStop(1,   '#DFD7C5');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);

  ctx.shadowBlur  = 25; ctx.shadowColor = '#C38380';
  ctx.fillStyle   = 'rgba(253, 251, 247, 0.95)';
  ctx.beginPath(); ctx.arc(W * 0.8, H * 0.12, 28, 0, Math.PI * 2); ctx.fill();
  ctx.shadowBlur = 0; 
  ctx.fillStyle = 'rgba(216, 182, 159, 0.3)';
  ctx.beginPath(); ctx.arc(W * 0.8 + 8, H * 0.12 - 4, 24, 0, Math.PI * 2); ctx.fill(); 

  stars.forEach(s => {
    s.a += s.speed;
    if (s.a > 1) s.a = 0;
    const brightness = (Math.sin(s.a * Math.PI * 2) * 0.5 + 0.5) * 0.8 + 0.2; 
    ctx.globalAlpha = brightness;
    ctx.fillStyle = s.r > 1.2 ? '#C38380' : '#9C7164';
    ctx.beginPath(); ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2); ctx.fill();
  });
  ctx.globalAlpha = 1;

  const gnd = ctx.createLinearGradient(0, H * 0.72, 0, H);
  gnd.addColorStop(0, '#D8B69F'); 
  gnd.addColorStop(1, '#CBB09C');
  ctx.fillStyle = gnd; ctx.fillRect(0, H * 0.72, W, H * 0.28);

  [{cx:0.05,h:0.55,w:0.14}, {cx:0.18,h:0.62,w:0.16}, {cx:0.82,h:0.58,w:0.14}, {cx:0.95,h:0.65,w:0.16}].forEach(tr => drawTree(tr.cx * W, H * 0.73, tr.h * H, tr.w * W, true));

  const glow = Math.sin(t * 0.04) * 0.2 + 0.8;
  ctx.shadowBlur  = 14; ctx.shadowColor = '#C38380';
  ctx.fillStyle   = `rgba(195, 131, 128, ${glow * 0.6})`;
  [0.12, 0.32, 0.55, 0.72, 0.88].forEach(xr => {
    ctx.beginPath(); ctx.arc(xr * W, H * 0.73, 4, 0, Math.PI * 2); ctx.fill();
  });
  ctx.shadowBlur = 0;

  drawMushroom(W * 0.08, H * 0.76, 22, '#C38380'); drawMushroom(W * 0.22, H * 0.77, 16, '#9C7164');
  drawMushroom(W * 0.78, H * 0.77, 18, '#D8B69F'); drawMushroom(W * 0.92, H * 0.76, 24, '#E8E1D1');

  [{cx:-0.02,h:0.4,w:0.2}, {cx:0.28,h:0.45,w:0.18}, {cx:0.72,h:0.44,w:0.18}, {cx:1.02,h:0.42,w:0.2}].forEach(tr => drawTree(tr.cx * W, H * 0.75, tr.h * H, tr.w * W, false));

  for (let i = 0; i < 8; i++) {
    const angle = t * 0.05 + i * 0.78;
    const fx2   = (0.15 + i * 0.1) * W + Math.sin(angle + i) * 20;
    const fy2   = (0.55 + i * 0.03) * H + Math.cos(angle * 1.3) * 12;
    ctx.globalAlpha = Math.sin(t * 0.07 + i) * 0.5 + 0.5;
    ctx.fillStyle   = '#d7736e'; ctx.shadowBlur = 8; ctx.shadowColor = '#D8B69F';
    ctx.beginPath(); ctx.arc(fx2, fy2, 2, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }

  fairy.x += fairy.vx;
  fairy.y  = 0.22 + Math.sin(t * 0.05) * 0.08; 
  if (fairy.x > W + 60) { fairy.x = -60; fairy.trail = []; } 
  
  drawFairy(W, H); 
  drawSparkles(); 

  t++; 
  requestAnimationFrame(drawForest); 
}

resizeCanvas(); 
drawForest(); 
window.addEventListener('resize', resizeCanvas);