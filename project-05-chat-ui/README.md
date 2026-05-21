# Chat UI — Vue 3

## Description

Interface de messagerie instantanée de style Messenger, construite avec Vue 3 et TypeScript. Propose 4 salons de discussion (#general, #random, #coding, #design) avec une simulation de bots qui envoient des messages contextuels périodiquement, un indicateur de frappe animé, un sélecteur d'emojis et un compteur d'utilisateurs en ligne fluctuant en temps réel.

## Technologies utilisées

- **Vue 3** avec Composition API et `<script setup>`
- **TypeScript** — typage strict
- **Tailwind CSS** — mise en page et animations utilitaires
- **Vite** — bundler ultra-rapide

## Fonctionnalités

- 4 salons de discussion avec historique pré-chargé (5 messages par salon)
- Envoi de messages (touche Entrée ou bouton envoyer)
- Indicateur de frappe animé (3 points rebondissants) avant chaque message bot
- Bot simulation : messages contextuels toutes les 8–15 secondes dans un salon aléatoire
- Badge de messages non lus sur les salons inactifs
- Sélecteur d'emojis (24 emojis courants) en popover
- Compteur d'utilisateurs en ligne fluctuant aléatoirement ±1 toutes les 30s
- Design responsive : sidebar masquée sur mobile avec menu hamburger
- Horodatage relatif sur chaque message (ex. « il y a 5min »)
- Avatars colorés avec initiales générées par hachage du nom

## Installation

```bash
cd project-05-chat-ui
npm install
```

## Lancer le projet

```bash
npm run dev
```

Ouvrez [http://localhost:5173](http://localhost:5173) dans votre navigateur.

Pour construire pour la production :

```bash
npm run build
```

## Aperçu

L'interface est divisée en deux zones :

- **Sidebar gauche (240px)** — fond sombre `#1a1d23`, liste des 4 salons avec icône, aperçu du dernier message, badge rouge pour les messages non lus, et avatar utilisateur en bas
- **Zone de chat** — fond `#212429`, messages propres en bulles (bleu indigo à droite pour l'utilisateur, gris `#2a2d35` à gauche pour les autres), input avec sélecteur d'emojis, bouton envoi désactivé si vide

Les messages entrants apparaissent avec une animation `fadeIn`. Le composant `TypingIndicator` affiche 3 points rebondissants avec délais décalés avant chaque message bot.
