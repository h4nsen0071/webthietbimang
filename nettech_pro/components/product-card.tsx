"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import type { Product } from "./featured-products"
import { useCart } from "@/contexts/cart-context"

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [buttonState, setButtonState] = useState<"default" | "adding" | "added">("default")
  const cardRef = useRef<HTMLDivElement>(null)

  const { dispatch } = useCart()

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = ""
    }
    setIsHovered(false)
  }

  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    const ripple = document.createElement("span")
    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("ripple")

    button.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  }

  const handleBuyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    createRipple(e)

    if (!product.inStock) return

    setButtonState("adding")

    setTimeout(() => {
      setButtonState("added")
      dispatch({ type: "ADD_ITEM", payload: product })
    }, 1000)

    setTimeout(() => {
      setButtonState("default")
    }, 2500)

    console.log(`Added ${product.name} to cart`)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const getButtonContent = () => {
    switch (buttonState) {
      case "adding":
        return (
          <>
            <i className="fas fa-spinner fa-spin mr-2" />
            Adding...
          </>
        )
      case "added":
        return (
          <>
            <i className="fas fa-check mr-2" />
            Added!
          </>
        )
      default:
        return product.inStock ? "Buy Now" : "Out of Stock"
    }
  }

  const getButtonStyles = () => {
    if (!product.inStock) {
      return "bg-gray-400 cursor-not-allowed"
    }

    switch (buttonState) {
      case "added":
        return "bg-green-500 hover:bg-green-600"
      default:
        return "nettech-gradient hover:shadow-lg"
    }
  }

  return (
    <div
      ref={cardRef}
      className="group relative bg-white rounded-2xl nettech-shadow-light hover:nettech-shadow-heavy transition-all duration-300 overflow-hidden border border-blue-100 hover:border-blue-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top accent line */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-1 nettech-gradient transition-all duration-300",
          isHovered ? "scale-x-100" : "scale-x-0",
        )}
      />

      {/* Stock status badge */}
      {!product.inStock && (
        <div className="absolute top-4 right-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          Out of Stock
        </div>
      )}

      {/* Product Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay on hover */}
        <div
          className={cn(
            "absolute inset-0 bg-black/20 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0",
          )}
        />

        {/* Quick view button */}
        <button
          className={cn(
            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium transition-all duration-300",
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95",
          )}
        >
          <i className="fas fa-eye mr-2" />
          Quick View
        </button>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="mb-2">
          <span className="text-sm text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">{product.category}</span>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
          {product.name}
        </h3>

        {product.description && <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>}

        {/* Features */}
        {product.features && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {product.features.slice(0, 2).map((feature, index) => (
                <span key={index} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {feature}
                </span>
              ))}
              {product.features.length > 2 && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  +{product.features.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">{formatPrice(product.price)}</div>

          <button
            onClick={handleBuyClick}
            disabled={!product.inStock || buttonState === "adding"}
            className={cn(
              "relative px-6 py-3 text-white font-semibold rounded-lg transition-all duration-300 overflow-hidden",
              getButtonStyles(),
              buttonState === "adding" && "cursor-wait",
            )}
          >
            {getButtonContent()}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
