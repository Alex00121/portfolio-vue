<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="card"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="close"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="close" />

        <!-- Modal -->
        <div
          class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10 animate-slideUp"
          @keydown.esc="close"
        >
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 class="font-bold text-gray-800 text-lg tracking-tight">Modifier la carte</h2>
            <button
              class="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
              @click="close"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="px-6 py-5 space-y-4">
            <!-- Title -->
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Titre</label>
              <input
                v-model="form.title"
                type="text"
                maxlength="100"
                placeholder="Titre de la carte"
                class="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl outline-none
                       focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
              />
              <p v-if="!form.title.trim()" class="mt-1 text-xs text-red-500">Le titre est requis</p>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Description</label>
              <textarea
                v-model="form.description"
                rows="3"
                placeholder="Décrivez la tâche..."
                class="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl outline-none
                       focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all resize-none"
              />
            </div>

            <!-- Priority + Due date row -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Priorité</label>
                <select
                  v-model="form.priority"
                  class="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl outline-none
                         focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all bg-white"
                >
                  <option value="low">Faible</option>
                  <option value="medium">Moyen</option>
                  <option value="high">Élevé</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Échéance</label>
                <input
                  v-model="form.dueDate"
                  type="date"
                  class="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl outline-none
                         focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <!-- Column -->
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Colonne</label>
              <div class="flex gap-2">
                <button
                  v-for="col in store.COLUMNS"
                  :key="col.id"
                  class="flex-1 py-2 text-xs font-semibold rounded-xl border-2 transition-all duration-200"
                  :class="form.columnId === col.id
                    ? 'text-white border-transparent'
                    : 'text-gray-500 border-gray-200 hover:border-gray-300'"
                  :style="form.columnId === col.id ? { backgroundColor: col.color, borderColor: col.color } : {}"
                  @click="form.columnId = col.id"
                >
                  {{ col.title }}
                </button>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <button
              class="flex items-center gap-1.5 px-3 py-2 text-sm text-red-500 hover:text-red-700
                     hover:bg-red-50 rounded-xl transition-all duration-200"
              @click="deleteCard"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Supprimer
            </button>
            <div class="flex gap-2">
              <button
                class="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
                @click="close"
              >
                Annuler
              </button>
              <button
                class="px-4 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-xl
                       hover:bg-indigo-700 active:scale-95 transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="!form.title.trim()"
                @click="save"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useKanbanStore } from '../stores/kanban'
import type { ColumnId, Priority } from '../types/kanban'

const store = useKanbanStore()

const card = computed(() =>
  store.selectedCardId ? store.cards.find((c) => c.id === store.selectedCardId) ?? null : null
)

const form = ref({
  title: '',
  description: '',
  priority: 'medium' as Priority,
  dueDate: '',
  columnId: 'todo' as ColumnId,
})

watch(card, (c) => {
  if (c) {
    form.value = {
      title: c.title,
      description: c.description,
      priority: c.priority,
      dueDate: c.dueDate ?? '',
      columnId: c.columnId,
    }
  }
})

function save(): void {
  if (!form.value.title.trim() || !card.value) return
  store.updateCard(card.value.id, {
    title: form.value.title.trim(),
    description: form.value.description.trim(),
    priority: form.value.priority,
    dueDate: form.value.dueDate || null,
    columnId: form.value.columnId,
  })
  close()
}

function deleteCard(): void {
  if (!card.value) return
  if (window.confirm(`Supprimer la carte "${card.value.title}" ?`)) {
    store.deleteCard(card.value.id)
    close()
  }
}

function close(): void {
  store.selectCard(null)
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
