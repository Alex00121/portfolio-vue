import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface FavoriteRecipe {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strCategory: string
  strArea?: string
}

export const useFavoritesStore = defineStore('favorites', () => {
  const stored = localStorage.getItem('recipe-favorites')
  let parsed: FavoriteRecipe[] = []
  if (stored) {
    try { parsed = JSON.parse(stored) } catch { /* ignore corrupted data */ }
  }
  const favorites = ref<FavoriteRecipe[]>(parsed)

  function persist() {
    localStorage.setItem('recipe-favorites', JSON.stringify(favorites.value))
  }

  function toggle(recipe: FavoriteRecipe) {
    const idx = favorites.value.findIndex((f) => f.idMeal === recipe.idMeal)
    if (idx === -1) {
      favorites.value.push(recipe)
    } else {
      favorites.value.splice(idx, 1)
    }
    persist()
  }

  function isFavorite(idMeal: string) {
    return favorites.value.some((f) => f.idMeal === idMeal)
  }

  function clearAll() {
    favorites.value.splice(0)
    persist()
  }

  return { favorites, toggle, isFavorite, clearAll }
})
