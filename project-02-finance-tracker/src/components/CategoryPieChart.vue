<template>
  <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 fade-in-up fade-in-up-delay-4">
    <div class="mb-4">
      <h3 class="text-base font-bold text-slate-900">Dépenses par catégorie</h3>
      <p class="text-xs text-slate-500">Mois en cours</p>
    </div>

    <div v-if="hasData">
      <Doughnut :data="chartData" :options="chartOptions" class="max-h-48 mx-auto" />
      <div class="mt-4 space-y-2">
        <div
          v-for="item in legendItems"
          :key="item.label"
          class="flex items-center justify-between text-xs"
        >
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-sm flex-shrink-0" :style="{ backgroundColor: item.color }"></span>
            <span class="text-slate-600 truncate max-w-28">{{ item.label }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-semibold text-slate-900">{{ fmt(item.value) }}</span>
            <span class="text-slate-400 w-9 text-right">{{ item.pct }}%</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col items-center justify-center py-10 text-slate-400">
      <svg class="w-10 h-10 text-slate-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
      <p class="text-sm">Aucune dépense ce mois</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useFinanceStore } from '../stores/financeStore'
import { CATEGORY_COLORS } from '../types'
import type { Category } from '../types'

ChartJS.register(ArcElement, Tooltip, Legend)

const store = useFinanceStore()

const hasData = computed(() => Object.keys(store.expensesByCategory).length > 0)

const sorted = computed(() => {
  return Object.entries(store.expensesByCategory)
    .sort(([, a], [, b]) => b - a)
    .map(([cat, val]) => ({ cat: cat as Category, val }))
})

const total = computed(() => sorted.value.reduce((s, i) => s + i.val, 0))

const legendItems = computed(() =>
  sorted.value.map(({ cat, val }) => ({
    label: cat,
    value: val,
    color: CATEGORY_COLORS[cat],
    pct: total.value > 0 ? Math.round((val / total.value) * 100) : 0,
  }))
)

const chartData = computed(() => ({
  labels: sorted.value.map((i) => i.cat),
  datasets: [
    {
      data: sorted.value.map((i) => i.val),
      backgroundColor: sorted.value.map((i) => CATEGORY_COLORS[i.cat]),
      borderColor: '#ffffff',
      borderWidth: 2,
      hoverOffset: 6,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  cutout: '65%',
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx: { label: string; parsed: number }) => {
          const pct = total.value > 0 ? Math.round((ctx.parsed / total.value) * 100) : 0
          return ` ${ctx.label}: ${fmt(ctx.parsed)} (${pct}%)`
        },
      },
    },
  },
}

function fmt(n: number): string {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}
</script>
