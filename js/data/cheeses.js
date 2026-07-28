/**
 * Top 10 fromages les moins caloriques
 * Portions recalculées : individuel (sport) & famille Amisse (coeff 3,25)
 */

export const FAMILY_COEFF = 3.25; // 2 adultes + 0,75 + 0,5

/** Valeurs pour 100 g */
export const CHEESES = [
  {
    id: 'fromage-blanc',
    rank: 1,
    name: 'Fromage blanc 0 %',
    kcal100: 49,
    fat100: 0,
    protein100: 8,
    tip: 'Le plus pauvre en MG · coupe-faim · calcium & protéines.',
    individualG: 200,
    familyG: 500,
  },
  {
    id: 'cancoillotte',
    rank: 2,
    name: 'Cancoillotte',
    kcal100: 118,
    fat100: 4,
    protein100: 14,
    tip: 'Metton + eau · idéale fondue / tartine légère.',
    individualG: 80,
    familyG: 250,
  },
  {
    id: 'ricotta',
    rank: 3,
    name: 'Ricotta',
    kcal100: 174,
    fat100: 13,
    protein100: 11,
    tip: 'Onctueuse · plats & collations sans exploser les kcal.',
    individualG: 100,
    familyG: 320,
  },
  {
    id: 'fromage-frais',
    rank: 4,
    name: 'Fromage frais',
    kcal100: 207,
    fat100: 16,
    protein100: 10,
    tip: 'Tartine matin ou collation · version nature.',
    individualG: 60,
    familyG: 200,
  },
  {
    id: 'chevre-frais',
    rank: 5,
    name: 'Fromage de chèvre frais',
    kcal100: 220,
    fat100: 16,
    protein100: 16,
    tip: 'Peu affiné · beaucoup d’eau · faible en glucides.',
    individualG: 40,
    familyG: 130,
  },
  {
    id: 'feta',
    rank: 6,
    name: 'Feta',
    kcal100: 264,
    fat100: 21,
    protein100: 14,
    tip: 'Salades & cakes · portion modérée.',
    individualG: 30,
    familyG: 100,
  },
  {
    id: 'camembert',
    rank: 7,
    name: 'Camembert',
    kcal100: 280,
    fat100: 22,
    protein100: 20,
    tip: 'Moins calorique que la mozzarella · 1 petit quartier.',
    individualG: 30,
    familyG: 100,
  },
  {
    id: 'coulommiers',
    rank: 8,
    name: 'Coulommiers',
    kcal100: 283,
    fat100: 23,
    protein100: 19,
    tip: 'Pâte molle · plus d’eau que les pâtes dures.',
    individualG: 30,
    familyG: 100,
  },
  {
    id: 'mozzarella',
    rank: 9,
    name: 'Mozzarella',
    kcal100: 286,
    fat100: 22,
    protein100: 18,
    tip: 'Pizza / salade · portion contrôlée.',
    individualG: 40,
    familyG: 120,
  },
  {
    id: 'mont-dor',
    rank: 10,
    name: 'Mont d\'Or',
    kcal100: 286,
    fat100: 24,
    protein100: 17,
    tip: 'À la cuillère · plaisir modéré.',
    individualG: 40,
    familyG: 120,
  },
];

export function cheeseMacros(cheese, grams) {
  const f = grams / 100;
  return {
    calories: Math.round(cheese.kcal100 * f),
    protein: Math.round(cheese.protein100 * f * 10) / 10,
    fat: Math.round(cheese.fat100 * f * 10) / 10,
  };
}

export function cheesePortions(cheese) {
  const ind = cheeseMacros(cheese, cheese.individualG);
  const fam = cheeseMacros(cheese, cheese.familyG);
  const perAdult = cheeseMacros(cheese, Math.round(cheese.familyG / FAMILY_COEFF));
  const child10 = cheeseMacros(cheese, Math.round((cheese.familyG / FAMILY_COEFF) * 0.75));
  const child4 = cheeseMacros(cheese, Math.round((cheese.familyG / FAMILY_COEFF) * 0.5));
  return {
    individual: { grams: cheese.individualG, ...ind },
    family: { grams: cheese.familyG, ...fam },
    adult: { grams: Math.round(cheese.familyG / FAMILY_COEFF), ...perAdult },
    child10: { grams: Math.round((cheese.familyG / FAMILY_COEFF) * 0.75), ...child10 },
    child4: { grams: Math.round((cheese.familyG / FAMILY_COEFF) * 0.5), ...child4 },
  };
}

export const CHEESE_RULES = [
  'Plus un fromage contient d’eau, moins il est calorique.',
  'Privilégier : blanc, frais, pâtes molles, chèvre frais.',
  'Limiter les pâtes dures (très caloriques).',
  '1 adulte : portions individuelles du top 10.',
  'Famille : mêmes fromages, parts adaptées à l’âge (+/− effectif).',
];
