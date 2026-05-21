import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useGsapScrollAnimations() {
  let ctx = null

  onMounted(() => {
    ctx = gsap.context(() => {
      gsap.utils.toArray('.gsap-section').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
          }
        )
      })
    })
  })

  onUnmounted(() => {
    if (ctx) ctx.revert()
  })
}
