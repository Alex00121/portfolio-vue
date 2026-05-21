<template>
  <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
    <!-- Toolbar -->
    <div class="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
      <h2 class="text-lg font-bold text-slate-900">Toutes les transactions</h2>
      <div class="flex gap-2 flex-wrap">
        <select
          v-model="filterType"
          class="px-3 py-2 text-sm border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-all duration-200"
        >
          <option value="all">Tous les types</option>
          <option value="income">Revenus</option>
          <option value="expense">Dépenses</option>
        </select>
        <select
          v-model="filterCategory"
          class="px-3 py-2 text-sm border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-all duration-200"
        >
          <option value="all">Toutes catégories</option>
          <option v-for="cat in allCategories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="bg-slate-50 text-left">
            <th
              v-for="col in columns"
              :key="col.field"
              @click="sortBy(col.field)"
              class="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer select-none hover:text-slate-700 transition-colors duration-200"
            >
              <div class="flex items-center gap-1">
                {{ col.label }}
                <svg
                  class="w-3 h-3 transition-transform duration-200"
                  :class="{
                    'opacity-0': sort.field !== col.field,
                    'rotate-180': sort.field === col.field && sort.direction === 'asc'
                  }"
                  fill="currentColor" viewBox="0 0 20 20"
                >
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </div>
            </th>
            <th class="px-5 py-3"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">
          <tr
            v-if="paginatedRows.length === 0"
            class="text-center"
          >
            <td colspan="5" class="py-12 text-slate-400 text-sm">
              <div class="flex flex-col items-center gap-2">
                <svg class="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p>Aucune transaction trouvée</p>
              </div>
            </td>
          </tr>
          <tr
            v-for="tx in paginatedRows"
            :key="tx.id"
            class="hover:bg-slate-50 transition-colors duration-150 group"
          >
            <td class="px-5 py-3.5">
              <span
                :class="[
                  'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold',
                  tx.type === 'income' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                ]"
              >
                <span :class="['w-1.5 h-1.5 rounded-full', tx.type === 'income' ? 'bg-emerald-500' : 'bg-red-500']"></span>
                {{ tx.type === 'income' ? 'Revenu' : 'Dépense' }}
              </span>
            </td>
            <td class="px-5 py-3.5">
              <div>
                <p class="text-sm font-medium text-slate-900">{{ tx.description }}</p>
                <p class="text-xs text-slate-400">{{ formatDate(tx.date) }}</p>
              </div>
            </td>
            <td class="px-5 py-3.5">
              <span
                class="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-md"
                :style="{ backgroundColor: hexToRgba(CATEGORY_COLORS[tx.category], 0.1), color: CATEGORY_COLORS[tx.category] }"
              >
                <span class="w-1.5 h-1.5 rounded-full" :style="{ backgroundColor: CATEGORY_COLORS[tx.category] }"></span>
                {{ tx.category }}
              </span>
            </td>
            <td class="px-5 py-3.5">
              <span
                :class="[
                  'text-sm font-bold tabular-nums',
                  tx.type === 'income' ? 'text-emerald-600' : 'text-red-600'
                ]"
              >
                {{ tx.type === 'income' ? '+' : '-' }}{{ fmt(tx.amount) }}
              </span>
            </td>
            <td class="px-5 py-3.5 text-right">
              <button
                @click="confirmDelete(tx.id)"
                class="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="px-5 py-4 border-t border-slate-100 flex items-center justify-between">
      <p class="text-sm text-slate-500">
        {{ filteredRows.length }} transaction{{ filteredRows.length > 1 ? 's' : '' }}
      </p>
      <div class="flex gap-1">
        <button
          @click="page = Math.max(1, page - 1)"
          :disabled="page === 1"
          class="px-3 py-1.5 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
        >
          ←
        </button>
        <span class="px-3 py-1.5 text-sm text-slate-700 font-medium">{{ page }} / {{ totalPages }}</span>
        <button
          @click="page = Math.min(totalPages, page + 1)"
          :disabled="page === totalPages"
          class="px-3 py-1.5 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
        >
          →
        </button>
      </div>
    </div>

    <!-- Delete confirmation modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="pendingDeleteId" class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div class="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full">
            <h3 class="text-lg font-bold text-slate-900 mb-2">Supprimer la transaction ?</h3>
            <p class="text-sm text-slate-500 mb-5">Cette action est irréversible.</p>
            <div class="flex gap-3 justify-end">
              <button @click="pendingDeleteId = null" class="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all duration-200">
                Annuler
              </button>
              <button @click="doDelete" class="px-4 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl transition-all duration-200 active:scale-95">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useFinanceStore } from '../stores/financeStore'
import type { Category, SortConfig } from '../types'
import { CATEGORY_COLORS, EXPENSE_CATEGORIES } from '../types'

const store = useFinanceStore()

const filterType = ref<'all' | 'income' | 'expense'>('all')
const filterCategory = ref<'all' | Category>('all')
const sort = ref<SortConfig>({ field: 'date', direction: 'desc' })
const page = ref(1)
const PER_PAGE = 10
const pendingDeleteId = ref<string | null>(null)

const allCategories = [...EXPENSE_CATEGORIES]

const columns = [
  { field: 'type' as const, label: 'Type' },
  { field: 'description' as const, label: 'Description' },
  { field: 'category' as const, label: 'Catégorie' },
  { field: 'amount' as const, label: 'Montant' },
]

function sortBy(field: SortConfig['field']) {
  if (sort.value.field === field) {
    sort.value.direction = sort.value.direction === 'asc' ? 'desc' : 'asc'
  } else {
    sort.value = { field, direction: 'desc' }
  }
  page.value = 1
}

const filteredRows = computed(() => {
  let rows = [...store.transactions]
  if (filterType.value !== 'all') rows = rows.filter((t) => t.type === filterType.value)
  if (filterCategory.value !== 'all') rows = rows.filter((t) => t.category === filterCategory.value)
  rows.sort((a, b) => {
    const av = a[sort.value.field] as string | number
    const bv = b[sort.value.field] as string | number
    const dir = sort.value.direction === 'asc' ? 1 : -1
    return av < bv ? -dir : av > bv ? dir : 0
  })
  return rows
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredRows.value.length / PER_PAGE)))

watch(filteredRows, () => { page.value = 1 })

const paginatedRows = computed(() => {
  const start = (page.value - 1) * PER_PAGE
  return filteredRows.value.slice(start, start + PER_PAGE)
})

function fmt(n: number): string {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n)
}

function formatDate(d: string): string {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

function confirmDelete(id: string) {
  pendingDeleteId.value = id
}

function doDelete() {
  if (pendingDeleteId.value) {
    store.deleteTransaction(pendingDeleteId.value)
    pendingDeleteId.value = null
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
