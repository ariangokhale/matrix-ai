"use client"

import { useEffect, useRef } from "react"

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Matrix rain characters
    const katakana =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン"
    const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    const nums = "0123456789"
    const matrix = "01"

    const chars = matrix + katakana + latin + nums

    // Create drops
    const fontSize = 16
    const columns = Math.floor(canvas.width / fontSize)

    // Array to track the y position of each drop
    const drops: number[] = []

    // Initialize all drops to start at random positions
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }

    // Drawing function
    const draw = () => {
      // Black with opacity to create fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set text color and font
      ctx.fillStyle = "#0F0" // Matrix green
      ctx.font = `${fontSize}px monospace`

      // Loop through each drop
      for (let i = 0; i < drops.length; i++) {
        // Choose a random character
        const text = chars.charAt(Math.floor(Math.random() * chars.length))

        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        // Move the drop down
        drops[i]++

        // Reset drop to top with random delay when it reaches bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
      }
    }

    // Animation loop
    const interval = setInterval(draw, 33) // ~30fps

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0" />
}

export default MatrixRain
