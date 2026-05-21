<template>
  <div class="min-h-screen bg-slate-100">
    <!-- Header -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 class="text-lg font-bold text-slate-900 leading-tight">Finance Tracker</h1>
              <p class="text-xs text-slate-500 leading-tight">{{ currentMonthLabel }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="store.exportCSV()"
              class="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all duration-200 active:scale-95"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Exporter CSV
            </button>
            <button
              @click="showForm = !showForm"
              class="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 active:scale-95 shadow-sm"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span class="hidden sm:inline">Ajouter</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Tab nav -->
    <div class="bg-white border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="flex gap-1 -mb-px">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200',
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            ]"
          >
            {{ tab.label }}
          </button>
        </nav>
      </div>
    </div>

    <!-- Main content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Transaction form slide-in -->
      <Transition name="slide-down">
        <TransactionForm v-if="showForm" @close="showForm = false" class="mb-6" />
      </Transition>

      <!-- Tab: Tableau de bord -->
      <div v-if="activeTab === 'dashboard'">
        <KpiCards class="mb-8" />
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div class="lg:col-span-2">
            <MonthlyChart />
          </div>
          <div>
            <CategoryPieChart />
          </div>
        </div>
      </div>

      <!-- Tab: Transactions -->
      <div v-if="activeTab === 'transactions'">
        <TransactionList />
      </div>

      <!-- Tab: Budgets -->
      <div v-if="activeTab === 'budgets'">
        <BudgetLimits />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFinanceStore } from './stores/financeStore'
import KpiCards from './components/KpiCards.vue'
import TransactionForm from './components/TransactionForm.vue'
import TransactionList from './components/TransactionList.vue'
import MonthlyChart from './components/MonthlyChart.vue'
import CategoryPieChart from './components/CategoryPieChart.vue'
import BudgetLimits from './components/BudgetLimits.vue'

const store = useFinanceStore()
const showForm = ref(false)
const activeTab = ref<'dashboard' | 'transactions' | 'budgets'>('dashboard')

const tabs = [
  { id: 'dashboard' as const, label: 'Tableau de bord' },
  { id: 'transactions' as const, label: 'Transactions' },
  { id: 'budgets' as const, label: 'Budgets' },
]

const currentMonthLabel = computed(() => {
  const now = new Date()
  return now.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
})
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
