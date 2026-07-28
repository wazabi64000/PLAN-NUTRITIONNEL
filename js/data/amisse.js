/**
 * Section Amisse — famille 2 adultes + enfants 4 ans & 10 ans
 * Manger sainement · Halal · économique · IG modéré
 * Indépendant du programme sèche / prise de masse
 */

export const AMISSE = {
  name: 'Amisse',
  members: [
    { id: 'adulte1', label: 'Adulte 1', role: 'adulte', portion: 1 },
    { id: 'adulte2', label: 'Adulte 2', role: 'adulte', portion: 1 },
    { id: 'enfant10', label: 'Enfant 10 ans', role: 'enfant', age: 10, portion: 0.75 },
    { id: 'enfant4', label: 'Enfant 4 ans', role: 'enfant', age: 4, portion: 0.5 },
  ],
  principles: [
    'Halal · sans porc · sans alcool',
    'Repas familiaux partagés (même plat, portions adaptées)',
    'Protéines maigres · légumes · féculents IG modéré',
    'Exclus : skyr, avocat, brocoli',
    'Produits économiques Lidl / Aldi / Premier Prix',
    'Fromages légers prioritaires (top 10 kcal)',
    'Batch cooking le dimanche',
    'Effectif ajustable chaque jour (+/− adulte / enfant)',
  ],
};

/** Portions : adulte = 1 · enfant 10 ans = 0,75 · enfant 4 ans = 0,5 */
export const PORTION_ADULT = 1;
export const PORTION_CHILD10 = 0.75;
export const PORTION_CHILD4 = 0.5;
/** Base des recettes Amisse (2 adultes + 10 ans + 4 ans) */
export const AMISSE_BASE_COEFF = 2 * PORTION_ADULT + PORTION_CHILD10 + PORTION_CHILD4; // 3.25
export const SPORT_BASE_COEFF = 1;

export const DEFAULT_AMISSE_PEOPLE = { adults: 2, child10: 1, child4: 1 };
export const DEFAULT_SPORT_PEOPLE = { adults: 1, child10: 0, child4: 0 };

export function peopleCoeff(people = DEFAULT_AMISSE_PEOPLE) {
  const a = Math.max(0, Number(people.adults) || 0);
  const c10 = Math.max(0, Number(people.child10) || 0);
  const c4 = Math.max(0, Number(people.child4) || 0);
  return a * PORTION_ADULT + c10 * PORTION_CHILD10 + c4 * PORTION_CHILD4;
}

export function peopleCount(people = DEFAULT_AMISSE_PEOPLE) {
  return (
    Math.max(0, Number(people.adults) || 0) +
    Math.max(0, Number(people.child10) || 0) +
    Math.max(0, Number(people.child4) || 0)
  );
}

export function clampPeople(people) {
  let next = {
    adults: Math.max(0, Math.min(12, Number(people.adults) || 0)),
    child10: Math.max(0, Math.min(12, Number(people.child10) || 0)),
    child4: Math.max(0, Math.min(12, Number(people.child4) || 0)),
  };
  if (peopleCount(next) < 1) next.adults = 1;
  return next;
}

function roundQty(qty, unit = '') {
  const u = String(unit).toLowerCase();
  if (u.includes('boîte') || u.includes('unité') || u.includes('tête') || u.includes('c.à')) {
    return Math.max(1, Math.round(qty));
  }
  if (qty < 1) return Math.round(qty * 100) / 100;
  if (qty < 20) return Math.round(qty * 10) / 10;
  return Math.round(qty);
}

/** scaleFactor = coeffActuel / coeffBaseRecette */
export function scaleMeal(meal, scaleFactor) {
  const f = scaleFactor;
  return {
    ...meal,
    ingredients: meal.ingredients.map((ing) => ({
      ...ing,
      qty: roundQty(ing.qty * f, ing.unit),
    })),
    calories: Math.round(meal.calories * f),
    protein: Math.round(meal.protein * f),
    fat: Math.round(meal.fat * f),
    carbs: Math.round(meal.carbs * f),
  };
}

export function scalePlan(plan, people, baseCoeff = AMISSE_BASE_COEFF) {
  const coeff = peopleCoeff(people);
  const factor = baseCoeff > 0 ? coeff / baseCoeff : 1;
  return {
    ...plan,
    coeff,
    factor,
    breakfast: scaleMeal(plan.breakfast, factor),
    lunch: scaleMeal(plan.lunch, factor),
    snack: scaleMeal(plan.snack, factor),
    dinner: scaleMeal(plan.dinner, factor),
  };
}

function meal(name, ingredients, prepMin, macros) {
  return { name, ingredients, prepMin, ...macros };
}

/** Cycle 7 jours — portions famille (4 personnes, quantités totales casserole) */
export const AMISSE_WEEK = [
  {
    day: 1,
    label: 'Lundi',
    breakfast: meal('Œufs + pain complet + fruit', [
      { name: 'Œufs', qty: 6, unit: 'unités', cat: 'oeufs' },
      { name: 'Pain complet', qty: 200, unit: 'g', cat: 'feculents' },
      { name: 'Banane', qty: 2, unit: 'unités', cat: 'fruits' },
      { name: 'Pomme', qty: 2, unit: 'unités', cat: 'fruits' },
    ], 15, { calories: 1450, protein: 55, fat: 42, carbs: 180 }),
    lunch: meal('Poulet rôti + riz + haricots verts', [
      { name: 'Blanc de poulet', qty: 600, unit: 'g', cat: 'viandes' },
      { name: 'Riz basmati', qty: 300, unit: 'g', cat: 'feculents' },
      { name: 'Haricots verts', qty: 600, unit: 'g', cat: 'legumes' },
      { name: 'Huile d\'olive', qty: 20, unit: 'ml', cat: 'graisses' },
    ], 40, { calories: 2200, protein: 160, fat: 40, carbs: 220 }),
    snack: meal('Fromage blanc 0 % + fruits', [
      { name: 'Fromage blanc 0 %', qty: 500, unit: 'g', cat: 'laitiers' },
      { name: 'Pomme', qty: 2, unit: 'unités', cat: 'fruits' },
    ], 5, { calories: 405, protein: 40, fat: 2, carbs: 55 }),
    dinner: meal('Colin + pommes de terre + carottes', [
      { name: 'Colin', qty: 600, unit: 'g', cat: 'poissons' },
      { name: 'Pomme de terre', qty: 800, unit: 'g', cat: 'feculents' },
      { name: 'Carottes', qty: 400, unit: 'g', cat: 'legumes' },
      { name: 'Huile d\'olive', qty: 15, unit: 'ml', cat: 'graisses' },
    ], 35, { calories: 1800, protein: 130, fat: 30, carbs: 190 }),
  },
  {
    day: 2,
    label: 'Mardi',
    breakfast: meal('Flocons d\'avoine + fromage blanc + banane', [
      { name: 'Flocons d\'avoine', qty: 160, unit: 'g', cat: 'feculents' },
      { name: 'Fromage blanc 0 %', qty: 400, unit: 'g', cat: 'laitiers' },
      { name: 'Banane', qty: 3, unit: 'unités', cat: 'fruits' },
    ], 10, { calories: 1300, protein: 55, fat: 12, carbs: 210 }),
    lunch: meal('Dinde + lentilles + courgettes', [
      { name: 'Escalope de dinde', qty: 550, unit: 'g', cat: 'viandes' },
      { name: 'Lentilles', qty: 280, unit: 'g', cat: 'feculents' },
      { name: 'Courgettes', qty: 500, unit: 'g', cat: 'legumes' },
      { name: 'Huile d\'olive', qty: 15, unit: 'ml', cat: 'graisses' },
    ], 35, { calories: 2100, protein: 155, fat: 35, carbs: 200 }),
    snack: meal('Cancoillotte + pain complet', [
      { name: 'Cancoillotte', qty: 250, unit: 'g', cat: 'laitiers' },
      { name: 'Pain complet', qty: 120, unit: 'g', cat: 'feculents' },
    ], 5, { calories: 595, protein: 45, fat: 12, carbs: 70 }),
    dinner: meal('Omelette familiale + salade + tomates', [
      { name: 'Œufs', qty: 8, unit: 'unités', cat: 'oeufs' },
      { name: 'Salade', qty: 1, unit: 'unité', cat: 'legumes' },
      { name: 'Tomates', qty: 300, unit: 'g', cat: 'legumes' },
      { name: 'Pain complet', qty: 120, unit: 'g', cat: 'feculents' },
    ], 20, { calories: 1400, protein: 70, fat: 70, carbs: 80 }),
  },
  {
    day: 3,
    label: 'Mercredi',
    breakfast: meal('Œufs + avoine + pomme', [
      { name: 'Œufs', qty: 5, unit: 'unités', cat: 'oeufs' },
      { name: 'Flocons d\'avoine', qty: 120, unit: 'g', cat: 'feculents' },
      { name: 'Pomme', qty: 2, unit: 'unités', cat: 'fruits' },
    ], 12, { calories: 1200, protein: 50, fat: 35, carbs: 140 }),
    lunch: meal('Steak haché halal + riz + carottes', [
      { name: 'Steak haché halal 5 %', qty: 500, unit: 'g', cat: 'viandes' },
      { name: 'Riz basmati', qty: 280, unit: 'g', cat: 'feculents' },
      { name: 'Carottes', qty: 400, unit: 'g', cat: 'legumes' },
      { name: 'Oignons', qty: 150, unit: 'g', cat: 'epicerie' },
    ], 30, { calories: 2300, protein: 130, fat: 50, carbs: 240 }),
    snack: meal('Ricotta + fruits', [
      { name: 'Ricotta', qty: 320, unit: 'g', cat: 'laitiers' },
      { name: 'Pomme', qty: 2, unit: 'unités', cat: 'fruits' },
    ], 3, { calories: 717, protein: 35, fat: 42, carbs: 50 }),
    dinner: meal('Thon + pommes de terre + haricots verts', [
      { name: 'Thon (boîte)', qty: 3, unit: 'boîtes', cat: 'poissons' },
      { name: 'Pomme de terre', qty: 700, unit: 'g', cat: 'feculents' },
      { name: 'Haricots verts', qty: 500, unit: 'g', cat: 'legumes' },
      { name: 'Huile d\'olive', qty: 15, unit: 'ml', cat: 'graisses' },
    ], 25, { calories: 1700, protein: 110, fat: 35, carbs: 180 }),
  },
  {
    day: 4,
    label: 'Jeudi',
    breakfast: meal('Fromage blanc + avoine + fruits', [
      { name: 'Fromage blanc 0 %', qty: 500, unit: 'g', cat: 'laitiers' },
      { name: 'Flocons d\'avoine', qty: 140, unit: 'g', cat: 'feculents' },
      { name: 'Banane', qty: 2, unit: 'unités', cat: 'fruits' },
      { name: 'Pomme', qty: 1, unit: 'unité', cat: 'fruits' },
    ], 8, { calories: 1250, protein: 55, fat: 10, carbs: 200 }),
    lunch: meal('Poulet + quinoa-riz + épinards', [
      { name: 'Blanc de poulet', qty: 600, unit: 'g', cat: 'viandes' },
      { name: 'Riz basmati', qty: 280, unit: 'g', cat: 'feculents' },
      { name: 'Épinards', qty: 500, unit: 'g', cat: 'legumes' },
      { name: 'Huile d\'olive', qty: 15, unit: 'ml', cat: 'graisses' },
    ], 35, { calories: 2100, protein: 160, fat: 35, carbs: 200 }),
    snack: meal('Fromage frais + pain complet', [
      { name: 'Fromage frais', qty: 200, unit: 'g', cat: 'laitiers' },
      { name: 'Pain complet', qty: 120, unit: 'g', cat: 'feculents' },
    ], 5, { calories: 714, protein: 30, fat: 34, carbs: 70 }),
    dinner: meal('Maquereau + salade + riz', [
      { name: 'Maquereau (boîte)', qty: 3, unit: 'boîtes', cat: 'poissons' },
      { name: 'Salade', qty: 1, unit: 'unité', cat: 'legumes' },
      { name: 'Tomates', qty: 250, unit: 'g', cat: 'legumes' },
      { name: 'Riz basmati', qty: 150, unit: 'g', cat: 'feculents' },
    ], 20, { calories: 1600, protein: 95, fat: 70, carbs: 120 }),
  },
  {
    day: 5,
    label: 'Vendredi',
    breakfast: meal('Omelette + pain complet + orange', [
      { name: 'Œufs', qty: 6, unit: 'unités', cat: 'oeufs' },
      { name: 'Pain complet', qty: 180, unit: 'g', cat: 'feculents' },
      { name: 'Orange', qty: 2, unit: 'unités', cat: 'fruits' },
      { name: 'Tomates', qty: 150, unit: 'g', cat: 'legumes' },
    ], 15, { calories: 1300, protein: 55, fat: 40, carbs: 140 }),
    lunch: meal('Dinde + pommes de terre + légumes', [
      { name: 'Escalope de dinde', qty: 550, unit: 'g', cat: 'viandes' },
      { name: 'Pomme de terre', qty: 800, unit: 'g', cat: 'feculents' },
      { name: 'Courgettes', qty: 400, unit: 'g', cat: 'legumes' },
      { name: 'Carottes', qty: 300, unit: 'g', cat: 'legumes' },
    ], 40, { calories: 2000, protein: 145, fat: 25, carbs: 220 }),
    snack: meal('Chèvre frais + crudités', [
      { name: 'Fromage de chèvre frais', qty: 130, unit: 'g', cat: 'laitiers' },
      { name: 'Tomates', qty: 200, unit: 'g', cat: 'legumes' },
      { name: 'Carottes', qty: 150, unit: 'g', cat: 'legumes' },
    ], 5, { calories: 356, protein: 23, fat: 21, carbs: 20 }),
    dinner: meal('Soupe lentilles + œufs + salade', [
      { name: 'Lentilles', qty: 250, unit: 'g', cat: 'feculents' },
      { name: 'Œufs', qty: 4, unit: 'unités', cat: 'oeufs' },
      { name: 'Carottes', qty: 200, unit: 'g', cat: 'legumes' },
      { name: 'Oignons', qty: 100, unit: 'g', cat: 'epicerie' },
      { name: 'Salade', qty: 1, unit: 'unité', cat: 'legumes' },
    ], 35, { calories: 1500, protein: 80, fat: 30, carbs: 180 }),
  },
  {
    day: 6,
    label: 'Samedi',
    breakfast: meal('Pancakes avoine + fromage blanc + fruits', [
      { name: 'Flocons d\'avoine', qty: 200, unit: 'g', cat: 'feculents' },
      { name: 'Œufs', qty: 4, unit: 'unités', cat: 'oeufs' },
      { name: 'Fromage blanc 0 %', qty: 300, unit: 'g', cat: 'laitiers' },
      { name: 'Banane', qty: 2, unit: 'unités', cat: 'fruits' },
    ], 20, { calories: 1500, protein: 65, fat: 30, carbs: 210 }),
    lunch: meal('Poulet batch + riz + salade composée', [
      { name: 'Blanc de poulet', qty: 650, unit: 'g', cat: 'viandes' },
      { name: 'Riz basmati', qty: 300, unit: 'g', cat: 'feculents' },
      { name: 'Tomates', qty: 300, unit: 'g', cat: 'legumes' },
      { name: 'Salade', qty: 1, unit: 'unité', cat: 'legumes' },
      { name: 'Huile d\'olive', qty: 20, unit: 'ml', cat: 'graisses' },
    ], 30, { calories: 2300, protein: 170, fat: 45, carbs: 220 }),
    snack: meal('Fruits de saison', [
      { name: 'Pomme', qty: 2, unit: 'unités', cat: 'fruits' },
      { name: 'Orange', qty: 2, unit: 'unités', cat: 'fruits' },
    ], 2, { calories: 280, protein: 2, fat: 0, carbs: 70 }),
    dinner: meal('Pizza sarrasin · légumes + escalope + mozzarella', [
      { name: 'Farine de sarrasin', qty: 380, unit: 'g', cat: 'feculents' },
      { name: 'Escalope de dinde (ou 3 boîtes thon)', qty: 450, unit: 'g', cat: 'viandes' },
      { name: 'Mozzarella', qty: 120, unit: 'g', cat: 'laitiers' },
      { name: 'Tomates', qty: 400, unit: 'g', cat: 'legumes' },
      { name: 'Courgettes', qty: 300, unit: 'g', cat: 'legumes' },
      { name: 'Oignons', qty: 150, unit: 'g', cat: 'epicerie' },
      { name: 'Huile d\'olive', qty: 20, unit: 'ml', cat: 'graisses' },
      { name: 'Herbes de Provence', qty: 1, unit: 'c.à.c', cat: 'epicerie' },
    ], 45, { calories: 2500, protein: 192, fat: 68, carbs: 275 }),
  },
  {
    day: 7,
    label: 'Dimanche',
    breakfast: meal('Brunch œufs + pain + fruits', [
      { name: 'Œufs', qty: 8, unit: 'unités', cat: 'oeufs' },
      { name: 'Pain complet', qty: 220, unit: 'g', cat: 'feculents' },
      { name: 'Tomates', qty: 200, unit: 'g', cat: 'legumes' },
      { name: 'Pomme', qty: 2, unit: 'unités', cat: 'fruits' },
    ], 25, { calories: 1600, protein: 70, fat: 55, carbs: 160 }),
    lunch: meal('Rôti poulet familial + pommes de terre + légumes', [
      { name: 'Blanc de poulet', qty: 700, unit: 'g', cat: 'viandes' },
      { name: 'Pomme de terre', qty: 900, unit: 'g', cat: 'feculents' },
      { name: 'Carottes', qty: 400, unit: 'g', cat: 'legumes' },
      { name: 'Haricots verts', qty: 400, unit: 'g', cat: 'legumes' },
      { name: 'Huile d\'olive', qty: 20, unit: 'ml', cat: 'graisses' },
    ], 55, { calories: 2500, protein: 180, fat: 45, carbs: 250 }),
    snack: meal('Feta + salade tomates', [
      { name: 'Feta', qty: 100, unit: 'g', cat: 'laitiers' },
      { name: 'Tomates', qty: 250, unit: 'g', cat: 'legumes' },
      { name: 'Salade', qty: 1, unit: 'unité', cat: 'legumes' },
    ], 5, { calories: 334, protein: 16, fat: 22, carbs: 15 }),
    dinner: meal('Camembert + soupe légumes (quartier / pers.)', [
      { name: 'Camembert', qty: 100, unit: 'g', cat: 'laitiers' },
      { name: 'Carottes', qty: 300, unit: 'g', cat: 'legumes' },
      { name: 'Courgettes', qty: 300, unit: 'g', cat: 'legumes' },
      { name: 'Oignons', qty: 100, unit: 'g', cat: 'epicerie' },
      { name: 'Pain complet', qty: 100, unit: 'g', cat: 'feculents' },
    ], 30, { calories: 780, protein: 32, fat: 30, carbs: 90 }),
  },
];

/** Portions indicatives par membre (coeff. famille = 3,25 parts adultes) */
export const AMISSE_PORTIONS = [
  { member: 'Adulte 1 & 2', hint: 'Assiette complète (~1 part) · fromage : part adulte du top 10' },
  { member: 'Enfant 10 ans', hint: '≈ ¾ d’assiette · fromage ≈ ¾ part adulte' },
  { member: 'Enfant 4 ans', hint: '≈ ½ assiette · fromage ≈ ½ part · textures adaptées' },
];

/**
 * Courses semaine famille — recalculées (pizza + top fromages légers)
 */
export const AMISSE_SHOPPING_WEEK = [
  { id: 'a-poulet', name: 'Blanc de poulet (surgelé)', qty: 2.55, unit: 'kg', cat: 'viandes', priceKey: 'Blanc de poulet' },
  { id: 'a-dinde', name: 'Escalope de dinde (surgelé)', qty: 1.55, unit: 'kg', cat: 'viandes', priceKey: 'Escalope de dinde' },
  { id: 'a-steak', name: 'Steak haché halal 5 %', qty: 0.5, unit: 'kg', cat: 'viandes', priceKey: 'Steak haché halal 5 %' },
  { id: 'a-colin', name: 'Colin (surgelé)', qty: 0.6, unit: 'kg', cat: 'poissons', priceKey: 'Colin' },
  { id: 'a-thon', name: 'Thon (boîtes)', qty: 3, unit: 'boîtes', cat: 'conserves', priceKey: 'Thon (boîte)' },
  { id: 'a-thon-alt', name: 'Thon extra (si pizza sans escalope)', qty: 3, unit: 'boîtes', cat: 'conserves', priceKey: 'Thon (boîte)' },
  { id: 'a-maq', name: 'Maquereau (boîtes)', qty: 3, unit: 'boîtes', cat: 'conserves', priceKey: 'Maquereau (boîte)' },
  { id: 'a-fb', name: 'Fromage blanc 0 %', qty: 1.7, unit: 'kg', cat: 'laitiers', priceKey: 'Fromage blanc 0 %' },
  { id: 'a-canco', name: 'Cancoillotte', qty: 0.25, unit: 'kg', cat: 'laitiers', priceKey: 'Cancoillotte' },
  { id: 'a-ricotta', name: 'Ricotta', qty: 0.32, unit: 'kg', cat: 'laitiers', priceKey: 'Ricotta' },
  { id: 'a-ffrais', name: 'Fromage frais', qty: 0.2, unit: 'kg', cat: 'laitiers', priceKey: 'Fromage frais' },
  { id: 'a-chevre', name: 'Chèvre frais', qty: 0.13, unit: 'kg', cat: 'laitiers', priceKey: 'Fromage de chèvre frais' },
  { id: 'a-feta', name: 'Feta', qty: 0.1, unit: 'kg', cat: 'laitiers', priceKey: 'Feta' },
  { id: 'a-mozza', name: 'Mozzarella', qty: 0.12, unit: 'kg', cat: 'laitiers', priceKey: 'Mozzarella' },
  { id: 'a-cam', name: 'Camembert', qty: 0.1, unit: 'kg', cat: 'laitiers', priceKey: 'Camembert' },
  { id: 'a-oeufs', name: 'Œufs', qty: 46, unit: 'unités', cat: 'oeufs', priceKey: 'Œufs' },
  { id: 'a-riz', name: 'Riz basmati', qty: 1.31, unit: 'kg', cat: 'feculents', priceKey: 'Riz basmati' },
  { id: 'a-lent', name: 'Lentilles', qty: 0.53, unit: 'kg', cat: 'feculents', priceKey: 'Lentilles' },
  { id: 'a-pdt', name: 'Pommes de terre', qty: 2.4, unit: 'kg', cat: 'feculents', priceKey: 'Pomme de terre' },
  { id: 'a-avoine', name: 'Flocons d\'avoine', qty: 0.62, unit: 'kg', cat: 'feculents', priceKey: 'Flocons d\'avoine' },
  { id: 'a-sarrasin', name: 'Farine de sarrasin', qty: 0.4, unit: 'kg', cat: 'feculents', priceKey: 'Farine de sarrasin' },
  { id: 'a-pain', name: 'Pain complet', qty: 2, unit: 'unités', cat: 'feculents', priceKey: 'Pain complet' },
  { id: 'a-hv', name: 'Haricots verts (surgelés)', qty: 1.5, unit: 'kg', cat: 'legumes', priceKey: 'Haricots verts' },
  { id: 'a-courg', name: 'Courgettes', qty: 1.8, unit: 'kg', cat: 'legumes', priceKey: 'Courgettes' },
  { id: 'a-epi', name: 'Épinards (surgelés)', qty: 0.5, unit: 'kg', cat: 'legumes', priceKey: 'Épinards' },
  { id: 'a-car', name: 'Carottes', qty: 1.85, unit: 'kg', cat: 'legumes', priceKey: 'Carottes' },
  { id: 'a-tom', name: 'Tomates', qty: 2.3, unit: 'kg', cat: 'legumes', priceKey: 'Tomates' },
  { id: 'a-sal', name: 'Salades', qty: 5, unit: 'unités', cat: 'legumes', priceKey: 'Salade' },
  { id: 'a-pom', name: 'Pommes', qty: 13, unit: 'unités', cat: 'fruits', priceKey: 'Pomme' },
  { id: 'a-ban', name: 'Bananes', qty: 11, unit: 'unités', cat: 'fruits', priceKey: 'Banane' },
  { id: 'a-ora', name: 'Oranges', qty: 4, unit: 'unités', cat: 'fruits', priceKey: 'Orange' },
  { id: 'a-amd', name: 'Amandes', qty: 0.05, unit: 'kg', cat: 'graisses', priceKey: 'Amandes' },
  { id: 'a-huile', name: 'Huile d\'olive (quote-part)', qty: 0.28, unit: 'bouteille', cat: 'graisses', priceKey: 'Huile d\'olive' },
  { id: 'a-oignon', name: 'Oignons', qty: 0.65, unit: 'kg', cat: 'epicerie', priceKey: 'Oignons' },
];

export const AMISSE_BATCH = [
  {
    name: 'Poulet familial grillé',
    tips: '1,2–1,5 kg pour 2–3 repas · paprika + herbes · portionner.',
    timeMin: 50,
    savedMin: 70,
  },
  {
    name: 'Pâte pizza sarrasin',
    tips: '380 g farine + eau + 1 c.à.s huile. Étaler fine. Garnir légumes + escalope (ou thon) + 120 g mozzarella. Four 220 °C · 15–18 min.',
    timeMin: 45,
    savedMin: 30,
  },
  {
    name: 'Fromages légers portionnés',
    tips: 'Top 10 kcal : blanc 0 %, cancoillotte, ricotta, frais, chèvre, feta, camembert, coulommiers, mozzarella, Mont d\'Or. Barquettes famille / sport.',
    timeMin: 10,
    savedMin: 15,
  },
  {
    name: 'Riz + pommes de terre batch',
    tips: 'Cuisson dimanche · frigo 3–4 j · réchauffage enfants OK.',
    timeMin: 40,
    savedMin: 55,
  },
  {
    name: 'Légumes surgelés prêts',
    tips: 'Haricots verts, épinards, carottes · gain de temps + budget.',
    timeMin: 20,
    savedMin: 40,
  },
  {
    name: 'Fromage blanc + fruits coupés',
    tips: 'Collations enfants préparées en barquettes.',
    timeMin: 15,
    savedMin: 25,
  },
];

export function getAmisseDayIndex(date = new Date()) {
  // Lundi = 0 … Dimanche = 6
  const js = date.getDay();
  return js === 0 ? 6 : js - 1;
}

export function getAmisseDayPlan(date = new Date()) {
  return AMISSE_WEEK[getAmisseDayIndex(date)];
}

export function amisseDayTotals(plan) {
  return [plan.breakfast, plan.lunch, plan.snack, plan.dinner].reduce(
    (acc, m) => ({
      calories: acc.calories + m.calories,
      protein: acc.protein + m.protein,
      fat: acc.fat + m.fat,
      carbs: acc.carbs + m.carbs,
    }),
    { calories: 0, protein: 0, fat: 0, carbs: 0 }
  );
}
