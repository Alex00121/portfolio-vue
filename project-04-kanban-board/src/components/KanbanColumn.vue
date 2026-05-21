<template>
  <div
    class="flex flex-col w-80 shrink-0 bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-200"
    :class="isDropTarget ? 'ring-2 ring-offset-2 ring-indigo-400 bg-indigo-50/40' : ''"
    @dragover.prevent="onDragOver"
    @dragleave="onDragLeave"
    @drop.prevent="onDrop"
  >
    <div class="flex items-center justify-between px-4 py-3.5 border-b border-gray-100">
      <div class="flex items-center gap-2.5">
        <div class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: column.color }" />
        <h2 class="font-bold text-gray-800 tracking-tight">{{ column.title }}</h2>
        <span
          class="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold text-white"
          :style="{ backgroundColor: column.color }"
        >{{ cards.length }}</span>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto px-3 py-3 space-y-2.5 min-h-[120px]">
      <KanbanCard
        v-for="card in cards"
        :key="card.id"
        :card="card"
        @drag-start="$emit('drag-start', $event)"
        @drag-end="$emit('drag-end')"
      />

      <div
        v-if="cards.length === 0 && !isDropTarget"
        class="flex flex-col items-center justify-center py-8 text-center"
      >
        <div class="text-3xl mb-2">📭</div>
        <p class="text-xs text-gray-400">Aucune carte ici</p>
        <p class="text-xs text-gray-300">Glissez une carte ou ajoutez-en une</p>
      </div>

      <div
        v-if="isDropTarget"
        class="h-16 rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50 flex items-center justify-center"
      >
        <p class="text-xs text-indigo-400 font-medium">Déposer ici</p>
      </div>
    </div>

    <div class="px-3 pb-3">
      <div v-if="!isAdding">
        <button
          class="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-400
                 hover:text-gray-600 hover:bg-gray-50 transition-all duration-200 active:scale-95"
          @click="startAdding"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Ajouter une carte
        </button>
      </div>

      <div v-else class="space-y-2 animate-slideUp">
        <input
          ref="addInputRef"
          v-model="newCardTitle"
          type="text"
          placeholder="Titre de la carte..."
          maxlength="100"
          class="w-full px-3 py-2 text-sm border border-indigo-300 rounded-xl outline-none
                 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
          @keydown.enter="saveCard"
          @keydown.esc="cancelAdding"
        />
        <div class="flex gap-2">
          <button
            class="flex-1 py-1.5 text-xs font-semibold bg-indigo-600 text-white rounded-lg
                   hover:bg-indigo-700 active:scale-95 transition-all duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="!newCardTitle.trim()"
            @click="saveCard"
          >
            Ajouter
          </button>
          <button
            class="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100
                   rounded-lg transition-all duration-200"
            @click="cancelAdding"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import KanbanCard from './KanbanCard.vue'
import { useKanbanStore } from '../stores/kanban'
import type { Card, Column } from '../types/kanban'

const props = defineProps<{
  column: Column
  cards: Card[]
  draggingCardId: string | null
}>()

const emit = defineEmits<{
  (e: 'drag-start', cardId: string): void
  (e: 'drag-end'): void
}>()

const store = useKanbanStore()
const isDropTarget = ref(false)
const isAdding = ref(false)
const newCardTitle = ref('')
const addInputRef = ref<HTMLInputElement | null>(null)

function onDragOver(): void {
  if (props.draggingCardId && !isDropTarget.value) isDropTarget.value = true
}

function onDragLeave(): void {
  isDropTarget.value = false
}

function onDrop(e: DragEvent): void {
  isDropTarget.value = false
  const cardId = e.dataTransfer?.getData('text/plain')
  if (cardId) store.moveCard(cardId, props.column.id)
}

async function startAdding(): Promise<void> {
  isAdding.value = true
  await nextTick()
  addInputRef.value?.focus()
}

function saveCard(): void {
  if (!newCardTitle.value.trim()) return
  store.addCard(props.column.id, newCardTitle.value)
  newCardTitle.value = ''
  isAdding.value = false
}

function cancelAdding(): void {
  newCardTitle.value = ''
  isAdding.value = false
}
</script>
