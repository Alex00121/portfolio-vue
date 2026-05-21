<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Mes Favoris</h1>
        <p v-if="favoritesStore.favorites.length > 0" class="text-gray-500 mt-1">
          {{ favoritesStore.favorites.length }} recette{{ favoritesStore.favorites.length > 1 ? 's' : '' }} sauvegardée{{ favoritesStore.favorites.length > 1 ? 's' : '' }}
        </p>
      </div>
      <button
        v-if="favoritesStore.favorites.length > 0"
        @click="confirmClear = true"
        class="px-4 py-2 text-sm text-red-500 hover:text-red-700 border border-red-200 hover:border-red-300
               rounded-xl transition-all duration-200 font-medium"
      >
        Tout effacer
      </button>
    </div>

    <!-- Confirm clear dialog -->
    <Transition name="fade">
      <div v-if="confirmClear" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <div class="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full animate-slideUp">
          <h3 class="text-lg font-bold text-gray-900 mb-2">Effacer tous les favoris ?</h3>
          <p class="text-gray-500 text-sm mb-6">Cette action ne peut pas être annulée.</p>
          <div class="flex gap-3 justify-end">
            <button
              @click="confirmClear = false"
              class="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-all duration-200"
            >
              Annuler
            </button>
            <button
              @click="clearAll"
              class="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-200 active:scale-95"
            >
              Effacer
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Empty state -->
    <div v-if="favoritesStore.favorites.length === 0" class="text-center py-20">
      <div class="text-6xl mb-4">💔</div>
      <h3 class="text-2xl font-bold text-gray-700 mb-2">Aucun favori pour l'instant</h3>
      <p class="text-gray-500 mb-8 text-lg">
        Explorez des recettes et cliquez sur le ❤️ pour les sauvegarder ici.
      </p>
      <RouterLink
        to="/"
        class="inline-flex items-center gap-2 px-6 py-3 bg-warm-500 hover:bg-warm-600
               text-white font-semibold rounded-xl transition-all duration-200 active:scale-95"
      >
        🔍 Parcourir les recettes
      </RouterLink>
    </div>

    <!-- Favorites grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="meal in favoritesStore.favorites"
        :key="meal.idMeal"
        class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col"
      >
        <RouterLink :to="`/recipe/${meal.idMeal}`" class="relative overflow-hidden aspect-video block">
          <img
            :src="meal.strMealThumb"
            :alt="meal.strMeal"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          <span class="absolute top-2 left-2 bg-warm-500/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            {{ meal.strCategory }}
          </span>
          <span class="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            ❤️
          </span>
        </RouterLink>

        <div class="p-4 flex-1 flex flex-col">
          <h3 class="font-bold text-gray-900 text-base leading-tight line-clamp-2 group-hover:text-warm-600 transition-colors duration-200">
            {{ meal.strMeal }}
          </h3>
          <div v-if="meal.strArea" class="mt-2 text-gray-500 text-sm">
            🌍 {{ meal.strArea }}
          </div>
          <div class="mt-3 flex items-center justify-between">
            <RouterLink
              :to="`/recipe/${meal.idMeal}`"
              class="text-warm-500 hover:text-warm-600 text-sm font-medium transition-colors duration-200"
            >
              Voir la recette →
            </RouterLink>
            <button
              @click="removeFavorite(meal)"
              class="text-gray-400 hover:text-red-500 transition-colors duration-200 text-sm"
              title="Retirer des favoris"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFavoritesStore, type FavoriteRecipe } from '../stores/favorites'

const favoritesStore = useFavoritesStore()
const confirmClear = ref(false)

function removeFavorite(meal: FavoriteRecipe) {
  favoritesStore.toggle(meal)
}

function clearAll() {
  favoritesStore.favorites.splice(0)
  confirmClear.value = false
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
