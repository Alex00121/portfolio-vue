# Portfolio Dev — Vue.js

## Description

Portfolio personnel de développeur full stack construit avec Vue 3 et Vite. Présente les compétences, projets et informations de contact d'Alexandre Leclerc dans une interface moderne avec thème sombre, animations fluides et design glassmorphism.

## Technologies utilisées

- **Vue 3** (Composition API, `<script setup>`)
- **Vite** — build ultra-rapide
- **Tailwind CSS** — utilitaires de style
- **GSAP** — animations scroll (ScrollTrigger)
- **Inter** — police principale (Google Fonts)

## Fonctionnalités

- **Navigation fixe** avec backdrop-blur, liens actifs dynamiques et menu hamburger mobile
- **Hero** : split diagonal, formes géométriques CSS flottantes, effet typewriter pour les rôles
- **À propos** : compteurs animés (années d'exp., projets, clients) déclenchés par IntersectionObserver
- **Compétences** : 6 catégories, barres de progression animées au scroll
- **Projets** : 6 cartes avec overlay hover GitHub / Demo
- **Contact** : formulaire avec validation inline, sélecteur de sujet, feedback de succès
- **Scroll fluide** entre toutes les sections
- **Responsive** : mobile 375px, tablette 768px, desktop 1280px+

## Installation

```bash
cd project-01-dev-portfolio
npm install
```

## Lancer le projet

```bash
npm run dev
```

Ouvrir [http://localhost:5173](http://localhost:5173) dans le navigateur.

```bash
# Build de production
npm run build
npm run preview
```

## Aperçu

L'interface adopte un thème sombre profond (`#0f0c29` / `#12103a`) avec un accent violet électrique (`#a855f7`). Le hero affiche un fond en dégradé diagonal avec des formes géométriques CSS animées en flottement continu. Le typewriter enchaîne les rôles (Full Stack, Vue.js, React, Node.js, TypeScript). Les sections entrent en vue avec des animations GSAP slide-up. Les barres de compétences se remplissent au scroll. Les cartes projets révèlent des liens GitHub/Demo au survol via un overlay semi-transparent.
