// === Theme Toggle ===
(function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  function updateLabel(theme) {
    toggle.setAttribute('aria-label',
      theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
    );
  }

  // Set initial label based on current theme
  updateLabel(document.documentElement.getAttribute('data-theme') || 'light');

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateLabel(next);
  });
})();

// === Filter + Full-text Search ===
(function initFilterSearch() {
  const listEl = document.getElementById('article-list');
  const chips = Array.from(document.querySelectorAll('.tag-chip[data-tag]'));
  const rows = Array.from(document.querySelectorAll('.article-item[data-id]'));
  if (!listEl || !chips.length || !rows.length) return;

  // Full-text index emitted by index.astro (title/excerpt/tags/authors/body per article).
  let index = [];
  try {
    const el = document.getElementById('search-index');
    if (el) index = JSON.parse(el.textContent || '[]');
  } catch (e) { index = []; }
  const byId = {};
  index.forEach(a => { byId[a.id] = a; });

  const rowById = {};
  rows.forEach(r => { rowById[r.dataset.id] = r; });
  const originalOrder = rows.map(r => r.dataset.id); // DOM order = reverse-chronological
  const searchOrder = index.map(a => a.id);          // same order, drives the no-query state

  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear');
  const searchCount = document.getElementById('search-count');
  const noResults = document.getElementById('no-results');
  const nrText = document.getElementById('no-results-text');
  const nrReset = document.getElementById('no-results-reset');

  let activeTag = 'all';
  let query = '';

  // ---- text helpers ----
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const escRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const terms = q => q.toLowerCase().trim().split(/\s+/).filter(Boolean);

  function highlight(text, ts) {
    const safe = esc(text);
    if (!ts.length) return safe;
    const re = new RegExp('(' + ts.map(escRe).join('|') + ')', 'gi');
    return safe.replace(re, '<mark>$1</mark>');
  }

  // A body snippet around the first matched term, snapped to word boundaries.
  function bodySnippet(body, ts) {
    const lower = body.toLowerCase();
    let idx = -1;
    for (const t of ts) { const i = lower.indexOf(t); if (i !== -1 && (idx === -1 || i < idx)) idx = i; }
    if (idx === -1) return null;
    let start = Math.max(0, idx - 55);
    let end = Math.min(body.length, idx + 85);
    if (start > 0) { const s = body.indexOf(' ', start); if (s !== -1 && s < idx) start = s + 1; }
    if (end < body.length) { const e = body.lastIndexOf(' ', end); if (e > idx) end = e; }
    const snip = (start > 0 ? '…' : '') + body.slice(start, end).trim() + (end < body.length ? '…' : '');
    return highlight(snip, ts);
  }

  // Relevance: title > excerpt/tags/authors > body; every term must match somewhere.
  function search(q) {
    const ts = terms(q);
    if (!ts.length) return searchOrder.map(id => ({ id, score: 0 }));
    const out = [];
    for (const a of index) {
      const title = a.title.toLowerCase();
      const meta = (a.excerpt + ' ' + a.tags.join(' ') + ' ' + a.authors.join(' ')).toLowerCase();
      const body = a.body.toLowerCase();
      let score = 0, ok = true;
      for (const t of ts) {
        if (title.includes(t)) score += 6;
        else if (meta.includes(t)) score += 3;
        else if (body.includes(t)) score += 1;
        else { ok = false; break; }
      }
      if (ok) out.push({ id: a.id, score });
    }
    // Higher score first; preserve reverse-chronological order on ties.
    out.sort((x, y) => y.score - x.score || searchOrder.indexOf(x.id) - searchOrder.indexOf(y.id));
    return out;
  }

  function syncUrl() {
    const url = new URL(window.location.href);
    activeTag === 'all' ? url.searchParams.delete('tag') : url.searchParams.set('tag', activeTag);
    query.trim() ? url.searchParams.set('q', query.trim()) : url.searchParams.delete('q');
    window.history.replaceState({}, '', url.toString());
  }

  function applyFilters() {
    const ts = terms(query);
    const results = search(query).filter(r => {
      if (activeTag === 'all') return true;
      const a = byId[r.id];
      return a && a.tags.includes(activeTag);
    });
    const visible = results.map(r => r.id);
    const visibleSet = new Set(visible);

    // Hide/show every row, then reorder (relevance while searching, reverse-chron otherwise).
    originalOrder.forEach(id => {
      const row = rowById[id];
      if (row) row.hidden = !visibleSet.has(id);
    });
    const order = ts.length ? visible : originalOrder;
    order.forEach(id => {
      const row = rowById[id];
      if (row) listEl.appendChild(row);
    });

    // Highlight matches + body snippets on the visible rows.
    visible.forEach(id => {
      const row = rowById[id];
      const a = byId[id];
      if (!row || !a) return;
      const titleEl = row.querySelector('.article-title');
      const exEl = row.querySelector('.article-excerpt');
      const bhEl = row.querySelector('.body-hit');
      if (titleEl) titleEl.innerHTML = highlight(a.title, ts);
      if (exEl) exEl.innerHTML = highlight(a.excerpt, ts);
      if (bhEl) {
        const metaHay = (a.title + ' ' + a.excerpt + ' ' + a.tags.join(' ') + ' ' + a.authors.join(' ')).toLowerCase();
        const bodyOnly = ts.length && ts.some(t => !metaHay.includes(t) && a.body.toLowerCase().includes(t));
        if (bodyOnly) { bhEl.innerHTML = bodySnippet(a.body, ts) || ''; bhEl.hidden = false; }
        else { bhEl.hidden = true; bhEl.innerHTML = ''; }
      }
    });

    // Count + empty state
    const n = visible.length;
    if (ts.length) searchCount.innerHTML = `<b>${n}</b> result${n === 1 ? '' : 's'} for &ldquo;${esc(query.trim())}&rdquo;`;
    else if (activeTag !== 'all') searchCount.innerHTML = `<b>${n}</b> article${n === 1 ? '' : 's'} tagged ${cap(activeTag)}`;
    else searchCount.textContent = '';

    noResults.hidden = n !== 0;
    if (n === 0) {
      const bits = [];
      if (query.trim()) bits.push(`&ldquo;${esc(query.trim())}&rdquo;`);
      if (activeTag !== 'all') bits.push(`the ${cap(activeTag)} tag`);
      nrText.innerHTML = `Nothing in the archive matches ${bits.join(' within ')}. Try a broader term or clear your filters.`;
    }

    chips.forEach(c => c.classList.toggle('active', c.dataset.tag === activeTag));
    searchClear.hidden = !query;
  }

  // ---- events ----
  chips.forEach((chip, i) => {
    chip.addEventListener('click', () => { activeTag = chip.dataset.tag || 'all'; syncUrl(); applyFilters(); });
    chip.addEventListener('keydown', e => {
      let n = -1;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); n = (i + 1) % chips.length; }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); n = (i - 1 + chips.length) % chips.length; }
      if (n >= 0) chips[n].focus();
    });
  });

  // Clicking a tag pill inside a list row filters in-place, just like its chip.
  listEl.addEventListener('click', e => {
    const tagLink = e.target.closest('a.article-tag');
    if (!tagLink || !listEl.contains(tagLink)) return;
    e.preventDefault();
    activeTag = tagLink.dataset.tag || 'all';
    syncUrl();
    applyFilters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  searchInput.addEventListener('input', () => { query = searchInput.value; syncUrl(); applyFilters(); });
  searchClear.addEventListener('click', () => { query = ''; searchInput.value = ''; searchInput.focus(); syncUrl(); applyFilters(); });
  nrReset.addEventListener('click', () => {
    query = ''; searchInput.value = ''; activeTag = 'all';
    syncUrl(); applyFilters(); searchInput.focus();
  });

  // "/" focuses search; Escape clears it.
  document.addEventListener('keydown', e => {
    const typing = /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName);
    if (e.key === '/' && !typing) { e.preventDefault(); searchInput.focus(); }
    else if (e.key === 'Escape' && document.activeElement === searchInput && query) {
      query = ''; searchInput.value = ''; syncUrl(); applyFilters();
    }
  });

  // ---- apply URL state on load ----
  const params = new URLSearchParams(window.location.search);
  activeTag = params.get('tag') || 'all';
  query = params.get('q') || '';
  searchInput.value = query;
  applyFilters();
})();

// === Share Button ===
(function initShare() {
  const btn = document.getElementById('share-btn');
  if (!btn) return;

  const title = btn.getAttribute('data-title') || document.title;
  const url = btn.getAttribute('data-url')
    ? window.location.origin + btn.getAttribute('data-url')
    : window.location.href;

  btn.addEventListener('click', async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (e) {
        // User cancelled or share failed — silent
      }
    } else {
      // Clipboard fallback
      try {
        await navigator.clipboard.writeText(url);
        btn.classList.add('copied');
        const label = btn.querySelector('.share-btn-label');
        const original = label ? label.textContent : 'Share';
        if (label) label.textContent = 'Copied';
        setTimeout(() => {
          btn.classList.remove('copied');
          if (label) label.textContent = original;
        }, 2000);
      } catch (e) {
        // Final fallback: prompt
        window.prompt('Copy this link:', url);
      }
    }
  });
})();
