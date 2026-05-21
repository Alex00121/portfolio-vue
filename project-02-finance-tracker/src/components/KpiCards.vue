<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
    <div
      v-for="(card, i) in cards"
      :key="card.label"
      :class="`fade-in-up fade-in-up-delay-${i + 1} bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`"
    >
      <div class="flex items-start justify-between mb-3">
        <div :class="`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center`">
          <component :is="card.icon" class="w-5 h-5" :class="card.iconColor" />
        </div>
        <span
          :class="[
            'flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full',
            card.trend >= 0 ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50'
          ]"
        >
          <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" :d="card.trend >= 0 ? 'M5 10l7-7m0 0l7 7m-7-7v18' : 'M19 14l-7 7m0 0l-7-7m7 7V3'" />
          </svg>
          {{ Math.abs(card.trend) }}{{ card.trendUnit }}
        </span>
      </div>
      <p class="text-2xl font-extrabold text-slate-900 tracking-tight">
        {{ card.value }}
      </p>
      <p class="text-sm text-slate-500 mt-0.5">{{ card.label }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, h } from 'vue'
import { useFinanceStore } from '../stores/financeStore'

const store = useFinanceStore()

function fmt(n: number): string {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

function trendDiff(current: number, prev: number): number {
  if (prev === 0) return 0
  return Math.round(((current - prev) / prev) * 100)
}

const ArrowUpIcon = defineComponent({
  render: () =>
    h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M12 2v20M2 12l10-10 10 10' }),
    ]),
})

const cards = computed(() => [
  {
    label: 'Revenus du mois',
    value: fmt(store.currentIncome),
    trend: trendDiff(store.currentIncome, store.prevIncome),
    trendUnit: '%',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    icon: {
      render: () =>
        h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }),
        ]),
    },
  },
  {
    label: 'Dépenses du mois',
    value: fmt(store.currentExpenses),
    trend: -trendDiff(store.currentExpenses, store.prevExpenses),
    trendUnit: '%',
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
    icon: {
      render: () =>
        h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' }),
        ]),
    },
  },
  {
    label: 'Solde',
    value: fmt(store.currentBalance),
    trend: trendDiff(store.currentBalance, store.prevBalance),
    trendUnit: '%',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    icon: {
      render: () =>
        h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' }),
        ]),
    },
  },
  {
    label: "Taux d'épargne",
    value: `${store.currentSavingsRate}%`,
    trend: store.currentSavingsRate - store.prevSavingsRate,
    trendUnit: 'pt',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    icon: {
      render: () =>
        h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' }),
        ]),
    },
  },
])
</script>
