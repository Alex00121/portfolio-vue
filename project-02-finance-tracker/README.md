# Finance Tracker

## Description

Application de suivi des finances personnelles construite avec Vue 3 et TypeScript. Visualisez vos revenus et dépenses, gérez des budgets par catégorie, et analysez vos tendances mensuelles grâce à des graphiques interactifs.

## Technologies utilisées

- **Vue 3** — Composition API avec `<script setup>`
- **TypeScript** — typage strict de bout en bout
- **Pinia** — gestion d'état globale avec persistance localStorage automatique
- **pinia-plugin-persistedstate** — persistance transparente du store
- **Chart.js + vue-chartjs** — graphiques bar et donut animés
- **Tailwind CSS** — design system utilitaire
- **Vite** — bundler ultra-rapide

## Fonctionnalités

- **Tableau de bord** : 4 KPI cards (revenus, dépenses, solde, taux d'épargne) avec comparaison mois précédent
- **Graphique mensuel** : comparaison revenus vs dépenses sur les 6 derniers mois (Chart.js bar groupé)
- **Graphique catégories** : répartition des dépenses par catégorie (donut Chart.js)
- **Transactions** : liste triable et filtrable avec pagination (10 par page), suppression avec confirmation
- **Formulaire** : ajout rapide de revenus ou dépenses avec validation inline
- **Budgets** : plafonds mensuels par catégorie avec barre de progression (alerte rouge si dépassé)
- **Export CSV** : téléchargement de toutes les transactions au format CSV
- **Persistance** : toutes les données sont sauvegardées automatiquement dans le localStorage

## Installation

```bash
cd project-02-finance-tracker
npm install
```

## Lancer le projet

```bash
npm run dev
```

Ouvre ensuite [http://localhost:5173](http://localhost:5173) dans ton navigateur.

Pour créer un build de production :

```bash
npm run build
npm run preview
```

## Aperçu

L'interface adopte un style **dashboard professionnel** :

- **Header fixe** avec logo, mois courant, bouton "Ajouter" et export CSV
- **Navigation par onglets** : Tableau de bord / Transactions / Budgets
- **KPI cards** blanches avec icônes colorées, badges de tendance (vert/rouge) et animations d'entrée
- **Graphiques** : barres groupées (revenus vs dépenses sur 6 mois) et donut (répartition catégories du mois)
- **Tableau de transactions** avec tri par colonnes, filtres type/catégorie, suppression au survol et pagination
- **Budgets** : grille de cartes par catégorie, barre de progression colorée (vert → orange → rouge selon usage), édition inline du plafond
- **Formulaire** slide-in avec toggle Dépense/Revenu, sélecteur de date et validation temps réel
- **Palette** : fond gris clair `#f1f5f9`, cartes blanches, 8 couleurs distinctes par catégorie
