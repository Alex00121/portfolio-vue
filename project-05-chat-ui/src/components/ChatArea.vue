<template>
  <div class="flex flex-col h-full bg-[#212429]">
    <!-- Header -->
    <div class="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-[#212429]/95 backdrop-blur-sm">
      <span class="text-lg">{{ getRoomIcon(currentRoom) }}</span>
      <div>
        <h2 class="font-bold text-white text-sm">#{{ currentRoom }}</h2>
        <p class="text-xs text-white/40">{{ roomDescriptions[currentRoom] }}</p>
      </div>
      <div class="ml-auto flex items-center gap-2 text-xs text-white/40">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        {{ onlineCount }} en ligne
      </div>
    </div>

    <!-- Messages -->
    <div ref="messagesContainer" class="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
      <MessageBubble
        v-for="msg in currentMessages"
        :key="msg.id"
        :message="msg"
      />
      <TypingIndicator
        v-if="typingRoom === currentRoom"
      />
      <!-- Anchor for auto-scroll -->
      <div ref="scrollAnchor"></div>
    </div>

    <!-- Input bar -->
    <div class="px-4 py-3 border-t border-white/10">
      <div class="relative flex items-center gap-2 bg-[#2a2d35] rounded-xl px-4 py-2.5">
        <!-- Emoji picker -->
        <div class="relative">
          <button
            @click="showEmoji = !showEmoji"
            class="text-white/40 hover:text-white/80 transition-colors text-xl leading-none"
          >
            😊
          </button>
          <EmojiPicker
            v-if="showEmoji"
            @pick="onEmojiPick"
          />
        </div>

        <input
          ref="inputRef"
          v-model="inputText"
          @keydown.enter.prevent="onSend"
          @keydown.escape="showEmoji = false"
          :placeholder="`Écrire dans #${currentRoom}...`"
          class="flex-1 bg-transparent text-white text-sm placeholder-white/30 focus:outline-none"
        />

        <button
          @click="onSend"
          :disabled="!inputText.trim()"
          class="text-indigo-400 hover:text-indigo-300 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed active:scale-90"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useChat, type Room } from '../composables/useChat'
import MessageBubble from './MessageBubble.vue'
import TypingIndicator from './TypingIndicator.vue'
import EmojiPicker from './EmojiPicker.vue'

const { messages, typingRoom, currentRoom, onlineCount, getRoomIcon, sendMessage } = useChat()

const inputText = ref('')
const showEmoji = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)
const scrollAnchor = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

const roomDescriptions: Record<Room, string> = {
  general: 'Discussions générales',
  random: 'Tout et n\'importe quoi',
  coding: 'Questions et astuces dev',
  design: 'UI/UX, typographie, couleurs',
}

const currentMessages = computed(() => messages[currentRoom.value])

function scrollToBottom() {
  nextTick(() => {
    scrollAnchor.value?.scrollIntoView({ behavior: 'smooth' })
  })
}

watch(currentMessages, () => scrollToBottom(), { deep: true })
watch(currentRoom, () => {
  scrollToBottom()
  nextTick(() => inputRef.value?.focus())
})
watch(typingRoom, () => scrollToBottom())

function onSend() {
  if (!inputText.value.trim()) return
  sendMessage(inputText.value)
  inputText.value = ''
  showEmoji.value = false
  scrollToBottom()
}

function onEmojiPick(emoji: string) {
  inputText.value += emoji
  showEmoji.value = false
  inputRef.value?.focus()
}
</script>
