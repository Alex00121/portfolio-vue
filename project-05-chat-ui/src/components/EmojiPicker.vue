<template>
  <div class="absolute bottom-full mb-2 left-0 bg-[#2a2d35] border border-white/10 rounded-xl shadow-xl p-2 z-50 animate-slide-up">
    <div class="grid grid-cols-6 gap-1">
      <button
        v-for="emoji in emojis"
        :key="emoji"
        @click="$emit('pick', emoji)"
        class="w-9 h-9 flex items-center justify-center text-xl rounded-lg hover:bg-white/10 transition-all duration-150 active:scale-90"
      >
        {{ emoji }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{ pick: [emoji: string] }>()

const emojis = [
  '😀', '😂', '😍', '🤔', '😎', '😭',
  '👍', '👎', '🔥', '❤️', '🎉', '👏',
  '🤖', '💻', '🚀', '⭐', '✅', '❌',
  '💡', '🎨', '📝', '🔧', '🧪', '💬',
]
</script>
