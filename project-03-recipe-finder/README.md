# 🍴 Recipe Finder

## Description

Application Vue 3 permettant de découvrir et de sauvegarder des recettes du monde entier. Recherchez par nom, filtrez par catégorie ou cuisine, et consultez les instructions détaillées avec ajustement des portions.

## Technologies utilisées

- **Vue 3** (Composition API + `<script setup>`)
- **Vue Router 4** — navigation multi-pages (accueil, détail, favoris)
- **Pinia** — gestion des favoris avec persistance localStorage
- **Tailwind CSS** — design responsive, palette chaude personnalisée
- **TypeScript** — typage complet
- **TheMealDB API** — base de données de recettes gratuite, sans clé API

## Fonctionnalités

- 🔍 Recherche de recettes par nom avec résultats en temps réel
- 🏷️ Filtrage par catégorie (Beef, Chicken, Dessert, Seafood…)
- 🌍 Filtrage par cuisine (Française, Italienne, Japonaise…)
- 🎲 Recette aléatoire en un clic
- ❤️ Système de favoris persistant (localStorage)
- ✅ Checklist des ingrédients dans la page détail
- 🔢 Ajusteur de portions (multiplie les quantités automatiquement)
- 📋 Instructions numérotées étape par étape
- ▶️ Lien direct vers la vidéo YouTube si disponible
- 📱 Design responsive (mobile, tablette, desktop)

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/Alex00121/portfolio-vue.git
cd portfolio-vue/project-03-recipe-finder

# Installer les dépendances
npm install
```

## Lancer le projet

```bash
# Mode développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

L'application sera disponible sur [http://localhost:5173](http://localhost:5173).

> Aucune clé API n'est requise. TheMealDB est entièrement gratuit et public.

## Aperçu

L'interface adopte une palette chaleureuse (`#fff8f0` fond, `#e07b39` accent orange) évoquant la cuisine et la gastronomie.

- **Accueil** : bannière hero avec gradient orange, barre de recherche prominente, filtres par chips de catégories et cuisines, grille de recettes responsive (1→4 colonnes)
- **Page détail** : image pleine largeur avec overlay gradient, layout 2 colonnes (ingrédients à gauche avec checklist interactive, instructions à droite avec étapes numérotées), ajusteur de portions
- **Page favoris** : grille des recettes sauvegardées, bouton de suppression individuelle, état vide illustré avec CTA

Les cartes affichent un effet `hover:-translate-y-1 shadow-lg` et l'image monte légèrement (`scale-105`) au survol.
