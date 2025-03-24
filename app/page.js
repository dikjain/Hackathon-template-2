"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { ArrowRight, Star, Users, Zap, ChevronDown } from 'lucide-react';
import { motion, useScroll, useSpring } from "framer-motion";
import { useTheme } from './utils/Context';
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Navbar, BlurFade, Footer, BlurFadeText } from '@/components/ui/export';
import { teamMembers } from "./data/teamMembers";
import Link from 'next/link';

const STAGGER_DELAY = 0.1;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Home() {
  const { user } = useUser();
  const [scrollY, setScrollY] = useState(0);
  const observerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const { theme } = useTheme();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const CheckIsNewUser = async() => {
    await axios.post('/users', { user });
  }

  useEffect(() => {
    user && CheckIsNewUser()
  }, [user])

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      className={`min-h-screen px-4  relative z-40 sm:px-6 lg:px-10 ${theme === 'dark' ? 'bg-black text-white' : 'bg-background'}`}
    >
      <motion.div 
        className={`fixed top-0 left-0 right-0 h-1 z-50 origin-left ${theme === 'dark' ? 'bg-gray-700' : 'bg-primary'}`}
        style={{ scaleX }}
      />
      
      <Navbar />

      <main className="container mx-auto " >
        <motion.section 
          className="py-12 md:py-24 lg:py-32 flex items-center justify-center"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center px-4">
            <BlurFadeText
              delay={STAGGER_DELAY}
              className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]"
              text="ProjectX: Solving Real Problems"
              style={{fontFamily: "var(--font-orbitron)"}}
            />
            <BlurFadeText
              delay={STAGGER_DELAY * 2}
              className={`max-w-[750px] text-lg sm:text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-muted-foreground'}`}
              text="A revolutionary approach to modern development. Built with cutting-edge technology."
              style={{fontFamily: "var(--font-space-grotesk)"}}
            />
            <BlurFade delay={STAGGER_DELAY * 3}>
              <div 
                className="flex flex-wrap items-center justify-center gap-4 s"
              >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    
                  >
                    <Link href="/dashboard">
                      <Button className={` cursor-pointer ${theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-900/50' : 'button-hover'}`} style={{fontFamily: "var(--font-space-grotesk)"}}>Try Demo</Button>
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link href="/dashboard">
                      <Button variant="outline" className={` cursor-pointer ${theme === 'dark' ? 'border-indigo-700 text-indigo-300 hover:bg-indigo-900/30 shadow-md shadow-indigo-900/30' : 'button-hover'}`} style={{fontFamily: "var(--font-space-grotesk)"}}>Learn More</Button>
                    </Link>
                  </motion.div>
              </div>
            </BlurFade>
            <BlurFade delay={STAGGER_DELAY * 4}>
              <motion.div 
                className="mt-8"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ChevronDown className={`h-6 w-6 ${theme === 'dark' ? 'text-indigo-300' : 'text-muted-foreground'}`} />
              </motion.div>
            </BlurFade>
          </div>
        </motion.section>

        <motion.section 
          id="problem" 
          className={`py-10 md:py-18 shadow-lg border-2 border-gray-100 lg:py-24 ${theme === 'dark' ? 'bg-gray-900/90 shadow-lg shadow-indigo-900/20' : 'bg-muted/50'}  rounded-xl`}
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="container mx-auto grid max-w-5xl items-center gap-6 py-12 px-4 lg:grid-cols-2 lg:gap-12">
            <BlurFade delay={STAGGER_DELAY * 5}>
              <motion.div 
                className="flex flex-col justify-center space-y-4"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl" style={{fontFamily: "var(--font-orbitron)"}}>The Problem</h2>
                  <p className={`max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-muted-foreground'}`} style={{fontFamily: "var(--font-space-grotesk)"}}>
                    We're solving critical development challenges that affect millions of developers worldwide.
                  </p>
                </div>
                <motion.div 
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Button className={`${theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-900/50' : 'button-hover'}`} style={{fontFamily: "var(--font-space-grotesk)"}}>
                    Our Solution
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.div>
                  </Button>
                </motion.div>
              </motion.div>
            </BlurFade>
            <BlurFade delay={STAGGER_DELAY * 6}>
              <motion.div 
                className="flex justify-center"
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className={`w-full max-w-[400px] overflow-hidden rounded-xl p-2 shadow-xl hover-scale ${theme === 'dark' ? 'bg-gray-800/90 shadow-lg shadow-indigo-900/20' : 'bg-card'}`}>
                  <div className={`flex h-[250px] w-full items-center justify-center rounded-md ${theme === 'dark' ? 'bg-gray-700/90 text-indigo-300' : 'bg-muted text-muted-foreground'}`} style={{fontFamily: "var(--font-space-grotesk)"}}>
                    [Problem Visualization]
                  </div>
                </div>
              </motion.div>
            </BlurFade>
          </div>
        </motion.section>
        <motion.section 
          id="features" 
          className="py-12 md:py-24 lg:py-32"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="container mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center px-4">
            <BlurFadeText
              delay={STAGGER_DELAY * 7}
              className="text-3xl font-bold"
              text="Our Features"
              style={{fontFamily: "var(--font-orbitron)"}}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Feature One",
                  description: "Description of the first main feature and why users will love it. This feature provides exceptional value by streamlining complex processes and saving users valuable time. The intuitive interface makes it accessible for both beginners and advanced users.",
                  icon: <Zap className={`h-10 w-10 ${theme === 'dark' ? 'text-indigo-300' : 'text-primary'}`} />
                },
                {
                  title: "Feature Two",
                  description: "Description of the seccond main feature and why users will love it. This feature provides exceptional value by streamlining complex processes and saving users valuable time. The intuitive interface makes it accessible for both beginners and advanced users.",
                  icon: <Star className={`h-10 w-10 ${theme === 'dark' ? 'text-indigo-300' : 'text-primary'}`} />
                },
                {
                  title: "Feature Three",
                  description: "Description of the third main feature and why users will love it. This feature provides exceptional value by streamlining complex processes and saving users valuable time. The intuitive interface makes it accessible for both beginners and advanced users.",
                  icon: <Users className={`h-10 w-10 ${theme === 'dark' ? 'text-indigo-300' : 'text-primary'}`} />
                }
              ].map((feature, index) => (
                <BlurFade key={index} delay={STAGGER_DELAY * (8 + index)}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Card className={`${theme === 'dark' ? 'bg-gray-800/90 border-indigo-700/30 shadow-lg shadow-indigo-900/30' : 'card-hover'} hover:shadow-xl transition-shadow duration-300`}>
                      <CardHeader className="text-center">
                        <div className={`mx-auto mb-2 flex shadow-lg h-16 w-16 items-center justify-center rounded-full ${theme === 'dark' ? 'bg-indigo-900/60 shadow-md shadow-indigo-900/30' : 'bg-muted'}`}>
                          {feature.icon}
                        </div>
                        <CardTitle style={{fontFamily: "var(--font-orbitron)"}} className={`${theme === 'dark' ? 'text-indigo-100' : 'text-primary'}`}>{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className={`text-center ${theme === 'dark' ? 'text-gray-300' : 'text-muted-foreground'}`} style={{fontFamily: "var(--font-space-grotesk)"}}>{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </BlurFade>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section 
          id="team" 
          className="py-12 md:py-20"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="container mx-auto flex max-w-[980px] flex-col items-center gap-6 text-center px-4">
            <BlurFadeText
              delay={STAGGER_DELAY * 11}
              className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl"
              text="Meet Our Team"
              style={{fontFamily: "var(--font-orbitron)"}}
            />
            <p className={`max-w-[700px] text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-muted-foreground'}`} style={{fontFamily: "var(--font-space-grotesk)"}}>
              Our talented professionals are dedicated to bringing you the best experience possible
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
              {teamMembers.map((member, index) => (
                <BlurFade key={member.name} delay={STAGGER_DELAY * (12 + index)}>
                  <motion.div
                    whileHover={{ scale: 1.03, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className={`h-full ${theme === 'dark' ? 'bg-gray-800/90 border-gray-700 hover:bg-gray-800' : 'bg-white/95 hover:bg-white'} shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm`}>
                      <CardHeader className="pb-2">
                        <div className={`w-full h-2 rounded-full mb-4 bg-gradient-to-r ${theme === 'dark' ? 'from-indigo-600 to-purple-600' : 'from-primary to-indigo-500'}`}></div>
                        <CardTitle style={{fontFamily: "var(--font-orbitron)"}} className={`text-xl ${theme === 'dark' ? "text-white" : "text-primary"}`}>{member.name}</CardTitle>
                        <CardDescription className={`font-medium ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'}`} style={{fontFamily: "var(--font-space-grotesk)"}}>{member.role}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`} style={{fontFamily: "var(--font-space-grotesk)"}}>{member.description}</p>
                        <div className="space-y-2 mt-4">
                          {member.achievements.map((achievement) => (
                            <motion.div 
                              key={achievement} 
                              className={`flex items-center gap-3 p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-700/50' : 'hover:bg-slate-100'}`}
                              whileHover={{ 
                                x: 3,
                                transition: { duration: 0.2, ease: "easeOut" }
                              }}
                            >
                              <motion.div
                                className={`flex items-center justify-center h-6 w-6 rounded-full ${theme === 'dark' ? 'bg-indigo-900/60' : 'bg-indigo-100'}`}
                                whileHover={{ scale: 1.1 }}
                              >
                                <Star className={`h-3 w-3 ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'}`} />
                              </motion.div>
                              <motion.span 
                                className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`} 
                                style={{fontFamily: "var(--font-space-grotesk)"}}
                              >
                                {achievement}
                              </motion.span>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className={`flex justify-end pt-0 ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'}`}>
                        <motion.button 
                          className="flex items-center text-sm font-medium"
                          whileHover={{ x: 3 }}
                        >
                          View Profile <ArrowRight className="ml-1 h-4 w-4" />
                        </motion.button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </BlurFade>
              ))}
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </motion.div>
  );
}
