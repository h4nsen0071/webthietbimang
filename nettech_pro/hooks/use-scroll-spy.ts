"use client"

import { useState, useEffect } from "react"

export const useScrollSpy = (sectionIds: string[], offset = 100) => {
  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i])
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Call once to set initial state

    return () => window.removeEventListener("scroll", handleScroll)
  }, [sectionIds, offset])

  return activeSection
}
