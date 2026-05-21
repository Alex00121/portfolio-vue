export interface Message {
  id: string
  room: string
  username: string
  content: string
  timestamp: Date
  isOwn?: boolean
}

const now = Date.now()
const m = (id: string, room: string, username: string, content: string, offsetMs: number): Message => ({
  id,
  room,
  username,
  content,
  timestamp: new Date(now - offsetMs),
  isOwn: username === 'Vous',
})

export const seedMessages: Message[] = [
  // #general
  m('g1', 'general', 'Sophie', 'Bonjour tout le monde ! Comment ça va aujourd\'hui ?', 28 * 60000),
  m('g2', 'general', 'Karim', 'Très bien merci ! J\'ai terminé mon projet React hier soir 🎉', 25 * 60000),
  m('g3', 'general', 'Amelia', 'Félicitations Karim ! C\'était lequel ?', 22 * 60000),
  m('g4', 'general', 'Karim', 'Un dashboard avec D3.js et TypeScript. Je poste le lien GitHub ce soir.', 18 * 60000),
  m('g5', 'general', 'Vous', 'Hâte de voir ça ! D3.js c\'est puissant.', 15 * 60000),

  // #random
  m('r1', 'random', 'Lucas', 'Quelqu\'un a regardé la conférence tech hier ?', 45 * 60000),
  m('r2', 'random', 'Emma', 'Oui ! La partie sur les LLMs était fascinante', 40 * 60000),
  m('r3', 'random', 'Vous', 'J\'ai raté ça, il y a un replay disponible ?', 35 * 60000),
  m('r4', 'random', 'Lucas', 'Oui sur YouTube, je t\'envoie le lien', 30 * 60000),
  m('r5', 'random', 'Emma', 'La session sur les agents autonomes était aussi top 🤖', 20 * 60000),

  // #coding
  m('c1', 'coding', 'Nathan', 'Question : comment gérer les erreurs async/await proprement en TypeScript ?', 60 * 60000),
  m('c2', 'coding', 'Iris', 'Utilise un try/catch ou un wrapper utilitaire type Result<T, E>', 55 * 60000),
  m('c3', 'coding', 'Nathan', 'Merci ! Le pattern Result c\'est élégant', 50 * 60000),
  m('c4', 'coding', 'Vous', 'Tu peux aussi utiliser neverthrow, une lib dédiée à ça', 44 * 60000),
  m('c5', 'coding', 'Iris', 'Exactement, neverthrow est excellent pour les gros projets', 38 * 60000),

  // #design
  m('d1', 'design', 'Léa', 'Glassmorphism ou neumorphism, votre préférence ?', 90 * 60000),
  m('d2', 'design', 'Théo', 'Glassmorphism sans hésiter, ça rend super bien avec les fonds sombres', 80 * 60000),
  m('d3', 'design', 'Vous', 'D\'accord avec Théo ! Neumorphism est difficile en termes d\'accessibilité', 70 * 60000),
  m('d4', 'design', 'Léa', 'Bon point pour l\'accessibilité. On doit toujours penser aux contrastes', 60 * 60000),
  m('d5', 'design', 'Théo', 'Exactement. Figma a un plugin de vérification des contrastes très pratique', 50 * 60000),
]

export const botMessages: Record<string, string[]> = {
  general: [
    'N\'oubliez pas la réunion d\'équipe vendredi à 14h !',
    'Est-ce que quelqu\'un a des recommandations de podcasts tech ?',
    'J\'ai trouvé un bug critique en prod, je vais patcher ça 🔧',
    'On a atteint 1000 étoiles sur GitHub ! Merci à tous ⭐',
    'Quelqu\'un veut faire une code review de mon PR ?',
  ],
  random: [
    'Article intéressant sur Rust vs Go pour les microservices',
    'Le nouveau MacBook Pro M4 est impressionnant',
    'Je recommande le livre "Clean Architecture" de Robert Martin',
    'Vous avez essayé Bun.js ? C\'est beaucoup plus rapide que Node',
    'Film du soir : The Social Network pour l\'inspiration 🎬',
  ],
  coding: [
    'Rappel : commitez régulièrement, ça vous sauvera la mise !',
    'Astuce : utilisez `console.time()` pour profiler vos fonctions',
    'Le pattern Repository est très utile pour abstraire la DB',
    'N\'oubliez pas d\'écrire des tests avant de coder (TDD) 🧪',
    'Vitest > Jest pour les projets Vite, l\'intégration est native',
  ],
  design: [
    'Tip : utilisez des spacings multiples de 4px pour la cohérence',
    'Les couleurs avec une teinte légèrement bleue paraissent plus modernes',
    'Motion design : moins c\'est plus, évitez les animations longues',
    'Figma shortcuts : Alt+drag pour dupliquer, Cmd+G pour grouper',
    'Inspiration du jour : dribbble.com/tags/dashboard',
  ],
}

export const botNames: Record<string, string[]> = {
  general: ['Sophie', 'Karim', 'Amelia'],
  random: ['Lucas', 'Emma'],
  coding: ['Nathan', 'Iris'],
  design: ['Léa', 'Théo'],
}
