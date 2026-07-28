# Meal Planner

PWA nutritionnelle **halal**, 100 % locale, pour suivre une **sèche** ou une **prise de masse** sur **60 jours**.

**Démo en ligne :** [https://wazabi64000.github.io/PLAN-NUTRITIONNEL/](https://wazabi64000.github.io/PLAN-NUTRITIONNEL/)

Stack : **HTML · CSS · JavaScript** (vanilla) · IndexedDB · Service Worker · Manifest.

Palette **Nutrition 5** : `#D2EE6B` · `#00BCD4` · `#079AA9` · `#FCE006` · `#F29D06`.

---

## Fonctionnalités

- **Tableau de bord Sport** — sèche / prise de masse (inchangé)
- **Section Amisse** — famille 2 adultes + enfants 4 & 10 ans · manger sainement
- **Planning** — aujourd’hui / demain / calendrier · menus A & B (rotation 15 jours)
- **Liste de courses** — semaines 1 à 8 · cases à cocher mémorisées · prix estimés
- **Batch cooking** — session dimanche · temps gagné
- **Dark / light mode** · mobile first · offline first · installable (Android / iOS / Windows)
- Aucun compte · aucune API obligatoire · données locales uniquement

---

## Démarrage

Version déployée : [https://wazabi64000.github.io/PLAN-NUTRITIONNEL/](https://wazabi64000.github.io/PLAN-NUTRITIONNEL/)

Serveur local (modules ES + Service Worker) :

```bash
# Python
python3 -m http.server 5173

# ou Node
npx --yes serve -l 5173
```

Ouvrir [http://localhost:5173](http://localhost:5173).

### Installation PWA

L’app est installable (manifest + service worker `v5` + icônes maskable).

- **Android / Chrome / Edge** : bannière « Installer » ou menu → Installer l’application
- **iPhone / iPad** : Safari → Partager → Sur l’écran d’accueil
- **Windows** : Edge / Chrome → icône d’installation dans la barre d’adresse
- **Réglages** : statut PWA + bouton d’installation

Nécessite **HTTPS** ou **localhost** (la démo GitHub Pages convient).

---

## Architecture

```
├── index.html
├── manifest.json
├── sw.js
├── css/styles.css
├── icons/
├── js/
│   ├── app.js          # UI, navigation, pages
│   ├── db.js           # IndexedDB + LocalStorage
│   ├── utils.js        # Cycle 60 j, dates, macros
│   └── data/
│       ├── meals.js      # Menus A & B (sport)
│       ├── shopping.js   # Courses sport, prix, batch
│       └── amisse.js     # Famille Amisse (sain)
└── README.md
```

---

## Cycle nutritionnel

| Jours   | Menu |
|---------|------|
| 1–15    | A    |
| 16–30   | B    |
| 31–45   | A    |
| 46–60   | B    |

Puis recommence. Brocoli / skyr / avocat exclus (remplacés : épinards / haricots verts, fromage blanc 0 %, amandes / noix / huile d’olive).

---

## Données

- **IndexedDB** : repas cochés, eau, courses
- **LocalStorage** : objectif, thème, date de début de cycle
- Réinitialisation depuis **Réglages**

---

## Évolutions prévues

Export PDF / Excel · sync cloud · GoodCoach · notifications · scanner code-barres · Open Food Facts.



| API                                                                                                                       | Domaine                            | Gratuit                     | Intégration |
| ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | --------------------------- | ----------- |
| [wger API](https://wger.de/en/software/api?utm_source=chatgpt.com)                                                        | Exercices, nutrition, progression  | ✅ Oui                       | ⭐⭐⭐⭐⭐       |
| [free-exercise-db](https://github.com/yuhonas/free-exercise-db?utm_source=chatgpt.com)                                    | Base d'exercices (JSON)            | ✅ Oui                       | ⭐⭐⭐⭐⭐       |
| [ExerciseAPI](https://exercise-api.com/?utm_source=chatgpt.com)                                                           | Exercices, muscles, équipement     | ✅ 100 req/jour              | ⭐⭐⭐⭐☆       |
| [Open Food Facts API](https://world.openfoodfacts.org/data?utm_source=chatgpt.com)                                        | Produits alimentaires, code-barres | ✅ Oui                       | ⭐⭐⭐⭐⭐       |
| [USDA FoodData Central](https://fdc.nal.usda.gov/api-guide.html?utm_source=chatgpt.com)                                   | Valeurs nutritionnelles            | ✅ Oui                       | ⭐⭐⭐⭐⭐       |
| [Edamam API](https://developer.edamam.com/?utm_source=chatgpt.com)                                                        | Nutrition, recettes                | ✅ Free tier                 | ⭐⭐⭐⭐☆       |
| [Spoonacular API](https://spoonacular.com/food-api?utm_source=chatgpt.com)                                                | Recettes, menus                    | ✅ Free tier                 | ⭐⭐⭐⭐☆       |
| [FatSecret Platform API](https://platform.fatsecret.com/?utm_source=chatgpt.com)                                          | Nutrition                          | ✅ Free tier                 | ⭐⭐⭐⭐☆       |
| [API Ninjas Exercise API](https://api-ninjas.com/api/exercises?utm_source=chatgpt.com)                                    | Exercices                          | ✅ Free tier                 | ⭐⭐⭐☆☆       |
| [Nutritionix API](https://developer.nutritionix.com/?utm_source=chatgpt.com)                                              | Nutrition                          | ✅ Limité                    | ⭐⭐⭐☆☆       |
| [Health Connect (Android)](https://developer.android.com/health-and-fitness/guides/health-connect?utm_source=chatgpt.com) | Données santé Android              | ✅ Oui                       | ⭐⭐⭐⭐⭐       |
| [Apple HealthKit](https://developer.apple.com/health-fitness/?utm_source=chatgpt.com)                                     | Données santé iOS                  | ✅ Oui                       | ⭐⭐⭐⭐⭐       |
| [OpenStreetMap Nominatim](https://nominatim.org/?utm_source=chatgpt.com)                                                  | Recherche de salles de sport       | ✅ Oui                       | ⭐⭐⭐⭐☆       |
| [WeatherAPI.com](https://www.weatherapi.com/?utm_source=chatgpt.com)                                                      | Météo (course à pied, vélo)        | ✅ Free tier                 | ⭐⭐⭐⭐☆       |
| [Unsplash API](https://unsplash.com/developers?utm_source=chatgpt.com)                                                    | Images d'aliments                  | ✅ Oui                       | ⭐⭐⭐⭐☆       |
| [Pexels API](https://www.pexels.com/api/?utm_source=chatgpt.com)                                                          | Photos fitness                     | ✅ Oui                       | ⭐⭐⭐⭐☆       |
| [Pixabay API](https://pixabay.com/api/docs/?utm_source=chatgpt.com)                                                       | Images libres                      | ✅ Oui                       | ⭐⭐⭐⭐☆       |
| [Cloudinary API](https://cloudinary.com/documentation/image_upload_api_reference?utm_source=chatgpt.com)                  | Photos utilisateurs                | ✅ Free tier                 | ⭐⭐⭐⭐⭐       |
| [OpenAI API](https://platform.openai.com/docs/api-reference?utm_source=chatgpt.com)                                       | Coach IA                           | ❌ Payant                    | ⭐⭐⭐⭐⭐       |
| [OpenRouter API](https://openrouter.ai/docs/api-reference/overview?utm_source=chatgpt.com)                                | Accès à plusieurs LLM              | ✅ Certains modèles gratuits | ⭐⭐⭐⭐⭐       |
