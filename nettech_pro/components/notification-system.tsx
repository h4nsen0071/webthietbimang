"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export interface Notification {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  message: string
  duration?: number
}

interface NotificationSystemProps {
  notifications: Notification[]
  onRemove: (id: string) => void
}

const NotificationSystem = ({ notifications, onRemove }: NotificationSystemProps) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} onRemove={onRemove} />
      ))}
    </div>
  )
}

const NotificationItem = ({
  notification,
  onRemove,
}: {
  notification: Notification
  onRemove: (id: string) => void
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Auto-remove notification
    const duration = notification.duration || 5000
    const timer = setTimeout(() => {
      handleRemove()
    }, duration)

    return () => clearTimeout(timer)
  }, [notification.duration])

  const handleRemove = () => {
    setIsLeaving(true)
    setTimeout(() => {
      onRemove(notification.id)
    }, 300)
  }

  const getIcon = () => {
    switch (notification.type) {
      case "success":
        return "fas fa-check-circle"
      case "error":
        return "fas fa-exclamation-circle"
      case "warning":
        return "fas fa-exclamation-triangle"
      case "info":
        return "fas fa-info-circle"
      default:
        return "fas fa-bell"
    }
  }

  const getColors = () => {
    switch (notification.type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800"
      case "error":
        return "bg-red-50 border-red-200 text-red-800"
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800"
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-800"
      default:
        return "bg-gray-50 border-gray-200 text-gray-800"
    }
  }

  const getIconColor = () => {
    switch (notification.type) {
      case "success":
        return "text-green-500"
      case "error":
        return "text-red-500"
      case "warning":
        return "text-yellow-500"
      case "info":
        return "text-blue-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div
      className={cn(
        "max-w-sm w-full border rounded-lg p-4 shadow-lg transition-all duration-300 transform",
        getColors(),
        isVisible && !isLeaving ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
        isLeaving && "-translate-x-full opacity-0",
      )}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <i className={cn(getIcon(), getIconColor(), "text-xl")} />
        </div>
        <div className="ml-3 flex-1">
          <h4 className="font-semibold text-sm">{notification.title}</h4>
          <p className="text-sm mt-1 opacity-90">{notification.message}</p>
        </div>
        <button
          onClick={handleRemove}
          className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <i className="fas fa-times" />
        </button>
      </div>
    </div>
  )
}

export default NotificationSystem
