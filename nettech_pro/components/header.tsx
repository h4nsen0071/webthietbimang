"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useCart } from "@/contexts/cart-context"
import CartSidebar from "./cart-sidebar"
import SearchBar from "./search-bar"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const { state } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsHeaderVisible(false)
      } else {
        setIsHeaderVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    closeMenu()

    const target = document.querySelector(href)
    if (target) {
      const headerHeight = 80
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          isScrolled ? "bg-white/98 backdrop-blur-md shadow-lg" : "bg-white/95 backdrop-blur-sm shadow-sm",
          isHeaderVisible ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="text-3xl nettech-gradient-text transition-transform duration-300 group-hover:scale-110">
                <i className="fas fa-network-wired" />
              </div>
              <span className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                NetTech Pro
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <NavLink href="#home" onClick={handleLinkClick}>
                Home
              </NavLink>
              <NavLink href="#products" onClick={handleLinkClick}>
                Products
              </NavLink>
              <NavLink href="#promotions" onClick={handleLinkClick}>
                Promotions
              </NavLink>
              <NavLink href="#contact" onClick={handleLinkClick}>
                Contact
              </NavLink>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <SearchBar className="w-64" />

              <button
                onClick={toggleCart}
                className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors duration-300"
                aria-label="Shopping cart"
              >
                <i className="fas fa-shopping-cart text-xl" />
                {state.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {state.itemCount > 99 ? "99+" : state.itemCount}
                  </span>
                )}
              </button>
            </div>

            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleCart}
                className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors duration-300"
                aria-label="Shopping cart"
              >
                <i className="fas fa-shopping-cart text-lg" />
                {state.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {state.itemCount > 9 ? "9+" : state.itemCount}
                  </span>
                )}
              </button>

              <button
                onClick={toggleMenu}
                className="flex flex-col justify-center items-center w-8 h-8 space-y-1 group"
                aria-label="Toggle menu"
              >
                <span
                  className={cn(
                    "w-6 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out",
                    isMenuOpen && "rotate-45 translate-y-2",
                  )}
                />
                <span
                  className={cn(
                    "w-6 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out",
                    isMenuOpen && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "w-6 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out",
                    isMenuOpen && "-rotate-45 -translate-y-2",
                  )}
                />
              </button>
            </div>
          </div>

          <div
            className={cn(
              "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
              isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0",
            )}
          >
            <nav className="py-4 space-y-2 border-t border-gray-200">
              <div className="px-4 pb-4">
                <SearchBar />
              </div>

              <MobileNavLink href="#home" onClick={handleLinkClick}>
                Home
              </MobileNavLink>
              <MobileNavLink href="#products" onClick={handleLinkClick}>
                Products
              </MobileNavLink>
              <MobileNavLink href="#promotions" onClick={handleLinkClick}>
                Promotions
              </MobileNavLink>
              <MobileNavLink href="#contact" onClick={handleLinkClick}>
                Contact
              </MobileNavLink>
            </nav>
          </div>
        </div>
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

interface NavLinkProps {
  href: string
  children: React.ReactNode
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void
}

const NavLink = ({ href, children, onClick }: NavLinkProps) => {
  return (
    <a
      href={href}
      onClick={(e) => onClick(e, href)}
      className="relative px-4 py-2 text-gray-700 font-medium rounded-lg transition-all duration-300 hover:text-blue-600 hover:bg-blue-50 group"
    >
      {children}
      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-300 group-hover:w-4/5 transform -translate-x-1/2" />
    </a>
  )
}

const MobileNavLink = ({ href, children, onClick }: NavLinkProps) => {
  return (
    <a
      href={href}
      onClick={(e) => onClick(e, href)}
      className="block px-4 py-3 text-gray-700 font-medium rounded-lg transition-all duration-300 hover:text-blue-600 hover:bg-blue-50 hover:translate-x-2"
    >
      {children}
    </a>
  )
}

export default Header
