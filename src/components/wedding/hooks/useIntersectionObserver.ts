import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverProps {
  threshold?: number
  rootMargin?: string
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = '50px',
  freezeOnceVisible = true
}: UseIntersectionObserverProps = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    if (freezeOnceVisible && isVisible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (freezeOnceVisible) {
            observer.unobserve(element)
          }
        } else if (!freezeOnceVisible) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, freezeOnceVisible, isVisible])

  return { elementRef, isVisible }
}