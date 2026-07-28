/**
 * Menus A & B — 15 jours chacun, cycle 60 jours : A → B → A → B
 * Halal · économique · sèche / prise de masse
 * Exclus : skyr, avocat, brocoli
 */

export const MEAL_TYPES = [
  { id: 'breakfast', label: 'Petit-déjeuner', icon: 'sunrise' },
  { id: 'lunch', label: 'Déjeuner', icon: 'sun' },
  { id: 'snack', label: 'Collation', icon: 'apple' },
  { id: 'dinner', label: 'Dîner', icon: 'moon' },
];

/** Quantités de base (sèche). Prise de masse = ×1.2 sur féculents + collation. */
function meal(name, ingredients, prepMin, macros) {
  return {
    name,
    ingredients,
    prepMin,
    calories: macros.kcal,
    protein: macros.p,
    fat: macros.f,
    carbs: macros.c,
  };
}

/* ---------- MENU A (jours 1–15, 31–45) ---------- */
export const MENU_A = [
  {
    day: 1,
    breakfast: meal('3 œufs + flocons d\'avoine', [
      { name: 'Œufs', qty: 3, unit: 'unités', cat: 'oeufs' },
      { name: 'Flocons d\'avoine', qty: 60, unit: 'g', cat: 'feculents' },
    ], 10, { kcal: 420, p: 28, f: 18, c: 35 }),
    lunch: meal('Poulet + riz + haricots verts', [
      { name: 'Blanc de poulet', qty: 180, unit: 'g', cat: 'viandes' },
      { name: 'Riz basmati', qty: 80, unit: 'g', cat: 'feculents' },
      { name: 'Haricots verts', qty: 200, unit: 'g', cat: 'legumes' },
      { name: 'Huile d\'olive', qty: 5, unit: 'ml', cat: 'graisses' },
    ], 25, { kcal: 520, p: 48, f: 10, c: 55 }),
    snack: meal('Fromage blanc 0 % + pomme', [
      { name: 'Fromage blanc 0 %', qty: 200, unit: 'g', cat: 'laitiers' },
      { name: 'Pomme', qty: 1, unit: 'unité', cat: 'fruits' },
    ], 2, { kcal: 180, p: 18, f: 0, c: 25 }),
    dinner: meal('Colin + courgettes + lentilles', [
      { name: 'Colin', qty: 180, unit: 'g', cat: 'poissons' },
      { name: 'Courgettes', qty: 200, unit: 'g', cat: 'legumes' },
      { name: 'Lentilles', qty: 60, unit: 'g', cat: 'feculents' },
    ], 20, { kcal: 380, p: 42, f: 4, c: 40 }),
  },
  {
    day: 2,
    breakfast: meal('Fromage blanc 0 % + avoine + banane', [
      { name: 'Fromage blanc 0 %', qty: 200, unit: 'g', cat: 'laitiers' },
      { name: 'Flocons d\'avoine', qty: 40, unit: 'g', cat: 'feculents' },
      { name: 'Banane', qty: 1, unit: 'unité', cat: 'fruits' },
    ], 5, { kcal: 340, p: 22, f: 3, c: 55 }),
    lunch: meal('Dinde + riz + épinards', [
      { name: 'Escalope de dinde', qty: 180, unit: 'g', cat: 'viandes' },
      { name: 'Riz basmati', qty: 80, unit: 'g', cat: 'feculents' },
      { name: 'Épinards', qty: 200, unit: 'g', cat: 'legumes' },
      { name: 'Huile d\'olive', qty: 5, unit: 'ml', cat: 'graisses' },
    ], 25, { kcal: 500, p: 48, f: 9, c: 52 }),
    snack: meal('Graines de tournesol', [
      { name: 'Graines de tournesol', qty: 20, unit: 'g', cat: 'graisses' },
    ], 1, { kcal: 120, p: 4, f: 10, c: 2 }),
    dinner: meal('Omelette + salade', [
      { name: 'Œufs', qty: 3, unit: 'unités', cat: 'oeufs' },
      { name: 'Salade', qty: 100, unit: 'g', cat: 'legumes' },
      { name: 'Tomates', qty: 100, unit: 'g', cat: 'legumes' },
      { name: 'Huile d\'olive', qty: 5, unit: 'ml', cat: 'graisses' },
    ], 12, { kcal: 320, p: 22, f: 22, c: 6 }),
  },
  {
    day: 3,
    breakfast: meal('3 œufs + pain complet', [
      { name: 'Œufs', qty: 3, unit: 'unités', cat: 'oeufs' },
      { name: 'Pain complet', qty: 60, unit: 'g', cat: 'feculents' },
    ], 10, { kcal: 380, p: 26, f: 16, c: 28 }),
    lunch: meal('Steak haché halal 5 % + pomme de terre', [
      { name: 'Steak haché halal 5 %', qty: 150, unit: 'g', cat: 'viandes' },
      { name: 'Pomme de terre', qty: 200, unit: 'g', cat: 'feculents' },
      { name: 'Carottes', qty: 100, unit: 'g', cat: 'legumes' },
    ], 25, { kcal: 480, p: 35, f: 10, c: 55 }),
    snack: meal('Fromage blanc 0 %', [
      { name: 'Fromage blanc 0 %', qty: 200, unit: 'g', cat: 'laitiers' },
    ], 1, { kcal: 100, p: 16, f: 0, c: 8 }),
    dinner: meal('Sardines + salade', [
      { name: 'Sardines (boîte)', qty: 1, unit: 'boîte', cat: 'poissons' },
      { name: 'Salade', qty: 120, unit: 'g', cat: 'legumes' },
      { name: 'Tomates', qty: 100, unit: 'g', cat: 'legumes' },
    ], 8, { kcal: 280, p: 24, f: 16, c: 6 }),
  },
  {
    day: 4,
    breakfast: meal('Fromage blanc 0 % + avoine', [
      { name: 'Fromage blanc 0 %', qty: 200, unit: 'g', cat: 'laitiers' },
      { name: 'Flocons d\'avoine', qty: 50, unit: 'g', cat: 'feculents' },
    ], 5, { kcal: 280, p: 22, f: 3, c: 38 }),
    lunch: meal('Poulet + lentilles + carottes', [
      { name: 'Blanc de poulet', qty: 180, unit: 'g', cat: 'viandes' },
      { name: 'Lentilles', qty: 80, unit: 'g', cat: 'feculents' },
      { name: 'Carottes', qty: 150, unit: 'g', cat: 'legumes' },
      { name: 'Huile d\'olive', qty: 5, unit: 'ml', cat: 'graisses' },
    ], 30, { kcal: 510, p: 50, f: 9, c: 48 }),
    snack: meal('Banane', [
      { name: 'Banane', qty: 1, unit: 'unité', cat: 'fruits' },
    ], 1, { kcal: 90, p: 1, f: 0, c: 23 }),
    dinner: meal('Colin + épinards', [
      { name: 'Colin', qty: 180, unit: 'g', cat: 'poissons' },
      { name: 'Épinards', qty: 250, unit: 'g', cat: 'legumes' },
      { name: 'Huile d\'olive', qty: 5, unit: 'ml', cat: 'graisses' },
    ], 18, { kcal: 260, p: 38, f: 8, c: 6 }),
  },
  {
    day: 5,
    breakfast: meal('Omelette + pain complet', [
      { name: 'Œufs', qty: 3, unit: 'unités', cat: 'oeufs' },
      { name: 'Pain complet', qty: 50, unit: 'g', cat: 'feculents' },
      { name: 'Tomates', qty: 50, unit: 'g', cat: 'legumes' },
    ], 12, { kcal: 360, p: 25, f: 16, c: 24 }),
    lunch: meal('Dinde + riz + courgettes', [
      { name: 'Escalope de dinde', qty: 180, unit: 'g', cat: 'viandes' },
      { name: 'Riz basmati', qty: 80, unit: 'g', cat: 'feculents' },
      { name: 'Courgettes', qty: 200, unit: 'g', cat: 'legumes' },
    ], 25, { kcal: 470, p: 46, f: 6, c: 52 }),
    snack: meal('Pomme', [
      { name: 'Pomme', qty: 1, unit: 'unité', cat: 'fruits' },
    ], 1, { kcal: 80, p: 0, f: 0, c: 20 }),
    dinner: meal('Thon + salade', [
      { name: 'Thon (boîte)', qty: 1, unit: 'boîte', cat: 'poissons' },
      { name: 'Salade', qty: 120, unit: 'g', cat: 'legumes' },
      { name: 'Huile d\'olive', qty: 5, unit: 'ml', cat: 'graisses' },
    ], 5, { kcal: 240, p: 28, f: 10, c: 4 }),
  },
  {
    day: 6,
    breakfast: meal('Fromage blanc 0 % + avoine', [
      { name: 'Fromage blanc 0 %', qty: 200, unit: 'g', cat: 'laitiers' },
      { name: 'Flocons d\'avoine', qty: 50, unit: 'g', cat: 'feculents' },
    ], 5, { kcal: 280, p: 22, f: 3, c: 38 }),
    lunch: meal('Poulet + pomme de terre', [
      { name: 'Blanc de poulet', qty: 180, unit: 'g', cat: 'viandes' },
      { name: 'Pomme de terre', qty: 250, unit: 'g', cat: 'feculents' },
      { name: 'Haricots verts', qty: 150, unit: 'g', cat: 'legumes' },
    ], 30, { kcal: 490, p: 46, f: 5, c: 58 }),
    snack: meal('Graines de tournesol', [
      { name: 'Graines de tournesol', qty: 20, unit: 'g', cat: 'graisses' },
    ], 1, { kcal: 120, p: 4, f: 10, c: 2 }),
    dinner: meal('Omelette + haricots verts', [
      { name: 'Œufs', qty: 3, unit: 'unités', cat: 'oeufs' },
      { name: 'Haricots verts', qty: 200, unit: 'g', cat: 'legumes' },
    ], 15, { kcal: 300, p: 24, f: 16, c: 12 }),
  },
  {
    day: 7,
    breakfast: meal('3 œufs', [
      { name: 'Œufs', qty: 3, unit: 'unités', cat: 'oeufs' },
    ], 8, { kcal: 220, p: 19, f: 15, c: 1 }),
    lunch: meal('Poulet rôti + riz + légumes', [
      { name: 'Blanc de poulet', qty: 200, unit: 'g', cat: 'viandes' },
      { name: 'Riz basmati', qty: 80, unit: 'g', cat: 'feculents' },
      { name: 'Carottes', qty: 100, unit: 'g', cat: 'legumes' },
      { name: 'Courgettes', qty: 100, unit: 'g', cat: 'legumes' },
      { name: 'Huile d\'olive', qty: 5, unit: 'ml', cat: 'graisses' },
    ], 40, { kcal: 540, p: 52, f: 10, c: 55 }),
    snack: meal('Fromage blanc 0 %', [
      { name: 'Fromage blanc 0 %', qty: 200, unit: 'g', cat: 'laitiers' },
    ], 1, { kcal: 100, p: 16, f: 0, c: 8 }),
    dinner: meal('Colin + salade', [
      { name: 'Colin', qty: 180, unit: 'g', cat: 'poissons' },
      { name: 'Salade', qty: 120, unit: 'g', cat: 'legumes' },
      { name: 'Tomates', qty: 80, unit: 'g', cat: 'legumes' },
    ], 15, { kcal: 230, p: 36, f: 4, c: 6 }),
  },
  {
    day: 8,
    breakfast: meal('Fromage blanc 0 % + flocons d\'avoine', [
      { name: 'Fromage blanc 0 %', qty: 200, unit: 'g', cat: 'laitiers' },
      { name: 'Flocons d\'avoine', qty: 50, unit: 'g', cat: 'feculents' },
    ], 5, { kcal: 280, p: 22, f: 3, c: 38 }),
    lunch: meal('Dinde + riz + haricots verts', [
      { name: 'Escalope de dinde', qty: 180, unit: 'g', cat: 'viandes' },
      { name: 'Riz basmati', qty: 70, unit: 'g', cat: 'feculents' },
      { name: 'Haricots verts', qty: 200, unit: 'g', cat: 'legumes' },
    ], 25, { kcal: 480, p: 48, f: 8, c: 45 }),
    snack: meal('Orange', [
      { name: 'Orange', qty: 1, unit: 'unité', cat: 'fruits' },
    ], 1, { kcal: 60, p: 1, f: 0, c: 15 }),
    dinner: meal('Sardines + légumes', [
      { name: 'Sardines (boîte)', qty: 1, unit: 'boîte', cat: 'poissons' },
      { name: 'Courgettes', qty: 150, unit: 'g', cat: 'legumes' },
      { name: 'Tomates', qty: 100, unit: 'g', cat: 'legumes' },
    ], 12, { kcal: 320, p: 26, f: 20, c: 8 }),
  },
  {
    day: 9,
    breakfast: meal('3 œufs + pain complet', [
      { name: 'Œufs', qty: 3, unit: 'unités', cat: 'oeufs' },
      { name: 'Pain complet', qty: 60, unit: 'g', cat: 'feculents' },
    ], 10, { kcal: 380, p: 26, f: 16, c: 28 }),
    lunch: meal('Poulet + riz + épinards', [
      { name: 'Blanc de poulet', qty: 180, unit: 'g', cat: 'viandes' },
      { name: 'Riz basmati', qty: 80, unit: 'g', cat: 'feculents' },
      { name: 'Épinards', qty: 200, unit: 'g', cat: 'legumes' },
    ], 25, { kcal: 490, p: 48, f: 6, c: 52 }),
    snack: meal('Fromage blanc 0 %', [
      { name: 'Fromage blanc 0 %', qty: 200, unit: 'g', cat: 'laitiers' },
    ], 1, { kcal: 100, p: 16, f: 0, c: 8 }),
    dinner: meal('Omelette + tomates', [
      { name: 'Œufs', qty: 3, unit: 'unités', cat: 'oeufs' },
      { name: 'Tomates', qty: 150, unit: 'g', cat: 'legumes' },
    ], 12, { kcal: 260, p: 20, f: 16, c: 8 }),
  },
  {
    day: 10,
    breakfast: meal('Fromage blanc 0 % + banane', [
      { name: 'Fromage blanc 0 %', qty: 200, unit: 'g', cat: 'laitiers' },
      { name: 'Banane', qty: 1, unit: 'unité', cat: 'fruits' },
    ], 3, { kcal: 200, p: 17, f: 0, c: 32 }),
    lunch: meal('Steak haché halal + lentilles', [
      { name: 'Steak haché halal 5 %', qty: 150, unit: 'g', cat: 'viandes' },
      { name: 'Lentilles', qty: 80, unit: 'g', cat: 'feculents' },
      { name: 'Carottes', qty: 100, unit: 'g', cat: 'legumes' },
    ], 30, { kcal: 500, p: 40, f: 10, c: 50 }),
    snack: meal('Graines de tournesol', [
      { name: 'Graines de tournesol', qty: 20, unit: 'g', cat: 'graisses' },
    ], 1, { kcal: 120, p: 4, f: 10, c: 2 }),
    dinner: meal('Thon + courgettes', [
      { name: 'Thon (boîte)', qty: 1, unit: 'boîte', cat: 'poissons' },
      { name: 'Courgettes', qty: 250, unit: 'g', cat: 'legumes' },
      { name: 'Huile d\'olive', qty: 5, unit: 'ml', cat: 'graisses' },
    ], 15, { kcal: 250, p: 28, f: 10, c: 8 }),
  },
  {
    day: 11,
    breakfast: meal('Omelette + avoine', [
      { name: 'Œufs', qty: 3, unit: 'unités', cat: 'oeufs' },
      { name: 'Flocons d\'avoine', qty: 40, unit: 'g', cat: 'feculents' },
    ], 12, { kcal: 360, p: 25, f: 16, c: 28 }),
    lunch: meal('Poulet + pomme de terre + haricots verts', [
      { name: 'Blanc de poulet', qty: 180, unit: 'g', cat: 'viandes' },
      { name: 'Pomme de terre', qty: 200, unit: 'g', cat: 'feculents' },
      { name: 'Haricots verts', qty: 200, unit: 'g', cat: 'legumes' },
    ], 30, { kcal: 470, p: 46, f: 5, c: 52 }),
    snack: meal('Pomme', [
      { name: 'Pomme', qty: 1, unit: 'unité', cat: 'fruits' },
    ], 1, { kcal: 80, p: 0, f: 0, c: 20 }),
    dinner: meal('Colin + salade', [
      { name: 'Colin', qty: 180, unit: 'g', cat: 'poissons' },
      { name: 'Salade', qty: 120, unit: 'g', cat: 'legumes' },
    ], 15, { kcal: 220, p: 36, f: 3, c: 4 }),
  },
  {
    day: 12,
    breakfast: meal('Fromage blanc 0 % + avoine', [
      { name: 'Fromage blanc 0 %', qty: 200, unit: 'g', cat: 'laitiers' },
      { name: 'Flocons d\'avoine', qty: 50, unit: 'g', cat: 'feculents' },
    ], 5, { kcal: 280, p: 22, f: 3, c: 38 }),
    lunch: meal('Dinde + riz + carottes', [
      { name: 'Escalope de dinde', qty: 180, unit: 'g', cat: 'viandes' },
      { name: 'Riz basmati', qty: 80, unit: 'g', cat: 'feculents' },
      { name: 'Carottes', qty: 150, unit: 'g', cat: 'legumes' },
    ], 25, { kcal: 480, p: 46, f: 6, c: 55 }),
    snack: meal('Banane', [
      { name: 'Banane', qty: 1, unit: 'unité', cat: 'fruits' },
    ], 1, { kcal: 90, p: 1, f: 0, c: 23 }),
    dinner: meal('Sardines + haricots verts', [
      { name: 'Sardines (boîte)', qty: 1, unit: 'boîte', cat: 'poissons' },
      { name: 'Haricots verts', qty: 200, unit: 'g', cat: 'legumes' },
    ], 12, { kcal: 290, p: 26, f: 16, c: 10 }),
  },
  {
    day: 13,
    breakfast: meal('3 œufs', [
      { name: 'Œufs', qty: 3, unit: 'unités', cat: 'oeufs' },
    ], 8, { kcal: 220, p: 19, f: 15, c: 1 }),
    lunch: meal('Poulet + riz + légumes', [
      { name: 'Blanc de poulet', qty: 180, unit: 'g', cat: 'viandes' },
      { name: 'Riz basmati', qty: 70, unit: 'g', cat: 'feculents' },
      { name: 'Courgettes', qty: 100, unit: 'g', cat: 'legumes' },
      { name: 'Carottes', qty: 100, unit: 'g', cat: 'legumes' },
    ], 30, { kcal: 490, p: 48, f: 8, c: 42 }),
    snack: meal('Fromage blanc 0 %', [
      { name: 'Fromage blanc 0 %', qty: 200, unit: 'g', cat: 'laitiers' },
    ], 1, { kcal: 100, p: 16, f: 0, c: 8 }),
    dinner: meal('Omelette + salade', [
      { name: 'Œufs', qty: 3, unit: 'unités', cat: 'oeufs' },
      { name: 'Salade', qty: 120, unit: 'g', cat: 'legumes' },
      { name: 'Huile d\'olive', qty: 5, unit: 'ml', cat: 'graisses' },
    ], 12, { kcal: 300, p: 22, f: 20, c: 4 }),
  },
  {
    day: 14,
    breakfast: meal('Fromage blanc 0 % + avoine', [
      { name: 'Fromage blanc 0 %', qty: 200, unit: 'g', cat: 'laitiers' },
      { name: 'Flocons d\'avoine', qty: 50, unit: 'g', cat: 'feculents' },
    ], 5, { kcal: 280, p: 22, f: 3, c: 38 }),
    lunch: meal('Steak haché halal + riz', [
      { name: 'Steak haché halal 5 %', qty: 150, unit: 'g', cat: 'viandes' },
      { name: 'Riz basmati', qty: 80, unit: 'g', cat: 'feculents' },
      { name: 'Tomates', qty: 100, unit: 'g', cat: 'legumes' },
    ], 25, { kcal: 500, p: 36, f: 10, c: 55 }),
    snack: meal('Orange', [
      { name: 'Orange', qty: 1, unit: 'unité', cat: 'fruits' },
    ], 1, { kcal: 60, p: 1, f: 0, c: 15 }),
    dinner: meal('Colin + courgettes', [
      { name: 'Colin', qty: 180, unit: 'g', cat: 'poissons' },
      { name: 'Courgettes', qty: 250, unit: 'g', cat: 'legumes' },
    ], 18, { kcal: 230, p: 36, f: 3, c: 8 }),
  },
  {
    day: 15,
    breakfast: meal('Omelette + pain complet', [
      { name: 'Œufs', qty: 3, unit: 'unités', cat: 'oeufs' },
      { name: 'Pain complet', qty: 60, unit: 'g', cat: 'feculents' },
    ], 12, { kcal: 380, p: 26, f: 16, c: 28 }),
    lunch: meal('Poulet + lentilles + haricots verts', [
      { name: 'Blanc de poulet', qty: 180, unit: 'g', cat: 'viandes' },
      { name: 'Lentilles', qty: 80, unit: 'g', cat: 'feculents' },
      { name: 'Haricots verts', qty: 200, unit: 'g', cat: 'legumes' },
    ], 30, { kcal: 500, p: 50, f: 6, c: 48 }),
    snack: meal('Graines de tournesol', [
      { name: 'Graines de tournesol', qty: 20, unit: 'g', cat: 'graisses' },
    ], 1, { kcal: 120, p: 4, f: 10, c: 2 }),
    dinner: meal('Thon + salade', [
      { name: 'Thon (boîte)', qty: 1, unit: 'boîte', cat: 'poissons' },
      { name: 'Salade', qty: 120, unit: 'g', cat: 'legumes' },
      { name: 'Huile d\'olive', qty: 5, unit: 'ml', cat: 'graisses' },
    ], 5, { kcal: 240, p: 28, f: 10, c: 4 }),
  },
];

/* ---------- MENU B (jours 16–30, 46–60) — variation ---------- */
export const MENU_B = [
  {
    day: 1,
    breakfast: meal('Fromage blanc 0 % + avoine + pomme', [
      { name: 'Fromage blanc 0 %', qty: 200, unit: 'g', cat: 'laitiers' },
      { name: 'Flocons d\'avoine', qty: 50, unit: 'g', cat: 'feculents' },
      { name: 'Pomme', qty: 1, unit: 'unité', cat: 'fruits' },
    ], 5, { kcal: 360, p: 22, f: 3, c: 58 }),
    lunch: meal('Dinde + pomme de terre + courgettes', [
      { name: 'Escalope de dinde', qty: 180, unit: 'g', cat: 'viandes' },
      { name: 'Pomme de terre', qty: 200, unit: 'g', cat: 'feculents' },
      { name: 'Courgettes', qty: 200, unit: 'g', cat: 'legumes' },
    ], 30, { kcal: 460, p: 46, f: 5, c: 50 }),
    snack: meal('Graines de tournesol', [
      { name: 'Graines de tournesol', qty: 20, unit: 'g', cat: 'graisses' },
    ], 1, { kcal: 130, p: 3, f: 13, c: 2 }),
    dinner: meal('Colin + riz + épinards', [
      { name: 'Colin', qty: 180, unit: 'g', cat: 'poissons' },
      { name: 'Riz basmati', qty: 60, unit: 'g', cat: 'feculents' },
      { name: 'Épinards', qty: 200, unit: 'g', cat: 'legumes' },
    ], 20, { kcal: 380, p: 40, f: 4, c: 42 }),
  },
  {
    day: 2,
    breakfast: meal('3 œufs + pain complet', [
      { name: 'Œufs', qty: 3, unit: 'unités', cat: 'oeufs' },
      { name: 'Pain complet', qty: 60, unit: 'g', cat: 'feculents' },
    ], 10, { kcal: 380, p: 26, f: 16, c: 28 }),
    lunch: meal('Poulet + riz + carottes', [
      { name: 'Blanc de poulet', qty: 180, unit: 'g', cat: 'viandes' },
      { name: 'Riz basmati', qty: 70, unit: 'g', cat: 'feculents' },
      { name: 'Carottes', qty: 150, unit: 'g', cat: 'legumes' },
    ], 25, { kcal: 480, p: 48, f: 8, c: 42 }),
    snack: meal('Fromage blanc 0 %', [
      { name: 'Fromage blanc 0 %', qty: 200, unit: 'g', cat: 'laitiers' },
    ], 1, { kcal: 100, p: 16, f: 0, c: 8 }),
    dinner: meal('Sardines + salade + tomates', [
      { name: 'Sardines (boîte)', qty: 1, unit: 'boîte', cat: 'poissons' },
      { name: 'Salade', qty: 120, unit: 'g', cat: 'legumes' },
      { name: 'Tomates', qty: 100, unit: 'g', cat: 'legumes' },
    ], 8, { kcal: 280, p: 24, f: 16, c: 6 }),
  },
  {
    day: 3,
    breakfast: meal('Omelette + avoine', [
      { name: 'Œufs', qty: 3, unit: 'unités', cat: 'oeufs' },
      { name: 'Flocons d\'avoine', qty: 40, unit: 'g', cat: 'feculents' },
    ], 12, { kcal: 360, p: 25, f: 16, c: 28 }),
    lunch: meal('Steak haché halal + riz + haricots verts', [
      { name: 'Steak haché belal 5 %', qty: 150, unit: 'g', cat: 'viandes' },
      { name: 'Riz basmati', qty: 80, unit: 'g', cat: 'feculents' },
      { name: 'Haricots verts', qty: 200, unit: 'g', cat: 'legumes' },
    ], 25, { kcal: 510, p: 36, f: 10, c: 55 }),
    snack: meal('Banane', [
      { name: 'Banane', qty: 1, unit: 'unité', cat: 'fruits' },
    ], 1, { kcal: 90, p: 1, f: 0, c: 23 }),
    dinner: meal('Thon + courgettes', [
      { name: 'Thon (boîte)', qty: 1, unit: 'boîte', cat: 'poissons' },
      { name: 'Courgettes', qty: 250, unit: 'g', cat: 'legumes' },
    ], 15, { kcal: 230, p: 28, f: 8, c: 8 }),
  },
  {
    day: 4,
    breakfast: meal('Fromage blanc 0 % + banane', [
      { name: 'Fromage blanc 0 %', qty: 200, unit: 'g', cat: 'laitiers' },
      { name: 'Banane', qty: 1, unit: 'unité', cat: 'fruits' },
    ], 3, { kcal: 200, p: 17, f: 0, c: 32 }),
    lunch: meal('Poulet + lentilles + épinards', [
      { name: 'Blanc de poulet', qty: 180, unit: 'g', cat: 'viandes' },
      { name: 'Lentilles', qty: 80, unit: 'g', cat: 'feculents' },
      { name: 'Épinards', qty: 200, unit: 'g', cat: 'legumes' },
    ], 30, { kcal: 490, p: 50, f: 6, c: 45 }),
    snack: meal('Graines de tournesol', [
      { name: 'Graines de tournesol', qty: 20, unit: 'g', cat: 'graisses' },
    ], 1, { kcal: 120, p: 4, f: 10, c: 2 }),
    dinner: meal('Omelette + haricots verts', [
      { name: 'Œufs', qty: 3, unit: 'unités', cat: 'oeufs' },
      { name: 'Haricots verts', qty: 200, unit: 'g', cat: 'legumes' },
    ], 15, { kcal: 300, p: 24, f: 16, c: 12 }),
  },
  {
    day: 5,
    breakfast: meal('3 œufs + flocons d\'avoine', [
      { name: 'Œufs', qty: 3, unit: 'unités', cat: 'oeufs' },
      { name: 'Flocons d\'avoine', qty: 60, unit: 'g', cat: 'feculents' },
    ], 10, { kcal: 420, p: 28, f: 18, c: 35 }),
    lunch: meal('Dinde + riz + tomates', [
      { name: 'Escalope de dinde', qty: 180, unit: 'g', cat: 'viandes' },
      { name: 'Riz basmati', qty: 80, unit: 'g', cat: 'feculents' },
      { name: 'Tomates', qty: 150, unit: 'g', cat: 'legumes' },
    ], 25, { kcal: 470, p: 46, f: 6, c: 52 }),
    snack: meal('Orange', [
      { name: 'Orange', qty: 1, unit: 'unité', cat: 'fruits' },
    ], 1, { kcal: 60, p: 1, f: 0, c: 15 }),
    dinner: meal('Sardines + salade', [
      { name: 'Sardines (boîte)', qty: 1, unit: 'boîte', cat: 'poissons' },
      { name: 'Salade', qty: 120, unit: 'g', cat: 'legumes' },
      { name: 'Huile d\'olive', qty: 5, unit: 'ml', cat: 'graisses' },
    ], 8, { kcal: 310, p: 26, f: 22, c: 4 }),
  },
  {
    day: 6,
    breakfast: meal('Fromage blanc 0 % + avoine', [
      { name: 'Fromage blanc 0 %', qty: 200, unit: 'g', cat: 'laitiers' },
      { name: 'Flocons d\'avoine', qty: 50, unit: 'g', cat: 'feculents' },
    ], 5, { kcal: 280, p: 22, f: 3, c: 38 }),
    lunch: meal('Poulet + pomme de terre + carottes', [
      { name: 'Blanc de poulet', qty: 180, unit: 'g', cat: 'viandes' },
      { name: 'Pomme de terre', qty: 250, unit: 'g', cat: 'feculents' },
      { name: 'Carottes', qty: 100, unit: 'g', cat: 'legumes' },
    ], 30, { kcal: 480, p: 46, f: 5, c: 58 }),
    snack: meal('Pomme', [
      { name: 'Pomme', qty: 1, unit: 'unité', cat: 'fruits' },
    ], 1, { kcal: 80, p: 0, f: 0, c: 20 }),
    dinner: meal('Colin + lentilles', [
      { name: 'Colin', qty: 180, unit: 'g', cat: 'poissons' },
      { name: 'Lentilles', qty: 60, unit: 'g', cat: 'feculents' },
      { name: 'Courgettes', qty: 150, unit: 'g', cat: 'legumes' },
    ], 25, { kcal: 370, p: 42, f: 4, c: 40 }),
  },
  {
    day: 7,
    breakfast: meal('Omelette + pain complet', [
      { name: 'Œufs', qty: 3, unit: 'unités', cat: 'oeufs' },
      { name: 'Pain complet', qty: 50, unit: 'g', cat: 'feculents' },
    ], 12, { kcal: 350, p: 25, f: 16, c: 24 }),
    lunch: meal('Poulet rôti + riz + légumes', [
      { name: 'Blanc de poulet', qty: 200, unit: 'g', cat: 'viandes' },
      { name: 'Riz basmati', qty: 70, unit: 'g', cat: 'feculents' },
      { name: 'Haricots verts', qty: 150, unit: 'g', cat: 'legumes' },
      { name: 'Huile d\'olive', qty: 5, unit: 'ml', cat: 'graisses' },
    ], 40, { kcal: 530, p: 54, f: 10, c: 40 }),
    snack: meal('Fromage blanc 0 %', [
      { name: 'Fromage blanc 0 %', qty: 200, unit: 'g', cat: 'laitiers' },
    ], 1, { kcal: 100, p: 16, f: 0, c: 8 }),
    dinner: meal('Thon + salade', [
      { name: 'Thon (boîte)', qty: 1, unit: 'boîte', cat: 'poissons' },
      { name: 'Salade', qty: 120, unit: 'g', cat: 'legumes' },
      { name: 'Tomates', qty: 80, unit: 'g', cat: 'legumes' },
    ], 5, { kcal: 230, p: 28, f: 8, c: 6 }),
  },
  {
    day: 8,
    breakfast: meal('Fromage blanc 0 % + flocons d\'avoine', [
      { name: 'Fromage blanc 0 %', qty: 200, unit: 'g', cat: 'laitiers' },
      { name: 'Flocons d\'avoine', qty: 50, unit: 'g', cat: 'feculents' },
    ], 5, { kcal: 280, p: 22, f: 3, c: 38 }),
    lunch: meal('Dinde + riz + épinards', [
      { name: 'Escalope de dinde', qty: 180, unit: 'g', cat: 'viandes' },
      { name: 'Riz basmati', qty: 80, unit: 'g', cat: 'feculents' },
      { name: 'Épinards', qty: 200, unit: 'g', cat: 'legumes' },
    ], 25, { kcal: 480, p: 48, f: 6, c: 52 }),
    snack: meal('Graines de tournesol', [
      { name: 'Graines de tournesol', qty: 20, unit: 'g', cat: 'graisses' },
    ], 1, { kcal: 130, p: 3, f: 13, c: 2 }),
    dinner: meal('Sardines + courgettes', [
      { name: 'Sardines (boîte)', qty: 1, unit: 'boîte', cat: 'poissons' },
      { name: 'Courgettes', qty: 250, unit: 'g', cat: 'legumes' },
    ], 12, { kcal: 280, p: 24, f: 16, c: 8 }),
  },
  {
    day: 9,
    breakfast: meal('3 œufs', [
      { name: 'Œufs', qty: 3, unit: 'unités', cat: 'oeufs' },
    ], 8, { kcal: 220, p: 19, f: 15, c: 1 }),
    lunch: meal('Steak haché halal + pomme de terre', [
      { name: 'Steak haché halal 5 %', qty: 150, unit: 'g', cat: 'viandes' },
      { name: 'Pomme de terre', qty: 220, unit: 'g', cat: 'feculents' },
      { name: 'Haricots verts', qty: 150, unit: 'g', cat: 'legumes' },
    ], 25, { kcal: 490, p: 35, f: 10, c: 55 }),
    snack: meal('Banane', [
      { name: 'Banane', qty: 1, unit: 'unité', cat: 'fruits' },
    ], 1, { kcal: 90, p: 1, f: 0, c: 23 }),
    dinner: meal('Colin + salade', [
      { name: 'Colin', qty: 180, unit: 'g', cat: 'poissons' },
      { name: 'Salade', qty: 120, unit: 'g', cat: 'legumes' },
      { name: 'Huile d\'olive', qty: 5, unit: 'ml', cat: 'graisses' },
    ], 15, { kcal: 250, p: 36, f: 7, c: 4 }),
  },
  {
    day: 10,
    breakfast: meal('Fromage blanc 0 % + pomme', [
      { name: 'Fromage blanc 0 %', qty: 200, unit: 'g', cat: 'laitiers' },
      { name: 'Pomme', qty: 1, unit: 'unité', cat: 'fruits' },
    ], 2, { kcal: 180, p: 16, f: 0, c: 28 }),
    lunch: meal('Poulet + riz + haricots verts', [
      { name: 'Blanc de poulet', qty: 180, unit: 'g', cat: 'viandes' },
      { name: 'Riz basmati', qty: 80, unit: 'g', cat: 'feculents' },
      { name: 'Haricots verts', qty: 200, unit: 'g', cat: 'legumes' },
    ], 25, { kcal: 500, p: 48, f: 6, c: 55 }),
    snack: meal('Graines de tournesol', [
      { name: 'Graines de tournesol', qty: 20, unit: 'g', cat: 'graisses' },
    ], 1, { kcal: 120, p: 4, f: 10, c: 2 }),
    dinner: meal('Omelette + tomates', [
      { name: 'Œufs', qty: 3, unit: 'unités', cat: 'oeufs' },
      { name: 'Tomates', qty: 150, unit: 'g', cat: 'legumes' },
    ], 12, { kcal: 260, p: 20, f: 16, c: 8 }),
  },
  {
    day: 11,
    breakfast: meal('Omelette + pain complet', [
      { name: 'Œufs', qty: 3, unit: 'unités', cat: 'oeufs' },
      { name: 'Pain complet', qty: 60, unit: 'g', cat: 'feculents' },
    ], 12, { kcal: 380, p: 26, f: 16, c: 28 }),
    lunch: meal('Dinde + lentilles + carottes', [
      { name: 'Escalope de dinde', qty: 180, unit: 'g', cat: 'viandes' },
      { name: 'Lentilles', qty: 80, unit: 'g', cat: 'feculents' },
      { name: 'Carottes', qty: 150, unit: 'g', cat: 'legumes' },
    ], 30, { kcal: 500, p: 50, f: 6, c: 48 }),
    snack: meal('Orange', [
      { name: 'Orange', qty: 1, unit: 'unité', cat: 'fruits' },
    ], 1, { kcal: 60, p: 1, f: 0, c: 15 }),
    dinner: meal('Sardines + légumes', [
      { name: 'Sardines (boîte)', qty: 1, unit: 'boîte', cat: 'poissons' },
      { name: 'Courgettes', qty: 150, unit: 'g', cat: 'legumes' },
      { name: 'Tomates', qty: 100, unit: 'g', cat: 'legumes' },
    ], 12, { kcal: 320, p: 26, f: 20, c: 8 }),
  },
  {
    day: 12,
    breakfast: meal('Fromage blanc 0 % + avoine', [
      { name: 'Fromage blanc 0 %', qty: 200, unit: 'g', cat: 'laitiers' },
      { name: 'Flocons d\'avoine', qty: 50, unit: 'g', cat: 'feculents' },
    ], 5, { kcal: 280, p: 22, f: 3, c: 38 }),
    lunch: meal('Poulet + riz + courgettes', [
      { name: 'Blanc de poulet', qty: 180, unit: 'g', cat: 'viandes' },
      { name: 'Riz basmati', qty: 70, unit: 'g', cat: 'feculents' },
      { name: 'Courgettes', qty: 200, unit: 'g', cat: 'legumes' },
    ], 25, { kcal: 470, p: 48, f: 8, c: 40 }),
    snack: meal('Banane', [
      { name: 'Banane', qty: 1, unit: 'unité', cat: 'fruits' },
    ], 1, { kcal: 90, p: 1, f: 0, c: 23 }),
    dinner: meal('Colin + épinards', [
      { name: 'Colin', qty: 180, unit: 'g', cat: 'poissons' },
      { name: 'Épinards', qty: 250, unit: 'g', cat: 'legumes' },
      { name: 'Huile d\'olive', qty: 5, unit: 'ml', cat: 'graisses' },
    ], 18, { kcal: 260, p: 38, f: 8, c: 6 }),
  },
  {
    day: 13,
    breakfast: meal('3 œufs + avoine', [
      { name: 'Œufs', qty: 3, unit: 'unités', cat: 'oeufs' },
      { name: 'Flocons d\'avoine', qty: 40, unit: 'g', cat: 'feculents' },
    ], 10, { kcal: 360, p: 25, f: 16, c: 28 }),
    lunch: meal('Steak haché halal + riz + salade', [
      { name: 'Steak haché halal 5 %', qty: 150, unit: 'g', cat: 'viandes' },
      { name: 'Riz basmati', qty: 80, unit: 'g', cat: 'feculents' },
      { name: 'Salade', qty: 100, unit: 'g', cat: 'legumes' },
    ], 25, { kcal: 490, p: 35, f: 10, c: 52 }),
    snack: meal('Fromage blanc 0 %', [
      { name: 'Fromage blanc 0 %', qty: 200, unit: 'g', cat: 'laitiers' },
    ], 1, { kcal: 100, p: 16, f: 0, c: 8 }),
    dinner: meal('Thon + haricots verts', [
      { name: 'Thon (boîte)', qty: 1, unit: 'boîte', cat: 'poissons' },
      { name: 'Haricots verts', qty: 200, unit: 'g', cat: 'legumes' },
    ], 12, { kcal: 240, p: 28, f: 8, c: 10 }),
  },
  {
    day: 14,
    breakfast: meal('Fromage blanc 0 % + banane', [
      { name: 'Fromage blanc 0 %', qty: 200, unit: 'g', cat: 'laitiers' },
      { name: 'Banane', qty: 1, unit: 'unité', cat: 'fruits' },
    ], 3, { kcal: 200, p: 17, f: 0, c: 32 }),
    lunch: meal('Poulet + pomme de terre + épinards', [
      { name: 'Blanc de poulet', qty: 180, unit: 'g', cat: 'viandes' },
      { name: 'Pomme de terre', qty: 200, unit: 'g', cat: 'feculents' },
      { name: 'Épinards', qty: 200, unit: 'g', cat: 'legumes' },
    ], 30, { kcal: 460, p: 46, f: 5, c: 50 }),
    snack: meal('Graines de tournesol', [
      { name: 'Graines de tournesol', qty: 20, unit: 'g', cat: 'graisses' },
    ], 1, { kcal: 120, p: 4, f: 10, c: 2 }),
    dinner: meal('Omelette + salade', [
      { name: 'Œufs', qty: 3, unit: 'unités', cat: 'oeufs' },
      { name: 'Salade', qty: 120, unit: 'g', cat: 'legumes' },
      { name: 'Huile d\'olive', qty: 5, unit: 'ml', cat: 'graisses' },
    ], 12, { kcal: 300, p: 22, f: 20, c: 4 }),
  },
  {
    day: 15,
    breakfast: meal('Omelette + pain complet', [
      { name: 'Œufs', qty: 3, unit: 'unités', cat: 'oeufs' },
      { name: 'Pain complet', qty: 60, unit: 'g', cat: 'feculents' },
    ], 12, { kcal: 380, p: 26, f: 16, c: 28 }),
    lunch: meal('Dinde + riz + courgettes', [
      { name: 'Escalope de dinde', qty: 180, unit: 'g', cat: 'viandes' },
      { name: 'Riz basmati', qty: 80, unit: 'g', cat: 'feculents' },
      { name: 'Courgettes', qty: 200, unit: 'g', cat: 'legumes' },
    ], 25, { kcal: 470, p: 46, f: 6, c: 52 }),
    snack: meal('Pomme', [
      { name: 'Pomme', qty: 1, unit: 'unité', cat: 'fruits' },
    ], 1, { kcal: 80, p: 0, f: 0, c: 20 }),
    dinner: meal('Colin + lentilles + carottes', [
      { name: 'Colin', qty: 180, unit: 'g', cat: 'poissons' },
      { name: 'Lentilles', qty: 60, unit: 'g', cat: 'feculents' },
      { name: 'Carottes', qty: 100, unit: 'g', cat: 'legumes' },
    ], 25, { kcal: 370, p: 42, f: 4, c: 42 }),
  },
];

/** Fix typo in MENU_B day 3 */
MENU_B[2].lunch.ingredients[0].name = 'Steak haché halal 5 %';
