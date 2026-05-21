export function useScrollTo() {
  function scrollTo(href) {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
  return { scrollTo }
}
