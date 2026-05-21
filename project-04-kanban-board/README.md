# Kanban Board

## Description

Application de gestion de tâches style Kanban construite avec Vue 3, TypeScript et Pinia. Organisez vos tâches en trois colonnes (À faire, En cours, Terminé) avec un système de glisser-déposer natif HTML5, des cartes prioritaires et une persistance automatique en localStorage.

## Technologies utilisées

- **Vue 3** — Composition API avec `<script setup>`
- **TypeScript** — Typage statique complet
- **Pinia** — Gestion d'état centralisée avec persistance localStorage
- **Vite** — Build tool ultra-rapide
- **Tailwind CSS v3** — Design system utilitaire

## Fonctionnalités

- **3 colonnes** : À faire, En cours, Terminé — avec compteur de cartes
- **Glisser-déposer** : API HTML5 native, aucune dépendance externe — colonne mise en surbrillance lors du survol
- **Cartes prioritaires** : bordure gauche colorée (rouge / ambre / vert) + badge de priorité
- **Dates d'échéance** : affichées en rouge si dépassées
- **Ajout inline** : cliquez sur "+ Ajouter une carte" → champ de saisie en bas de colonne (Entrée = sauvegarder, Échap = annuler)
- **Modal d'édition** : modifier titre, description, priorité, date d'échéance et colonne
- **Suppression** : bouton poubelle sur la carte + touche `Suppr` sur la carte sélectionnée
- **Persistance** : toutes les données sont sauvegardées en localStorage automatiquement
- **8 cartes de démonstration** pré-chargées avec des données réalistes

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/Alex00121/portfolio-vue.git
cd portfolio-vue/project-04-kanban-board

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

L'application sera disponible sur [http://localhost:5173](http://localhost:5173)

## Aperçu

L'interface présente un fond en dégradé bleu-indigo avec une barre de navigation supérieure affichant les statistiques par colonne. Les trois colonnes blanches (À faire, En cours, Terminé) sont disposées horizontalement avec un indicateur coloré en haut. Chaque carte affiche :

- Le titre en gras avec description tronquée
- Une bordure gauche colorée selon la priorité (rouge = élevé, ambre = moyen, vert = faible)
- Un badge de priorité et la date d'échéance (rouge si dépassée)
- Les icônes d'édition et suppression apparaissent au survol

Le glisser-déposer met en surbrillance la colonne cible avec un anneau indigo. La modal d'édition s'ouvre en overlay avec un fond flou.
