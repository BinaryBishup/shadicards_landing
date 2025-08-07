import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const useGSAP = (callback: () => void, deps: any[] = []) => {
  useEffect(() => {
    callback()
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, deps)
}

export const fadeInUp = (element: string | Element, delay = 0) => {
  return gsap.fromTo(
    element,
    {
      y: 100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      delay,
      ease: 'power3.out',
    }
  )
}

export const fadeIn = (element: string | Element, delay = 0) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 1,
      delay,
      ease: 'power2.out',
    }
  )
}

export const scaleIn = (element: string | Element, delay = 0) => {
  return gsap.fromTo(
    element,
    {
      scale: 0.8,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      duration: 1,
      delay,
      ease: 'power2.out',
    }
  )
}

export const slideInLeft = (element: string | Element, delay = 0) => {
  return gsap.fromTo(
    element,
    {
      x: -100,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      delay,
      ease: 'power3.out',
    }
  )
}

export const slideInRight = (element: string | Element, delay = 0) => {
  return gsap.fromTo(
    element,
    {
      x: 100,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      delay,
      ease: 'power3.out',
    }
  )
}