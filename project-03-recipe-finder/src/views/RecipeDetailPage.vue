<template>
  <div class="animate-fadeIn">
    <!-- Loading -->
    <div v-if="loading" class="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <div class="h-80 bg-warm-100 rounded-2xl animate-pulse" />
      <div class="space-y-3">
        <div class="h-8 bg-warm-100 rounded w-2/3 animate-pulse" />
        <div class="h-4 bg-warm-100 rounded w-1/3 animate-pulse" />
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="max-w-5xl mx-auto px-4 py-20 text-center">
      <div class="text-6xl mb-4">😕</div>
      <h2 class="text-2xl font-bold text-gray-700 mb-2">Recette introuvable</h2>
      <p class="text-gray-500 mb-6">{{ error }}</p>
      <RouterLink to="/" class="px-5 py-2.5 bg-warm-500 hover:bg-warm-600 text-white font-semibold rounded-xl transition-all duration-200 active:scale-95">
        ← Retour aux recettes
      </RouterLink>
    </div>

    <!-- Content -->
    <template v-else-if="meal">
      <!-- Hero image -->
      <div class="relative h-64 sm:h-80 md:h-96 overflow-hidden">
        <img
          :src="meal.strMealThumb"
          :alt="meal.strMeal"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <!-- Back button -->
        <RouterLink
          to="/"
          class="absolute top-4 left-4 flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30
                 text-white font-medium px-3 py-2 rounded-xl hover:bg-white/30 transition-all duration-200"
        >
          ← Retour
        </RouterLink>

        <!-- Favorite button -->
        <button
          @click="toggleFavorite"
          :class="[
            'absolute top-4 right-4 flex items-center gap-2 backdrop-blur-md border font-semibold px-4 py-2 rounded-xl transition-all duration-200 active:scale-95',
            isFav
              ? 'bg-red-500/90 border-red-400 text-white'
              : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
          ]"
        >
          <span>{{ isFav ? '❤️' : '🤍' }}</span>
          <span class="hidden sm:inline">{{ isFav ? 'Favori' : 'Ajouter aux favoris' }}</span>
        </button>

        <!-- Title overlay -->
        <div class="absolute bottom-0 left-0 right-0 p-6">
          <div class="flex flex-wrap gap-2 mb-3">
            <span class="bg-warm-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
              {{ meal.strCategory }}
            </span>
            <span class="bg-amber-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
              {{ meal.strArea }}
            </span>
            <span v-for="tag in tags" :key="tag" class="bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
              {{ tag }}
            </span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {{ meal.strMeal }}
          </h1>
        </div>
      </div>

      <!-- Main content -->
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <!-- Links row -->
        <div class="flex flex-wrap gap-3 mb-8">
          <a
            v-if="meal.strYoutube"
            :href="meal.strYoutube"
            target="_blank"
            rel="noopener"
            class="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-200 active:scale-95"
          >
            ▶ Vidéo YouTube
          </a>
          <a
            v-if="meal.strSource"
            :href="meal.strSource"
            target="_blank"
            rel="noopener"
            class="flex items-center gap-2 px-4 py-2 bg-warm-100 hover:bg-warm-200 text-warm-700 font-semibold rounded-xl transition-all duration-200 active:scale-95"
          >
            🔗 Source originale
          </a>
        </div>

        <!-- Two-column layout -->
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">

          <!-- Ingredients (left) -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <div class="flex items-center justify-between mb-5">
                <h2 class="text-xl font-bold text-gray-900">Ingrédients</h2>
                <!-- Serving adjuster -->
                <div class="flex items-center gap-2">
                  <button
                    @click="servings = Math.max(1, servings - 1)"
                    class="w-7 h-7 rounded-full bg-warm-100 hover:bg-warm-200 text-warm-700 font-bold flex items-center justify-center transition-all duration-200 active:scale-95"
                  >
                    −
                  </button>
                  <span class="font-semibold text-gray-700 w-6 text-center">{{ servings }}</span>
                  <button
                    @click="servings++"
                    class="w-7 h-7 rounded-full bg-warm-100 hover:bg-warm-200 text-warm-700 font-bold flex items-center justify-center transition-all duration-200 active:scale-95"
                  >
                    +
                  </button>
                  <span class="text-sm text-gray-500">pers.</span>
                </div>
              </div>

              <ul class="space-y-2.5">
                <li
                  v-for="(ing, idx) in ingredients"
                  :key="idx"
                  class="flex items-center gap-3 cursor-pointer group"
                  @click="toggleIngredient(idx)"
                >
                  <div
                    :class="[
                      'w-5 h-5 rounded flex items-center justify-center border-2 flex-shrink-0 transition-all duration-200',
                      checkedIngredients.has(idx)
                        ? 'bg-warm-500 border-warm-500 text-white'
                        : 'border-warm-300 group-hover:border-warm-400'
                    ]"
                  >
                    <span v-if="checkedIngredients.has(idx)" class="text-xs font-bold">✓</span>
                  </div>
                  <span :class="['text-sm flex-1', checkedIngredients.has(idx) ? 'line-through text-gray-400' : 'text-gray-700']">
                    <span class="font-medium">{{ ing.measure }}</span>
                    {{ ing.ingredient }}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Instructions (right) -->
          <div class="lg:col-span-3">
            <div class="bg-white rounded-2xl shadow-sm p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-5">Instructions</h2>
              <ol class="space-y-5">
                <li
                  v-for="(step, idx) in steps"
                  :key="idx"
                  class="flex gap-4 animate-slideUp"
                  :style="{ animationDelay: `${idx * 0.05}s` }"
                >
                  <span
                    class="flex-shrink-0 w-8 h-8 rounded-full bg-warm-500 text-white font-bold text-sm
                           flex items-center justify-center mt-0.5"
                  >
                    {{ idx + 1 }}
                  </span>
                  <p class="text-gray-700 leading-relaxed text-sm">{{ step }}</p>
                </li>
              </ol>
            </div>
          </div>

        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getMealById, extractIngredients, type MealDetail } from '../composables/useMealDB'
import { useFavoritesStore } from '../stores/favorites'

const route = useRoute()
const favoritesStore = useFavoritesStore()

const meal = ref<MealDetail | null>(null)
const loading = ref(true)
const error = ref('')
const servings = ref(4)
const checkedIngredients = ref(new Set<number>())

const isFav = computed(() =>
  meal.value ? favoritesStore.isFavorite(meal.value.idMeal) : false
)

const rawIngredients = computed(() =>
  meal.value ? extractIngredients(meal.value) : []
)

const ingredients = computed(() =>
  rawIngredients.value.map((ing) => ({
    ingredient: ing.ingredient,
    measure: scaleMeasure(ing.measure, servings.value),
  }))
)

const tags = computed(() => {
  if (!meal.value?.strTags) return []
  return meal.value.strTags.split(',').map((t) => t.trim()).filter(Boolean)
})

const steps = computed(() => {
  if (!meal.value?.strInstructions) return []
  return meal.value.strInstructions
    .split(/\r?\n/)
    .map((s) => s.replace(/^\d+[\.\)]\s*/, '').trim())
    .filter((s) => s.length > 10)
})

function parseFraction(s: string): number {
  const mixed = s.trim().match(/^(\d+)\s+(\d+)\/(\d+)$/)
  if (mixed) return +mixed[1] + +mixed[2] / +mixed[3]
  const frac = s.trim().match(/^(\d+)\/(\d+)$/)
  if (frac) return +frac[1] / +frac[2]
  return parseFloat(s) || 0
}

function scaleMeasure(measure: string, scale: number): string {
  if (!measure) return ''
  const match = measure.match(/^([\d./]+(?:\s+\d+\/\d+)?)\s*(.*)$/)
  if (!match) return measure
  const num = parseFraction(match[1])
  const unit = match[2]
  const scaled = (num * scale) / 4
  const decimals = unit.toLowerCase().includes('tsp') || unit.toLowerCase().includes('tbsp') ? 1 : 0
  return `${parseFloat(scaled.toFixed(decimals))} ${unit}`.trim()
}

function toggleIngredient(idx: number) {
  if (checkedIngredients.value.has(idx)) {
    checkedIngredients.value.delete(idx)
  } else {
    checkedIngredients.value.add(idx)
  }
}

function toggleFavorite() {
  if (!meal.value) return
  favoritesStore.toggle({
    idMeal: meal.value.idMeal,
    strMeal: meal.value.strMeal,
    strMealThumb: meal.value.strMealThumb,
    strCategory: meal.value.strCategory,
    strArea: meal.value.strArea,
  })
}

onMounted(async () => {
  const id = route.params.id as string
  try {
    const data = await getMealById(id)
    if (!data) {
      error.value = 'Cette recette est introuvable.'
    } else {
      meal.value = data
    }
  } catch {
    error.value = 'Erreur lors du chargement de la recette.'
  } finally {
    loading.value = false
  }
})
</script>
