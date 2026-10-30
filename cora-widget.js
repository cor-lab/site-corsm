/* CORA - botão de atendimento da COR. Sem dependências ou coleta de dados. */
(() => {
  'use strict';
  if (document.getElementById('cor-cora-widget')) return;
  const script = document.currentScript;
  const avatar = new URL('cora.webp', script.src).href;
  const host = document.createElement('div');
  host.id = 'cor-cora-widget';
  const root = host.attachShadow({ mode: 'open' });
  root.innerHTML = `
    <style>
      :host { all: initial; position: fixed; right: max(20px, env(safe-area-inset-right)); bottom: max(20px, env(safe-area-inset-bottom)); z-index: 70; font-family: system-ui, -apple-system, "Segoe UI", sans-serif; color: #00152C; }
      * { box-sizing: border-box; }
      [hidden] { display: none !important; }
      button, a { -webkit-tap-highlight-color: transparent; }
      button { font: inherit; cursor: pointer; }
      a:focus-visible, button:focus-visible { outline: 3px solid #287221; outline-offset: 4px; }
      .launcher { border: 1px solid #d2e5de; border-radius: 44px; background: #fff; display: flex; align-items: center; gap: 12px; padding: 7px 20px 7px 7px; color: #00152C; box-shadow: 0 6px 28px #00152C26; text-align: left; }
      .portrait { display: block; width: 58px; height: 58px; border-radius: 50%; object-fit: cover; object-position: center 15%; background: #E3F3DD; }
      .launcher strong { display: block; font-size: 15px; line-height: 1.5; }
      .launcher small { color: #526b70; font-size: 12px; }
      .dot { display: inline-block; width: 7px; height: 7px; background: #287221; border-radius: 50%; margin-right: 5px; }
      .panel { position: absolute; bottom: 88px; right: 0; width: 342px; max-width: calc(100vw - 32px); max-height: calc(100dvh - 136px - var(--cora-consent-height, 0px)); overflow: auto; border-radius: 22px; background: #fff; box-shadow: 0 14px 60px #00152C33; border: 1px solid #d6e8e1; }
      header { position: relative; display: flex; gap: 12px; align-items: center; padding: 22px; background: #E3F3DD; }
      header .portrait { width: 64px; height: 64px; background: #cde8c4; }
      h2 { margin: 0 0 4px; font-size: 23px; line-height: 1.2; }
      header p { margin: 0; font-size: 12px; color: #42636a; }
      .close { position: absolute; right: 10px; top: 8px; width: 32px; height: 32px; border: 0; border-radius: 50%; background: transparent; color: #00152C; font-size: 25px; }
      .body { padding: 23px; }
      .intro { margin: 0 0 19px; font-size: 16px; line-height: 1.6; }
      .intro strong { color: #287221; }
      .action { display: block; padding: 14px 16px; border-radius: 12px; border: 1px solid #c9dfd7; text-decoration: none; color: #00152C; margin-top: 10px; font-size: 14px; font-weight: 650; line-height: 1.35; }
      .action.primary { color: #fff; background: #287221; border-color: #287221; }
      .action:hover { background: #eff8f3; }
      .primary:hover { background: #205E1B; }
      .action span { float: right; }
      .note { margin: 18px 0 0; color: #526b70; font-size: 12px; line-height: 1.5; }
      @media (max-width: 480px) { :host { right: 16px; bottom: max(16px, env(safe-area-inset-bottom)); } .launcher { padding-right: 16px; } .portrait { width: 49px; height: 49px; } .panel { bottom: 78px; } }
      @media print { :host { display: none; } }
    </style>
    <section class="panel" id="cora-panel" role="region" aria-labelledby="cora-title" hidden>
      <header>
        <img class="portrait" alt="" width="64" height="64">
        <div><h2 id="cora-title">Olá, sou a CORA!</h2><p>Assistente virtual da COR</p></div>
        <button class="close" type="button" aria-label="Fechar atendimento">×</button>
      </header>
      <div class="body">
        <p class="intro">Como posso ajudar você hoje? <strong>Vamos conversar pelo WhatsApp.</strong></p>
        <a class="action primary" href="https://wa.me/5555991668228" target="_blank" rel="noopener noreferrer">Falar com a CORA <span aria-hidden="true">↗</span></a>
        <a class="action" href="https://exames.corsm.com.br" target="_blank" rel="noopener noreferrer">Acessar meus resultados <span aria-hidden="true">↗</span></a>
        <a class="action" href="https://wa.me/5555991668228?text=Ol%C3%A1%21%20Preciso%20de%20ajuda%20para%20acessar%20meus%20exames." target="_blank" rel="noopener noreferrer">Preciso de ajuda com meu acesso <span aria-hidden="true">↗</span></a>
        <p class="note">Atendimento virtual 24 horas.<br>WhatsApp: (55) 99166-8228</p>
      </div>
    </section>
    <button class="launcher" type="button" aria-expanded="false" aria-controls="cora-panel" aria-label="Abrir atendimento com a CORA">
      <img class="portrait" alt="" width="58" height="58">
      <div><strong>Fale com a CORA</strong><small><span class="dot" aria-hidden="true"></span>Assistente virtual · 24h</small></div>
    </button>`;
  root.querySelectorAll('img').forEach(img => { img.src = avatar; });
  const trigger = root.querySelector('.launcher');
  const panel = root.querySelector('.panel');
  const close = root.querySelector('.close');
  function setOpen(open) {
    panel.hidden = !open;
    trigger.setAttribute('aria-expanded', String(open));
    trigger.setAttribute('aria-label', open ? 'Fechar atendimento com a CORA' : 'Abrir atendimento com a CORA');
    (open ? close : trigger).focus();
  }
  trigger.addEventListener('click', () => setOpen(panel.hidden));
  close.addEventListener('click', () => setOpen(false));
  root.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) { e.preventDefault(); setOpen(false); } });
  document.body.appendChild(host);
  // Keep the existing privacy notice, mobile menu and image viewer usable.
  const consent = document.getElementById('corConsent');
  function syncPageOverlays() {
    const blocked = document.body.classList.contains('menu-open') || document.body.classList.contains('lb-open');
    host.style.display = blocked ? 'none' : '';
    const consentHeight = consent && consent.classList.contains('show') ? Math.ceil(consent.getBoundingClientRect().height) + 20 : 0;
    host.style.setProperty('--cora-consent-height', consentHeight + 'px');
    host.style.bottom = consentHeight ? 'calc(' + consentHeight + 'px + max(20px, env(safe-area-inset-bottom)))' : '';
  }
  const observer = new MutationObserver(syncPageOverlays);
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  if (consent) {
    observer.observe(consent, { attributes: true, attributeFilter: ['class'] });
    if (typeof ResizeObserver !== 'undefined') new ResizeObserver(syncPageOverlays).observe(consent);
  }
  window.addEventListener('resize', syncPageOverlays);
  syncPageOverlays();
})();
