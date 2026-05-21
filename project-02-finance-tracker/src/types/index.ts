export type TransactionType = 'income' | 'expense'

export type Category =
  | 'Alimentation'
  | 'Transport'
  | 'Logement'
  | 'Santé'
  | 'Loisirs'
  | 'Shopping'
  | 'Éducation'
  | 'Autre'

export const INCOME_CATEGORIES: Category[] = ['Autre']
export const EXPENSE_CATEGORIES: Category[] = [
  'Alimentation',
  'Transport',
  'Logement',
  'Santé',
  'Loisirs',
  'Shopping',
  'Éducation',
  'Autre',
]

export const CATEGORY_COLORS: Record<Category, string> = {
  Alimentation: '#EF4444',
  Transport: '#3B82F6',
  Logement: '#8B5CF6',
  Santé: '#10B981',
  Loisirs: '#F59E0B',
  Shopping: '#EC4899',
  Éducation: '#14B8A6',
  Autre: '#6B7280',
}

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  category: Category
  description: string
  date: string
  createdAt: string
}

export interface BudgetLimit {
  category: Category
  limit: number
}

export interface SortConfig {
  field: keyof Transaction
  direction: 'asc' | 'desc'
}
