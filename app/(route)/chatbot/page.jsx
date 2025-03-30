'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useTheme } from '@/app/utils/Context'
import { Send, Bot, User, RefreshCw } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import BlurFade from '@/components/ui/blur-fade'
import { generateAIResponse } from '@/app/utils/Gemini'
import { Navbar } from '@/components/ui/navbar'

export default function Chatbot() {
  const router = useRouter()
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'
  const { user } = useUser()
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    
    if (!inputMessage.trim()) return
    
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user'
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)
    
    try {
      const response = await generateAIResponse({ 
        prompt: inputMessage,
        modelGiven: "gemini-1.5-flash"
      })
      
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot'
      }
      
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error("Error getting AI response:", error)
      toast.error('Failed to get response. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([])
    toast.success('Chat cleared!')
  }

  return (user && (
    <motion.div 
      initial="initial"
      animate="animate"
      className={`min-h-screen px-4 relative z-40 sm:px-6 lg:px-10 ${isDarkMode ? 'bg-black text-white' : 'bg-background'}`}
    >
      <Navbar />
      <div className="container mx-auto py-8 h-screen flex flex-col">
        <div className="flex justify-between items-center mb-8 mt-20">
          <BlurFade>
            <motion.h1 
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="text-4xl font-bold tracking-tighter flex items-center"
              style={{fontFamily: "var(--font-orbitron)"}}
            >
              <Bot className="mr-2" /> AI Chatbot
            </motion.h1>
          </BlurFade>
          
          <div className="flex gap-4">
            <BlurFade>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearChat}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-900/30' 
                    : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                }`}
                style={{fontFamily: "var(--font-space-grotesk)"}}
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Clear Chat
              </motion.button>
            </BlurFade>
          </div>
        </div>

        <div 
          className={`rounded-xl p-6 mb-6 flex-1 ${isDarkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/95'} shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm`}
        >
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`p-6 rounded-xl text-center max-w-md ${isDarkMode ? 'bg-gray-900/90' : 'bg-muted/50'}`}
              >
                <Bot className={`h-16 w-16 mx-auto mb-4 ${isDarkMode ? 'text-indigo-300' : 'text-primary'}`} />
                <h3 
                  className="text-2xl font-bold mb-2"
                  style={{fontFamily: "var(--font-orbitron)"}}
                >
                  Start Chatting!
                </h3>
                <p 
                  className={`${isDarkMode ? 'text-gray-300' : 'text-muted-foreground'}`}
                  style={{fontFamily: "var(--font-space-grotesk)"}}
                >
                  Ask me anything and I'll do my best to help you.
                </p>
              </motion.div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-4 rounded-xl ${
                      message.sender === 'user' 
                        ? isDarkMode 
                          ? 'bg-indigo-600' 
                          : 'bg-primary'
                        : isDarkMode 
                          ? 'bg-gray-900/90' 
                          : 'bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      {message.sender === 'user' ? (
                        <>
                          <span 
                            className="font-bold mr-2 text-white"
                            style={{fontFamily: "var(--font-orbitron)"}}
                          >
                            You
                          </span>
                          <User className="h-4 w-4 text-white" />
                        </>
                      ) : (
                        <>
                          <Bot className={`h-4 w-4 mr-2 ${
                            isDarkMode ? 'text-indigo-300' : 'text-primary'
                          }`} />
                          <span 
                            className={`font-bold ${
                              isDarkMode ? 'text-indigo-300' : 'text-primary'
                            }`}
                            style={{fontFamily: "var(--font-orbitron)"}}
                          >
                            AI Assistant
                          </span>
                        </>
                      )}
                    </div>
                    <p 
                      className={`whitespace-pre-wrap ${
                        message.sender === 'user'
                          ? 'text-white'
                          : isDarkMode ? 'text-gray-300' : 'text-muted-foreground'
                      }`}
                      style={{fontFamily: "var(--font-space-grotesk)"}}
                    >
                      {message.text}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <form onSubmit={handleSendMessage} className="flex gap-4 mb-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message here..."
            className={`flex-1 p-4 rounded-xl font-medium ${
              isDarkMode ? 'bg-gray-800/90 text-white border-gray-700' : 'bg-white/95 text-black'
            } shadow-lg`}
            style={{fontFamily: "var(--font-space-grotesk)"}}
            disabled={isLoading}
          />
          <BlurFade>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-4 rounded-xl font-medium transition-all duration-300 flex items-center ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-900/30' 
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
              }`}
              style={{fontFamily: "var(--font-space-grotesk)"}}
              disabled={isLoading || !inputMessage.trim()}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <RefreshCw className="h-5 w-5" />
                </motion.div>
              ) : (
                <>
                  <span className="mr-2">Send</span>
                  <Send className="h-5 w-5" />
                </>
              )}
            </motion.button>
          </BlurFade>
        </form>
      </div>
    </motion.div>
  ))
}
