const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.12 }
)

export const vReveal = {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (binding.value?.delay) {
      el.style.transitionDelay = binding.value.delay
    }
    observer.observe(el)
  },
  unmounted(el) {
    observer.unobserve(el)
  }
}
