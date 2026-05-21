import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export interface FavoriteRecipe {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strCategory: string
  strArea?: string
}

export const useFavoritesStore = defineStore('favorites', () => {
  const stored = localStorage.getItem('recipe-favorites')
  const favorites = ref<FavoriteRecipe[]>(stored ? JSON.parse(stored) : [])

  watch(
    favorites,
    (val) => {
      localStorage.setItem('recipe-favorites', JSON.stringify(val))
    },
    { deep: true }
  )

  function toggle(recipe: FavoriteRecipe) {
    const idx = favorites.value.findIndex((f) => f.idMeal === recipe.idMeal)
    if (idx === -1) {
      favorites.value.push(recipe)
    } else {
      favorites.value.splice(idx, 1)
    }
  }

  function isFavorite(idMeal: string) {
    return favorites.value.some((f) => f.idMeal === idMeal)
  }

  return { favorites, toggle, isFavorite }
})
