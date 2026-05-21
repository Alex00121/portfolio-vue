<template>
  <div class="flex gap-2.5 items-end">
    <!-- Avatar placeholder -->
    <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold flex-shrink-0">
      <span class="text-white/40">...</span>
    </div>
    <!-- Bubble with animated dots -->
    <div class="bg-[#2a2d35] px-4 py-3 rounded-2xl rounded-tl-md flex items-center gap-1.5">
      <span
        v-for="i in 3"
        :key="i"
        class="w-2 h-2 rounded-full bg-white/50 animate-bounce-dot"
        :style="{ animationDelay: `${(i - 1) * 0.18}s` }"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
