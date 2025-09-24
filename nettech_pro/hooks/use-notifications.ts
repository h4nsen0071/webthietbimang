"use client"

import { useState, useCallback } from "react"
import type { Notification } from "@/components/notification-system"

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = useCallback(
    (type: Notification["type"], title: string, message: string, duration?: number) => {
      const id = Math.random().toString(36).substr(2, 9)
      const notification: Notification = {
        id,
        type,
        title,
        message,
        duration,
      }

      setNotifications((prev) => [...prev, notification])
      return id
    },
    [],
  )

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }, [])

  const clearNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  return {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
  }
}
