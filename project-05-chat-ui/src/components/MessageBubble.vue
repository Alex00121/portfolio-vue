<template>
  <div
    class="flex gap-2.5 animate-fade-in"
    :class="[message.isOwn ? 'flex-row-reverse' : 'flex-row']"
  >
    <!-- Avatar -->
    <div
      v-if="!message.isOwn"
      class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1"
      :style="{ background: getAvatarGradient(message.username) }"
    >
      {{ message.username.charAt(0).toUpperCase() }}
    </div>

    <!-- Bubble -->
    <div :class="[message.isOwn ? 'items-end' : 'items-start', 'flex flex-col max-w-[72%]']">
      <span
        v-if="!message.isOwn"
        class="text-[11px] font-semibold mb-1 px-1"
        :style="{ color: getNameColor(message.username) }"
      >
        {{ message.username }}
      </span>
      <div
        class="px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
        :class="[
          message.isOwn
            ? 'bg-indigo-500 text-white rounded-tr-md'
            : 'bg-[#2a2d35] text-white/90 rounded-tl-md'
        ]"
      >
        {{ message.content }}
      </div>
      <span class="text-[10px] text-white/30 mt-1 px-1">
        {{ formatTime(message.timestamp) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Message } from '../data/seedMessages'

defineProps<{ message: Message }>()

const avatarGradients = [
  'linear-gradient(135deg, #6366f1, #8b5cf6)',
  'linear-gradient(135deg, #ec4899, #f43f5e)',
  'linear-gradient(135deg, #10b981, #059669)',
  'linear-gradient(135deg, #f59e0b, #ef4444)',
  'linear-gradient(135deg, #3b82f6, #06b6d4)',
  'linear-gradient(135deg, #8b5cf6, #ec4899)',
]

const nameColors = ['#818cf8', '#f472b6', '#34d399', '#fbbf24', '#60a5fa', '#a78bfa']

function hashStr(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function getAvatarGradient(username: string): string {
  return avatarGradients[hashStr(username) % avatarGradients.length]
}

function getNameColor(username: string): string {
  return nameColors[hashStr(username) % nameColors.length]
}

function formatTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)

  if (diffMins < 1) return 'À l\'instant'
  if (diffMins < 60) return `il y a ${diffMins}min`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `il y a ${diffHours}h`
  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })
}
</script>
