<template>
  <div
    :draggable="true"
    class="group relative bg-white rounded-xl border border-gray-100 shadow-sm cursor-grab active:cursor-grabbing
           transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 animate-slideUp"
    :class="[priorityBorderClass, isDragging ? 'opacity-40 scale-95' : '']"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
    @keydown.delete.stop="onDeleteKey"
    :tabindex="0"
    @click="store.selectCard(card.id)"
  >
    <!-- Priority left border accent -->
    <div class="absolute left-0 top-2 bottom-2 w-1 rounded-full" :class="priorityBarClass" />

    <div class="pl-4 pr-3 py-3">
      <!-- Header: title + action icons -->
      <div class="flex items-start justify-between gap-2">
        <h3 class="text-sm font-semibold text-gray-800 leading-snug flex-1 line-clamp-2">
          {{ card.title }}
        </h3>
        <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0">
          <button
            class="p-1 rounded-md hover:bg-indigo-50 text-gray-400 hover:text-indigo-600 transition-colors"
            title="Modifier"
            @click.stop="store.selectCard(card.id)"
          >
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            class="p-1 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
            title="Supprimer"
            @click.stop="confirmDelete"
          >
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Description preview -->
      <p v-if="card.description" class="mt-1 text-xs text-gray-500 line-clamp-2 leading-relaxed">
        {{ card.description }}
      </p>

      <!-- Footer: priority badge + due date -->
      <div class="mt-2.5 flex items-center gap-2 flex-wrap">
        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" :class="priorityBadgeClass">
          {{ store.priorityLabel(card.priority) }}
        </span>
        <span
          v-if="card.dueDate"
          class="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
          :class="store.isPastDue(card.dueDate) ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'"
        >
          <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {{ formatDate(card.dueDate) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useKanbanStore } from '../stores/kanban'
import type { Card } from '../types/kanban'

const props = defineProps<{ card: Card }>()
const emit = defineEmits<{ (e: 'drag-start', cardId: string): void; (e: 'drag-end'): void }>()

const store = useKanbanStore()
const isDragging = ref(false)

const priorityBorderClass = computed(() => ({
  'border-l-red-400': props.card.priority === 'high',
  'border-l-amber-400': props.card.priority === 'medium',
  'border-l-emerald-400': props.card.priority === 'low',
}))

const priorityBarClass = computed(() => ({
  'bg-red-400': props.card.priority === 'high',
  'bg-amber-400': props.card.priority === 'medium',
  'bg-emerald-400': props.card.priority === 'low',
}))

const priorityBadgeClass = computed(() => ({
  'bg-red-100 text-red-700': props.card.priority === 'high',
  'bg-amber-100 text-amber-700': props.card.priority === 'medium',
  'bg-emerald-100 text-emerald-700': props.card.priority === 'low',
}))

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })
}

function onDragStart(e: DragEvent): void {
  isDragging.value = true
  e.dataTransfer?.setData('text/plain', props.card.id)
  emit('drag-start', props.card.id)
}

function onDragEnd(): void {
  isDragging.value = false
  emit('drag-end')
}

function onDeleteKey(): void {
  confirmDelete()
}

function confirmDelete(): void {
  if (window.confirm(`Supprimer la carte "${props.card.title}" ?`)) {
    store.deleteCard(props.card.id)
  }
}
</script>
