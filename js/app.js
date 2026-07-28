/**
 * Meal Planner — application PWA principale
 */
import {
  initDB,
  getOrCreateDaily,
  saveDaily,
  getShoppingChecks,
  saveShoppingChecks,
  getSetting,
  setSetting,
  resetAllData,
} from './db.js';
import {
  formatDateISO,
  addDays,
  formatFR,
  formatShort,
  parseISO,
  getCycleDay,
  getCycleWeek,
  getDayPlan,
  dayTotals,
  remainingMeals,
  isSunday,
  euro,
  MEAL_TYPES,
  WATER_TARGET_ML,
  CYCLE_DAYS,
} from './utils.js';
import {
  WEEKLY_LISTS,
  CATEGORIES,
  estimateItemPrice,
  estimateListTotal,
  estimateCycleBudget,
  BATCH_ITEMS,
} from './data/shopping.js';
import {
  AMISSE,
  AMISSE_WEEK,
  AMISSE_PORTIONS,
  AMISSE_SHOPPING_WEEK,
  AMISSE_BATCH,
  getAmisseDayPlan,
  getAmisseDayIndex,
  amisseDayTotals,
} from './data/amisse.js';

/* ---------- Icons (inline SVG) ---------- */
const ICONS = {
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-10.5z"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>`,
  cart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.5L21 8H7"/></svg>`,
  pot: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 10h16v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-8z"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 3v2"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9c.3.6.9 1 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>`,
  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>`,
  moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5z"/></svg>`,
  sunrise: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v5M4.9 10.9l1.4 1.4M17.7 12.3l1.4-1.4M2 17h20M5 21h14"/><path d="M8 17a4 4 0 0 1 8 0"/></svg>`,
  apple: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 7c-3 0-6 2.5-6 6.5S9 21 12 21s6-3 6-7.5S15 7 12 7z"/><path d="M12 7c0-2 1-4 3-4"/></svg>`,
  drop: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3s6 7 6 11a6 6 0 1 1-12 0c0-4 6-11 6-11z"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 12l5 5L20 7"/></svg>`,
  leaf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 19c8 0 14-6 14-14-8 0-14 6-14 14z"/><path d="M5 19c2-6 8-10 14-10"/></svg>`,
  euro: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6a8 8 0 1 0 0 12M5 10h8M5 14h8"/></svg>`,
  utensil: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 3v18M4 3c0 4 3 5 3 8M10 3c0 4-3 5-3 8M17 3v7a3 3 0 0 1-3 3v8"/></svg>`,
  family: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="7" r="3"/><circle cx="17" cy="8" r="2.5"/><path d="M3 20c0-3.5 2.5-6 6-6s6 2.5 6 6"/><path d="M14.5 20c.3-2.2 1.8-4 4-4.5 1.8.4 3.5 2 3.5 4.5"/></svg>`,
};

const MEAL_ICONS = {
  breakfast: ICONS.sunrise,
  lunch: ICONS.sun,
  snack: ICONS.apple,
  dinner: ICONS.moon,
};

/* ---------- State ---------- */
const state = {
  route: 'dashboard',
  planView: 'today', // today | tomorrow | calendar
  selectedDate: formatDateISO(),
  shopWeek: 1,
  cycleStart: null,
  goal: 'seche',
  theme: 'dark',
  amisseTab: 'today', // today | week | shopping | batch
  amisseSelectedDate: formatDateISO(),
};

/* ---------- Toast ---------- */
function toast(msg) {
  let el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 2200);
}

/* ---------- Shell ---------- */
function renderShell() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <header class="app-header">
      <div class="brand">
        <div class="brand-mark" aria-hidden="true">${ICONS.leaf}</div>
        <span class="brand-name">Meal Planner</span>
      </div>
      <div class="header-actions">
        <button class="icon-btn" id="theme-toggle" aria-label="Thème">${state.theme === 'dark' ? ICONS.sun : ICONS.moon}</button>
        <button class="icon-btn" data-nav="settings" aria-label="Réglages">${ICONS.settings}</button>
      </div>
    </header>
    <main id="page" class="page"></main>
    <nav class="bottom-nav" aria-label="Navigation principale">
      <button class="nav-item" data-nav="dashboard">${ICONS.home}<span>Sport</span><span class="nav-dot"></span></button>
      <button class="nav-item" data-nav="planning">${ICONS.calendar}<span>Planning</span><span class="nav-dot"></span></button>
      <button class="nav-item" data-nav="amisse">${ICONS.family}<span>Amisse</span><span class="nav-dot"></span></button>
      <button class="nav-item" data-nav="shopping">${ICONS.cart}<span>Courses</span><span class="nav-dot"></span></button>
      <button class="nav-item" data-nav="batch">${ICONS.pot}<span>Batch</span><span class="nav-dot"></span></button>
    </nav>
  `;
  updateNavActive();
  bindShell();
}

function updateNavActive() {
  document.querySelectorAll('.nav-item').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.nav === state.route);
  });
}

function bindShell() {
  document.querySelectorAll('[data-nav]').forEach((btn) => {
    btn.onclick = () => navigate(btn.dataset.nav);
  });
  document.getElementById('theme-toggle').onclick = async () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    await setSetting('theme', state.theme);
    applyTheme();
    document.getElementById('theme-toggle').innerHTML = state.theme === 'dark' ? ICONS.sun : ICONS.moon;
  };
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
}

function navigate(route) {
  state.route = route;
  if (route === 'planning') state.selectedDate = formatDateISO();
  updateNavActive();
  renderPage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ---------- Pages ---------- */
async function renderPage() {
  const page = document.getElementById('page');
  if (!page) return;
  page.innerHTML = '<p class="page-sub">Chargement…</p>';

  switch (state.route) {
    case 'dashboard':
      page.innerHTML = await viewDashboard();
      bindDashboard();
      break;
    case 'planning':
      page.innerHTML = await viewPlanning();
      bindPlanning();
      break;
    case 'shopping':
      page.innerHTML = await viewShopping();
      bindShopping();
      break;
    case 'batch':
      page.innerHTML = viewBatch();
      break;
    case 'amisse':
      page.innerHTML = await viewAmisse();
      bindAmisse();
      break;
    case 'settings':
      page.innerHTML = await viewSettings();
      bindSettings();
      break;
    default:
      page.innerHTML = await viewDashboard();
  }
}

/* ===== DASHBOARD ===== */
async function viewDashboard() {
  const today = formatDateISO();
  const cycleDay = getCycleDay(state.cycleStart, today);
  const plan = getDayPlan(cycleDay, state.goal);
  const totals = dayTotals(plan);
  const daily = await getOrCreateDaily(today);
  const left = remainingMeals(daily.mealsDone);
  const budget = estimateCycleBudget();
  const pct = Math.round((cycleDay / CYCLE_DAYS) * 100);
  const r = 28;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  const waterPct = Math.min(100, Math.round((daily.waterMl / WATER_TARGET_ML) * 100));

  return `
    <div class="hero-dash">
      <div class="eyebrow">Sport · Jour ${cycleDay} / ${CYCLE_DAYS} · Menu ${plan.phase}</div>
      <h2>${state.goal === 'seche' ? 'Sèche en cours' : 'Prise de masse'}</h2>
      <p>${formatFR(today)} — ${left} repas restant${left > 1 ? 's' : ''}</p>
      <div class="progress-ring-wrap" aria-label="Progression ${pct}%">
        <svg class="progress-ring" viewBox="0 0 72 72">
          <circle class="track" cx="36" cy="36" r="${r}"/>
          <circle class="value" cx="36" cy="36" r="${r}"
            stroke-dasharray="${circ}" stroke-dashoffset="${offset}"/>
        </svg>
        <div class="progress-ring-label">${pct}%</div>
      </div>
    </div>

    <div class="stat-grid">
      <div class="stat-card water">
        <div class="stat-icon">${ICONS.drop}</div>
        <span class="stat-label">Hydratation</span>
        <span class="stat-value">${(daily.waterMl / 1000).toFixed(1)} / 2,5 L</span>
        <div class="water-bar"><span style="width:${waterPct}%"></span></div>
      </div>
      <div class="stat-card meals">
        <div class="stat-icon">${ICONS.utensil}</div>
        <span class="stat-label">Repas restants</span>
        <span class="stat-value">${left} / 4</span>
      </div>
      <div class="stat-card budget">
        <div class="stat-icon">${ICONS.euro}</div>
        <span class="stat-label">Budget / semaine</span>
        <span class="stat-value">${euro(budget.week)}</span>
      </div>
      <div class="stat-card meals">
        <div class="stat-icon">${ICONS.leaf}</div>
        <span class="stat-label">Menu</span>
        <span class="stat-value">Phase ${plan.phase}</span>
      </div>
    </div>

    <div class="section-label">Hydratation rapide</div>
    <div class="surface" style="margin-bottom:1rem">
      <div class="water-actions">
        <button class="btn btn-ghost" data-water="250">+250 ml</button>
        <button class="btn btn-ghost" data-water="500">+500 ml</button>
        <button class="btn btn-primary" data-water="reset">Reset</button>
      </div>
    </div>

    <div class="section-label">Aujourd'hui · ${totals.calories} kcal · ${totals.protein} g protéines</div>
    <div class="meal-list">
      ${MEAL_TYPES.map((t) => renderMealCard(plan[t.id], t, daily.mealsDone?.[t.id], today)).join('')}
    </div>

    <div class="section-label">Budget cycle</div>
    <div class="surface">
      <div style="display:flex;justify-content:space-between;margin-bottom:.5rem"><span>Par mois</span><strong>${euro(budget.month)}</strong></div>
      <div style="display:flex;justify-content:space-between"><span>60 jours</span><strong style="color:var(--orange)">${euro(budget.days60)}</strong></div>
    </div>
  `;
}

function renderMealCard(meal, type, done, dateISO, prefix = '') {
  return `
    <article class="meal-card ${done ? 'done' : ''}" data-meal="${type.id}" data-date="${dateISO}" data-prefix="${prefix}">
      <button class="meal-card-head" type="button">
        <div class="meal-icon">${MEAL_ICONS[type.id]}</div>
        <div class="meal-meta">
          <div class="meal-type">${type.label}</div>
          <div class="meal-name">${meal.name}</div>
          <div class="meal-macros">${meal.calories} kcal · P ${meal.protein}g · ${meal.prepMin} min</div>
        </div>
        <div class="meal-check" data-toggle-meal="${type.id}">${done ? ICONS.check : ''}</div>
      </button>
      <div class="meal-body">
        <ul class="ing-list">
          ${meal.ingredients.map((i) => `<li><span>${i.name}</span><span>${i.qty} ${i.unit}</span></li>`).join('')}
        </ul>
        <div class="macro-row">
          <div class="macro-pill kcal"><strong>${meal.calories}</strong>kcal</div>
          <div class="macro-pill prot"><strong>${meal.protein}g</strong>prot</div>
          <div class="macro-pill fat"><strong>${meal.fat}g</strong>lip</div>
          <div class="macro-pill carb"><strong>${meal.carbs}g</strong>gluc</div>
        </div>
      </div>
    </article>
  `;
}

function bindDashboard() {
  document.querySelectorAll('[data-water]').forEach((btn) => {
    btn.onclick = async () => {
      const today = formatDateISO();
      const d = await getOrCreateDaily(today);
      const v = btn.dataset.water;
      if (v === 'reset') d.waterMl = 0;
      else d.waterMl = Math.min(4000, d.waterMl + Number(v));
      await saveDaily(d);
      renderPage();
    };
  });

  bindMealCards();
}

function bindMealCards() {
  document.querySelectorAll('.meal-card-head').forEach((btn) => {
    btn.onclick = (e) => {
      if (e.target.closest('[data-toggle-meal]')) return;
      btn.closest('.meal-card').classList.toggle('open');
    };
  });
  document.querySelectorAll('[data-toggle-meal]').forEach((el) => {
    el.onclick = async (e) => {
      e.stopPropagation();
      const card = el.closest('.meal-card');
      const date = card.dataset.date;
      const prefix = card.dataset.prefix || '';
      const meal = el.dataset.toggleMeal;
      const d = await getOrCreateDaily(date, prefix);
      d.mealsDone = d.mealsDone || {};
      d.mealsDone[meal] = !d.mealsDone[meal];
      await saveDaily(d);
      toast(d.mealsDone[meal] ? 'Repas validé ✓' : 'Repas décoché');
      renderPage();
    };
  });
}

/* ===== PLANNING ===== */
async function viewPlanning() {
  const today = formatDateISO();
  let date = today;
  if (state.planView === 'tomorrow') date = addDays(today, 1);
  else if (state.planView === 'day' || state.planView === 'today') date = state.selectedDate || today;

  if (state.planView === 'calendar') {
    return `
      <h1 class="page-title">Planning</h1>
      <p class="page-sub">Cycle automatique · rotation A / B tous les 15 jours</p>
      <div class="day-nav">
        <button class="chip" data-plan="today">Aujourd'hui</button>
        <button class="chip" data-plan="tomorrow">Demain</button>
        <button class="chip active" data-plan="calendar">Calendrier</button>
      </div>
      ${renderCalendar(today)}
    `;
  }

  const cycleDay = getCycleDay(state.cycleStart, date);
  const plan = getDayPlan(cycleDay, state.goal);
  const totals = dayTotals(plan);
  const daily = await getOrCreateDaily(date);
  const isCustom = state.planView === 'day' && date !== today && date !== addDays(today, 1);

  return `
    <h1 class="page-title">Planning</h1>
    <p class="page-sub">Cycle automatique · rotation A / B tous les 15 jours</p>
    <div class="day-nav">
      <button class="chip ${state.planView === 'today' ? 'active' : ''}" data-plan="today">Aujourd'hui</button>
      <button class="chip ${state.planView === 'tomorrow' ? 'active' : ''}" data-plan="tomorrow">Demain</button>
      <button class="chip" data-plan="calendar">Calendrier</button>
      ${isCustom ? `<button class="chip active accent">Jour ${cycleDay}</button>` : ''}
    </div>
    <p class="page-sub" style="margin-top:-.4rem;text-transform:capitalize">${formatFR(date)}</p>
    <div class="section-label">Jour ${cycleDay} · Menu ${plan.phase}${plan.phase === 'A' ? ' (base)' : ' (variation)'} · ${totals.calories} kcal</div>
    <div class="meal-list">
      ${MEAL_TYPES.map((t) => renderMealCard(plan[t.id], t, daily.mealsDone?.[t.id], date)).join('')}
    </div>
  `;
}

function renderCalendar(todayISO) {
  const start = new Date();
  start.setDate(1);
  const year = start.getFullYear();
  const month = start.getMonth();
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7; // mon=0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = start.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

  let cells = '';
  ['L', 'M', 'M', 'J', 'V', 'S', 'D'].forEach((d) => {
    cells += `<div class="cal-head">${d}</div>`;
  });
  for (let i = 0; i < firstDow; i++) cells += `<div class="cal-day empty"></div>`;
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = formatDateISO(new Date(year, month, d));
    const cd = getCycleDay(state.cycleStart, iso);
    const phase = getDayPlan(cd, state.goal).phase;
    const isToday = iso === todayISO;
    const selected = iso === state.selectedDate;
    cells += `
      <button class="cal-day ${isToday ? 'today' : ''} ${selected ? 'selected' : ''}" data-cal="${iso}">
        ${d}<span class="phase">${phase}</span>
      </button>`;
  }

  return `
    <div class="section-label" style="text-transform:capitalize">${monthName}</div>
    <div class="cal-grid">${cells}</div>
    <p class="page-sub" style="margin-top:1rem">Touchez un jour pour voir les repas. A / B = phase du menu.</p>
  `;
}

function bindPlanning() {
  document.querySelectorAll('[data-plan]').forEach((btn) => {
    btn.onclick = () => {
      state.planView = btn.dataset.plan;
      if (btn.dataset.plan === 'today') state.selectedDate = formatDateISO();
      if (btn.dataset.plan === 'tomorrow') state.selectedDate = addDays(formatDateISO(), 1);
      renderPage();
    };
  });
  document.querySelectorAll('[data-cal]').forEach((btn) => {
    btn.onclick = () => {
      state.selectedDate = btn.dataset.cal;
      state.planView = 'day';
      renderPage();
    };
  });
  bindMealCards();
}

/* ===== SHOPPING ===== */
async function viewShopping() {
  const today = formatDateISO();
  const cycleDay = getCycleDay(state.cycleStart, today);
  const currentWeek = Math.min(8, getCycleWeek(cycleDay));
  if (!state.shopWeek) state.shopWeek = currentWeek;

  const list = WEEKLY_LISTS[state.shopWeek] || [];
  const checked = await getShoppingChecks(state.shopWeek);
  const total = estimateListTotal(list);
  const checkedTotal = list
    .filter((i) => checked[i.id])
    .reduce((s, i) => s + estimateItemPrice(i), 0);

  const byCat = {};
  list.forEach((item) => {
    if (!byCat[item.cat]) byCat[item.cat] = [];
    byCat[item.cat].push(item);
  });

  const weeks = Array.from({ length: 8 }, (_, i) => i + 1)
    .map(
      (w) =>
        `<button class="chip ${w === state.shopWeek ? 'active' : ''} ${w === currentWeek ? 'accent' : ''}" data-week="${w}">S${w}</button>`
    )
    .join('');

  let catsHtml = '';
  CATEGORIES.forEach((cat) => {
    const items = byCat[cat.id];
    if (!items?.length) return;
    catsHtml += `
      <div class="cat-block">
        <div class="cat-title">${cat.label}</div>
        ${items
          .map((item) => {
            const isChecked = !!checked[item.id];
            const price = estimateItemPrice(item);
            return `
            <button class="shop-item ${isChecked ? 'checked' : ''}" data-item="${item.id}" type="button">
              <span class="checkbox">${isChecked ? ICONS.check : ''}</span>
              <span class="item-info">
                <span class="item-name">${item.name}</span>
                <span class="item-qty">${item.qty} ${item.unit}</span>
              </span>
              <span class="item-price">${euro(price)}</span>
            </button>`;
          })
          .join('')}
      </div>`;
  });

  return `
    <h1 class="page-title">Liste de courses</h1>
    <p class="page-sub">Semaine ${state.shopWeek} / 8 · prix moyens Lidl / Aldi / Premier Prix</p>
    <div class="week-nav">${weeks}</div>
    <div class="shop-total">
      <div>
        <div class="label">Total estimé</div>
        <div class="amount">${euro(total)}</div>
      </div>
      <div style="text-align:right">
        <div class="label">Coché</div>
        <div style="font-family:var(--font-display);font-weight:700">${euro(checkedTotal)}</div>
      </div>
    </div>
    ${catsHtml}
  `;
}

function bindShopping() {
  document.querySelectorAll('[data-week]').forEach((btn) => {
    btn.onclick = () => {
      state.shopWeek = Number(btn.dataset.week);
      renderPage();
    };
  });
  document.querySelectorAll('[data-item]').forEach((btn) => {
    btn.onclick = async () => {
      const id = btn.dataset.item;
      const checked = await getShoppingChecks(state.shopWeek);
      checked[id] = !checked[id];
      await saveShoppingChecks(state.shopWeek, checked);
      renderPage();
    };
  });
}

/* ===== BATCH ===== */
function viewBatch() {
  const sunday = isSunday();
  const totalPrep = BATCH_ITEMS.reduce((s, b) => s + b.timeMin, 0);
  const totalSaved = BATCH_ITEMS.reduce((s, b) => s + b.savedMin, 0);

  return `
    <h1 class="page-title">Batch Cooking</h1>
    <p class="page-sub">Préparez le dimanche · gagnez du temps toute la semaine</p>
    ${
      sunday
        ? `<div class="sunday-banner"><h2>C'est dimanche !</h2><p>Session batch recommandée · ~${totalPrep} min · économie ~${totalSaved} min</p></div>`
        : `<div class="surface" style="margin-bottom:1rem"><strong>Prochain batch :</strong> dimanche · ${totalPrep} min de prep · ${totalSaved} min gagnées</div>`
    }
    ${BATCH_ITEMS.map(
      (b) => `
      <article class="batch-card">
        <h3>${b.name}</h3>
        <p>${b.tips}</p>
        <div class="batch-meta">
          <span class="tag">${b.timeMin} min</span>
          <span class="tag save">−${b.savedMin} min gagnés</span>
          ${b.meals.map((m) => `<span class="tag">${m}</span>`).join('')}
        </div>
      </article>`
    ).join('')}
  `;
}

/* ===== AMISSE (famille) ===== */
async function viewAmisse() {
  const today = formatDateISO();
  const dayPlan = getAmisseDayPlan(new Date());
  const totals = amisseDayTotals(dayPlan);
  const daily = await getOrCreateDaily(today, 'amisse:');
  const left = remainingMeals(daily.mealsDone);
  const shopTotal = estimateListTotal(AMISSE_SHOPPING_WEEK);

  const tabs = `
    <div class="day-nav">
      <button class="chip ${state.amisseTab === 'today' ? 'active' : ''}" data-amisse="today">Aujourd'hui</button>
      <button class="chip ${state.amisseTab === 'week' ? 'active' : ''}" data-amisse="week">Calendrier</button>
      <button class="chip ${state.amisseTab === 'shopping' ? 'active' : ''}" data-amisse="shopping">Courses</button>
      <button class="chip ${state.amisseTab === 'batch' ? 'active' : ''}" data-amisse="batch">Batch</button>
    </div>`;

  let body = '';
  if (state.amisseTab === 'today') {
    body = `
      <div class="hero-dash amisse-hero">
        <div class="eyebrow">Famille Amisse · ${dayPlan.label}</div>
        <h2>Manger sainement</h2>
        <p>2 adultes · enfant 10 ans · enfant 4 ans — ${left} repas restants</p>
      </div>
      <div class="member-row">
        ${AMISSE.members.map((m) => `<span class="member-chip">${m.label}</span>`).join('')}
      </div>
      <div class="section-label">Portions</div>
      <div class="surface" style="margin-bottom:1rem">
        ${AMISSE_PORTIONS.map((p) => `<div style="display:flex;justify-content:space-between;gap:.75rem;margin-bottom:.35rem"><strong>${p.member}</strong><span style="color:var(--text-muted);font-size:.85rem;text-align:right">${p.hint}</span></div>`).join('')}
      </div>
      <div class="section-label">Menus du jour · ${totals.calories} kcal famille · ${totals.protein} g protéines</div>
      <div class="meal-list">
        ${MEAL_TYPES.map((t) => renderMealCard(dayPlan[t.id], t, daily.mealsDone?.[t.id], today, 'amisse:')).join('')}
      </div>
      <div class="section-label">Principes</div>
      <ul class="future-list surface" style="padding:0;margin-bottom:1rem">
        ${AMISSE.principles.map((p) => `<li>${p}</li>`).join('')}
      </ul>
      <p class="page-sub">Le programme Sport (sèche / masse) reste inchangé dans les autres onglets.</p>
    `;
  } else if (state.amisseTab === 'week') {
    const selected = state.amisseSelectedDate || today;
    const selectedPlan = getAmisseDayPlan(parseISO(selected));
    const selectedTotals = amisseDayTotals(selectedPlan);
    const selectedDaily = await getOrCreateDaily(selected, 'amisse:');
    body = `
      ${renderAmisseCalendar(today, selected)}
      <div class="section-label">Programme de la semaine</div>
      <div class="amisse-week-strip">
        ${AMISSE_WEEK.map((d, idx) => {
          const isToday = idx === getAmisseDayIndex(new Date());
          const isSelected = idx === getAmisseDayIndex(parseISO(selected));
          return `
            <button type="button" class="amisse-week-day ${isToday ? 'is-today' : ''} ${isSelected ? 'is-selected' : ''}" data-amisse-weekday="${idx}">
              <strong>${d.label.slice(0, 3)}</strong>
              <span>${d.dinner.name.split('·')[0].trim().slice(0, 18)}</span>
            </button>`;
        }).join('')}
      </div>
      <div class="section-label" style="text-transform:capitalize">${formatFR(selected)} · ${selectedPlan.label}</div>
      <p class="page-sub" style="margin-top:-.35rem">${selectedTotals.calories} kcal famille · ${selectedTotals.protein} g protéines</p>
      <div class="meal-list">
        ${MEAL_TYPES.map((t) => renderMealCard(selectedPlan[t.id], t, selectedDaily.mealsDone?.[t.id], selected, 'amisse:')).join('')}
      </div>
      <div class="section-label">Récap semaine</div>
      ${AMISSE_WEEK.map((d, idx) => {
        const t = amisseDayTotals(d);
        const isToday = idx === getAmisseDayIndex(new Date());
        const isSelected = idx === getAmisseDayIndex(parseISO(selected));
        return `
          <button type="button" class="batch-card amisse-week-card ${isToday ? 'amisse-today' : ''} ${isSelected ? 'is-selected' : ''}" data-amisse-weekday="${idx}">
            <h3>${d.label}${isToday ? ' · aujourd’hui' : ''}</h3>
            <p>${d.breakfast.name} · ${d.lunch.name}<br>${d.snack.name} · ${d.dinner.name}</p>
            <div class="batch-meta">
              <span class="tag">${t.calories} kcal</span>
              <span class="tag">${t.protein} g prot</span>
            </div>
          </button>`;
      }).join('')}
    `;
  } else if (state.amisseTab === 'shopping') {
    const checked = await getShoppingChecks('family', 'amisse');
    const checkedTotal = AMISSE_SHOPPING_WEEK.filter((i) => checked[i.id]).reduce(
      (s, i) => s + estimateItemPrice(i),
      0
    );
    const byCat = {};
    AMISSE_SHOPPING_WEEK.forEach((item) => {
      if (!byCat[item.cat]) byCat[item.cat] = [];
      byCat[item.cat].push(item);
    });
    let catsHtml = '';
    CATEGORIES.forEach((cat) => {
      const items = byCat[cat.id];
      if (!items?.length) return;
      catsHtml += `
        <div class="cat-block">
          <div class="cat-title">${cat.label}</div>
          ${items
            .map((item) => {
              const isChecked = !!checked[item.id];
              return `
              <button class="shop-item ${isChecked ? 'checked' : ''}" data-amisse-item="${item.id}" type="button">
                <span class="checkbox">${isChecked ? ICONS.check : ''}</span>
                <span class="item-info">
                  <span class="item-name">${item.name}</span>
                  <span class="item-qty">${item.qty} ${item.unit}</span>
                </span>
                <span class="item-price">${euro(estimateItemPrice(item))}</span>
              </button>`;
            })
            .join('')}
        </div>`;
    });
    body = `
      <p class="page-sub">Courses semaine famille Amisse · Lidl / Aldi / Premier Prix</p>
      <div class="shop-total">
        <div>
          <div class="label">Total estimé / semaine</div>
          <div class="amount">${euro(shopTotal)}</div>
        </div>
        <div style="text-align:right">
          <div class="label">Coché</div>
          <div style="font-family:var(--font-display);font-weight:700">${euro(checkedTotal)}</div>
        </div>
      </div>
      ${catsHtml}
    `;
  } else {
    body = `
      <div class="sunday-banner" style="background:linear-gradient(135deg,var(--teal),var(--cyan))">
        <h2>Batch famille Amisse</h2>
        <p>Dimanche · repas sains pour 4 · mêmes bases que le plan nutritionnel</p>
      </div>
      ${AMISSE_BATCH.map(
        (b) => `
        <article class="batch-card">
          <h3>${b.name}</h3>
          <p>${b.tips}</p>
          <div class="batch-meta">
            <span class="tag">${b.timeMin} min</span>
            <span class="tag save">−${b.savedMin} min</span>
          </div>
        </article>`
      ).join('')}
    `;
  }

  return `
    <h1 class="page-title">Amisse</h1>
    <p class="page-sub">Famille · alimentation saine · indépendant du programme sport</p>
    ${tabs}
    ${body}
  `;
}

function bindAmisse() {
  document.querySelectorAll('[data-amisse]').forEach((btn) => {
    btn.onclick = () => {
      state.amisseTab = btn.dataset.amisse;
      if (btn.dataset.amisse === 'week' && !state.amisseSelectedDate) {
        state.amisseSelectedDate = formatDateISO();
      }
      renderPage();
    };
  });
  document.querySelectorAll('[data-amisse-cal]').forEach((btn) => {
    btn.onclick = () => {
      state.amisseSelectedDate = btn.dataset.amisseCal;
      state.amisseTab = 'week';
      renderPage();
    };
  });
  document.querySelectorAll('[data-amisse-weekday]').forEach((btn) => {
    btn.onclick = () => {
      const idx = Number(btn.dataset.amisseWeekday);
      const ref = state.amisseSelectedDate || formatDateISO();
      const refIdx = getAmisseDayIndex(parseISO(ref));
      state.amisseSelectedDate = addDays(ref, idx - refIdx);
      state.amisseTab = 'week';
      renderPage();
    };
  });
  document.querySelectorAll('[data-amisse-item]').forEach((btn) => {
    btn.onclick = async () => {
      const id = btn.dataset.amisseItem;
      const checked = await getShoppingChecks('family', 'amisse');
      checked[id] = !checked[id];
      await saveShoppingChecks('family', checked, 'amisse');
      renderPage();
    };
  });
  bindMealCards();
}

function renderAmisseCalendar(todayISO, selectedISO) {
  const base = parseISO(selectedISO || todayISO);
  const year = base.getFullYear();
  const month = base.getMonth();
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = new Date(year, month, 1).toLocaleDateString('fr-FR', {
    month: 'long',
    year: 'numeric',
  });
  const labels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  let cells = labels.map((d) => `<div class="cal-head">${d}</div>`).join('');
  for (let i = 0; i < firstDow; i++) cells += `<div class="cal-day empty"></div>`;
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = formatDateISO(new Date(year, month, d));
    const plan = getAmisseDayPlan(new Date(year, month, d));
    const short = plan.label.slice(0, 3);
    const isToday = iso === todayISO;
    const selected = iso === selectedISO;
    cells += `
      <button class="cal-day amisse-cal ${isToday ? 'today' : ''} ${selected ? 'selected' : ''}" data-amisse-cal="${iso}" type="button">
        <span class="cal-num">${d}</span>
        <span class="phase">${short}</span>
      </button>`;
  }

  return `
    <div class="section-label" style="text-transform:capitalize">${monthName}</div>
    <div class="cal-grid amisse-cal-grid">${cells}</div>
    <p class="page-sub" style="margin-top:.85rem">Touchez un jour : le programme Amisse suit le jour de la semaine (Lun→Dim, en boucle).</p>
  `;
}

/* ===== SETTINGS ===== */
async function viewSettings() {
  const budget = estimateCycleBudget();
  const startFR = formatFR(formatDateISO(new Date(state.cycleStart)));

  return `
    <h1 class="page-title">Réglages</h1>
    <p class="page-sub">Sport (sèche/masse) et famille Amisse · données 100 % locales</p>

    <div class="section-label">Objectif</div>
    <div class="setting-row">
      <div class="info"><strong>Nutrition</strong><span>Sèche ou prise de masse</span></div>
      <div class="segment" id="goal-seg">
        <button data-goal="seche" class="${state.goal === 'seche' ? 'active' : ''}">Sèche</button>
        <button data-goal="masse" class="${state.goal === 'masse' ? 'active' : ''}">Masse</button>
      </div>
    </div>

    <div class="setting-row">
      <div class="info"><strong>Thème</strong><span>Clair / sombre</span></div>
      <button class="switch ${state.theme === 'dark' ? 'on' : ''}" id="theme-switch" aria-label="Thème sombre"></button>
    </div>

    <div class="section-label">Cycle</div>
    <div class="setting-row">
      <div class="info"><strong>Début du cycle</strong><span style="text-transform:capitalize">${startFR}</span></div>
      <button class="btn btn-ghost" id="reset-cycle" style="min-height:40px;padding:.4rem .8rem">Reprendre aujourd'hui</button>
    </div>

    <div class="section-label">Budget estimé</div>
    <div class="surface" style="margin-bottom:1rem">
      <div style="display:flex;justify-content:space-between;margin-bottom:.45rem"><span>Semaine</span><strong>${euro(budget.week)}</strong></div>
      <div style="display:flex;justify-content:space-between;margin-bottom:.45rem"><span>Mois</span><strong>${euro(budget.month)}</strong></div>
      <div style="display:flex;justify-content:space-between"><span>60 jours</span><strong style="color:var(--orange)">${euro(budget.days60)}</strong></div>
    </div>

    <div class="section-label">Application (PWA)</div>
    <div class="surface" style="margin-bottom:1rem">
      <div class="pwa-status" style="margin-bottom:.75rem">
        <span class="pwa-dot ${isStandalone() ? 'on' : ''}"></span>
        <span>${pwaStatusLabel()}</span>
      </div>
      ${
        canInstall()
          ? `<button class="btn btn-accent btn-block" id="settings-install">Installer sur cet appareil</button>`
          : isIOS() && !isStandalone()
            ? `<p class="page-sub" style="margin:0">iPhone : Safari → Partager → <strong>Sur l’écran d’accueil</strong></p>`
            : isStandalone()
              ? `<p class="page-sub" style="margin:0">Application installée · mode hors ligne actif</p>`
              : `<p class="page-sub" style="margin:0">Ouvre l’app en HTTPS ou localhost pour pouvoir l’installer.</p>`
      }
    </div>

    <div class="section-label">Données</div>
    <button class="btn btn-orange btn-block" id="reset-all">Réinitialiser toutes les données</button>

    <div class="section-label">Évolutions futures</div>
    <ul class="future-list surface" style="padding:0">
      <li>Export PDF / Excel</li>
      <li>Synchronisation cloud</li>
      <li>Connexion GoodCoach</li>
      <li>Notifications repas</li>
      <li>Scanner code-barres · Open Food Facts</li>
    </ul>

    <p class="page-sub" style="margin-top:1.5rem;text-align:center">Meal Planner · Halal · Offline · PWA</p>
  `;
}

function bindSettings() {
  document.querySelectorAll('[data-goal]').forEach((btn) => {
    btn.onclick = async () => {
      state.goal = btn.dataset.goal;
      await setSetting('goal', state.goal);
      toast(state.goal === 'seche' ? 'Objectif : sèche' : 'Objectif : prise de masse');
      renderPage();
    };
  });
  document.getElementById('theme-switch')?.addEventListener('click', async () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    await setSetting('theme', state.theme);
    applyTheme();
    renderShell();
    renderPage();
  });
  document.getElementById('reset-cycle')?.addEventListener('click', async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    state.cycleStart = today.toISOString();
    await setSetting('cycleStart', state.cycleStart);
    toast('Cycle redémarré au jour 1');
    renderPage();
  });
  document.getElementById('settings-install')?.addEventListener('click', () => triggerInstall());
  document.getElementById('reset-all')?.addEventListener('click', async () => {
    if (!confirm('Effacer toutes les données locales ?')) return;
    await resetAllData();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    await setSetting('cycleStart', today.toISOString());
    await setSetting('goal', 'seche');
    await setSetting('theme', 'dark');
    state.cycleStart = today.toISOString();
    state.goal = 'seche';
    state.theme = 'dark';
    applyTheme();
    toast('Données réinitialisées');
    navigate('dashboard');
  });
}

/* ---------- PWA ---------- */
let deferredInstallPrompt = null;

function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  );
}

function isIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function canInstall() {
  return !!deferredInstallPrompt;
}

function pwaStatusLabel() {
  if (isStandalone()) return 'Installée (standalone)';
  if (canInstall()) return 'Prête à installer';
  if (isIOS()) return 'iOS · ajout via Safari';
  return 'Navigateur · PWA détectée';
}

function showInstallBanner() {
  const banner = document.getElementById('install-banner');
  if (!banner) return;
  if (isStandalone() || sessionStorage.getItem('mp_install_dismissed')) {
    banner.hidden = true;
    return;
  }
  if (canInstall() || isIOS()) banner.hidden = false;
}

async function triggerInstall() {
  if (!deferredInstallPrompt) {
    if (isIOS()) {
      toast('Safari → Partager → Sur l’écran d’accueil');
      return;
    }
    toast('Installation non disponible ici');
    return;
  }
  deferredInstallPrompt.prompt();
  const { outcome } = await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  document.getElementById('install-banner').hidden = true;
  toast(outcome === 'accepted' ? 'Application installée ✓' : 'Installation annulée');
  if (state.route === 'settings') renderPage();
}

function setupPwa() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    showInstallBanner();
    if (state.route === 'settings') renderPage();
  });

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    const banner = document.getElementById('install-banner');
    if (banner) banner.hidden = true;
    toast('Meal Planner installé ✓');
  });

  document.getElementById('install-btn')?.addEventListener('click', () => triggerInstall());
  document.getElementById('install-dismiss')?.addEventListener('click', () => {
    sessionStorage.setItem('mp_install_dismissed', '1');
    document.getElementById('install-banner').hidden = true;
  });

  if (isIOS() && !isStandalone()) showInstallBanner();
}

async function registerSW() {
  if (!('serviceWorker' in navigator)) return;
  try {
    const reg = await navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' });
    await reg.update();

    const askReload = (worker) => {
      worker.postMessage('SKIP_WAITING');
    };

    if (reg.waiting) askReload(reg.waiting);

    reg.addEventListener('updatefound', () => {
      const worker = reg.installing;
      if (!worker) return;
      worker.addEventListener('statechange', () => {
        if (worker.state === 'installed' && navigator.serviceWorker.controller) {
          askReload(worker);
        }
      });
    });

    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      refreshing = true;
      toast('Mise à jour PWA appliquée');
      setTimeout(() => window.location.reload(), 400);
    });
  } catch (e) {
    console.warn('SW non enregistré', e);
  }
}

/* ---------- Boot ---------- */
async function boot() {
  await initDB();
  state.cycleStart = await getSetting('cycleStart');
  state.goal = (await getSetting('goal')) || 'seche';
  state.theme = (await getSetting('theme')) || 'dark';
  state.shopWeek = Math.min(8, getCycleWeek(getCycleDay(state.cycleStart)));
  applyTheme();
  renderShell();
  await renderPage();
  setupPwa();
  await registerSW();
}

boot();
