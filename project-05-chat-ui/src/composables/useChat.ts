import { ref, reactive } from 'vue'
import { seedMessages, botMessages, botNames, type Message } from '../data/seedMessages'

export const rooms = ['general', 'random', 'coding', 'design'] as const
export type Room = typeof rooms[number]

const roomIcons: Record<Room, string> = {
  general: '💬',
  random: '🎲',
  coding: '💻',
  design: '🎨',
}

const messages = reactive<Record<Room, Message[]>>({
  general: seedMessages.filter(m => m.room === 'general'),
  random: seedMessages.filter(m => m.room === 'random'),
  coding: seedMessages.filter(m => m.room === 'coding'),
  design: seedMessages.filter(m => m.room === 'design'),
})

const unreadCounts = reactive<Record<Room, number>>({
  general: 0,
  random: 0,
  coding: 0,
  design: 0,
})

const currentRoom = ref<Room>('general')
const typingRoom = ref<Room | null>(null)
const onlineCount = ref(14)

function getLastMessage(room: Room): Message | null {
  const msgs = messages[room]
  return msgs.length > 0 ? msgs[msgs.length - 1] : null
}

function getRoomIcon(room: Room): string {
  return roomIcons[room]
}

function sendMessage(content: string) {
  if (!content.trim()) return
  const msg: Message = {
    id: `own-${Date.now()}`,
    room: currentRoom.value,
    username: 'Vous',
    content: content.trim(),
    timestamp: new Date(),
    isOwn: true,
  }
  messages[currentRoom.value].push(msg)
}

function addBotMessage(room: Room) {
  const botList = botNames[room]
  const bot = botList[Math.floor(Math.random() * botList.length)]
  const msgList = botMessages[room]
  const content = msgList[Math.floor(Math.random() * msgList.length)]

  const msg: Message = {
    id: `bot-${Date.now()}-${Math.random()}`,
    room,
    username: bot,
    content,
    timestamp: new Date(),
    isOwn: false,
  }

  if (room !== currentRoom.value) {
    unreadCounts[room]++
  }
  messages[room].push(msg)
}

function switchRoom(room: Room) {
  currentRoom.value = room
  unreadCounts[room] = 0
}

function setTyping(room: Room | null) {
  typingRoom.value = room
}

function startBotSimulation() {
  setInterval(() => {
    const delay = Math.floor(Math.random() * 7000) + 8000
    const targetRoom = rooms[Math.floor(Math.random() * rooms.length)]

    setTimeout(() => {
      setTyping(targetRoom)
      setTimeout(() => {
        setTyping(null)
        addBotMessage(targetRoom)
      }, 1500)
    }, delay)
  }, 10000)

  setInterval(() => {
    const delta = Math.random() < 0.5 ? 1 : -1
    onlineCount.value = Math.max(8, Math.min(30, onlineCount.value + delta))
  }, 30000)
}

export function useChat() {
  return {
    messages,
    unreadCounts,
    currentRoom,
    typingRoom,
    onlineCount,
    getLastMessage,
    getRoomIcon,
    sendMessage,
    switchRoom,
    setTyping,
    startBotSimulation,
  }
}
