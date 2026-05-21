<template>
  <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 fade-in-up fade-in-up-delay-3">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="text-base font-bold text-slate-900">Revenus vs Dépenses</h3>
        <p class="text-xs text-slate-500">6 derniers mois</p>
      </div>
      <div class="flex items-center gap-4 text-xs font-medium text-slate-500">
        <span class="flex items-center gap-1.5">
          <span class="w-3 h-3 rounded-sm bg-emerald-400"></span>Revenus
        </span>
        <span class="flex items-center gap-1.5">
          <span class="w-3 h-3 rounded-sm bg-red-400"></span>Dépenses
        </span>
      </div>
    </div>
    <Bar :data="chartData" :options="chartOptions" class="max-h-64" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { useFinanceStore } from '../stores/financeStore'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const store = useFinanceStore()

const chartData = computed(() => ({
  labels: store.last6MonthsData.map((m) => m.label),
  datasets: [
    {
      label: 'Revenus',
      data: store.last6MonthsData.map((m) => m.income),
      backgroundColor: 'rgba(52, 211, 153, 0.8)',
      borderColor: 'rgb(52, 211, 153)',
      borderWidth: 2,
      borderRadius: 6,
      borderSkipped: false,
    },
    {
      label: 'Dépenses',
      data: store.last6MonthsData.map((m) => m.expenses),
      backgroundColor: 'rgba(248, 113, 113, 0.8)',
      borderColor: 'rgb(248, 113, 113)',
      borderWidth: 2,
      borderRadius: 6,
      borderSkipped: false,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx: { dataset: { label: string }; parsed: { y: number } }) => {
          const val = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(ctx.parsed.y)
          return ` ${ctx.dataset.label}: ${val}`
        },
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#94a3b8', font: { size: 12 } },
    },
    y: {
      grid: { color: '#f1f5f9' },
      ticks: {
        color: '#94a3b8',
        font: { size: 11 },
        callback: (v: number | string) =>
          new Intl.NumberFormat('fr-FR', { notation: 'compact', currency: 'EUR', style: 'currency', maximumFractionDigits: 0 }).format(Number(v)),
      },
    },
  },
}
</script>
