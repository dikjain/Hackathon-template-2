"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import SignUpComponent from "@/app/(auth)/sign-up/[[...sign-up]]/page";
import SignInComponent from "@/app/(auth)/sign-in/[[...sign-in]]/page";
import { AuroraText } from "@/components/magicui/aurora-text";
import { GridBackgroundDemo } from "@/components/magicui/BackgroundGrid";
import { motion } from "framer-motion";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {

    if (user?.id) {
      router.replace("/dashboard");
      return;
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full">
        <GridBackgroundDemo/>
      </div>

      <div className="w-full min-h-screen flex items-center justify-center p-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <NeonGradientCard
            neonColors={{ firstColor: "#00ff00", secondColor: "#0066ff" }}
            width="100%"
            height={600}
          >
            <div className="w-full h-full bg-black/90 absolute top-0 left-0 rounded-[17px] border-2 border-black p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-full flex justify-center mb-8">
                  <AuroraText
                    colors={["#00ff00", "#33ff66", "#6699cc", "#3366ff", "#0000ff"]}
                    speed={4}
                    className="text-5xl font-bold"
                    style={{fontFamily: "var(--font-orbitron)"}}
                  >
                    DigiStore
                  </AuroraText>
                </div>

                <motion.div 
                  className="flex bg-white/5 rounded-xl p-1 mb-8"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.button
                    onClick={() => setActiveTab("signin")}
                    className={`flex-1 py-3 rounded-lg text-center transition-all ${
                      activeTab === "signin"
                        ? "bg-gradient-to-r from-green-400 to-blue-500 text-white"
                        : "text-white/70 hover:text-white"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{fontFamily: "var(--font-orbitron)"}}
                  >
                    Sign In
                  </motion.button>
                  <motion.button
                    onClick={() => setActiveTab("signup")}
                    className={`flex-1 py-3 rounded-lg text-center transition-all ${
                      activeTab === "signup"
                        ? "bg-gradient-to-r from-green-400 to-blue-500 text-white"
                        : "text-white/70 hover:text-white"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{fontFamily: "var(--font-orbitron)"}}
                  >
                    Sign Up
                  </motion.button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {activeTab === "signin" ? <SignInComponent /> : <SignUpComponent />}
                </motion.div>

                <motion.p 
                  className="mt-8 text-center text-white/60"
                  whileHover={{ scale: 1.02 }}
                >
                  {activeTab === "signin" ? "Don't have an account? " : "Already have an account? "}
                  <motion.button
                    onClick={() => setActiveTab(activeTab === "signin" ? "signup" : "signin")}
                    className="text-green-400 hover:text-blue-400 font-medium transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    style={{fontFamily: "var(--font-orbitron)"}}
                  >
                    {activeTab === "signin" ? "Sign up" : "Sign in"}
                  </motion.button>
                </motion.p>
              </motion.div>
            </div>
          </NeonGradientCard>
        </motion.div>
      </div>
    </div>
  );
}
