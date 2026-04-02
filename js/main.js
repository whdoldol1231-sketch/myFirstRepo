/* ============================================
   SKETCH-LINK — MAIN JAVASCRIPT
   Interactions, Animations, Canvas Effects
   ============================================ */

'use strict';

/* ============================================================
   1. NAVBAR — scroll effect & mobile toggle
   ============================================================ */
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

hamburger.addEventListener('click', () => {
  navMobile.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  const isOpen = navMobile.classList.contains('open');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px,5px)' : '';
  spans[1].style.opacity   = isOpen ? '0' : '1';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px,-5px)' : '';
});

navMobile.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navMobile.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '1';
    });
  });
});

/* ============================================================
   2. CUSTOM CURSOR
   ============================================================ */
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

if (window.innerWidth > 600 && dot && ring) {
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  function animRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();

  document.querySelectorAll('a, button, .feature-card, .problem-card, .biz-card, .data-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width  = '56px';
      ring.style.height = '56px';
      ring.style.borderColor = 'rgba(127,145,83,0.7)';
      dot.style.transform = 'translate(-50%,-50%) scale(0.4)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width  = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = 'rgba(127,145,83,0.4)';
      dot.style.transform = 'translate(-50%,-50%) scale(1)';
    });
  });
}

/* ============================================================
   3. AOS — Intersection Observer
   ============================================================ */
const aosEls = document.querySelectorAll('[data-aos]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.getAttribute('data-aos-delay') || 0;
      setTimeout(() => {
        entry.target.classList.add('aos-animate');
      }, parseInt(delay));
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

aosEls.forEach(el => observer.observe(el));

/* ============================================================
   4. HERO CANVAS — Particle / Grid Lines
   ============================================================ */
(function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Particles
  const particles = [];
  const COUNT = Math.min(80, Math.floor(window.innerWidth / 20));

  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      color: ['127,145,83', '160,178,110', '210,224,173'][Math.floor(Math.random() * 3)]
    });
  }

  let mouse = { x: -1000, y: -1000 };
  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.07;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(127,145,83,${alpha})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      // Mouse repulsion
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const force = (100 - dist) / 100 * 1.5;
        p.vx += (dx / dist) * force * 0.05;
        p.vy += (dy / dist) * force * 0.05;
      }

      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.99;
      p.vy *= 0.99;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  draw();
})();

/* ============================================================
   5. SKETCH CANVAS — Auto-drawing animation
   ============================================================ */
(function initSketchCanvas() {
  const canvas = document.getElementById('sketchCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  // Define sketch paths (simple figure drawing)
  const sketches = [
    // Figure 1: Standing person
    [
      { type: 'circle', x: 130, y: 30, r: 18 },        // head
      { type: 'line', points: [[130,48],[130,110]] },    // body
      { type: 'line', points: [[130,70],[100,90]] },     // left arm
      { type: 'line', points: [[130,70],[160,90]] },     // right arm
      { type: 'line', points: [[130,110],[105,145]] },   // left leg
      { type: 'line', points: [[130,110],[155,145]] },   // right leg
    ],
    // Figure 2: Flying pose
    [
      { type: 'circle', x: 80, y: 40, r: 16 },
      { type: 'line', points: [[80,56],[80,110]] },
      { type: 'line', points: [[80,75],[40,55]] },
      { type: 'line', points: [[80,75],[130,60]] },
      { type: 'line', points: [[80,110],[55,150]] },
      { type: 'line', points: [[80,110],[110,145]] },
    ],
    // Figure 3: Sitting
    [
      { type: 'circle', x: 130, y: 30, r: 16 },
      { type: 'line', points: [[130,46],[130,90]] },
      { type: 'line', points: [[130,65],[100,80]] },
      { type: 'line', points: [[130,65],[165,72]] },
      { type: 'line', points: [[130,90],[110,90]] },
      { type: 'line', points: [[110,90],[105,130]] },
      { type: 'line', points: [[130,90],[165,88]] },
      { type: 'line', points: [[165,88],[165,130]] },
    ]
  ];

  let currentSketch = 0;
  let progress = 0;
  let startTime = null;
  const DURATION = 2000;

  function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  function drawSketch(sketch, p) {
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(96,112,58,0.85)';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Calculate total segments
    let totalLen = 0;
    sketch.forEach(shape => {
      if (shape.type === 'circle') totalLen += 1;
      else if (shape.type === 'line') totalLen += shape.points.length - 1;
    });

    const drawn = p * totalLen;
    let consumed = 0;

    sketch.forEach(shape => {
      if (shape.type === 'circle') {
        const segProgress = Math.min(1, Math.max(0, drawn - consumed));
        if (segProgress > 0) {
          ctx.beginPath();
          ctx.arc(shape.x, shape.y, shape.r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * segProgress);
          ctx.stroke();
        }
        consumed += 1;
      } else if (shape.type === 'line') {
        const pts = shape.points;
        for (let i = 0; i < pts.length - 1; i++) {
          const segProgress = Math.min(1, Math.max(0, drawn - consumed));
          if (segProgress > 0) {
            const x1 = pts[i][0], y1 = pts[i][1];
            const x2 = pts[i+1][0], y2 = pts[i+1][1];
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x1 + (x2 - x1) * segProgress, y1 + (y2 - y1) * segProgress);
            ctx.stroke();
          }
          consumed += 1;
        }
      }
    });
  }

  function animate(ts) {
    if (!startTime) startTime = ts;
    const elapsed = ts - startTime;
    progress = easeInOut(Math.min(1, elapsed / DURATION));
    drawSketch(sketches[currentSketch], progress);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // Hold for 1s then switch
      setTimeout(() => {
        currentSketch = (currentSketch + 1) % sketches.length;
        startTime = null;
        progress = 0;
        requestAnimationFrame(animate);
      }, 1200);
    }
  }

  requestAnimationFrame(animate);

  // Re-draw button
  const btn = document.getElementById('animateSketch');
  if (btn) {
    btn.addEventListener('click', () => {
      currentSketch = (currentSketch + 1) % sketches.length;
      startTime = null;
      progress = 0;
      requestAnimationFrame(animate);
    });
  }
})();

/* ============================================================
   6. MINI CANVAS — feature section demo
   ============================================================ */
(function initMiniCanvas() {
  const canvas = document.getElementById('miniCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  let t = 0;
  function drawMini() {
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(127,145,83,0.5)';
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';

    // Animated wave sketch
    ctx.beginPath();
    for (let x = 0; x <= W; x += 2) {
      const y = H/2 + Math.sin((x / W) * Math.PI * 4 + t) * 20 + Math.sin((x / W) * Math.PI * 2 + t * 0.7) * 10;
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Simple figure
    const cx = W/2, cy = H/2;
    ctx.strokeStyle = 'rgba(96,112,58,0.65)';
    ctx.beginPath();
    ctx.arc(cx, cy - 30 + Math.sin(t * 0.5) * 3, 12, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx, cy - 18);
    ctx.lineTo(cx, cy + 10);
    ctx.moveTo(cx, cy - 5);
    ctx.lineTo(cx - 18, cy + 5);
    ctx.moveTo(cx, cy - 5);
    ctx.lineTo(cx + 18, cy + 5);
    ctx.moveTo(cx, cy + 10);
    ctx.lineTo(cx - 12, cy + 30);
    ctx.moveTo(cx, cy + 10);
    ctx.lineTo(cx + 12, cy + 30);
    ctx.stroke();

    t += 0.025;
    requestAnimationFrame(drawMini);
  }
  drawMini();
})();

/* ============================================================
   7. COUNTER ANIMATION
   ============================================================ */
function animateCounter(el, target, duration = 2000) {
  const start = performance.now();
  function step(ts) {
    const progress = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current >= 1000 ? (current / 1000).toFixed(0) + '만' : current.toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target >= 1000 ? (target / 1000).toFixed(0) + '만' : target.toLocaleString();
  }
  requestAnimationFrame(step);
}

// Special formatting for stat numbers
function formatStatNum(val) {
  if (val >= 100000) return Math.floor(val / 10000).toLocaleString() + '만';
  if (val >= 1000) return val.toLocaleString();
  return val.toString();
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num[data-count]');
      nums.forEach(el => {
        const target = parseInt(el.getAttribute('data-count'));
        const start = performance.now();
        const duration = 2200;
        function step(ts) {
          const p = Math.min((ts - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 4);
          const cur = Math.round(eased * target);
          el.textContent = formatStatNum(cur);
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = formatStatNum(target);
        }
        requestAnimationFrame(step);
        el.removeAttribute('data-count');
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ============================================================
   8. SMOOTH SCROLL for anchor links
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ============================================================
   9. WAITLIST FORM
   ============================================================ */
(function initWaitlist() {
  const form    = document.getElementById('waitlistForm');
  const success = document.getElementById('waitlistSuccess');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const name  = document.getElementById('wlName').value.trim();
    const email = document.getElementById('wlEmail').value.trim();
    const type  = document.getElementById('wlType').value;

    if (!name || !email) return;

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 처리 중...';

    try {
      // Save to API
      const res = await fetch('tables/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, creator_type: type, joined_at: new Date().toISOString() })
      });

      if (res.ok || res.status === 201) {
        form.style.display = 'none';
        success.style.display = 'block';

        // Update count
        const countEl = document.querySelector('.waitlist-count strong');
        if (countEl) {
          const cur = parseInt(countEl.textContent.replace(/[^0-9]/g, '')) || 247;
          countEl.textContent = (cur + 1) + '명';
        }
      } else {
        showFormError('오류가 발생했습니다. 다시 시도해주세요.');
        btn.disabled = false;
        btn.innerHTML = '<span>얼리 액세스 신청하기</span><i class="fas fa-paper-plane"></i>';
      }
    } catch (err) {
      // Fallback: still show success (offline demo)
      form.style.display = 'none';
      success.style.display = 'block';
    }
  });

  function showFormError(msg) {
    let errEl = form.querySelector('.form-error');
    if (!errEl) {
      errEl = document.createElement('p');
      errEl.className = 'form-error';
      errEl.style.cssText = 'color:#ff6b6b;font-size:0.85rem;margin-top:8px;text-align:center;';
      form.appendChild(errEl);
    }
    errEl.textContent = msg;
  }
})();

/* ============================================================
   10. TYPEWRITER — hero subtitle enhancement
   ============================================================ */
(function initTypewriter() {
  const badge = document.querySelector('.hero-badge');
  if (!badge) return;

  const texts = [
    'AI 기반 창작자 전용 레퍼런스 검색 엔진',
    'CC0 이미지만 — 저작권 걱정 제로',
    '스케치 → 3초 안에 완벽한 레퍼런스',
  ];
  let idx = 0, charIdx = 0, deleting = false;
  const textEl = badge.querySelector('span:last-child') || badge;

  // wrap text in span if needed
  const originalText = textEl.textContent.trim();
  badge.innerHTML = `<span class="badge-dot"></span><span class="badge-typed">${originalText}</span>`;
  const typed = badge.querySelector('.badge-typed');

  function tick() {
    const cur = texts[idx];
    if (deleting) {
      typed.textContent = cur.substring(0, charIdx--);
      if (charIdx < 0) { deleting = false; idx = (idx + 1) % texts.length; charIdx = 0; setTimeout(tick, 600); return; }
    } else {
      typed.textContent = cur.substring(0, charIdx++);
      if (charIdx > cur.length) { deleting = true; setTimeout(tick, 2000); return; }
    }
    setTimeout(tick, deleting ? 40 : 60);
  }
  setTimeout(tick, 2000);
})();

/* ============================================================
   11. ROADMAP ITEMS — active highlight on scroll
   ============================================================ */
const rmItems = document.querySelectorAll('.rm-item');
const rmObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
    }
  });
}, { threshold: 0.2 });
rmItems.forEach(el => rmObserver.observe(el));

/* ============================================================
   12. COMPARISON TABLE — highlight on hover row
   ============================================================ */
document.querySelectorAll('.compare-table tbody tr').forEach(row => {
  row.addEventListener('mouseenter', () => {
    row.querySelectorAll('td').forEach(td => {
      td.style.background = 'rgba(127,145,83,0.06)';
    });
  });
  row.addEventListener('mouseleave', () => {
    row.querySelectorAll('td').forEach(td => {
      td.style.background = '';
    });
    row.querySelectorAll('td.highlight-col').forEach(td => {
      td.style.background = 'rgba(127,145,83,0.08)';
    });
  });
});

/* ============================================================
   13. FEATURE CARDS — stagger entrance
   ============================================================ */
const featureCards = document.querySelectorAll('.feature-card');
const featureObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 60);
      featureObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

featureCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(24px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, border-color 0.3s, box-shadow 0.3s, background 0.3s';
  featureObserver.observe(card);
});

/* ============================================================
   14. DATA CARDS — count up
   ============================================================ */
const dataCards = document.querySelectorAll('.data-card');
const dataObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 80);
      dataObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

dataCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s, box-shadow 0.3s';
  dataObserver.observe(card);
});

/* ============================================================
   15. ACTIVE NAV LINK — scroll spy
   ============================================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}`
          ? 'var(--text-primary)' : '';
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => spyObserver.observe(s));

/* ============================================================
   16. PARALLAX GLOW on mouse move
   ============================================================ */
if (window.innerWidth > 900) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    const g1 = document.querySelector('.glow-1');
    const g2 = document.querySelector('.glow-2');
    if (g1) g1.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
    if (g2) g2.style.transform = `translate(${-x * 0.3}px, ${-y * 0.3}px)`;
  }, { passive: true });
}

/* ============================================================
   17. PROBLEM CARDS — quote appear
   ============================================================ */
document.querySelectorAll('.problem-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const quote = card.querySelector('.problem-quote');
    if (quote) {
      quote.style.borderLeftColor = 'var(--accent-pink)';
      quote.style.color = 'var(--text-primary)';
    }
  });
  card.addEventListener('mouseleave', () => {
    const quote = card.querySelector('.problem-quote');
    if (quote) {
      quote.style.borderLeftColor = '';
      quote.style.color = '';
    }
  });
});

/* ============================================================
   18. INIT TABLE SCHEMA for waitlist
   ============================================================ */
(async function checkTable() {
  try {
    await fetch('tables/waitlist?limit=1');
  } catch (e) {
    // table doesn't exist yet, will be created on first POST
  }
})();

console.log('%c✏️ Sketch-Link', 'font-size:24px;font-weight:bold;color:rgb(127,145,83);');
console.log('%c창작자의 낙서에서 완벽한 레퍼런스로', 'font-size:14px;color:rgb(96,112,58);');
