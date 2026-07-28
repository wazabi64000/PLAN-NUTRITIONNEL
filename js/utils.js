/**
 * Utilitaires cycle, dates, macros
 */
import { MENU_A, MENU_B, MEAL_TYPES } from './data/meals.js';

export const CYCLE_DAYS = 60;
export const WATER_TARGET_ML = 2500;

export function formatDateISO(d = new Date()) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  const y = x.getFullYear();
  const m = String(x.getMonth() + 1).padStart(2, '0');
  const day = String(x.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function parseISO(iso) {
  const day = String(iso).slice(0, 10);
  const [y, m, d] = day.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(iso, n) {
  const d = parseISO(iso);
  d.setDate(d.getDate() + n);
  return formatDateISO(d);
}

export function formatFR(iso) {
  return parseISO(iso).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

export function formatShort(iso) {
  return parseISO(iso).toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

/** Jour du cycle 1–60 (boucle) */
export function getCycleDay(cycleStartISO, dateISO = formatDateISO()) {
  const start = parseISO(cycleStartISO);
  const current = parseISO(dateISO);
  const diff = Math.floor((current - start) / 86400000);
  const day = ((diff % CYCLE_DAYS) + CYCLE_DAYS) % CYCLE_DAYS;
  return day + 1;
}

/** Semaine 1–8 */
export function getCycleWeek(cycleDay) {
  return Math.ceil(cycleDay / 7) || 1;
}

/** Menu A ou B selon jour du cycle */
export function getMenuPhase(cycleDay) {
  const block = Math.ceil(cycleDay / 15);
  return block % 2 === 1 ? 'A' : 'B';
}

export function getMenuDayIndex(cycleDay) {
  return ((cycleDay - 1) % 15);
}

export function getDayPlan(cycleDay, goal = 'seche') {
  const phase = getMenuPhase(cycleDay);
  const idx = getMenuDayIndex(cycleDay);
  const base = phase === 'A' ? MENU_A[idx] : MENU_B[idx];
  const scale = goal === 'masse' ? 1.2 : 1;

  function scaleMeal(m) {
    if (!m) return m;
    const ingredients = m.ingredients.map((ing) => {
      if (['feculents', 'fruits', 'graisses'].includes(ing.cat) || goal === 'masse') {
        if (goal === 'masse' && ['feculents', 'graisses', 'fruits'].includes(ing.cat)) {
          return { ...ing, qty: Math.round(ing.qty * scale * 10) / 10 };
        }
      }
      return { ...ing };
    });
    return {
      ...m,
      ingredients,
      calories: Math.round(m.calories * (goal === 'masse' ? 1.15 : 1)),
      carbs: Math.round(m.carbs * (goal === 'masse' ? 1.2 : 1)),
      protein: m.protein,
      fat: Math.round(m.fat * (goal === 'masse' ? 1.1 : 1)),
    };
  }

  return {
    cycleDay,
    phase,
    menuDay: idx + 1,
    breakfast: scaleMeal(base.breakfast),
    lunch: scaleMeal(base.lunch),
    snack: scaleMeal(base.snack),
    dinner: scaleMeal(base.dinner),
  };
}

export function dayTotals(plan) {
  const meals = [plan.breakfast, plan.lunch, plan.snack, plan.dinner];
  return meals.reduce(
    (acc, m) => ({
      calories: acc.calories + m.calories,
      protein: acc.protein + m.protein,
      fat: acc.fat + m.fat,
      carbs: acc.carbs + m.carbs,
    }),
    { calories: 0, protein: 0, fat: 0, carbs: 0 }
  );
}

export function remainingMeals(mealsDone) {
  return MEAL_TYPES.filter((t) => !mealsDone?.[t.id]).length;
}

export function isSunday(iso = formatDateISO()) {
  return parseISO(iso).getDay() === 0;
}

export function euro(n) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(n);
}

export { MEAL_TYPES };
