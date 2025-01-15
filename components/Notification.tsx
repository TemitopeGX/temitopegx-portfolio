'use client'
import { useState, useEffect } from 'react'

interface NotificationProps {
  message: string
  isVisible: boolean
  onClose: () => void
}

export default function Notification({ message, isVisible, onClose }: NotificationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 z-50 neo-brutalism-white p-4 bg-[#FFDE00]">
      <p className="font-bold">{message}</p>
    </div>
  )
} 