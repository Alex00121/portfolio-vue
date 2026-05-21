<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-slate-900">Limites budgétaires</h2>
        <p class="text-sm text-slate-500">Fixez vos plafonds mensuels par catégorie</p>
      </div>
      <button
        v-if="editingId !== null"
        @click="editingId = null"
        class="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-200"
      >
        Fermer
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div
        v-for="cat in EXPENSE_CATEGORIES"
        :key="cat"
        class="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 hover:shadow-md transition-all duration-200"
      >
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span
              class="w-3 h-3 rounded-full flex-shrink-0"
              :style="{ backgroundColor: CATEGORY_COLORS[cat] }"
            ></span>
            <span class="text-sm font-semibold text-slate-900">{{ cat }}</span>
          </div>
          <button
            @click="startEdit(cat)"
            class="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            title="Modifier le budget"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>

        <!-- Inline edit -->
        <div v-if="editingId === cat" class="mb-3">
          <div class="flex gap-2">
            <div class="relative flex-1">
              <span class="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">€</span>
              <input
                v-model.number="editValue"
                type="number"
                min="1"
                step="10"
                class="w-full pl-7 pr-3 py-2 text-sm border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                @keydown.enter="saveEdit"
                @keydown.escape="editingId = null"
                ref="editInputRef"
              />
            </div>
            <button
              @click="saveEdit"
              class="px-3 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 active:scale-95"
            >
              OK
            </button>
          </div>
        </div>

        <!-- Budget usage -->
        <div>
          <div class="flex justify-between text-xs mb-1.5">
            <span class="font-medium text-slate-700">
              {{ fmt(getBudgetUsage(cat).spent) }}
              <span class="text-slate-400 font-normal"> / {{ fmt(getBudgetUsage(cat).limit) }}</span>
            </span>
            <span
              :class="[
                'font-semibold',
                getBudgetUsage(cat).pct >= 100 ? 'text-red-600' :
                getBudgetUsage(cat).pct >= 75 ? 'text-amber-500' :
                'text-emerald-600'
              ]"
            >
              {{ getBudgetUsage(cat).pct }}%
            </span>
          </div>
          <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              class="h-2 rounded-full transition-all duration-500"
              :style="{
                width: `${getBudgetUsage(cat).pct}%`,
                backgroundColor:
                  getBudgetUsage(cat).pct >= 100 ? '#ef4444' :
                  getBudgetUsage(cat).pct >= 75 ? '#f59e0b' :
                  CATEGORY_COLORS[cat]
              }"
            ></div>
          </div>
          <p
            v-if="getBudgetUsage(cat).pct >= 100"
            class="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1"
          >
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            Plafond dépassé !
          </p>
          <p
            v-else-if="getBudgetUsage(cat).pct >= 75"
            class="text-xs text-amber-600 mt-1.5"
          >
            Attention, bientôt atteint
          </p>
          <p v-else-if="getBudgetUsage(cat).limit === 0" class="text-xs text-slate-400 mt-1.5">
            Aucun plafond défini
          </p>
          <p v-else class="text-xs text-slate-400 mt-1.5">
            {{ fmt(Math.max(0, getBudgetUsage(cat).limit - getBudgetUsage(cat).spent)) }} restants
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { useFinanceStore } from '../stores/financeStore'
import type { Category } from '../types'
import { CATEGORY_COLORS, EXPENSE_CATEGORIES } from '../types'

const store = useFinanceStore()

const editingId = ref<Category | null>(null)
const editValue = ref(0)
const editInputRef = ref<HTMLInputElement | null>(null)

function getBudgetUsage(cat: Category) {
  return store.getBudgetUsage(cat)
}

function startEdit(cat: Category) {
  editingId.value = cat
  editValue.value = getBudgetUsage(cat).limit || 200
  nextTick(() => editInputRef.value?.focus())
}

function saveEdit() {
  if (editingId.value && editValue.value > 0) {
    store.updateBudget(editingId.value, editValue.value)
  }
  editingId.value = null
}

function fmt(n: number): string {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}
</script>
