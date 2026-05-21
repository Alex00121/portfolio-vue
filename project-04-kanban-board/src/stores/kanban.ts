import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Card, Column, ColumnId, Priority } from '../types/kanban'

const STORAGE_KEY = 'kanban-board-data'

function generateId(): string {
  return `card-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

const SEED_CARDS: Card[] = [
  {
    id: 'card-seed-1',
    title: 'Concevoir la maquette UI',
    description: 'Créer les wireframes pour le tableau de bord principal et les écrans mobiles.',
    priority: 'high',
    dueDate: '2026-05-18',
    columnId: 'todo',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'card-seed-2',
    title: 'Configurer CI/CD',
    description: 'Mettre en place GitHub Actions pour les tests automatiques et le déploiement.',
    priority: 'medium',
    dueDate: '2026-05-30',
    columnId: 'todo',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: 'card-seed-3',
    title: 'Rédiger la documentation API',
    description: 'Documenter tous les endpoints REST avec exemples de requêtes et réponses.',
    priority: 'low',
    dueDate: '2026-06-10',
    columnId: 'todo',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'card-seed-4',
    title: 'Intégrer l\'authentification JWT',
    description: 'Implémenter les tokens d\'accès et de rafraîchissement avec rotation.',
    priority: 'high',
    dueDate: '2026-05-22',
    columnId: 'inprogress',
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
  {
    id: 'card-seed-5',
    title: 'Optimiser les requêtes SQL',
    description: 'Ajouter des index et analyser les performances avec EXPLAIN ANALYZE.',
    priority: 'medium',
    dueDate: '2026-05-25',
    columnId: 'inprogress',
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
  },
  {
    id: 'card-seed-6',
    title: 'Initialiser le projet Vue 3',
    description: 'Configuration de Vite, TypeScript, Pinia et Tailwind CSS.',
    priority: 'high',
    dueDate: '2026-05-10',
    columnId: 'done',
    createdAt: new Date(Date.now() - 86400000 * 14).toISOString(),
  },
  {
    id: 'card-seed-7',
    title: 'Créer le schéma de base de données',
    description: 'Conception et migration des tables avec relations et contraintes.',
    priority: 'high',
    dueDate: '2026-05-12',
    columnId: 'done',
    createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
  },
  {
    id: 'card-seed-8',
    title: 'Écrire les tests unitaires',
    description: 'Couverture de 80% minimum avec Jest pour les stores et composants clés.',
    priority: 'medium',
    dueDate: '2026-05-15',
    columnId: 'done',
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
]

export const useKanbanStore = defineStore('kanban', () => {
  const COLUMNS: Column[] = [
    { id: 'todo', title: 'À faire', color: '#6366f1' },
    { id: 'inprogress', title: 'En cours', color: '#f59e0b' },
    { id: 'done', title: 'Terminé', color: '#22c55e' },
  ]

  const stored = localStorage.getItem(STORAGE_KEY)
  const cards = ref<Card[]>(stored ? JSON.parse(stored) : SEED_CARDS)

  const selectedCardId = ref<string | null>(null)

  watch(
    cards,
    (val) => localStorage.setItem(STORAGE_KEY, JSON.stringify(val)),
    { deep: true }
  )

  function getCardsByColumn(columnId: ColumnId): Card[] {
    return cards.value.filter((c) => c.columnId === columnId)
  }

  function addCard(columnId: ColumnId, title: string): Card {
    const card: Card = {
      id: generateId(),
      title: title.trim(),
      description: '',
      priority: 'medium',
      dueDate: null,
      columnId,
      createdAt: new Date().toISOString(),
    }
    cards.value.push(card)
    return card
  }

  function updateCard(id: string, updates: Partial<Omit<Card, 'id' | 'createdAt'>>): void {
    const idx = cards.value.findIndex((c) => c.id === id)
    if (idx !== -1) {
      cards.value[idx] = { ...cards.value[idx], ...updates }
    }
  }

  function deleteCard(id: string): void {
    const idx = cards.value.findIndex((c) => c.id === id)
    if (idx !== -1) cards.value.splice(idx, 1)
    if (selectedCardId.value === id) selectedCardId.value = null
  }

  function moveCard(cardId: string, targetColumnId: ColumnId): void {
    const card = cards.value.find((c) => c.id === cardId)
    if (card) card.columnId = targetColumnId
  }

  function selectCard(id: string | null): void {
    selectedCardId.value = id
  }

  function isPastDue(dueDate: string | null): boolean {
    if (!dueDate) return false
    return new Date(dueDate) < new Date(new Date().toDateString())
  }

  function priorityLabel(priority: Priority): string {
    const map: Record<Priority, string> = { low: 'Faible', medium: 'Moyen', high: 'Élevé' }
    return map[priority]
  }

  return {
    COLUMNS,
    cards,
    selectedCardId,
    getCardsByColumn,
    addCard,
    updateCard,
    deleteCard,
    moveCard,
    selectCard,
    isPastDue,
    priorityLabel,
  }
})
