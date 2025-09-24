"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
}

const SearchBar = ({ onSearch, placeholder = "Search products...", className }: SearchBarProps) => {
  const [query, setQuery] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        if (query === "") {
          setIsExpanded(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [query])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }

  const handleFocus = () => {
    setIsExpanded(true)
  }

  const handleClear = () => {
    setQuery("")
    onSearch("")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "flex items-center bg-white border border-gray-300 rounded-lg transition-all duration-300 ease-in-out",
          isExpanded ? "w-64 shadow-md" : "w-10 hover:w-64",
          "focus-within:w-64 focus-within:shadow-md",
        )}
      >
        <button
          onClick={() => {
            setIsExpanded(true)
            inputRef.current?.focus()
          }}
          className="flex items-center justify-center w-10 h-10 text-gray-500 hover:text-blue-600 transition-colors duration-200"
        >
          <i className="fas fa-search text-sm" />
        </button>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          placeholder={placeholder}
          className={cn(
            "flex-1 px-2 py-2 text-sm bg-transparent border-none outline-none transition-all duration-300",
            isExpanded || query ? "opacity-100" : "opacity-0 w-0",
          )}
        />

        {query && (
          <button
            onClick={handleClear}
            className="flex items-center justify-center w-8 h-8 mr-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <i className="fas fa-times text-xs" />
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar
