import { onMounted, onUnmounted } from 'vue'

export function useIntersectionObserver(targetId, callback, options = {}) {
  let observer = null

  onMounted(() => {
    const el = document.getElementById(targetId)
    if (!el) return
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback()
            observer?.disconnect()
          }
        })
      },
      { threshold: 0.3, ...options }
    )
    observer.observe(el)
  })

  onUnmounted(() => observer?.disconnect())
}
