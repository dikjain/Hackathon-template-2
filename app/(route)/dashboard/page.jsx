'use client'

import React, { useEffect } from 'react'
import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useTheme } from '@/app/utils/Context'
import { ArrowRight, LogOut, ChevronRight, Star, Menu, X, Home, MessageCircle, Settings } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import BlurFade from '@/components/ui/blur-fade'
import Link from 'next/link'
import { Navbar } from '@/components/ui/navbar'

export default function Dashboard() {
  const { signOut } = useClerk()
  const router = useRouter()
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'
  const { user } = useUser()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.replace('/')
    } catch (error) {
      toast.error('Error signing out. Please try again.')
    }
  }

  return (user && (
    <div 
      className={`min-h-screen px-4 relative z-40 sm:px-6 lg:px-10 ${isDarkMode ? 'bg-black text-white' : 'bg-background'}`}
    >
      <Navbar />
      <div className="container mx-auto pt-30 py-8">
        <div className="flex justify-between items-center mb-8">
          <BlurFade>
            <motion.h1 
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="text-4xl font-bold tracking-tighter"
              style={{fontFamily: "var(--font-orbitron)"}}
            >
              Dashboard
            </motion.h1>
          </BlurFade>

          <BlurFade>
            <motion.h1 
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="text-4xl font-bold tracking-tighter"
              style={{fontFamily: "var(--font-orbitron)"}}
            >
              hey {user.firstName}
            </motion.h1>
          </BlurFade>

          <BlurFade>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignOut}
              className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 cursor-pointer ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-900/30' 
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
              }`}
              style={{fontFamily: "var(--font-space-grotesk)"}}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sign Out
            </motion.button>
          </BlurFade>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map((item, index) => (
            <BlurFade key={item} delay={0.1 * (index + 1)}>
              <motion.div
                whileHover={{ y: -5 }}
                className={`rounded-xl p-6 backdrop-blur-sm transition-all duration-300 cursor-pointer ${
                  isDarkMode
                    ? 'bg-gray-900/90 border border-gray-800 shadow-lg shadow-indigo-900/20'
                    : 'bg-white/90 border border-gray-100 shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold" style={{fontFamily: "var(--font-orbitron)"}}>Card Title {item}</h3>
                  <ChevronRight className={`h-5 w-5 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                </div>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} style={{fontFamily: "var(--font-space-grotesk)"}}>
                  This is a sample card with some content. You can customize this based on your needs.
                </p>
              </motion.div>
            </BlurFade>
          ))}
        </div>
      </div>
    </div>
  ))
}
