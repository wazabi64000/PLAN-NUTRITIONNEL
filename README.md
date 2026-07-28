# Meal Planner

PWA familiale **halal**, 100 % locale — menus sains adaptés au **nombre de personnes** présentes chaque jour.

**Démo en ligne :** [https://wazabi64000.github.io/PLAN-NUTRITIONNEL/](https://wazabi64000.github.io/PLAN-NUTRITIONNEL/)

Stack : **HTML · CSS · JavaScript** (vanilla) · IndexedDB · Service Worker · Manifest.

Palette **Nutrition 5** : `#D2EE6B` · `#00BCD4` · `#079AA9` · `#FCE006` · `#F29D06`.

---

## Fonctionnalités

- **Accueil** — menus du jour · compteur +/− adultes / enfants · quantités recalculées
- **Planning** — calendrier + programme Lun→Dim
- **Courses** — liste semaine type famille · cases mémorisées · prix estimés
- **Fromages** — top 10 les moins caloriques · portions âge / famille
- **Batch cooking** — session dimanche
- **Dark / light** · mobile first · offline · installable

Seul ? Mets **Adultes = 1** et **Enfants = 0**.

---

## Démarrage

Version déployée : [https://wazabi64000.github.io/PLAN-NUTRITIONNEL/](https://wazabi64000.github.io/PLAN-NUTRITIONNEL/)

```bash
python3 -m http.server 5173
```

### Installation PWA

Manifest + service worker `v11` + icônes maskable.

- Android / Chrome / Edge : bannière Installer
- iPhone : Safari → Partager → Sur l’écran d’accueil

---

## Architecture

```
├── index.html
├── manifest.json
├── sw.js
├── css/
├── icons/
├── fonts/
└── js/
    ├── app.js
    ├── db.js
    ├── utils.js
    └── data/
        ├── amisse.js    # Menus famille + scaling effectif
        ├── cheeses.js   # Top 10 fromages
        ├── shopping.js  # Prix
        └── meals.js     # (archives / non utilisé UI)
```

---

## Effectif

| Profil | Coefficient |
|--------|-------------|
| Adulte | 1 |
| Enfant 10 ans | 0,75 |
| Enfant 4 ans | 0,5 |

Base recettes = **3,25** (2 adultes + 10 ans + 4 ans).  
Facteur du jour = coeff actuel ÷ 3,25.

---

## Données

IndexedDB + LocalStorage · réinitialisation dans Réglages.
