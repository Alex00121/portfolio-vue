<template>
  <RouterLink
    :to="`/recipe/${meal.idMeal}`"
    class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1
           transition-all duration-200 flex flex-col cursor-pointer"
  >
    <!-- Image -->
    <div class="relative overflow-hidden aspect-video">
      <img
        :src="meal.strMealThumb"
        :alt="meal.strMeal"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
        @error="handleImgError"
      />
      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      <!-- Category badge -->
      <span
        v-if="meal.strCategory"
        class="absolute top-2 left-2 bg-warm-500/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full"
      >
        {{ meal.strCategory }}
      </span>

      <!-- Favorite button -->
      <button
        @click.prevent="handleFavorite"
        :class="[
          'absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-sm transition-all duration-200 active:scale-95',
          isFav
            ? 'bg-red-500 text-white shadow-md'
            : 'bg-white/80 text-gray-500 hover:bg-red-50 hover:text-red-400'
        ]"
        :title="isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'"
      >
        <span :class="['text-sm transition-transform duration-200', heartAnimating ? 'scale-125' : 'scale-100']">
          {{ isFav ? '❤️' : '🤍' }}
        </span>
      </button>
    </div>

    <!-- Content -->
    <div class="p-4 flex-1 flex flex-col">
      <h3 class="font-bold text-gray-900 text-base leading-tight line-clamp-2 group-hover:text-warm-600 transition-colors duration-200">
        {{ meal.strMeal }}
      </h3>
      <div v-if="meal.strArea" class="mt-2 flex items-center gap-1 text-gray-500 text-sm">
        <span>🌍</span>
        <span>{{ meal.strArea }}</span>
      </div>
      <div class="mt-3 flex items-center justify-between">
        <span class="text-warm-500 text-sm font-medium group-hover:text-warm-600 transition-colors duration-200">
          Voir la recette →
        </span>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed, ref, onUnmounted } from 'vue'
import type { MealSummary } from '../composables/useMealDB'
import { useFavoritesStore } from '../stores/favorites'

const props = defineProps<{
  meal: MealSummary
}>()

const favoritesStore = useFavoritesStore()
const isFav = computed(() => favoritesStore.isFavorite(props.meal.idMeal))
const heartAnimating = ref(false)
let heartTimer: ReturnType<typeof setTimeout> | null = null

onUnmounted(() => {
  if (heartTimer !== null) clearTimeout(heartTimer)
})

function handleFavorite() {
  heartAnimating.value = true
  heartTimer = setTimeout(() => { heartAnimating.value = false }, 300)
  favoritesStore.toggle({
    idMeal: props.meal.idMeal,
    strMeal: props.meal.strMeal,
    strMealThumb: props.meal.strMealThumb,
    strCategory: props.meal.strCategory ?? '',
    strArea: props.meal.strArea,
  })
}

function handleImgError(e: Event) {
  const img = e.target as HTMLImageElement
  img.style.display = 'none'
  if (img.parentElement) {
    img.parentElement.style.background = 'linear-gradient(135deg, #fff0e0, #ffe0c0)'
  }
}
</script>
