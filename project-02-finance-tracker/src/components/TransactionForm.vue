<template>
  <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
    <div class="flex items-center justify-between mb-5">
      <h2 class="text-lg font-bold text-slate-900">Nouvelle transaction</h2>
      <button
        @click="$emit('close')"
        class="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all duration-200"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <form @submit.prevent="submit" class="space-y-4">
      <!-- Type toggle -->
      <div class="flex rounded-xl border border-slate-200 p-1 gap-1">
        <button
          type="button"
          @click="form.type = 'expense'"
          :class="[
            'flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200',
            form.type === 'expense'
              ? 'bg-red-500 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-50'
          ]"
        >
          Dépense
        </button>
        <button
          type="button"
          @click="form.type = 'income'"
          :class="[
            'flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200',
            form.type === 'income'
              ? 'bg-emerald-500 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-50'
          ]"
        >
          Revenu
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Amount -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Montant (€)</label>
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">€</span>
            <input
              v-model.number="form.amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0,00"
              required
              class="w-full pl-8 pr-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <p v-if="errors.amount" class="text-xs text-red-500 mt-1">{{ errors.amount }}</p>
        </div>

        <!-- Date -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Date</label>
          <input
            v-model="form.date"
            type="date"
            required
            :max="todayStr"
            class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        <!-- Category -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Catégorie</label>
          <select
            v-model="form.category"
            required
            class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
          >
            <option v-for="cat in availableCategories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Description</label>
          <input
            v-model="form.description"
            type="text"
            placeholder="Ex: Courses au supermarché"
            required
            maxlength="100"
            class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          <p v-if="errors.description" class="text-xs text-red-500 mt-1">{{ errors.description }}</p>
        </div>
      </div>

      <div class="flex justify-end gap-3 pt-2">
        <button
          type="button"
          @click="$emit('close')"
          class="px-5 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all duration-200 active:scale-95"
        >
          Annuler
        </button>
        <button
          type="submit"
          :disabled="submitting"
          :class="[
            'px-6 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-200 active:scale-95 shadow-sm',
            form.type === 'income' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700',
            submitting ? 'opacity-60 cursor-not-allowed' : ''
          ]"
        >
          {{ submitting ? 'Ajout...' : 'Ajouter' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, reactive, ref, watch } from 'vue'
import { useFinanceStore } from '../stores/financeStore'
import type { Category, TransactionType } from '../types'
import { EXPENSE_CATEGORIES } from '../types'

const emit = defineEmits<{ close: [] }>()
const store = useFinanceStore()

const todayStr = new Date().toISOString().slice(0, 10)

const form = reactive({
  type: 'expense' as TransactionType,
  amount: null as number | null,
  category: 'Alimentation' as Category,
  description: '',
  date: todayStr,
})

const errors = reactive({ amount: '', description: '' })
const submitting = ref(false)
let closeTimer: ReturnType<typeof setTimeout> | null = null
onUnmounted(() => { if (closeTimer) clearTimeout(closeTimer) })

const availableCategories = computed(() =>
  form.type === 'income' ? (['Autre'] as Category[]) : EXPENSE_CATEGORIES
)

watch(() => form.type, () => {
  form.category = form.type === 'income' ? 'Autre' : 'Alimentation'
})

function validate(): boolean {
  errors.amount = ''
  errors.description = ''
  let valid = true
  if (!form.amount || form.amount <= 0) {
    errors.amount = 'Le montant doit être supérieur à 0'
    valid = false
  }
  if (!form.description.trim()) {
    errors.description = 'La description est obligatoire'
    valid = false
  }
  return valid
}

function submit() {
  if (!validate()) return
  submitting.value = true
  store.addTransaction({
    type: form.type,
    amount: form.amount!,
    category: form.category,
    description: form.description.trim(),
    date: form.date,
  })
  closeTimer = setTimeout(() => {
    submitting.value = false
    emit('close')
  }, 300)
}
</script>
