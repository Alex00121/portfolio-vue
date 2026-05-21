<template>
  <form @submit.prevent="handleSubmit" class="flex gap-2">
    <div class="relative flex-1">
      <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
      <input
        v-model="localQuery"
        type="text"
        :placeholder="placeholder"
        class="w-full pl-10 pr-4 py-3 rounded-xl border border-warm-200 bg-white shadow-sm
               focus:outline-none focus:ring-2 focus:ring-warm-400 focus:border-transparent
               text-gray-800 placeholder-gray-400 text-base transition-all duration-200"
      />
      <button
        v-if="localQuery"
        type="button"
        @click="clear"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
      >
        ✕
      </button>
    </div>
    <button
      type="submit"
      :disabled="!localQuery.trim()"
      class="px-6 py-3 bg-warm-500 hover:bg-warm-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
             text-white font-semibold rounded-xl shadow-sm transition-all duration-200 whitespace-nowrap"
    >
      Rechercher
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  search: [query: string]
}>()

const localQuery = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  localQuery.value = val
})

watch(localQuery, (val) => {
  emit('update:modelValue', val)
})

function handleSubmit() {
  if (localQuery.value.trim()) {
    emit('search', localQuery.value.trim())
  }
}

function clear() {
  localQuery.value = ''
  emit('update:modelValue', '')
  emit('search', '')
}
</script>
