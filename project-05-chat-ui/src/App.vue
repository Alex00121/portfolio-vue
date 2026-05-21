<template>
  <ChatLayout />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import ChatLayout from './components/ChatLayout.vue'
import { useChat } from './composables/useChat'

const { startBotSimulation } = useChat()

onMounted(() => {
  startBotSimulation()
})
</script>
