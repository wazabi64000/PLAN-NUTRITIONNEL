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
    'Batch cooking le dimanche',
  ],
};

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
    ], 5, { calories: 450, protein: 40, fat: 2, carbs: 55 }),
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
    snack: meal('Amandes + fruit', [
      { name: 'Amandes', qty: 40, unit: 'g', cat: 'graisses' },
      { name: 'Orange', qty: 2, unit: 'unités', cat: 'fruits' },
    ], 2, { calories: 380, protein: 10, fat: 24, carbs: 30 }),
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
    snack: meal('Fromage blanc 0 %', [
      { name: 'Fromage blanc 0 %', qty: 400, unit: 'g', cat: 'laitiers' },
    ], 2, { calories: 200, protein: 32, fat: 0, carbs: 16 }),
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
    snack: meal('Pain complet + fromage blanc', [
      { name: 'Pain complet', qty: 120, unit: 'g', cat: 'feculents' },
      { name: 'Fromage blanc 0 %', qty: 250, unit: 'g', cat: 'laitiers' },
    ], 5, { calories: 420, protein: 28, fat: 4, carbs: 60 }),
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
    snack: meal('Banane + amandes', [
      { name: 'Banane', qty: 3, unit: 'unités', cat: 'fruits' },
      { name: 'Amandes', qty: 30, unit: 'g', cat: 'graisses' },
    ], 2, { calories: 450, protein: 10, fat: 18, carbs: 70 }),
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
    dinner: meal('Pizza sarrasin · légumes + escalope (ou thon)', [
      { name: 'Farine de sarrasin', qty: 380, unit: 'g', cat: 'feculents' },
      { name: 'Escalope de dinde (ou 3 boîtes thon)', qty: 450, unit: 'g', cat: 'viandes' },
      { name: 'Tomates', qty: 400, unit: 'g', cat: 'legumes' },
      { name: 'Courgettes', qty: 300, unit: 'g', cat: 'legumes' },
      { name: 'Oignons', qty: 150, unit: 'g', cat: 'epicerie' },
      { name: 'Huile d\'olive', qty: 25, unit: 'ml', cat: 'graisses' },
      { name: 'Herbes de Provence', qty: 1, unit: 'c.à.c', cat: 'epicerie' },
    ], 45, { calories: 2240, protein: 170, fat: 46, carbs: 278 }),
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
    snack: meal('Fromage blanc + amandes', [
      { name: 'Fromage blanc 0 %', qty: 400, unit: 'g', cat: 'laitiers' },
      { name: 'Amandes', qty: 30, unit: 'g', cat: 'graisses' },
    ], 3, { calories: 400, protein: 36, fat: 18, carbs: 20 }),
    dinner: meal('Léger : soupe légumes + omelette', [
      { name: 'Carottes', qty: 300, unit: 'g', cat: 'legumes' },
      { name: 'Courgettes', qty: 300, unit: 'g', cat: 'legumes' },
      { name: 'Oignons', qty: 100, unit: 'g', cat: 'epicerie' },
      { name: 'Œufs', qty: 5, unit: 'unités', cat: 'oeufs' },
      { name: 'Pain complet', qty: 100, unit: 'g', cat: 'feculents' },
    ], 30, { calories: 1100, protein: 55, fat: 40, carbs: 100 }),
  },
];

/** Portions indicatives par membre (coeff. famille = 3,25 parts adultes) */
export const AMISSE_PORTIONS = [
  { member: 'Adulte 1 & 2', hint: 'Assiette complète (~1 part) · pizza : 2 parts / pers.' },
  { member: 'Enfant 10 ans', hint: '≈ ¾ d’assiette · pizza : 1,5 part' },
  { member: 'Enfant 4 ans', hint: '≈ ½ assiette · pizza : 1 part · découper' },
];

/**
 * Courses semaine famille — recalculées (dont pizza sarrasin du samedi)
 * Coeff. portions : 2×1 + 0,75 + 0,5 = 3,25
 */
export const AMISSE_SHOPPING_WEEK = [
  { id: 'a-poulet', name: 'Blanc de poulet (surgelé)', qty: 2.55, unit: 'kg', cat: 'viandes', priceKey: 'Blanc de poulet' },
  { id: 'a-dinde', name: 'Escalope de dinde (surgelé)', qty: 1.55, unit: 'kg', cat: 'viandes', priceKey: 'Escalope de dinde' },
  { id: 'a-steak', name: 'Steak haché halal 5 %', qty: 0.5, unit: 'kg', cat: 'viandes', priceKey: 'Steak haché halal 5 %' },
  { id: 'a-colin', name: 'Colin (surgelé)', qty: 0.6, unit: 'kg', cat: 'poissons', priceKey: 'Colin' },
  { id: 'a-thon', name: 'Thon (boîtes)', qty: 3, unit: 'boîtes', cat: 'conserves', priceKey: 'Thon (boîte)' },
  { id: 'a-thon-alt', name: 'Thon extra (si pizza sans escalope)', qty: 3, unit: 'boîtes', cat: 'conserves', priceKey: 'Thon (boîte)' },
  { id: 'a-maq', name: 'Maquereau (boîtes)', qty: 3, unit: 'boîtes', cat: 'conserves', priceKey: 'Maquereau (boîte)' },
  { id: 'a-fb', name: 'Fromage blanc 0 %', qty: 2.5, unit: 'kg', cat: 'laitiers', priceKey: 'Fromage blanc 0 %' },
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
  { id: 'a-car', name: 'Carottes', qty: 1.7, unit: 'kg', cat: 'legumes', priceKey: 'Carottes' },
  { id: 'a-tom', name: 'Tomates', qty: 1.85, unit: 'kg', cat: 'legumes', priceKey: 'Tomates' },
  { id: 'a-sal', name: 'Salades', qty: 4, unit: 'unités', cat: 'legumes', priceKey: 'Salade' },
  { id: 'a-pom', name: 'Pommes', qty: 11, unit: 'unités', cat: 'fruits', priceKey: 'Pomme' },
  { id: 'a-ban', name: 'Bananes', qty: 14, unit: 'unités', cat: 'fruits', priceKey: 'Banane' },
  { id: 'a-ora', name: 'Oranges', qty: 6, unit: 'unités', cat: 'fruits', priceKey: 'Orange' },
  { id: 'a-amd', name: 'Amandes', qty: 0.1, unit: 'kg', cat: 'graisses', priceKey: 'Amandes' },
  { id: 'a-huile', name: 'Huile d\'olive (quote-part)', qty: 0.3, unit: 'bouteille', cat: 'graisses', priceKey: 'Huile d\'olive' },
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
    tips: '380 g farine + eau + 1 c.à.s huile. Étaler fine. Garnir légumes + escalope grillée (ou thon égoutté). Four 220 °C · 15–18 min. 6–7 parts : 2 / adulte, 1,5 / 10 ans, 1 / 4 ans.',
    timeMin: 45,
    savedMin: 30,
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
