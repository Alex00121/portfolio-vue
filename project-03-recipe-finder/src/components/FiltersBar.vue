<template>
  <div class="space-y-3">
    <!-- Categories -->
    <div>
      <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Catégorie</p>
      <div class="flex flex-wrap gap-2">
        <button
          @click="selectCategory('')"
          :class="[
            'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 active:scale-95',
            selectedCategory === ''
              ? 'bg-warm-500 text-white shadow-sm'
              : 'bg-white border border-warm-200 text-gray-600 hover:border-warm-400 hover:text-warm-600'
          ]"
        >
          Toutes
        </button>
        <button
          v-for="cat in categories"
          :key="cat.idCategory"
          @click="selectCategory(cat.strCategory)"
          :class="[
            'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 active:scale-95',
            selectedCategory === cat.strCategory
              ? 'bg-warm-500 text-white shadow-sm'
              : 'bg-white border border-warm-200 text-gray-600 hover:border-warm-400 hover:text-warm-600'
          ]"
        >
          {{ cat.strCategory }}
        </button>
      </div>
    </div>

    <!-- Areas -->
    <div>
      <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Cuisine</p>
      <div class="flex flex-wrap gap-2">
        <button
          @click="selectArea('')"
          :class="[
            'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 active:scale-95',
            selectedArea === ''
              ? 'bg-amber-500 text-white shadow-sm'
              : 'bg-white border border-warm-200 text-gray-600 hover:border-amber-400 hover:text-amber-600'
          ]"
        >
          Toutes
        </button>
        <button
          v-for="area in areas"
          :key="area.strArea"
          @click="selectArea(area.strArea)"
          :class="[
            'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 active:scale-95',
            selectedArea === area.strArea
              ? 'bg-amber-500 text-white shadow-sm'
              : 'bg-white border border-warm-200 text-gray-600 hover:border-amber-400 hover:text-amber-600'
          ]"
        >
          {{ areaFlag(area.strArea) }} {{ area.strArea }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category, Area } from '../composables/useMealDB'

const props = defineProps<{
  categories: Category[]
  areas: Area[]
  selectedCategory: string
  selectedArea: string
}>()

const emit = defineEmits<{
  'update:selectedCategory': [value: string]
  'update:selectedArea': [value: string]
}>()

function selectCategory(cat: string) {
  emit('update:selectedCategory', cat)
}

function selectArea(area: string) {
  emit('update:selectedArea', area)
}

const areaFlags: Record<string, string> = {
  American: '🇺🇸', British: '🇬🇧', Canadian: '🇨🇦', Chinese: '🇨🇳',
  Croatian: '🇭🇷', Dutch: '🇳🇱', Egyptian: '🇪🇬', Filipino: '🇵🇭',
  French: '🇫🇷', Greek: '🇬🇷', Indian: '🇮🇳', Irish: '🇮🇪',
  Italian: '🇮🇹', Jamaican: '🇯🇲', Japanese: '🇯🇵', Kenyan: '🇰🇪',
  Malaysian: '🇲🇾', Mexican: '🇲🇽', Moroccan: '🇲🇦', Polish: '🇵🇱',
  Portuguese: '🇵🇹', Russian: '🇷🇺', Spanish: '🇪🇸', Thai: '🇹🇭',
  Tunisian: '🇹🇳', Turkish: '🇹🇷', Ukrainian: '🇺🇦', Vietnamese: '🇻🇳',
  Unknown: '🌍',
}

function areaFlag(area: string): string {
  return areaFlags[area] ?? '🌍'
}
</script>
