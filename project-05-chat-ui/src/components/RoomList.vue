<template>
  <div class="flex flex-col h-full bg-[#1a1d23] text-white">
    <!-- Header -->
    <div class="px-4 py-5 border-b border-white/10">
      <div class="flex items-center gap-3 mb-1">
        <div class="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-sm font-bold">
          C
        </div>
        <span class="font-bold text-base tracking-tight">ChatVue</span>
      </div>
      <div class="flex items-center gap-1.5 text-xs text-emerald-400 mt-1">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
        {{ onlineCount }} en ligne
      </div>
    </div>

    <!-- Rooms -->
    <div class="flex-1 overflow-y-auto py-2">
      <p class="px-4 py-2 text-[10px] font-semibold text-white/40 uppercase tracking-widest">
        Salons
      </p>
      <button
        v-for="room in rooms"
        :key="room"
        @click="$emit('switch-room', room)"
        class="w-full text-left px-3 py-2.5 mx-1 rounded-lg transition-all duration-200 flex items-center gap-3 group"
        :class="[
          currentRoom === room
            ? 'bg-indigo-500/20 text-white'
            : 'text-white/60 hover:bg-white/5 hover:text-white/90'
        ]"
        style="width: calc(100% - 8px);"
      >
        <span class="text-base">{{ getRoomIcon(room) }}</span>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <span class="font-medium text-sm">#{{ room }}</span>
            <span
              v-if="unreadCounts[room] > 0"
              class="bg-indigo-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center"
            >
              {{ unreadCounts[room] }}
            </span>
          </div>
          <p
            v-if="lastMessages[room]"
            class="text-xs text-white/40 truncate mt-0.5 group-hover:text-white/50 transition-colors"
          >
            {{ lastMessages[room]?.username }}: {{ lastMessages[room]?.content }}
          </p>
        </div>
      </button>
    </div>

    <!-- User avatar at bottom -->
    <div class="px-4 py-4 border-t border-white/10 flex items-center gap-3">
      <div class="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-xs font-bold">
        V
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium">Vous</p>
        <p class="text-xs text-white/40">En ligne</p>
      </div>
      <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useChat, rooms, type Room } from '../composables/useChat'

const { unreadCounts, currentRoom, onlineCount, getLastMessage, getRoomIcon } = useChat()

const lastMessages = computed(() =>
  Object.fromEntries(rooms.map(r => [r, getLastMessage(r)])) as Record<Room, ReturnType<typeof getLastMessage>>
)

defineEmits<{
  'switch-room': [room: Room]
}>()
</script>
