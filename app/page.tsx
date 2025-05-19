"use client"

import { useState, useEffect, useRef } from "react"
import { useChat } from "ai/react"
import MatrixRain from "@/components/matrix-rain"
import { Typewriter } from "@/components/typewriter"

export default function Home() {
  // The useChat hook connects to /api/chat by default
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showCursor, setShowCursor] = useState(true)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  // Display error if API call fails
  useEffect(() => {
    if (error) {
      console.error("Chat error:", error)
    }
  }, [error])

  return (
    <main className="flex flex-col h-screen w-full bg-black text-matrix-green overflow-hidden relative font-mono">
      {/* Matrix digital rain background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <MatrixRain />
      </div>

      {/* Header */}
      <div className="border-b border-matrix-green/30 p-4 flex items-center">
        <h1 className="text-2xl font-bold tracking-wider glitch-text">NEBUCHADNEZZAR TERMINAL</h1>
        <div className="ml-auto flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500 animate-pulse delay-75"></div>
          <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse delay-150"></div>
        </div>
      </div>

      {/* Chat container */}
      <div className="flex-1 overflow-auto p-4 scrollbar-thin scrollbar-thumb-matrix-green scrollbar-track-black" style={{ paddingBottom: '100px' }}>
        {/* System boot message */}
        <div className="mb-6 opacity-70" style={{ paddingBottom: '2rem' }}>
          <Typewriter text="// MATRIX SYSTEM v4.0.1" speed={10} />
          <Typewriter text="// ESTABLISHING SECURE CONNECTION..." speed={10} delay={1000} />
          <Typewriter text="// ACCESS GRANTED" speed={10} delay={2000} />
          <Typewriter text="// INITIALIZING AI INTERFACE..." speed={10} delay={3000} />
          <Typewriter text="// READY. HOW CAN I ASSIST YOU TODAY, OPERATOR?" speed={10} delay={4000} />
        </div>

        {/* Message history */}
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className="terminal-text"
              style={{ color: message.role === "user" ? "#8be9fd" : "#00ff41" }}
            >
              <div className="flex">
                <span className="mr-2">{message.role === "user" ? ">" : "#"}</span>
                <div className="flex-1">
                  {message.role === "user" ? message.content : <Typewriter text={message.content} speed={5} />}
                </div>
              </div>
            </div>
          ))}

          {error && (
            <div className="terminal-text" style={{ color: "#ff5555" }}>
              <div className="flex">
                <span className="mr-2">!</span>
                <div className="flex-1">
                  <Typewriter text="SYSTEM ERROR: Connection to the Matrix has been disrupted. Please try again." speed={5} />
                </div>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="text-matrix-green terminal-text">
              <div className="flex">
                <span className="mr-2">#</span>
                <div className="flex items-center">
                  <span className="loading-dots">
                    Processing
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div style={{ 
        padding: '12px 16px',
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        maxWidth: '800px',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        borderRadius: '8px',
        border: '1px solid rgba(0, 255, 65, 0.5)',
        boxShadow: '0 0 10px rgba(0, 255, 65, 0.2), inset 0 0 5px rgba(0, 255, 65, 0.05)',
        zIndex: 10
      }}>
        <form onSubmit={handleSubmit} className="flex" style={{ alignItems: 'flex-start' }}>
          <span style={{ color: '#00ff41', marginRight: '0.5rem', marginTop: '4px' }}>{">"}</span>
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Enter command..."
            style={{
              backgroundColor: 'transparent',
              flex: 1,
              outline: 'none',
              color: '#00ff41',
              fontFamily: '"Courier New", monospace',
              border: 'none',
              resize: 'none',
              overflow: 'auto',
              minHeight: '24px',
              maxHeight: '120px'
            }}
            className="matrix-input"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as any);
              }
            }}
            rows={input.split('\n').length}
          />
          <span 
            style={{
              height: '1.25rem',
              width: '0.5rem',
              backgroundColor: '#00ff41',
              marginLeft: '0.25rem',
              opacity: showCursor ? 1 : 0,
              transition: 'opacity 0.3s',
              alignSelf: 'flex-start',
              marginTop: '4px'
            }}
          ></span>
          <button
            type="submit"
            style={{
              marginLeft: '1rem',
              padding: '0.25rem 1rem',
              border: '1px solid #00ff41',
              color: '#00ff41',
              background: 'transparent',
              fontFamily: '"Courier New", monospace',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              alignSelf: 'flex-start'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 255, 65, 0.2)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            TRANSMIT
          </button>
        </form>
      </div>
    </main>
  )
}
