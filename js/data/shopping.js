/**
 * Listes de courses ultra-économiques (Lidl / Aldi / Premier Prix)
 * Surgelés prioritaires · pantry amorti sur 60 j
 */

export const CATEGORIES = [
  { id: 'viandes', label: 'Viandes' },
  { id: 'poissons', label: 'Poissons' },
  { id: 'laitiers', label: 'Produits laitiers' },
  { id: 'oeufs', label: 'Œufs' },
  { id: 'legumes', label: 'Légumes' },
  { id: 'fruits', label: 'Fruits' },
  { id: 'feculents', label: 'Féculents' },
  { id: 'conserves', label: 'Conserves' },
  { id: 'epicerie', label: 'Épicerie' },
  { id: 'graisses', label: 'Bonnes graisses' },
  { id: 'boissons', label: 'Boissons' },
];

/** Prix Lidl / Aldi / Premier Prix (€) — fourchette basse */
export const PRICES = {
  'Blanc de poulet': { unit: 'kg', price: 5.49 },
  'Escalope de dinde': { unit: 'kg', price: 5.99 },
  'Steak haché halal 5 %': { unit: 'kg', price: 6.99 },
  'Colin': { unit: 'kg', price: 4.99 },
  'Thon (boîte)': { unit: 'boîte', price: 0.69 },
  'Maquereau (boîte)': { unit: 'boîte', price: 1.19 },
  'Fromage blanc 0 %': { unit: 'kg', price: 1.15 },
  'Cancoillotte': { unit: 'kg', price: 6.5 },
  'Ricotta': { unit: 'kg', price: 4.5 },
  'Fromage frais': { unit: 'kg', price: 3.8 },
  'Fromage de chèvre frais': { unit: 'kg', price: 9.5 },
  'Feta': { unit: 'kg', price: 7.5 },
  'Mozzarella': { unit: 'kg', price: 6.9 },
  'Camembert': { unit: 'kg', price: 7.2 },
  'Coulommiers': { unit: 'kg', price: 7.5 },
  'Mont d\'Or': { unit: 'kg', price: 14 },
  'Œufs': { unit: 'unité', price: 0.15 },
  'Riz basmati': { unit: 'kg', price: 0.99 },
  'Lentilles': { unit: 'kg', price: 1.19 },
  'Pomme de terre': { unit: 'kg', price: 0.69 },
  'Flocons d\'avoine': { unit: 'kg', price: 0.85 },
  'Farine de sarrasin': { unit: 'kg', price: 2.49 },
  'Farine de son': { unit: 'kg', price: 1.79 },
  'Pain complet': { unit: 'unité', price: 0.85 },
  'Haricots verts': { unit: 'kg', price: 1.39 },
  'Courgettes': { unit: 'kg', price: 1.29 },
  'Épinards': { unit: 'kg', price: 1.49 },
  'Carottes': { unit: 'kg', price: 0.65 },
  'Tomates': { unit: 'kg', price: 1.29 },
  'Salade': { unit: 'unité', price: 0.55 },
  'Pomme': { unit: 'unité', price: 0.22 },
  'Banane': { unit: 'unité', price: 0.18 },
  'Orange': { unit: 'unité', price: 0.25 },
  'Amandes': { unit: 'kg', price: 7.99 },
  'Huile d\'olive': { unit: 'bouteille', price: 3.49 },
  'Sel': { unit: 'paquet', price: 0.29 },
  'Poivre': { unit: 'paquet', price: 0.55 },
  'Paprika': { unit: 'paquet', price: 0.59 },
  'Curry': { unit: 'paquet', price: 0.59 },
  'Herbes de Provence': { unit: 'paquet', price: 0.49 },
  'Ail': { unit: 'tête', price: 0.35 },
  'Oignons': { unit: 'kg', price: 0.79 },
};

/**
 * Courses alimentaires pour 15 jours (frais / protéines / féculents)
 * Quantités optimisées batch cooking
 */
const FOOD_15 = [
  { name: 'Blanc de poulet (surgelé)', qty: 3.5, unit: 'kg', cat: 'viandes', priceKey: 'Blanc de poulet' },
  { name: 'Escalope de dinde (surgelé)', qty: 1.2, unit: 'kg', cat: 'viandes', priceKey: 'Escalope de dinde' },
  { name: 'Steak haché halal 5 %', qty: 0.75, unit: 'kg', cat: 'viandes', priceKey: 'Steak haché halal 5 %' },
  { name: 'Colin (surgelé)', qty: 1.5, unit: 'kg', cat: 'poissons', priceKey: 'Colin' },
  { name: 'Thon (boîtes)', qty: 5, unit: 'boîtes', cat: 'conserves', priceKey: 'Thon (boîte)' },
  { name: 'Maquereau (boîtes)', qty: 4, unit: 'boîtes', cat: 'conserves', priceKey: 'Maquereau (boîte)' },
  { name: 'Fromage blanc 0 %', qty: 2.2, unit: 'kg', cat: 'laitiers', priceKey: 'Fromage blanc 0 %' },
  { name: 'Cancoillotte', qty: 0.25, unit: 'kg', cat: 'laitiers', priceKey: 'Cancoillotte' },
  { name: 'Ricotta', qty: 0.2, unit: 'kg', cat: 'laitiers', priceKey: 'Ricotta' },
  { name: 'Fromage de chèvre frais', qty: 0.08, unit: 'kg', cat: 'laitiers', priceKey: 'Fromage de chèvre frais' },
  { name: 'Œufs', qty: 45, unit: 'unités', cat: 'oeufs', priceKey: 'Œufs' },
  { name: 'Riz basmati', qty: 2.5, unit: 'kg', cat: 'feculents', priceKey: 'Riz basmati' },
  { name: 'Lentilles', qty: 1, unit: 'kg', cat: 'feculents', priceKey: 'Lentilles' },
  { name: 'Pommes de terre', qty: 2.5, unit: 'kg', cat: 'feculents', priceKey: 'Pomme de terre' },
  { name: 'Flocons d\'avoine', qty: 1, unit: 'kg', cat: 'feculents', priceKey: 'Flocons d\'avoine' },
  { name: 'Pain complet', qty: 1, unit: 'unité', cat: 'feculents', priceKey: 'Pain complet' },
  { name: 'Haricots verts (surgelés)', qty: 2, unit: 'kg', cat: 'legumes', priceKey: 'Haricots verts' },
  { name: 'Courgettes (surgelées / promo)', qty: 1.2, unit: 'kg', cat: 'legumes', priceKey: 'Courgettes' },
  { name: 'Épinards (surgelés)', qty: 1, unit: 'kg', cat: 'legumes', priceKey: 'Épinards' },
  { name: 'Carottes', qty: 1.5, unit: 'kg', cat: 'legumes', priceKey: 'Carottes' },
  { name: 'Tomates', qty: 0.8, unit: 'kg', cat: 'legumes', priceKey: 'Tomates' },
  { name: 'Salades', qty: 2, unit: 'unités', cat: 'legumes', priceKey: 'Salade' },
  { name: 'Pommes', qty: 6, unit: 'unités', cat: 'fruits', priceKey: 'Pomme' },
  { name: 'Bananes', qty: 10, unit: 'unités', cat: 'fruits', priceKey: 'Banane' },
  { name: 'Oranges', qty: 3, unit: 'unités', cat: 'fruits', priceKey: 'Orange' },
  { name: 'Amandes', qty: 0.2, unit: 'kg', cat: 'graisses', priceKey: 'Amandes' },
];

/** Placard — acheté 1× / 60 jours (amorti) */
const PANTRY_60 = [
  { name: 'Huile d\'olive (1 L)', qty: 1, unit: 'bouteille', cat: 'graisses', priceKey: 'Huile d\'olive' },
  { name: 'Sel', qty: 1, unit: 'paquet', cat: 'epicerie', priceKey: 'Sel' },
  { name: 'Poivre', qty: 1, unit: 'paquet', cat: 'epicerie', priceKey: 'Poivre' },
  { name: 'Paprika', qty: 1, unit: 'paquet', cat: 'epicerie', priceKey: 'Paprika' },
  { name: 'Curry', qty: 1, unit: 'paquet', cat: 'epicerie', priceKey: 'Curry' },
  { name: 'Herbes de Provence', qty: 1, unit: 'paquet', cat: 'epicerie', priceKey: 'Herbes de Provence' },
  { name: 'Ail', qty: 3, unit: 'têtes', cat: 'epicerie', priceKey: 'Ail' },
  { name: 'Oignons', qty: 1.5, unit: 'kg', cat: 'epicerie', priceKey: 'Oignons' },
];

/** Liste 15 j = food + quote-part pantry (1/4) pour totaux hebdo réalistes */
const CYCLE_LIST = [
  ...FOOD_15,
  ...PANTRY_60.map((item) => ({
    ...item,
    qty: Math.round((item.qty / 4) * 100) / 100,
    name: item.name.includes('Huile') ? 'Huile d\'olive (quote-part)' : `${item.name} (quote-part)`,
  })),
];

function withIds(list, suffix) {
  return list.map((item) => ({
    ...item,
    id: `${item.name.toLowerCase().replace(/[^a-z0-9]+/gi, '-')}-${suffix}`,
  }));
}

function splitWeeks(list) {
  const week1 = [];
  const week2 = [];
  list.forEach((item) => {
    const halfQty = Math.round((item.qty / 2) * 100) / 100;
    const baseId = item.name.toLowerCase().replace(/[^a-z0-9]+/gi, '-');
    if (item.name.includes('quote-part')) {
      // Placard : uniquement semaine 1 de chaque quinzaine (déjà amorti /4)
      week1.push({ ...item, id: `${baseId}-w1` });
    } else {
      week1.push({ ...item, qty: halfQty, id: `${baseId}-w1` });
      week2.push({ ...item, qty: halfQty, id: `${baseId}-w2` });
    }
  });
  return [week1, week2];
}

const [w1, w2] = splitWeeks(CYCLE_LIST);

export const WEEKLY_LISTS = {
  1: withIds(w1, 's1'),
  2: withIds(w2, 's2'),
  3: withIds(w1, 's3'),
  4: withIds(w2, 's4'),
  5: withIds(w1, 's5'),
  6: withIds(w2, 's6'),
  7: withIds(w1, 's7'),
  8: withIds(w2, 's8'),
};

export function estimateItemPrice(item) {
  const p = PRICES[item.priceKey];
  if (!p) return 0;
  return Math.round(item.qty * p.price * 100) / 100;
}

export function estimateListTotal(list) {
  return Math.round(list.reduce((s, i) => s + estimateItemPrice(i), 0) * 100) / 100;
}

export function estimateCycleBudget() {
  const food15 = estimateListTotal(FOOD_15);
  const pantry60 = estimateListTotal(PANTRY_60);
  const days60 = Math.round((food15 * 4 + pantry60) * 100) / 100;
  const week = Math.round((days60 / 8) * 100) / 100;
  const month = Math.round((days60 / 2) * 100) / 100;
  return { week, month, days60, food15, pantry60 };
}

/** Batch cooking — dimanche */
export const BATCH_ITEMS = [
  {
    name: 'Blancs de poulet grillés',
    meals: ['Déjeuners poulet (lun–mer)'],
    timeMin: 45,
    savedMin: 60,
    tips: 'Surgelé Lidl/Aldi. Paprika + herbes, griller, portionner 180 g.',
  },
  {
    name: 'Riz basmati en grand volume',
    meals: ['Accompagnements semaine'],
    timeMin: 25,
    savedMin: 50,
    tips: 'Cuisson batch · frigo 4 j ou congélateur. Moins cher que quinoa.',
  },
  {
    name: 'Lentilles',
    meals: ['Déjeuners / dîners lentilles'],
    timeMin: 25,
    savedMin: 40,
    tips: 'Cuisson douce + ail + oignon. Portion 60–80 g sec.',
  },
  {
    name: 'Légumes surgelés',
    meals: ['Haricots verts, épinards, courgettes'],
    timeMin: 20,
    savedMin: 45,
    tips: 'Sacs 1 kg premier prix = meilleur €/kg que le frais.',
  },
  {
    name: 'Pommes de terre au four',
    meals: ['Déjeuners féculents'],
    timeMin: 40,
    savedMin: 35,
    tips: 'Remplace patate douce · ~3× moins cher. 200 °C, 35–40 min.',
  },
];
