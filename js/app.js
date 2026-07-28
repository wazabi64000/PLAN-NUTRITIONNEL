/**
 * Meal Planner — famille adaptable (Amisse)
 * Quantités recalculées selon le nombre de personnes présentes
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
  parseISO,
  remainingMeals,
  isSunday,
  euro,
  MEAL_TYPES,
  WATER_TARGET_ML,
} from './utils.js';
import {
  CATEGORIES,
  estimateItemPrice,
  estimateListTotal,
} from './data/shopping.js';
import {
  AMISSE,
  AMISSE_WEEK,
  AMISSE_PORTIONS,
  AMISSE_SHOPPING_WEEK,
  AMISSE_BATCH,
  AMISSE_BASE_COEFF,
  getAmisseDayPlan,
  getAmisseDayIndex,
  amisseDayTotals,
  scalePlan,
  peopleCoeff,
  peopleCount,
  clampPeople,
  DEFAULT_AMISSE_PEOPLE,
  PROGRAM_START_ISO,
  isProgramStarted,
  programDayNumber,
  daysSinceProgramStart,
  getProgramWeekDates,
  getProgramWeekNumber,
  getProgramWeekStartISO,
} from './data/amisse.js';

const PREFIX = 'family:';

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
};

const MEAL_ICONS = {
  breakfast: ICONS.sunrise,
  lunch: ICONS.sun,
  snack: ICONS.apple,
  dinner: ICONS.moon,
};

const state = {
  route: 'dashboard',
  selectedDate: formatDateISO(),
  theme: 'dark',
};

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

function familyBudget() {
  const week = estimateListTotal(AMISSE_SHOPPING_WEEK.filter((i) => i.id !== 'a-thon-alt'));
  return {
    week,
    month: Math.round(week * 4.3 * 100) / 100,
    days60: Math.round(week * 8.5 * 100) / 100,
  };
}

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
      <button class="nav-item" data-nav="dashboard">${ICONS.home}<span>Accueil</span><span class="nav-dot"></span></button>
      <button class="nav-item" data-nav="planning">${ICONS.calendar}<span>Planning</span><span class="nav-dot"></span></button>
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
    case 'settings':
      page.innerHTML = await viewSettings();
      bindSettings();
      break;
    default:
      page.innerHTML = await viewDashboard();
      bindDashboard();
  }
}

function renderPeoplePanel(people, dateISO) {
  const coeff = peopleCoeff(people);
  const factor = coeff / AMISSE_BASE_COEFF;
  const rows = [
    { key: 'adults', label: 'Adultes', hint: 'part 1' },
    { key: 'child10', label: 'Enfants 10 ans', hint: 'part 0,75' },
    { key: 'child4', label: 'Enfants 4 ans', hint: 'part 0,5' },
  ];
  return `
    <div class="section-label">Personnes présentes</div>
    <div class="people-panel surface" data-people-date="${dateISO}" data-people-prefix="${PREFIX}" data-people-base="${AMISSE_BASE_COEFF}">
      ${rows
        .map(
          (row) => `
        <div class="people-row">
          <div class="people-info">
            <strong>${row.label}</strong>
            <span>${row.hint}</span>
          </div>
          <div class="people-stepper">
            <button type="button" class="people-btn" data-people-key="${row.key}" data-people-delta="-1" aria-label="Retirer">−</button>
            <span class="people-count">${people[row.key]}</span>
            <button type="button" class="people-btn" data-people-key="${row.key}" data-people-delta="1" aria-label="Ajouter">+</button>
          </div>
        </div>`
        )
        .join('')}
      <div class="people-summary">
        <span>${peopleCount(people)} personne${peopleCount(people) > 1 ? 's' : ''}</span>
        <strong>×${factor.toFixed(2)} · coeff ${coeff.toFixed(2)}</strong>
      </div>
      <p class="page-sub" style="margin:.55rem 0 0">Seul ? Adultes = 1 · Enfants = 0</p>
    </div>
  `;
}

function bindPeoplePanel() {
  document.querySelectorAll('.people-btn').forEach((btn) => {
    btn.onclick = async () => {
      const panel = btn.closest('.people-panel');
      const date = panel.dataset.peopleDate;
      const prefix = panel.dataset.peoplePrefix || PREFIX;
      const key = btn.dataset.peopleKey;
      const delta = Number(btn.dataset.peopleDelta);
      const d = await getOrCreateDaily(date, prefix);
      d.people = clampPeople({
        ...(d.people || DEFAULT_AMISSE_PEOPLE),
        [key]: (Number(d.people?.[key]) || 0) + delta,
      });
      await saveDaily(d);
      const factor = peopleCoeff(d.people) / AMISSE_BASE_COEFF;
      toast(`${peopleCount(d.people)} pers. · quantités ×${factor.toFixed(2)}`);
      renderPage();
    };
  });
}

function renderMealCard(meal, type, done, dateISO) {
  return `
    <article class="meal-card ${done ? 'done' : ''}" data-meal="${type.id}" data-date="${dateISO}" data-prefix="${PREFIX}">
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
      const d = await getOrCreateDaily(card.dataset.date, card.dataset.prefix || PREFIX);
      d.mealsDone = d.mealsDone || {};
      const meal = el.dataset.toggleMeal;
      d.mealsDone[meal] = !d.mealsDone[meal];
      await saveDaily(d);
      toast(d.mealsDone[meal] ? 'Repas validé ✓' : 'Repas décoché');
      renderPage();
    };
  });
}

/* ===== ACCUEIL ===== */
function renderProgramBanner(date = new Date()) {
  const started = isProgramStarted(date);
  const dayNum = programDayNumber(date);
  const startLabel = parseISO(PROGRAM_START_ISO).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  if (!started) {
    const left = Math.abs(daysSinceProgramStart(date));
    return `
      <div class="surface" style="margin-bottom:1rem;border-left:3px solid var(--accent)">
        <strong>Programme à partir du ${startLabel}</strong>
        <p class="page-sub" style="margin:0.35rem 0 0">Encore ${left} jour${left > 1 ? 's' : ''} · Jour 1 = Lundi du cycle</p>
      </div>`;
  }
  return `
    <div class="surface" style="margin-bottom:1rem;border-left:3px solid var(--lime, var(--accent))">
      <strong>Programme en cours · Jour ${dayNum}</strong>
      <p class="page-sub" style="margin:0.35rem 0 0">Démarré le ${startLabel} · cycle 7 jours en boucle</p>
    </div>`;
}

async function viewDashboard() {
  const today = formatDateISO();
  const daily = await getOrCreateDaily(today, PREFIX);
  const people = clampPeople(daily.people || DEFAULT_AMISSE_PEOPLE);
  const plan = scalePlan(getAmisseDayPlan(new Date()), people, AMISSE_BASE_COEFF);
  const totals = amisseDayTotals(plan);
  const left = remainingMeals(daily.mealsDone);
  const budget = familyBudget();
  const waterPct = Math.min(100, Math.round((daily.waterMl / WATER_TARGET_ML) * 100));
  const dayNum = programDayNumber(new Date());

  return `
    <div class="hero-dash amisse-hero">
      <div class="eyebrow">${AMISSE.name} · ${plan.label}${dayNum ? ` · Jour ${dayNum}` : ''}</div>
      <h2>Famille adaptable</h2>
      <p>${peopleCount(people)} personne${peopleCount(people) > 1 ? 's' : ''} · ${left} repas restants</p>
    </div>

    ${renderProgramBanner(new Date())}

    ${renderPeoplePanel(people, today)}

    <div class="stat-grid">
      <div class="stat-card water">
        <div class="stat-icon">${ICONS.drop}</div>
        <span class="stat-label">Hydratation</span>
        <span class="stat-value">${(daily.waterMl / 1000).toFixed(1)} / 2,5 L</span>
        <div class="water-bar"><span style="width:${waterPct}%"></span></div>
      </div>
      <div class="stat-card meals">
        <div class="stat-icon">${ICONS.home}</div>
        <span class="stat-label">Repas restants</span>
        <span class="stat-value">${left} / 4</span>
      </div>
      <div class="stat-card budget">
        <div class="stat-icon">${ICONS.euro}</div>
        <span class="stat-label">Courses / semaine*</span>
        <span class="stat-value">${euro(budget.week)}</span>
      </div>
      <div class="stat-card meals">
        <div class="stat-icon">${ICONS.leaf}</div>
        <span class="stat-label">Facteur quantités</span>
        <span class="stat-value">×${plan.factor.toFixed(2)}</span>
      </div>
    </div>
    <p class="page-sub">* Budget courses = liste famille type (4 pers.)</p>

    <div class="section-label">Hydratation</div>
    <div class="surface" style="margin-bottom:1rem">
      <div class="water-actions">
        <button class="btn btn-ghost" data-water="250">+250 ml</button>
        <button class="btn btn-ghost" data-water="500">+500 ml</button>
        <button class="btn btn-primary" data-water="reset">Reset</button>
      </div>
    </div>

    <div class="section-label">${isProgramStarted() ? 'Aujourd\'hui' : 'Aperçu'} · ${totals.calories} kcal · ${totals.protein} g protéines</div>
    <div class="meal-list">
      ${MEAL_TYPES.map((t) => renderMealCard(plan[t.id], t, daily.mealsDone?.[t.id], today)).join('')}
    </div>

    <div class="section-label">Portions de référence</div>
    <div class="surface" style="margin-bottom:1rem">
      ${AMISSE_PORTIONS.map((p) => `<div style="display:flex;justify-content:space-between;gap:.75rem;margin-bottom:.35rem"><strong>${p.member}</strong><span style="color:var(--text-muted);font-size:.85rem;text-align:right">${p.hint}</span></div>`).join('')}
    </div>
  `;
}

function bindDashboard() {
  bindPeoplePanel();
  document.querySelectorAll('[data-water]').forEach((btn) => {
    btn.onclick = async () => {
      const d = await getOrCreateDaily(formatDateISO(), PREFIX);
      const v = btn.dataset.water;
      if (v === 'reset') d.waterMl = 0;
      else d.waterMl = Math.min(4000, (d.waterMl || 0) + Number(v));
      await saveDaily(d);
      renderPage();
    };
  });
  bindMealCards();
}

/* ===== PLANNING ===== */
function formatWeekRange(weekStartISO) {
  const start = parseISO(weekStartISO);
  const end = parseISO(addDays(weekStartISO, 6));
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
  if (sameMonth) {
    return `${start.getDate()} – ${end.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })}`;
  }
  return `${start.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} – ${end.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })}`;
}

function renderWeekNav(selectedISO) {
  const weekStart = getProgramWeekStartISO(parseISO(selectedISO));
  const weekNum = getProgramWeekNumber(parseISO(selectedISO));
  const range = formatWeekRange(weekStart);
  const title =
    weekNum >= 1
      ? `Semaine ${weekNum}`
      : `Aperçu · S${weekNum}`;

  return `
    <div class="week-nav surface">
      <button type="button" class="btn btn-ghost week-nav-btn" data-week-delta="-1" aria-label="Semaine précédente">
        ← Précédent
      </button>
      <div class="week-nav-center">
        <strong>${title}</strong>
        <span>${range}</span>
      </div>
      <button type="button" class="btn btn-primary week-nav-btn" data-week-delta="1" aria-label="Semaine suivante">
        Suivant →
      </button>
    </div>`;
}

async function viewPlanning() {
  const today = formatDateISO();
  const selected = state.selectedDate || today;
  const weekDates = getProgramWeekDates(parseISO(selected));
  const weekStart = weekDates[0];
  const daily = await getOrCreateDaily(selected, PREFIX);
  const people = clampPeople(daily.people || DEFAULT_AMISSE_PEOPLE);
  const plan = scalePlan(getAmisseDayPlan(parseISO(selected)), people, AMISSE_BASE_COEFF);
  const totals = amisseDayTotals(plan);
  const weekNum = getProgramWeekNumber(parseISO(selected));

  const dayCards = weekDates
    .map((iso, idx) => {
      const dPlan = AMISSE_WEEK[idx];
      const t = amisseDayTotals(dPlan);
      const isToday = iso === today;
      const isSelected = iso === selected;
      const dayLabel = parseISO(iso).toLocaleDateString('fr-FR', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      });
      return `
        <button type="button" class="batch-card week-day-card ${isToday ? 'amisse-today' : ''} ${isSelected ? 'is-selected' : ''}" data-cal="${iso}">
          <h3>${dPlan.label} · ${dayLabel}${isToday ? ' · aujourd’hui' : ''}</h3>
          <p>${dPlan.breakfast.name} · ${dPlan.lunch.name}<br>${dPlan.snack.name} · ${dPlan.dinner.name}</p>
          <div class="batch-meta">
            <span class="tag">${t.calories} kcal</span>
            <span class="tag">${t.protein} g prot</span>
          </div>
        </button>`;
    })
    .join('');

  return `
    <h1 class="page-title">Planning</h1>
    <p class="page-sub">Programme semaine par semaine · dès le ${parseISO(PROGRAM_START_ISO).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
    ${renderProgramBanner(parseISO(selected))}
    ${renderWeekNav(selected)}
    ${renderPeoplePanel(people, selected)}
    <div class="amisse-week-strip">
      ${weekDates
        .map((iso, idx) => {
          const d = AMISSE_WEEK[idx];
          const dayNum = parseISO(iso).getDate();
          return `
          <button type="button" class="amisse-week-day ${iso === today ? 'is-today' : ''} ${iso === selected ? 'is-selected' : ''}" data-cal="${iso}">
            <strong>${d.label.slice(0, 3)}</strong>
            <em>${dayNum}</em>
            <span>${d.dinner.name.split('·')[0].trim().slice(0, 16)}</span>
          </button>`;
        })
        .join('')}
    </div>
    <div class="section-label" style="text-transform:capitalize">${formatFR(selected)} · ${plan.label}${programDayNumber(parseISO(selected)) ? ` · Jour ${programDayNumber(parseISO(selected))}` : ''}</div>
    <p class="page-sub" style="margin-top:-.35rem">${totals.calories} kcal · ${totals.protein} g prot · ${peopleCount(people)} pers. · ×${plan.factor.toFixed(2)}</p>
    <div class="meal-list">
      ${MEAL_TYPES.map((t) => renderMealCard(plan[t.id], t, daily.mealsDone?.[t.id], selected)).join('')}
    </div>
    <div class="section-label">Semaine ${weekNum >= 1 ? weekNum : 'aperçu'} · ${formatWeekRange(weekStart)}</div>
    ${dayCards}
  `;
}

function bindPlanning() {
  bindPeoplePanel();
  document.querySelectorAll('[data-week-delta]').forEach((btn) => {
    btn.onclick = () => {
      const delta = Number(btn.dataset.weekDelta);
      const ref = state.selectedDate || formatDateISO();
      const weekStart = getProgramWeekStartISO(parseISO(ref));
      const dayIdx = getAmisseDayIndex(parseISO(ref));
      const nextWeekStart = addDays(weekStart, delta * 7);
      state.selectedDate = addDays(nextWeekStart, dayIdx);
      renderPage();
    };
  });
  document.querySelectorAll('[data-cal]').forEach((btn) => {
    btn.onclick = () => {
      state.selectedDate = btn.dataset.cal;
      renderPage();
    };
  });
  bindMealCards();
}

/* ===== COURSES ===== */
async function viewShopping() {
  const list = AMISSE_SHOPPING_WEEK;
  const checked = await getShoppingChecks('family', 'amisse');
  const total = estimateListTotal(list.filter((i) => i.id !== 'a-thon-alt'));
  const checkedTotal = list.filter((i) => checked[i.id]).reduce((s, i) => s + estimateItemPrice(i), 0);
  const byCat = {};
  list.forEach((item) => {
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
            <button class="shop-item ${isChecked ? 'checked' : ''}" data-item="${item.id}" type="button">
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

  return `
    <h1 class="page-title">Liste de courses</h1>
    <p class="page-sub">Semaine type famille (4 pers.) · ajuste les quantités au quotidien via +/−</p>
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
  document.querySelectorAll('[data-item]').forEach((btn) => {
    btn.onclick = async () => {
      const id = btn.dataset.item;
      const checked = await getShoppingChecks('family', 'amisse');
      checked[id] = !checked[id];
      await saveShoppingChecks('family', checked, 'amisse');
      renderPage();
    };
  });
}

/* ===== BATCH ===== */
function viewBatch() {
  const sunday = isSunday();
  const totalPrep = AMISSE_BATCH.reduce((s, b) => s + b.timeMin, 0);
  const totalSaved = AMISSE_BATCH.reduce((s, b) => s + b.savedMin, 0);
  return `
    <h1 class="page-title">Batch Cooking</h1>
    <p class="page-sub">Préparez le dimanche · quantités à adapter avec +/− du jour</p>
    ${
      sunday
        ? `<div class="sunday-banner"><h2>C'est dimanche !</h2><p>~${totalPrep} min · économie ~${totalSaved} min</p></div>`
        : `<div class="surface" style="margin-bottom:1rem"><strong>Prochain batch :</strong> dimanche · ${totalPrep} min</div>`
    }
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

/* ===== SETTINGS ===== */
async function viewSettings() {
  const budget = familyBudget();
  return `
    <h1 class="page-title">Réglages</h1>
    <p class="page-sub">Programme famille · données 100 % locales</p>

    <div class="setting-row">
      <div class="info"><strong>Thème</strong><span>Clair / sombre</span></div>
      <button class="switch ${state.theme === 'dark' ? 'on' : ''}" id="theme-switch" aria-label="Thème sombre"></button>
    </div>

    <div class="section-label">Budget courses (liste type 4 pers.)</div>
    <div class="surface" style="margin-bottom:1rem">
      <div style="display:flex;justify-content:space-between;margin-bottom:.45rem"><span>Semaine</span><strong>${euro(budget.week)}</strong></div>
      <div style="display:flex;justify-content:space-between;margin-bottom:.45rem"><span>Mois</span><strong>${euro(budget.month)}</strong></div>
      <div style="display:flex;justify-content:space-between"><span>≈ 60 jours</span><strong style="color:var(--orange)">${euro(budget.days60)}</strong></div>
    </div>

    <div class="section-label">Programme</div>
    <div class="surface" style="margin-bottom:1rem">
      <div style="display:flex;justify-content:space-between;gap:.75rem;margin-bottom:.35rem">
        <span>Début</span>
        <strong>${parseISO(PROGRAM_START_ISO).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>
      </div>
      <p class="page-sub" style="margin:0">Jour 1 = Lundi du cycle · semaines en boucle</p>
    </div>

    <div class="section-label">Effectif par défaut</div>
    <div class="surface" style="margin-bottom:1rem">
      <p class="page-sub" style="margin:0">Chaque jour mémorise son propre effectif (+/−). Défaut : 2 adultes, 1 enfant 10 ans, 1 enfant 4 ans.</p>
    </div>

    <div class="section-label">Données</div>
    <button class="btn btn-orange btn-block" id="reset-all">Réinitialiser toutes les données</button>

    <div class="section-label">Principes</div>
    <ul class="future-list surface" style="padding:0">
      ${AMISSE.principles.map((p) => `<li>${p}</li>`).join('')}
    </ul>

    <p class="page-sub" style="margin-top:1.5rem;text-align:center">Meal Planner · Famille · Offline · PWA</p>
  `;
}

function bindSettings() {
  document.getElementById('theme-switch')?.addEventListener('click', async () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    await setSetting('theme', state.theme);
    applyTheme();
    renderShell();
    renderPage();
  });
  document.getElementById('reset-all')?.addEventListener('click', async () => {
    if (!confirm('Effacer toutes les données locales ?')) return;
    await resetAllData();
    await setSetting('theme', 'dark');
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
}

function setupPwa() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    showInstallBanner();
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
  const APP_VERSION = document.querySelector('meta[name="app-version"]')?.content || '16';
  try {
    const reg = await navigator.serviceWorker.register(`./sw.js?v=${APP_VERSION}`, {
      updateViaCache: 'none',
    });
    await reg.update();
    const askReload = (worker) => worker.postMessage('SKIP_WAITING');
    if (reg.waiting) askReload(reg.waiting);
    reg.addEventListener('updatefound', () => {
      const worker = reg.installing;
      if (!worker) return;
      worker.addEventListener('statechange', () => {
        if (worker.state === 'installed' && navigator.serviceWorker.controller) askReload(worker);
      });
    });
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      refreshing = true;
      toast('Mise à jour PWA appliquée');
      setTimeout(() => window.location.reload(), 400);
    });
    setInterval(() => reg.update().catch(() => {}), 60_000);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') reg.update().catch(() => {});
    });
  } catch (e) {
    console.warn('SW non enregistré', e);
  }
}

async function boot() {
  await initDB();
  state.theme = (await getSetting('theme')) || 'dark';
  applyTheme();
  renderShell();
  await renderPage();
  setupPwa();
  await registerSW();
}

boot();
