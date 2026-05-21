<template>
  <div>
    <!-- Hero banner -->
    <div class="bg-gradient-to-r from-warm-500 to-amber-400 py-16 px-4">
      <div class="max-w-3xl mx-auto text-center">
        <h1 class="text-4xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight">
          Découvrez des recettes<br />
          <span class="text-warm-100">du monde entier</span>
        </h1>
        <p class="text-warm-100 text-lg mb-8">
          Des milliers de recettes, des ingrédients simples, des saveurs extraordinaires.
        </p>
        <SearchBar
          v-model="searchQuery"
          placeholder="Rechercher une recette (ex: chicken, pasta, sushi...)"
          @search="onSearch"
        />
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      <!-- Filters -->
      <div class="bg-white rounded-2xl shadow-sm p-5 mb-8">
        <FiltersBar
          :categories="categories"
          :areas="areas"
          :selectedCategory="selectedCategory"
          :selectedArea="selectedArea"
          @update:selectedCategory="onCategoryChange"
          @update:selectedArea="onAreaChange"
        />
      </div>

      <!-- Results header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">
            <span v-if="activeFilter">{{ activeFilter }}</span>
            <span v-else-if="lastSearch">Résultats pour « {{ lastSearch }} »</span>
            <span v-else>Recettes populaires</span>
          </h2>
          <p v-if="!loading && meals.length > 0" class="text-gray-500 text-sm mt-0.5">
            {{ meals.length }} recette{{ meals.length > 1 ? 's' : '' }} trouvée{{ meals.length > 1 ? 's' : '' }}
          </p>
        </div>

        <!-- Random recipe button -->
        <button
          @click="loadRandom"
          :disabled="loadingRandom"
          class="flex items-center gap-2 px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700
                 font-semibold rounded-xl border border-amber-200 transition-all duration-200
                 active:scale-95 disabled:opacity-50"
        >
          <span>🎲</span>
          <span class="hidden sm:inline">Recette surprise</span>
        </button>
      </div>

      <!-- Error state -->
      <div v-if="error" class="bg-red-50 border border-red-200 rounded-xl p-6 text-center mb-8">
        <div class="text-4xl mb-2">😕</div>
        <p class="text-red-700 font-medium">{{ error }}</p>
        <button @click="retry" class="mt-3 text-warm-500 hover:underline font-medium">Réessayer</button>
      </div>

      <!-- Recipe grid -->
      <RecipeGrid
        v-else
        :meals="meals"
        :loading="loading"
        empty-icon="🔍"
        empty-title="Aucune recette trouvée"
        empty-message="Essayez un autre terme de recherche, ou parcourez nos catégories ci-dessus."
      >
        <template #empty-action>
          <button
            @click="resetFilters"
            class="px-5 py-2.5 bg-warm-500 hover:bg-warm-600 text-white font-semibold rounded-xl transition-all duration-200 active:scale-95"
          >
            Afficher toutes les recettes
          </button>
        </template>
      </RecipeGrid>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SearchBar from '../components/SearchBar.vue'
import FiltersBar from '../components/FiltersBar.vue'
import RecipeGrid from '../components/RecipeGrid.vue'
import {
  searchByName,
  filterByCategory,
  filterByArea,
  getCategories,
  getAreas,
  getRandomMeal,
  type MealSummary,
  type Category,
  type Area,
} from '../composables/useMealDB'

const router = useRouter()

const searchQuery = ref('')
const lastSearch = ref('')
const selectedCategory = ref('')
const selectedArea = ref('')
const activeFilter = ref('')

const meals = ref<MealSummary[]>([])
const categories = ref<Category[]>([])
const areas = ref<Area[]>([])
const loading = ref(false)
const loadingRandom = ref(false)
const error = ref('')

async function loadDefault() {
  loading.value = true
  error.value = ''
  try {
    const results = await searchByName('chicken')
    meals.value = results
  } catch {
    error.value = 'Impossible de charger les recettes. Vérifiez votre connexion.'
  } finally {
    loading.value = false
  }
}

async function onSearch(query: string) {
  if (!query) {
    await loadDefault()
    lastSearch.value = ''
    selectedCategory.value = ''
    selectedArea.value = ''
    activeFilter.value = ''
    return
  }
  loading.value = true
  error.value = ''
  lastSearch.value = query
  selectedCategory.value = ''
  selectedArea.value = ''
  activeFilter.value = ''
  try {
    meals.value = await searchByName(query)
  } catch {
    error.value = 'Erreur lors de la recherche.'
  } finally {
    loading.value = false
  }
}

async function applyFilter(type: 'category' | 'area', value: string) {
  if (type === 'category') { selectedCategory.value = value; selectedArea.value = '' }
  else { selectedArea.value = value; selectedCategory.value = '' }
  searchQuery.value = ''
  lastSearch.value = ''
  error.value = ''
  if (!value) {
    await loadDefault()
    activeFilter.value = ''
    return
  }
  loading.value = true
  try {
    meals.value = type === 'category'
      ? await filterByCategory(value)
      : await filterByArea(value)
    activeFilter.value = type === 'category' ? `Catégorie : ${value}` : `Cuisine : ${value}`
  } catch {
    error.value = 'Erreur lors du filtrage.'
  } finally {
    loading.value = false
  }
}

function onCategoryChange(cat: string) { return applyFilter('category', cat) }
function onAreaChange(area: string) { return applyFilter('area', area) }

async function loadRandom() {
  loadingRandom.value = true
  try {
    const meal = await getRandomMeal()
    if (meal) {
      router.push(`/recipe/${meal.idMeal}`)
    }
  } catch {
    error.value = 'Impossible de charger une recette aléatoire.'
  } finally {
    loadingRandom.value = false
  }
}

async function resetFilters() {
  searchQuery.value = ''
  lastSearch.value = ''
  selectedCategory.value = ''
  selectedArea.value = ''
  activeFilter.value = ''
  await loadDefault()
}

function retry() {
  if (lastSearch.value) onSearch(lastSearch.value)
  else loadDefault()
}

onMounted(async () => {
  const [, cats, areasData] = await Promise.all([
    loadDefault(),
    getCategories(),
    getAreas(),
  ])
  categories.value = cats
  areas.value = areasData
})
</script>
