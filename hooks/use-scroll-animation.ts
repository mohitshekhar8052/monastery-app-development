'use client'

import { useEffect, useRef, useState } from 'react'

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  delay?: number
}

export const useScrollAnimation = <T extends HTMLElement = HTMLDivElement>(options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    delay = 0
  } = options

  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<T>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              setTimeout(() => {
                setIsVisible(true)
                if (triggerOnce) {
                  setHasAnimated(true)
                }
              }, delay)
            } else {
              setIsVisible(true)
              if (triggerOnce) {
                setHasAnimated(true)
              }
            }
          } else if (!triggerOnce && !hasAnimated) {
            setIsVisible(false)
          }
        })
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce, delay, hasAnimated])

  return { ref: elementRef, isVisible }
}

// Hook for multiple elements with staggered animations
export const useStaggeredScrollAnimation = <T extends HTMLElement = HTMLDivElement>(
  count: number,
  options: UseScrollAnimationOptions & { staggerDelay?: number } = {}
) => {
  const { staggerDelay = 100, ...scrollOptions } = options
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(count).fill(false))
  const containerRef = useRef<T>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger animations with stagger delay
            Array.from({ length: count }).forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems(prev => {
                  const newState = [...prev]
                  newState[index] = true
                  return newState
                })
              }, index * staggerDelay)
            })
          }
        })
      },
      {
        threshold: scrollOptions.threshold || 0.1,
        rootMargin: scrollOptions.rootMargin || '0px',
      }
    )

    observer.observe(container)

    return () => {
      observer.unobserve(container)
    }
  }, [count, staggerDelay, scrollOptions.threshold, scrollOptions.rootMargin])

  return { ref: containerRef, visibleItems }
}