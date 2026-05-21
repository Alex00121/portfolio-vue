<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar (desktop) -->
    <aside
      class="w-60 flex-shrink-0 border-r border-white/10 hidden sm:block"
    >
      <RoomList @switch-room="switchRoom" />
    </aside>

    <!-- Mobile hamburger sidebar overlay -->
    <div
      v-if="mobileSidebarOpen"
      class="fixed inset-0 z-40 flex sm:hidden"
    >
      <div class="w-60 h-full shadow-2xl">
        <RoomList @switch-room="onMobileRoomSwitch" />
      </div>
      <div class="flex-1 bg-black/60 backdrop-blur-sm" @click="mobileSidebarOpen = false"></div>
    </div>

    <!-- Chat area -->
    <main class="flex-1 flex flex-col min-w-0 relative">
      <!-- Mobile top bar -->
      <div class="flex items-center gap-3 px-4 py-3 bg-[#1a1d23] border-b border-white/10 sm:hidden">
        <button @click="mobileSidebarOpen = true" class="text-white/60 hover:text-white p-1">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span class="text-white font-bold text-sm">#{{ currentRoom }}</span>
      </div>
      <ChatArea class="flex-1 min-h-0" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useChat, type Room } from '../composables/useChat'
import RoomList from './RoomList.vue'
import ChatArea from './ChatArea.vue'

const { currentRoom, switchRoom } = useChat()
const mobileSidebarOpen = ref(false)

function onMobileRoomSwitch(room: Room) {
  switchRoom(room)
  mobileSidebarOpen.value = false
}
</script>
