import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { BudgetLimit, Category, Transaction, TransactionType } from '../types'
import { EXPENSE_CATEGORIES } from '../types'

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function getMonthKey(date: string): string {
  return date.slice(0, 7) // YYYY-MM
}

const SEED_TRANSACTIONS: Transaction[] = [
  { id: '1', type: 'income', amount: 3200, category: 'Autre', description: 'Salaire avril', date: '2026-04-01', createdAt: '2026-04-01T08:00:00Z' },
  { id: '2', type: 'income', amount: 450, category: 'Autre', description: 'Freelance design', date: '2026-04-12', createdAt: '2026-04-12T10:00:00Z' },
  { id: '3', type: 'expense', amount: 850, category: 'Logement', description: 'Loyer avril', date: '2026-04-03', createdAt: '2026-04-03T09:00:00Z' },
  { id: '4', type: 'expense', amount: 124.50, category: 'Alimentation', description: 'Courses Carrefour', date: '2026-04-07', createdAt: '2026-04-07T11:00:00Z' },
  { id: '5', type: 'expense', amount: 78, category: 'Transport', description: 'Abonnement SNCF', date: '2026-04-02', createdAt: '2026-04-02T09:00:00Z' },
  { id: '6', type: 'expense', amount: 45, category: 'Loisirs', description: 'Netflix + Spotify', date: '2026-04-05', createdAt: '2026-04-05T10:00:00Z' },
  { id: '7', type: 'expense', amount: 230, category: 'Shopping', description: 'Vêtements H&M', date: '2026-04-15', createdAt: '2026-04-15T14:00:00Z' },
  { id: '8', type: 'expense', amount: 65, category: 'Santé', description: 'Pharmacie', date: '2026-04-18', createdAt: '2026-04-18T16:00:00Z' },
  { id: '9', type: 'income', amount: 3200, category: 'Autre', description: 'Salaire mars', date: '2026-03-01', createdAt: '2026-03-01T08:00:00Z' },
  { id: '10', type: 'expense', amount: 850, category: 'Logement', description: 'Loyer mars', date: '2026-03-03', createdAt: '2026-03-03T09:00:00Z' },
  { id: '11', type: 'expense', amount: 98.30, category: 'Alimentation', description: 'Marché bio', date: '2026-03-10', createdAt: '2026-03-10T11:00:00Z' },
  { id: '12', type: 'expense', amount: 78, category: 'Transport', description: 'Abonnement SNCF', date: '2026-03-02', createdAt: '2026-03-02T09:00:00Z' },
  { id: '13', type: 'expense', amount: 320, category: 'Éducation', description: 'Formation Udemy', date: '2026-03-20', createdAt: '2026-03-20T10:00:00Z' },
  { id: '14', type: 'income', amount: 3200, category: 'Autre', description: 'Salaire février', date: '2026-02-01', createdAt: '2026-02-01T08:00:00Z' },
  { id: '15', type: 'expense', amount: 850, category: 'Logement', description: 'Loyer février', date: '2026-02-03', createdAt: '2026-02-03T09:00:00Z' },
  { id: '16', type: 'expense', amount: 142, category: 'Alimentation', description: 'Courses Leclerc', date: '2026-02-08', createdAt: '2026-02-08T11:00:00Z' },
  { id: '17', type: 'expense', amount: 78, category: 'Transport', description: 'Abonnement SNCF', date: '2026-02-02', createdAt: '2026-02-02T09:00:00Z' },
  { id: '18', type: 'income', amount: 3200, category: 'Autre', description: 'Salaire janvier', date: '2026-01-01', createdAt: '2026-01-01T08:00:00Z' },
  { id: '19', type: 'expense', amount: 850, category: 'Logement', description: 'Loyer janvier', date: '2026-01-03', createdAt: '2026-01-03T09:00:00Z' },
  { id: '20', type: 'expense', amount: 156, category: 'Alimentation', description: 'Réveillon + courses', date: '2026-01-05', createdAt: '2026-01-05T11:00:00Z' },
  { id: '21', type: 'income', amount: 3200, category: 'Autre', description: 'Salaire décembre', date: '2025-12-01', createdAt: '2025-12-01T08:00:00Z' },
  { id: '22', type: 'expense', amount: 850, category: 'Logement', description: 'Loyer décembre', date: '2025-12-03', createdAt: '2025-12-03T09:00:00Z' },
  { id: '23', type: 'expense', amount: 210, category: 'Shopping', description: 'Cadeaux Noël', date: '2025-12-20', createdAt: '2025-12-20T14:00:00Z' },
  { id: '24', type: 'income', amount: 3200, category: 'Autre', description: 'Salaire novembre', date: '2025-11-01', createdAt: '2025-11-01T08:00:00Z' },
  { id: '25', type: 'expense', amount: 850, category: 'Logement', description: 'Loyer novembre', date: '2025-11-03', createdAt: '2025-11-03T09:00:00Z' },
  { id: '26', type: 'expense', amount: 112, category: 'Alimentation', description: 'Courses semaine', date: '2025-11-09', createdAt: '2025-11-09T11:00:00Z' },
  // May 2026
  { id: '27', type: 'income', amount: 3200, category: 'Autre', description: 'Salaire mai', date: '2026-05-01', createdAt: '2026-05-01T08:00:00Z' },
  { id: '28', type: 'expense', amount: 850, category: 'Logement', description: 'Loyer mai', date: '2026-05-03', createdAt: '2026-05-03T09:00:00Z' },
  { id: '29', type: 'expense', amount: 89.60, category: 'Alimentation', description: 'Monoprix', date: '2026-05-10', createdAt: '2026-05-10T11:00:00Z' },
  { id: '30', type: 'expense', amount: 78, category: 'Transport', description: 'Abonnement SNCF', date: '2026-05-02', createdAt: '2026-05-02T09:00:00Z' },
]

const DEFAULT_BUDGETS: BudgetLimit[] = EXPENSE_CATEGORIES.map((cat) => ({
  category: cat,
  limit: cat === 'Logement' ? 1000 : cat === 'Alimentation' ? 300 : cat === 'Transport' ? 150 : 200,
}))

export const useFinanceStore = defineStore(
  'finance',
  () => {
    const transactions = ref<Transaction[]>(SEED_TRANSACTIONS)
    const budgets = ref<BudgetLimit[]>(DEFAULT_BUDGETS)

    const currentMonthKey = computed(() => {
      const now = new Date()
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    })

    const previousMonthKey = computed(() => {
      const now = new Date()
      const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      return `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, '0')}`
    })

    const currentMonthTransactions = computed(() =>
      transactions.value.filter((t) => getMonthKey(t.date) === currentMonthKey.value)
    )

    const previousMonthTransactions = computed(() =>
      transactions.value.filter((t) => getMonthKey(t.date) === previousMonthKey.value)
    )

    function sumByType(txs: Transaction[], type: TransactionType): number {
      return txs.filter((t) => t.type === type).reduce((sum, t) => sum + t.amount, 0)
    }

    const currentIncome = computed(() => sumByType(currentMonthTransactions.value, 'income'))
    const currentExpenses = computed(() => sumByType(currentMonthTransactions.value, 'expense'))
    const currentBalance = computed(() => currentIncome.value - currentExpenses.value)
    const currentSavingsRate = computed(() =>
      currentIncome.value > 0
        ? Math.round(((currentIncome.value - currentExpenses.value) / currentIncome.value) * 100)
        : 0
    )

    const prevIncome = computed(() => sumByType(previousMonthTransactions.value, 'income'))
    const prevExpenses = computed(() => sumByType(previousMonthTransactions.value, 'expense'))
    const prevBalance = computed(() => prevIncome.value - prevExpenses.value)
    const prevSavingsRate = computed(() =>
      prevIncome.value > 0
        ? Math.round(((prevIncome.value - prevExpenses.value) / prevIncome.value) * 100)
        : 0
    )

    const last6MonthsData = computed(() => {
      const now = new Date()
      const months: { key: string; label: string }[] = []
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
        const label = d.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' })
        months.push({ key, label })
      }
      return months.map(({ key, label }) => {
        const monthTxs = transactions.value.filter((t) => getMonthKey(t.date) === key)
        return {
          label,
          income: sumByType(monthTxs, 'income'),
          expenses: sumByType(monthTxs, 'expense'),
        }
      })
    })

    const expensesByCategory = computed(() => {
      const result: Partial<Record<Category, number>> = {}
      currentMonthTransactions.value
        .filter((t) => t.type === 'expense')
        .forEach((t) => {
          result[t.category] = (result[t.category] ?? 0) + t.amount
        })
      return result
    })

    function getBudgetUsage(category: Category): { spent: number; limit: number; pct: number } {
      const spent = expensesByCategory.value[category] ?? 0
      const budgetEntry = budgets.value.find((b) => b.category === category)
      const limit = budgetEntry?.limit ?? 0
      const pct = limit > 0 ? Math.min(Math.round((spent / limit) * 100), 100) : 0
      return { spent, limit, pct }
    }

    function addTransaction(tx: Omit<Transaction, 'id' | 'createdAt'>) {
      transactions.value.unshift({
        ...tx,
        id: generateId(),
        createdAt: new Date().toISOString(),
      })
    }

    function deleteTransaction(id: string) {
      transactions.value = transactions.value.filter((t) => t.id !== id)
    }

    function updateBudget(category: Category, limit: number) {
      const idx = budgets.value.findIndex((b) => b.category === category)
      if (idx >= 0) {
        budgets.value[idx].limit = limit
      } else {
        budgets.value.push({ category, limit })
      }
    }

    function exportCSV() {
      const header = 'Type,Montant,Catégorie,Description,Date'
      const rows = transactions.value.map(
        (t) => `${t.type},${t.amount.toFixed(2)},${t.category},"${t.description}",${t.date}`
      )
      const csv = [header, ...rows].join('\n')
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `finances_${currentMonthKey.value}.csv`
      a.click()
      URL.revokeObjectURL(url)
    }

    return {
      transactions,
      budgets,
      currentMonthKey,
      currentMonthTransactions,
      currentIncome,
      currentExpenses,
      currentBalance,
      currentSavingsRate,
      prevIncome,
      prevExpenses,
      prevBalance,
      prevSavingsRate,
      last6MonthsData,
      expensesByCategory,
      getBudgetUsage,
      addTransaction,
      deleteTransaction,
      updateBudget,
      exportCSV,
    }
  },
  {
    persist: true,
  }
)
