(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Sticky nav ---------- */
  var nav = $('#nav');
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 12); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile drawer ---------- */
  var toggle = $('#navToggle'), drawer = $('#drawer');
  function setDrawer(open) {
    drawer.hidden = !open;
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    toggle.querySelector('use').setAttribute('href', open ? '#i-close' : '#i-menu');
  }
  toggle.addEventListener('click', function () { setDrawer(drawer.hidden); });
  $$('a', drawer).forEach(function (a) { a.addEventListener('click', function () { setDrawer(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !drawer.hidden) { setDrawer(false); toggle.focus(); } });
  window.addEventListener('resize', function () { if (window.innerWidth > 860 && !drawer.hidden) setDrawer(false); });

  /* ---------- Scroll reveal ---------- */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Hero dashboard: counters, donut, bars ---------- */
  var dash = $('#dash');
  function fmt(n, dec) { return dec ? n.toFixed(dec) : Math.round(n).toString(); }
  function runCounter(el) {
    var target = parseFloat(el.dataset.count), dec = parseInt(el.dataset.dec || '0', 10);
    var pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
    if (reduce) { el.textContent = pre + fmt(target, dec) + suf; return; }
    var start = null, dur = 1400;
    function tick(t) {
      if (start === null) start = t;
      var p = Math.min((t - start) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + fmt(target * eased, dec) + suf;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  function playDash() {
    dash.classList.add('play');
    $$('[data-count]', dash).forEach(runCounter);
    $$('.donut circle[data-len]', dash).forEach(function (c) {
      c.setAttribute('stroke-dasharray', c.dataset.len + ' ' + (100 - c.dataset.len));
      c.setAttribute('stroke-dashoffset', c.dataset.off);
    });
  }
  // Fallback text so it is never stuck at 0 if JS observers fail
  $$('[data-count]', dash).forEach(function (el) {
    el.textContent = (el.dataset.prefix || '') + fmt(parseFloat(el.dataset.count), parseInt(el.dataset.dec || '0', 10)) + (el.dataset.suffix || '');
  });
  if (!reduce) {
    $$('[data-count]', dash).forEach(function (el) { el.textContent = (el.dataset.prefix || '') + '0' + (el.dataset.suffix || ''); });
    setTimeout(playDash, 500);
  } else { playDash(); }

  /* ---------- Pricing toggle ---------- */
  var billBtns = $$('[data-bill]');
  var prices = $$('[data-monthly]');
  function fmtINR(n) { return '₹' + n.toLocaleString('en-IN'); }
  function setBilling(mode) {
    billBtns.forEach(function (b) {
      var on = b.dataset.bill === mode;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', String(on));
    });
    prices.forEach(function (el) {
      var m = parseInt(el.dataset.monthly, 10);
      var v = mode === 'yearly' ? Math.round(m * 0.8) : m;
      el.textContent = fmtINR(v);
      el.nextElementSibling.textContent = '/ month' + (mode === 'yearly' && m ? ', billed yearly' : '');
    });
  }
  billBtns.forEach(function (b) { b.addEventListener('click', function () { setBilling(b.dataset.bill); }); });

  /* ---------- Testimonials slider ---------- */
  var track = $('#track');
  function step(dir) {
    var card = $('.tcard', track);
    var w = card.getBoundingClientRect().width + 20;
    var atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    if (dir > 0 && atEnd) track.scrollTo({ left: 0, behavior: reduce ? 'auto' : 'smooth' });
    else track.scrollBy({ left: dir * w, behavior: reduce ? 'auto' : 'smooth' });
  }
  $('#next').addEventListener('click', function () { step(1); });
  $('#prev').addEventListener('click', function () { step(-1); });
  track.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
  });

  /* ---------- FAQ: one open at a time ---------- */
  var faqs = $$('.faq details');
  faqs.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) faqs.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  /* ---------- Demo form ---------- */
  var form = $('#demoForm'), msg = $('#formMsg'), email = $('#email');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = email.value.trim();
    var valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    msg.className = 'form-msg';
    if (!valid) {
      msg.textContent = 'Please enter a valid work email.';
      msg.classList.add('err');
      email.setAttribute('aria-invalid', 'true');
      email.focus();
      return;
    }
    email.removeAttribute('aria-invalid');
    // TODO: connect to the real demo-provisioning endpoint, e.g. fetch('/api/demo', {method:'POST', body: JSON.stringify({email: v})})
    msg.textContent = 'You’re in! Check ' + v + ' for your 24-hour demo access.';
    msg.classList.add('ok');
    form.reset();
  });
})();
