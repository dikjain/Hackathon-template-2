"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import SignUpComponent from "@/app/(auth)/sign-up/[[...sign-up]]/page";
import SignInComponent from "@/app/(auth)/sign-in/[[...sign-in]]/page";
import { motion } from "framer-motion";
import { BlurFadeText } from "@/components/ui/export";
import { ArrowRight, Star, Zap, Shield } from "lucide-react";
import { useTheme } from "@/app/utils/Context";

const STAGGER_DELAY = 0.1;

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");
  const { user } = useUser();
  const router = useRouter();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }

  }, [user]);

   

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-gray-100'} text-${isDarkMode ? 'white' : 'gray-800'} relative z-40 px-4 sm:px-6 lg:px-10`}
    >
      <motion.div 
        className={`fixed top-0 left-0 right-0 h-1 z-50 origin-left ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
        style={{ scaleX: 1 }}
      />

      <main className="container mx-auto py-12 md:py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-12 relative">
          {/* Neomorphic divider between sections */}
          <div className="hidden lg:block absolute left-[60%] top-0 bottom-0 w-[1px] z-10">
            <div className={`h-full w-[1px] ${
              isDarkMode 
                ? 'bg-gradient-to-b from-transparent via-gray-700 to-transparent shadow-[2px_0_3px_rgba(75,85,99,0.3)]' 
                : 'bg-gradient-to-b from-transparent via-gray-300 to-transparent shadow-[2px_0_3px_rgba(255,255,255,0.5)]'
            }`}></div>
          </div>

          {/* Left side - Project Info (60% on large screens) */}
          <motion.div 
            className="lg:w-[60%] mb-12 lg:mb-0 pr-0 lg:pr-12 lg:sticky lg:top-24"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <BlurFadeText
              delay={STAGGER_DELAY}
              className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]"
              text="ProjectX"
              style={{fontFamily: "var(--font-orbitron)"}}
            />
            
            <BlurFadeText
              delay={STAGGER_DELAY * 2}
              className={`max-w-[750px] text-lg sm:text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-4`}
              text="A revolutionary approach to modern development. Built with cutting-edge technology."
              style={{fontFamily: "var(--font-space-grotesk)"}}
            />
            
            <motion.div 
              className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {[
                {
                  title: "Powerful Tools",
                  description: "Access our suite of advanced development tools designed for maximum productivity.",
                  icon: <Zap className={`h-8 w-8 ${isDarkMode ? 'text-indigo-300' : 'text-indigo-500'}`} />
                },
                {
                  title: "Secure Platform",
                  description: "Your data is protected with enterprise-grade security and encryption.",
                  icon: <Shield className={`h-8 w-8 ${isDarkMode ? 'text-indigo-300' : 'text-indigo-500'}`} />
                },
                {
                  title: "Premium Experience",
                  description: "Enjoy a seamless, intuitive interface built for developers by developers.",
                  icon: <Star className={`h-8 w-8 ${isDarkMode ? 'text-indigo-300' : 'text-indigo-500'}`} />
                },
                {
                  title: "Continuous Updates",
                  description: "We're constantly improving with regular feature updates and enhancements.",
                  icon: <ArrowRight className={`h-8 w-8 ${isDarkMode ? 'text-indigo-300' : 'text-indigo-500'}`} />
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className={`
                    rounded-xl p-6 
                    ${isDarkMode 
                      ? 'bg-gray-900/80 border border-gray-800 shadow-[inset_1px_1px_0px_rgba(255,255,255,0.1),_inset_-1px_-1px_0px_rgba(0,0,0,0.4),_8px_8px_16px_rgba(0,0,0,0.6),_-2px_-2px_8px_rgba(255,255,255,0.08)]' 
                      : 'bg-white/90 border border-gray-200 shadow-[inset_1px_1px_0px_rgba(255,255,255,0.9),_inset_-1px_-1px_0px_rgba(0,0,0,0.05),_8px_8px_16px_rgba(0,0,0,0.07),_-2px_-2px_8px_rgba(255,255,255,0.9)]'
                    }
                    backdrop-filter backdrop-blur-sm
                  `}
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex items-center mb-4">
                    <div className={`
                      p-3 rounded-lg mr-4
                      ${isDarkMode 
                        ? 'bg-indigo-900/60 shadow-[inset_1px_1px_0px_rgba(255,255,255,0.1),_inset_-1px_-1px_0px_rgba(0,0,0,0.4),_4px_4px_8px_rgba(0,0,0,0.5),_-2px_-2px_5px_rgba(255,255,255,0.08)]' 
                        : 'bg-indigo-100 shadow-[inset_1px_1px_0px_rgba(255,255,255,0.8),_inset_-1px_-1px_0px_rgba(0,0,0,0.05),_4px_4px_8px_rgba(0,0,0,0.07),_-2px_-2px_5px_rgba(255,255,255,0.9)]'
                      }
                    `}>
                      {feature.icon}
                    </div>
                    <h3 className={`text-xl font-bold ${isDarkMode ? 'text-indigo-100' : 'text-indigo-800'}`} style={{fontFamily: "var(--font-orbitron)"}}>
                      {feature.title}
                    </h3>
                  </div>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} style={{fontFamily: "var(--font-space-grotesk)"}}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right side - Auth Component (40% on large screens) */}
          <motion.div
            className="lg:w-[40%] lg:self-start"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`
              rounded-xl p-8 relative
              ${isDarkMode 
                ? 'bg-gray-900/90 border border-gray-800 shadow-[inset_1px_1px_0px_rgba(255,255,255,0.1),_inset_-1px_-1px_0px_rgba(0,0,0,0.4),_12px_12px_24px_rgba(0,0,0,0.6),_-3px_-3px_8px_rgba(255,255,255,0.08)]' 
                : 'bg-white/90 border border-gray-200 shadow-[inset_1px_1px_0px_rgba(255,255,255,0.9),_inset_-1px_-1px_0px_rgba(0,0,0,0.05),_12px_12px_24px_rgba(0,0,0,0.07),_-3px_-3px_8px_rgba(255,255,255,0.9)]'
              }
              backdrop-filter backdrop-blur-sm
            `}>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-10 z-0"></div>
              <div className={`
                flex rounded-xl p-1 mb-8 relative z-10
                ${isDarkMode 
                  ? 'bg-gray-800/90 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3),_inset_-1px_-1px_2px_rgba(255,255,255,0.05),_3px_3px_6px_rgba(0,0,0,0.2)]' 
                  : 'bg-gray-200/90 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.05),_inset_-1px_-1px_2px_rgba(255,255,255,0.8),_3px_3px_6px_rgba(0,0,0,0.03)]'
                }
              `}>
                <motion.button
                  onClick={() => setActiveTab("signin")}
                  className={`
                    flex-1 py-3 rounded-lg text-center transition-all
                    ${activeTab === "signin"
                      ? isDarkMode
                        ? 'bg-indigo-600 text-white shadow-[0px_3px_6px_rgba(0,0,0,0.4),_inset_1px_1px_1px_rgba(255,255,255,0.2),_inset_-1px_-1px_1px_rgba(0,0,0,0.2)]'
                        : 'bg-indigo-500 text-white shadow-[0px_3px_6px_rgba(0,0,0,0.15),_inset_1px_1px_1px_rgba(255,255,255,0.4),_inset_-1px_-1px_1px_rgba(0,0,0,0.1)]'
                      : isDarkMode
                        ? 'text-indigo-300 hover:bg-indigo-900/30'
                        : 'text-indigo-600 hover:bg-indigo-100/70'
                    }
                  `}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{fontFamily: "var(--font-orbitron)"}}
                >
                  Sign In
                </motion.button>
                <motion.button
                  onClick={() => setActiveTab("signup")}
                  className={`
                    flex-1 py-3 rounded-lg text-center transition-all
                    ${activeTab === "signup"
                      ? isDarkMode
                        ? 'bg-indigo-600 text-white shadow-[0px_3px_6px_rgba(0,0,0,0.4),_inset_1px_1px_1px_rgba(255,255,255,0.2),_inset_-1px_-1px_1px_rgba(0,0,0,0.2)]'
                        : 'bg-indigo-500 text-white shadow-[0px_3px_6px_rgba(0,0,0,0.15),_inset_1px_1px_1px_rgba(255,255,255,0.4),_inset_-1px_-1px_1px_rgba(0,0,0,0.1)]'
                      : isDarkMode
                        ? 'text-indigo-300 hover:bg-indigo-900/30'
                        : 'text-indigo-600 hover:bg-indigo-100/70'
                    }
                  `}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{fontFamily: "var(--font-orbitron)"}}
                >
                  Sign Up
                </motion.button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={`
                  p-4 rounded-lg relative z-10 min-h-[400px] overflow-y-auto
                  ${isDarkMode 
                    ? 'bg-black/30 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.4),_inset_-1px_-1px_3px_rgba(255,255,255,0.05),_4px_4px_8px_rgba(0,0,0,0.2)]' 
                    : 'bg-gray-50/80 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.07),_inset_-1px_-1px_3px_rgba(255,255,255,0.9),_4px_4px_8px_rgba(0,0,0,0.03)]'
                  }
                  backdrop-filter backdrop-blur-sm
                `}
              >
                {activeTab === "signin" ? <SignInComponent /> : <SignUpComponent />}
              </motion.div>

              <motion.p 
                className={`mt-8 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} relative z-10`}
                whileHover={{ scale: 1.02 }}
              >
                {activeTab === "signin" ? "Don't have an account? " : "Already have an account? "}
                <motion.button
                  onClick={() => setActiveTab(activeTab === "signin" ? "signup" : "signin")}
                  className={`${isDarkMode ? 'text-indigo-300 hover:text-indigo-400' : 'text-indigo-600 hover:text-indigo-700'} font-medium transition-colors duration-200`}
                  whileHover={{ scale: 1.05 }}
                  style={{fontFamily: "var(--font-orbitron)"}}
                >
                  {activeTab === "signin" ? "Sign up" : "Sign in"}
                </motion.button>
              </motion.p>
            </div>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
}
