export type Priority = 'low' | 'medium' | 'high'

export type ColumnId = 'todo' | 'inprogress' | 'done'

export interface Card {
  id: string
  title: string
  description: string
  priority: Priority
  dueDate: string | null
  columnId: ColumnId
  createdAt: string
}

export interface Column {
  id: ColumnId
  title: string
  color: string
}

