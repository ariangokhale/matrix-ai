"use client"

import { useState, useEffect } from "react"

interface TypewriterProps {
  text: string
  speed?: number
  delay?: number
}

export const Typewriter = ({ text, speed = 50, delay = 0 }: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [startTyping, setStartTyping] = useState(false)

  useEffect(() => {
    // Reset when text changes
    setDisplayedText("")
    setCurrentIndex(0)

    // Delay before starting to type
    const delayTimer = setTimeout(() => {
      setStartTyping(true)
    }, delay)

    return () => clearTimeout(delayTimer)
  }, [text, delay])

  useEffect(() => {
    if (!startTyping) return

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    }
  }, [currentIndex, text, speed, startTyping])

  return <div className="whitespace-pre-line">{displayedText}</div>
}
