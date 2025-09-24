"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface Slide {
  id: number
  title: string
  description: string
  buttonText: string
  image: string
  imageAlt: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Professional Network Solutions",
    description: "Maximize your network performance with enterprise-grade equipment",
    buttonText: "Discover More",
    image: "/network-switch-professional-equipment.jpg",
    imageAlt: "Network Switch",
  },
  {
    id: 2,
    title: "Secure Your Infrastructure",
    description: "Advanced firewalls and security solutions for complete protection",
    buttonText: "Learn More",
    image: "/firewall-security-device-enterprise.jpg",
    imageAlt: "Firewall Device",
  },
  {
    id: 3,
    title: "Wireless Excellence",
    description: "High-performance access points for seamless connectivity",
    buttonText: "Shop Now",
    image: "/wifi-access-point-wireless-network.jpg",
    imageAlt: "Access Point",
  },
]

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [nextSlide, isAutoPlaying])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide()
        setIsAutoPlaying(false)
      } else if (e.key === "ArrowRight") {
        nextSlide()
        setIsAutoPlaying(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

  const handleButtonClick = (buttonText: string) => {
    // Handle different button actions based on text
    switch (buttonText) {
      case "Discover More":
        document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
        break
      case "Learn More":
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
        break
      case "Shop Now":
        document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
        break
      default:
        break
    }
  }

  return (
    <section id="home" className="relative mt-20 min-h-[600px] overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5 z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%232563eb' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100" />

      {/* Slider Container */}
      <div className="relative h-[600px] z-20">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 flex items-center transition-all duration-700 ease-in-out",
              index === currentSlide
                ? "opacity-100 translate-x-0"
                : index < currentSlide
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full",
            )}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Content */}
                <div className="space-y-6 lg:space-y-8">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                    <span className="nettech-gradient-text">{slide.title}</span>
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg">{slide.description}</p>
                  <button
                    onClick={() => handleButtonClick(slide.buttonText)}
                    className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white nettech-gradient rounded-xl nettech-shadow-medium hover:nettech-shadow-heavy transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  >
                    <span className="relative z-10">{slide.buttonText}</span>
                    {/* Shine effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </button>
                </div>

                {/* Image */}
                <div className="relative">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden nettech-shadow-heavy group">
                    <Image
                      src={slide.image || "/placeholder.svg"}
                      alt={slide.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority={index === 0}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                goToSlide(index)
                setIsAutoPlaying(false)
              }}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === currentSlide
                  ? "bg-blue-600 scale-125 shadow-lg"
                  : "bg-blue-300 hover:bg-blue-400 hover:scale-110",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => {
          prevSlide()
          setIsAutoPlaying(false)
        }}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-white/80 hover:bg-white rounded-full nettech-shadow-medium hover:nettech-shadow-heavy transition-all duration-300 flex items-center justify-center group"
        aria-label="Previous slide"
      >
        <i className="fas fa-chevron-left text-blue-600 group-hover:scale-110 transition-transform duration-200" />
      </button>

      <button
        onClick={() => {
          nextSlide()
          setIsAutoPlaying(false)
        }}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-white/80 hover:bg-white rounded-full nettech-shadow-medium hover:nettech-shadow-heavy transition-all duration-300 flex items-center justify-center group"
        aria-label="Next slide"
      >
        <i className="fas fa-chevron-right text-blue-600 group-hover:scale-110 transition-transform duration-200" />
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 z-30">
        <div
          className="h-full bg-blue-600 transition-all duration-300 ease-linear"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div>
    </section>
  )
}

export default HeroSlider
