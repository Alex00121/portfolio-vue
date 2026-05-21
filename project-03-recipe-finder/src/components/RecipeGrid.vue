<template>
  <div>
    <!-- Loading skeletons -->
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="i in 8"
        :key="i"
        class="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse"
      >
        <div class="aspect-video bg-warm-100" />
        <div class="p-4 space-y-3">
          <div class="h-4 bg-warm-100 rounded w-3/4" />
          <div class="h-3 bg-warm-100 rounded w-1/2" />
          <div class="h-3 bg-warm-100 rounded w-1/4" />
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="meals.length === 0 && !loading" class="text-center py-20">
      <div class="text-6xl mb-4">{{ emptyIcon }}</div>
      <h3 class="text-xl font-bold text-gray-700 mb-2">{{ emptyTitle }}</h3>
      <p class="text-gray-500 mb-6">{{ emptyMessage }}</p>
      <slot name="empty-action" />
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fadeIn">
      <RecipeCard
        v-for="meal in meals"
        :key="meal.idMeal"
        :meal="meal"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import RecipeCard from './RecipeCard.vue'
import type { MealSummary } from '../composables/useMealDB'

withDefaults(defineProps<{
  meals: MealSummary[]
  loading?: boolean
  emptyIcon?: string
  emptyTitle?: string
  emptyMessage?: string
}>(), {
  loading: false,
  emptyIcon: '🍽️',
  emptyTitle: 'Aucune recette trouvée',
  emptyMessage: 'Essayez une autre recherche ou catégorie.',
})
</script>
