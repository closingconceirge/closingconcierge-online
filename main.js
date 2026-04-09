// ── NAV SCROLL BEHAVIOUR
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── MOBILE NAV TOGGLE
const toggle = document.getElementById('navToggle');
const links  = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  links.classList.toggle('open');
  toggle.classList.toggle('open');
});

// Close mobile nav on link click
links.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.classList.remove('open');
  });
});

// ── SCROLL REVEAL (lightweight — no library needed)
const revealEls = document.querySelectorAll(
  '.service-card, .apart-item, .promise-item, .svc-block, .tier-card, .ci-tier, .contact-detail, .lp-section'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.6s ease ${i * 0.06}s, transform 0.6s ease ${i * 0.06}s`;
  observer.observe(el);
});

// ── CONTACT FORM (Formspree-ready, with confirmation message)
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        form.innerHTML = `
          <div style="text-align:center;padding:48px 24px;">
            <p style="font-family:'Cormorant Garamond',serif;font-size:2rem;color:var(--ink);margin-bottom:12px;">Thank you.</p>
            <p style="color:var(--taupe);font-size:0.9rem;">We've received your message and will respond within 4 business hours.</p>
          </div>`;
      } else {
        btn.textContent = 'Something went wrong — please email us directly';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });
}
