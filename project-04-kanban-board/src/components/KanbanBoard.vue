<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-50">
    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-md border-b border-white/60 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
          </div>
          <div>
            <h1 class="font-extrabold text-gray-900 text-xl tracking-tight">Kanban Board</h1>
            <p class="text-xs text-gray-500">Glissez-déposez pour organiser vos tâches</p>
          </div>
        </div>

        <div class="hidden sm:flex items-center gap-4">
          <div
            v-for="col in store.COLUMNS"
            :key="col.id"
            class="flex items-center gap-1.5 text-sm"
          >
            <div class="w-2 h-2 rounded-full" :style="{ backgroundColor: col.color }" />
            <span class="text-gray-500">{{ col.title }}</span>
            <span class="font-bold text-gray-800">{{ store.getCardsByColumn(col.id).length }}</span>
          </div>
          <div class="h-4 w-px bg-gray-200 mx-1" />
          <span class="text-xs text-gray-400 font-medium">{{ store.cards.length }} cartes au total</span>
        </div>

        <div class="hidden lg:flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
          <kbd class="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-gray-500 font-mono text-xs shadow-sm">Suppr</kbd>
          <span>supprime la carte sélectionnée</span>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-8">
      <div class="flex gap-6 overflow-x-auto pb-4">
        <KanbanColumn
          v-for="col in store.COLUMNS"
          :key="col.id"
          :column="col"
          :cards="store.getCardsByColumn(col.id)"
          :dragging-card-id="draggingCardId"
          @drag-start="draggingCardId = $event"
          @drag-end="draggingCardId = null"
        />
      </div>
    </main>

    <CardModal />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useKanbanStore } from '../stores/kanban'
import KanbanColumn from './KanbanColumn.vue'
import CardModal from './CardModal.vue'

const store = useKanbanStore()
const draggingCardId = ref<string | null>(null)

function onKeyDown(e: KeyboardEvent): void {
  if (e.key === 'Delete' && store.selectedCardId) {
    const card = store.cards.find((c) => c.id === store.selectedCardId)
    if (card && window.confirm(`Supprimer la carte "${card.title}" ?`)) {
      store.deleteCard(store.selectedCardId)
    }
  }
  if (e.key === 'Escape') {
    store.selectCard(null)
  }
}

onMounted(() => window.addEventListener('keydown', onKeyDown))
onUnmounted(() => window.removeEventListener('keydown', onKeyDown))
</script>
