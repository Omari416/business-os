/* Business OS — layout partagé et comportements d'interface (prototype statique). */
(function () {
  const NAV = [
    { items: [
      ['overview', "Vue d'ensemble", 'index.html', 'layout-dashboard'],
      ['decisions', 'Centre de décision', 'decisions.html', 'list-checks', '7'],
      ['assistant', 'Assistant', 'assistant.html', 'message-square'],
    ] },
    { label: 'Opérations', items: [
      ['crm', 'CRM', 'crm.html', 'users'],
      ['ventes', 'Ventes', 'ventes.html', 'shopping-cart'],
      ['finances', 'Finances', 'finances.html', 'landmark'],
      ['depenses', 'Dépenses', 'depenses.html', 'wallet'],
      ['stocks', 'Stocks et achats', 'stocks.html', 'package'],
      ['rh', 'Ressources humaines', 'rh.html', 'id-card'],
      ['projets', 'Projets', 'projets.html', 'folder-kanban'],
    ] },
    { label: 'Pilotage', items: [
      ['simulations', 'Simulations', 'simulations.html', 'sliders-horizontal'],
      ['rapports', 'Rapports et analyses', 'rapports.html', 'chart-column'],
      ['automatisations', 'Automatisations', 'automatisations.html', 'workflow'],
    ] },
  ];

  function sidebar(active) {
    const groups = NAV.map(g => `
      <div class="mt-4 first:mt-0">
        ${g.label ? `<div class="section-label px-2 mb-1">${g.label}</div>` : ''}
        <nav class="space-y-px">
          ${g.items.map(([id, label, href, icon, count]) => `
            <a href="${href}" class="nav-link ${id === active ? 'active' : ''}" ${id === active ? 'aria-current="page"' : ''}>
              <i data-lucide="${icon}"></i><span class="flex-1 truncate">${label}</span>
              ${count ? `<span class="num text-2xs text-muted">${count}</span>` : ''}
            </a>`).join('')}
        </nav>
      </div>`).join('');
    return `
      <div class="h-full flex flex-col">
        <div class="h-12 px-3 flex items-center border-b border-line">
          <button class="w-full flex items-center gap-2 px-1.5 h-8 rounded-md hover:bg-[#ECEEF2] text-left" data-toast="Une seule organisation dans cette démo">
            <span class="w-5 h-5 rounded bg-ink text-white text-[10px] font-semibold grid place-items-center">AM</span>
            <span class="flex-1 min-w-0">
              <span class="block text-[13px] font-semibold leading-4 truncate">Atelier Moreau</span>
            </span>
            <i data-lucide="chevrons-up-down" class="w-3.5 h-3.5 text-subtle"></i>
          </button>
        </div>
        <div class="flex-1 overflow-y-auto px-3 py-3">${groups}</div>
        <div class="px-3 py-3 border-t border-line space-y-px">
          <a href="parametres.html" class="nav-link ${active === 'parametres' ? 'active' : ''}"><i data-lucide="settings"></i><span>Paramètres</span></a>
          <a href="login.html" class="nav-link"><i data-lucide="log-out"></i><span>Se déconnecter</span></a>
          <p class="px-2 pt-2 text-2xs text-subtle leading-4">Environnement de démonstration.<br>Toutes les données sont fictives.</p>
        </div>
      </div>`;
  }

  function topbar(crumbs) {
    const parts = (crumbs || '').split('/').map(s => s.trim()).filter(Boolean);
    const trail = parts.map((p, i) => i < parts.length - 1
      ? `<span class="text-muted">${p}</span><i data-lucide="chevron-right" class="w-3.5 h-3.5 text-subtle"></i>`
      : `<span class="font-medium truncate">${p}</span>`).join('');
    return `
      <div class="h-12 px-4 md:px-6 flex items-center gap-3 border-b border-line bg-surface">
        <button class="btn btn-ghost lg:hidden -ml-2 px-2" data-open-nav aria-label="Ouvrir la navigation"><i data-lucide="menu"></i></button>
        <div class="flex items-center gap-1.5 text-[13px] min-w-0">${trail}</div>
        <div class="flex-1"></div>
        <label class="hidden md:flex items-center gap-2 h-8 w-72 px-2.5 border border-line-strong rounded-md bg-surface text-subtle">
          <i data-lucide="search" class="w-3.5 h-3.5"></i>
          <input class="flex-1 bg-transparent outline-none text-[13px] text-ink placeholder:text-subtle" placeholder="Rechercher clients, factures, décisions…" data-search>
          <kbd>Ctrl K</kbd>
        </label>
        <a href="decisions.html#alertes" class="btn btn-ghost px-2 relative" aria-label="Alertes">
          <i data-lucide="bell"></i><span class="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-danger"></span>
        </a>
        <a href="parametres.html#membres" class="w-7 h-7 rounded-full bg-[#E3E6EC] text-[11px] font-semibold text-ink grid place-items-center" title="Claire Moreau — Propriétaire">CM</a>
      </div>`;
  }

  function mountLayout() {
    const aside = document.getElementById('sidebar');
    const header = document.getElementById('topbar');
    if (aside) {
      aside.className = 'fixed inset-y-0 left-0 z-40 w-60 shrink-0 bg-canvas border-r border-line -translate-x-full lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen transition-transform';
      aside.innerHTML = sidebar(aside.dataset.active);
      const scrim = document.createElement('div');
      scrim.className = 'fixed inset-0 z-30 bg-ink/20 lg:hidden';
      scrim.hidden = true;
      document.body.appendChild(scrim);
      const close = () => { aside.classList.add('-translate-x-full'); scrim.hidden = true; };
      scrim.addEventListener('click', close);
      document.addEventListener('click', e => {
        if (e.target.closest('[data-open-nav]')) { aside.classList.remove('-translate-x-full'); scrim.hidden = false; }
      });
    }
    if (header) { header.className = 'sticky top-0 z-20'; header.innerHTML = topbar(header.dataset.crumbs); }
  }

  // Toast
  function toast(msg) {
    let el = document.getElementById('toast');
    if (!el) { el = document.createElement('div'); el.id = 'toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
    el.textContent = msg; el.classList.add('show');
    clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('show'), 2600);
  }
  window.bosToast = toast;

  function behaviours() {
    document.addEventListener('click', e => {
      const t = e.target.closest('[data-toast]');
      if (t) { e.preventDefault(); toast(t.dataset.toast); }

      // Onglets : [data-tabs] > [data-tab="x"] pilote [data-panel="x"] dans le même [data-tabs-scope]
      const tab = e.target.closest('[data-tab]');
      if (tab) {
        const scope = tab.closest('[data-tabs-scope]') || document;
        scope.querySelectorAll('[data-tab]').forEach(b => b.classList.toggle('active', b === tab));
        scope.querySelectorAll('[data-panel]').forEach(p => { p.hidden = p.dataset.panel !== tab.dataset.tab; });
      }

      // Contrôle segmenté
      const seg = e.target.closest('.seg button');
      if (seg) seg.parentElement.querySelectorAll('button').forEach(b => b.classList.toggle('active', b === seg));

      // Interrupteurs
      const sw = e.target.closest('.switch');
      if (sw) {
        const on = sw.getAttribute('aria-checked') !== 'true';
        sw.setAttribute('aria-checked', String(on));
        if (sw.dataset.label) toast(`${sw.dataset.label} : ${on ? 'activée' : 'désactivée'}`);
      }

      // Lignes cliquables
      const row = e.target.closest('tr[data-href]');
      if (row && !e.target.closest('a,button,input')) location.href = row.dataset.href;
    });

    // Filtre texte local : <input data-filter="#tableId">
    document.querySelectorAll('[data-filter]').forEach(inp => {
      inp.addEventListener('input', () => {
        const q = inp.value.trim().toLowerCase();
        document.querySelectorAll(`${inp.dataset.filter} tbody tr`).forEach(tr => { tr.hidden = q && !tr.textContent.toLowerCase().includes(q); });
      });
    });

    // Ctrl/Cmd + K
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { const s = document.querySelector('[data-search]'); if (s) { e.preventDefault(); s.focus(); } }
    });

    // Ancre → onglet (#membres ouvre l'onglet "membres")
    if (location.hash) { const t = document.querySelector(`[data-tab="${location.hash.slice(1)}"]`); if (t) t.click(); }
  }

  mountLayout();
  behaviours();
  if (window.lucide) window.lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
})();
