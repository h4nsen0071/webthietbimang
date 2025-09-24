"use client"

import type React from "react"

import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animation?: "fadeInUp" | "fadeInLeft" | "fadeInRight" | "fadeIn"
  delay?: number
}

const AnimatedSection = ({ children, className, animation = "fadeInUp", delay = 0 }: AnimatedSectionProps) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  })

  const animationClasses = {
    fadeInUp: "translate-y-8 opacity-0",
    fadeInLeft: "-translate-x-8 opacity-0",
    fadeInRight: "translate-x-8 opacity-0",
    fadeIn: "opacity-0",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isIntersecting ? "translate-y-0 translate-x-0 opacity-100" : animationClasses[animation],
        className,
      )}
      style={{
        transitionDelay: isIntersecting ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  )
}

export default AnimatedSection
