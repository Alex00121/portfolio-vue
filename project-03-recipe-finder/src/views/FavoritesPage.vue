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

    <RecipeGrid
      :meals="favoritesStore.favorites"
      empty-icon="💔"
      empty-title="Aucun favori pour l'instant"
      empty-message="Explorez des recettes et cliquez sur le ❤️ pour les sauvegarder ici."
    >
      <template #empty-action>
        <RouterLink
          to="/"
          class="inline-flex items-center gap-2 px-6 py-3 bg-warm-500 hover:bg-warm-600
                 text-white font-semibold rounded-xl transition-all duration-200 active:scale-95"
        >
          🔍 Parcourir les recettes
        </RouterLink>
      </template>
    </RecipeGrid>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RecipeGrid from '../components/RecipeGrid.vue'
import { useFavoritesStore } from '../stores/favorites'

const favoritesStore = useFavoritesStore()
const confirmClear = ref(false)

function clearAll() {
  favoritesStore.clearAll()
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
