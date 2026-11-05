/* Chanandry Arquitetura & Interiores — comportamento do site (JavaScript puro, sem dependências) */
(function () {
  'use strict';

  /* ===== CONFIGURAÇÃO ===================================================
     Para ativar o WhatsApp, preencha o número com DDI+DDD+número, só dígitos.
     Exemplo: '5596999999999'. Enquanto estiver vazio, os botões levam ao Instagram. */
  var CONFIG = {
    whatsapp: '5596981159999',
    instagram: 'chanandry.arquitetura'
  };
  /* ==================================================================== */

  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var igDM = 'https://ig.me/m/' + CONFIG.instagram;
  var igProfile = 'https://www.instagram.com/' + CONFIG.instagram;
  var wa = function (msg) { return 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(msg); };

  /* ---------- toast ---------- */
  var toastEl = $('#toast'), tt;
  function toast(msg) {
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(tt); tt = setTimeout(function () { toastEl.classList.remove('show'); }, 4200);
  }

  /* ---------- contatos ---------- */
  $('#chIg').href = igProfile;
  if (CONFIG.whatsapp) {
    var cw = $('#chWa'); cw.hidden = false; cw.href = wa('Olá! Vim pelo site da Chanandry e gostaria de conversar sobre um projeto.');
  }

  /* ---------- ticker ---------- */
  var words = ['Residencial', 'Comercial', 'Interiores', 'Construção', 'Reforma', 'Consultoria técnica'];
  var tk = words.map(function (w) { return '<span>' + w + '</span>'; }).join('');
  $('#tick').innerHTML = tk + tk + tk + tk;

  /* ---------- menu mobile ---------- */
  var mb = $('#menuBtn'), dr = $('#drawer');
  function menu(open) {
    mb.setAttribute('aria-expanded', open); dr.classList.toggle('open', open);
    mb.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('lock', open);
  }
  mb.addEventListener('click', function () { menu(mb.getAttribute('aria-expanded') !== 'true'); });
  $$('a', dr).forEach(function (a) { a.addEventListener('click', function () { menu(false); }); });

  /* ---------- header, progresso, barra fixa, scrollspy ---------- */
  var hdr = $('#hdr'), prog = $('#prog'), fab = $('#fab'), ticking = false;
  function onScroll() {
    var y = window.scrollY, h = document.documentElement.scrollHeight - innerHeight;
    hdr.classList.toggle('stuck', y > 24);
    prog.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, y / h) : 0) + ')';
    ticking = false;
  }
  addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  if ('IntersectionObserver' in window) {
    var seen = { hero: 1, contato: 0 };
    var upFab = function () { fab.classList.toggle('show', !seen.hero && !seen.contato); };
    new IntersectionObserver(function (e) { seen.hero = e[0].isIntersecting ? 1 : 0; upFab(); }, { threshold: .25 }).observe($('.hero'));
    new IntersectionObserver(function (e) { seen.contato = e[0].isIntersecting ? 1 : 0; upFab(); }, { threshold: .1 }).observe($('#contato'));

    var links = $$('.nav a');
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (x) {
        if (x.isIntersecting) links.forEach(function (a) { a.classList.toggle('act', a.getAttribute('href') === '#' + x.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['projetos', 'sobre', 'servicos', 'processo', 'contato'].forEach(function (id) { var el = document.getElementById(id); if (el) spy.observe(el); });

    var io = new IntersectionObserver(function (es) {
      es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('shown'); io.unobserve(x.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    $$('.rv').forEach(function (el, i) { el.style.transitionDelay = (i % 3) * 90 + 'ms'; io.observe(el); });
  } else { fab.classList.add('show'); }

  /* ---------- hero: slideshow ---------- */
  var slides = $$('.slide'), dots = $$('#dots button'), cur = 0, timer, nameEl = $('#slideName');
  function go(n) {
    cur = (n + slides.length) % slides.length;
    slides.forEach(function (s, i) { s.classList.toggle('on', i === cur); });
    dots.forEach(function (d, i) { d.classList.remove('on'); d.setAttribute('aria-selected', i === cur); });
    void document.body.offsetWidth; dots[cur].classList.add('on');
    nameEl.textContent = slides[cur].getAttribute('data-name');
  }
  function play() { clearInterval(timer); if (!reduce) timer = setInterval(function () { go(cur + 1); }, 6000); }
  dots.forEach(function (d, i) { d.addEventListener('click', function () { go(i); play(); }); });
  document.addEventListener('visibilitychange', function () { document.hidden ? clearInterval(timer) : play(); });
  go(0); play();

  /* ---------- projetos: filtro ---------- */
  var grid = $('#grid'), cards = $$('.card', grid), chips = $$('#filters .chip');
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      var f = c.getAttribute('data-f');
      chips.forEach(function (x) { x.setAttribute('aria-pressed', x === c); });
      cards.forEach(function (card) { card.classList.toggle('hide', f !== 'todos' && card.getAttribute('data-cat') !== f); });
      grid.classList.toggle('flat', f !== 'todos');
    });
  });

  /* ---------- lightbox ---------- */
  var lb = $('#lb'), track = $('#lbTrack'), thumbs = $('#lbThumbs'), lbIdx = 0, lbItems = [], opener = null, lbRaf;
  function slideW() { return track.clientWidth; }
  function setIdx(i, smooth) {
    lbIdx = Math.max(0, Math.min(lbItems.length - 1, i));
    $('#lbCount').textContent = (lbIdx + 1) + ' / ' + lbItems.length;
    $$('button', thumbs).forEach(function (b, k) { b.classList.toggle('on', k === lbIdx); });
    var t = $$('button', thumbs)[lbIdx]; if (t && t.scrollIntoView) { try { t.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduce ? 'auto' : 'smooth' }); } catch (e) {} }
    $('#lbPrev').disabled = lbIdx === 0; $('#lbNext').disabled = lbIdx === lbItems.length - 1;
    $('#lbPrev').style.opacity = lbIdx === 0 ? .3 : 1; $('#lbNext').style.opacity = lbIdx === lbItems.length - 1 ? .3 : 1;
  }
  function scrollTo(i, smooth) {
    track.scrollTo({ left: i * slideW(), behavior: smooth && !reduce ? 'smooth' : 'auto' });
    setIdx(i);
  }
  function openLB(card, btn) {
    var data = JSON.parse($('script.gal', card).textContent);
    lbItems = data.imgs; opener = btn;
    $('#lbTitle').textContent = data.title;
    $('#lbText').textContent = data.text;
    track.innerHTML = lbItems.map(function (it, i) {
      return '<div class="lb-slide"><img src="' + it.src + '" alt="' + it.alt.replace(/"/g, '&quot;') + '"' + (i > 1 ? ' loading="lazy"' : '') + ' draggable="false"></div>';
    }).join('');
    thumbs.innerHTML = lbItems.map(function (it, i) {
      return '<button type="button" aria-label="Ir para a imagem ' + (i + 1) + '"><img src="' + it.sm + '" alt=""></button>';
    }).join('');
    $$('button', thumbs).forEach(function (b, i) { b.addEventListener('click', function () { scrollTo(i, true); }); });
    thumbs.style.display = lbItems.length > 1 ? '' : 'none';
    lb.hidden = false; document.body.classList.add('lock');
    track.scrollLeft = 0; setIdx(0);
    $('#lbX').focus();
  }
  function closeLB() {
    lb.hidden = true; document.body.classList.remove('lock'); track.innerHTML = '';
    if (opener) opener.focus();
  }
  $$('.card-btn', grid).forEach(function (b) { b.addEventListener('click', function () { openLB(b.closest('.card'), b); }); });
  $('#lbX').addEventListener('click', closeLB);
  $('#lbPrev').addEventListener('click', function () { scrollTo(lbIdx - 1, true); });
  $('#lbNext').addEventListener('click', function () { scrollTo(lbIdx + 1, true); });
  $('#lbCta').addEventListener('click', closeLB);
  track.addEventListener('scroll', function () {
    cancelAnimationFrame(lbRaf);
    lbRaf = requestAnimationFrame(function () { var i = Math.round(track.scrollLeft / slideW()); if (i !== lbIdx) setIdx(i); });
  }, { passive: true });
  lb.addEventListener('click', function (e) { if (e.target.classList.contains('lb-slide') || e.target.classList.contains('lb-stage')) closeLB(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { if (!lb.hidden) closeLB(); else menu(false); }
    if (lb.hidden) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); scrollTo(lbIdx + 1, true); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); scrollTo(lbIdx - 1, true); }
    if (e.key === 'Tab') {
      var f = $$('button:not([disabled]),a[href]', lb).filter(function (x) { return x.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  addEventListener('resize', function () { if (!lb.hidden) track.scrollTo({ left: lbIdx * slideW() }); });

  /* ---------- comparação dia / noite ---------- */
  var cmp = $('#cmp'), hd = $('#hd'), pos = 50, drag = false;
  function setPos(p) {
    pos = Math.max(0, Math.min(100, p));
    cmp.style.setProperty('--pos', pos + '%'); hd.setAttribute('aria-valuenow', Math.round(pos));
  }
  function fromEvent(e) { var r = cmp.getBoundingClientRect(); setPos((e.clientX - r.left) / r.width * 100); }
  cmp.addEventListener('pointerdown', function (e) {
    drag = true; cmp.setPointerCapture(e.pointerId); fromEvent(e);
  });
  cmp.addEventListener('pointermove', function (e) { if (drag) fromEvent(e); });
  ['pointerup', 'pointercancel'].forEach(function (n) { cmp.addEventListener(n, function () { drag = false; }); });
  hd.addEventListener('keydown', function (e) {
    var s = e.shiftKey ? 10 : 3;
    if (e.key === 'ArrowLeft') { e.preventDefault(); setPos(pos - s); }
    if (e.key === 'ArrowRight') { e.preventDefault(); setPos(pos + s); }
    if (e.key === 'Home') { e.preventDefault(); setPos(0); }
    if (e.key === 'End') { e.preventDefault(); setPos(100); }
  });
  var tabs = $$('#dnTabs .chip');
  function pick(t) {
    tabs.forEach(function (x) { x.setAttribute('aria-pressed', x === t); });
    var a = $('#cmpA'), b = $('#cmpB');
    a.src = t.getAttribute('data-a'); b.src = t.getAttribute('data-b');
    var nm = t.getAttribute('data-name');
    a.alt = nm + ', ' + t.getAttribute('data-la').toLowerCase(); b.alt = nm + ', ' + t.getAttribute('data-lb').toLowerCase();
    $('#tagA').textContent = t.getAttribute('data-la'); $('#tagB').textContent = t.getAttribute('data-lb');
    $('#dnName').textContent = nm;
    setPos(50);
  }
  tabs.forEach(function (t) { t.addEventListener('click', function () { pick(t); }); });
  pick(tabs[0]);
  /* dica de arrasto quando a seção entra na tela */
  if ('IntersectionObserver' in window && !reduce) {
    var hinted = false;
    new IntersectionObserver(function (e) {
      if (e[0].isIntersecting && !hinted) {
        hinted = true; var t0 = null;
        (function step(t) {
          if (drag) return; if (!t0) t0 = t; var p = (t - t0) / 1400;
          if (p >= 1) { setPos(50); return; }
          setPos(50 + Math.sin(p * Math.PI * 2) * 14 * (1 - p)); requestAnimationFrame(step);
        })(performance.now());
      }
    }, { threshold: .6 }).observe(cmp);
  }

  /* ---------- formulário ---------- */
  var F = { n: $('#f-nome'), c: $('#f-cid'), t: $('#f-tipo'), m: $('#f-msg') }, send = $('#fSend');
  var fase = function () { return ($('input[name="fase"]:checked') || {}).value || ''; };
  function msg() {
    var m = 'Olá, Érica! Meu nome é ' + (F.n.value.trim() || '...') + '.\n' +
      'Cidade: ' + F.c.value + '\nProjeto: ' + F.t.value + '\nFase: ' + fase();
    if (F.m.value.trim()) m += '\nSobre o projeto: ' + F.m.value.trim();
    return m;
  }
  function refresh() {
    send.href = CONFIG.whatsapp ? wa(msg()) : igDM;
  }
  $('#fLabel').textContent = CONFIG.whatsapp ? 'Enviar pelo WhatsApp' : 'Enviar pelo Instagram';
  $('#fHint').textContent = CONFIG.whatsapp
    ? 'O WhatsApp abre com a mensagem pronta. Você revisa e envia.'
    : 'A mensagem é copiada e o Instagram abre. Cole na conversa e envie.';
  ['input', 'change'].forEach(function (ev) { $('#form').addEventListener(ev, refresh); });
  F.n.addEventListener('input', function () { F.n.classList.remove('bad'); $('#err').textContent = ''; });
  $('#form').addEventListener('submit', function (e) { e.preventDefault(); });
  send.addEventListener('click', function (e) {
    if (!F.n.value.trim()) {
      e.preventDefault(); F.n.classList.add('bad'); $('#err').textContent = 'Digite seu nome para continuar.'; F.n.focus(); return;
    }
    refresh();
    if (!CONFIG.whatsapp) {
      var text = msg();
      try { navigator.clipboard.writeText(text).then(function () { toast('Mensagem copiada. Cole na conversa do Instagram.'); }, function () { toast('Abra a conversa e escreva: ' + text.split('\n')[0]); }); }
      catch (err) { toast('Abra a conversa e escreva sua mensagem.'); }
    }
  });
  refresh();

})();
