import React, { useRef, useEffect, useState } from 'react'

export default function Reveal({ children, className = '', direction = 'up', rootMargin = '0px 0px -10% 0px', threshold = 0.1 }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.unobserve(el)
          }
        })
      },
      { root: null, rootMargin, threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, rootMargin, threshold])

  const dir = ['left', 'right', 'up', 'down'].includes(direction) ? direction : 'up'

  return (
    <div ref={ref} className={`reveal ${dir} ${inView ? 'in-view' : ''} ${className}`}>
      {children}
    </div>
  )
}
