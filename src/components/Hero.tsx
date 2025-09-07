"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Mic, Type, Sparkles, ArrowRight } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

export function Hero() {
  const { user } = useAuth()
  const router = useRouter()

  const handleGetStarted = () => {
    if (user) {
      // Redirect to dashboard or story creation page
      router.push('/dashboard')
    } else {
      // Redirect to sign up
      router.push('/auth/signup')
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 dark:from-slate-900 dark:via-purple-950/30 dark:to-pink-950/30 pt-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Badge variant="secondary" className="text-sm py-2 px-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300">
            <Sparkles className="w-4 h-4 mr-2" />
            Transform Ideas into Stories in 60 Seconds
          </Badge>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-900 dark:text-slate-100 mb-6 leading-tight"
        >
          Turn Your Ideas Into{" "}
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Magical Videos
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto mb-8 leading-relaxed"
        >
          Share a simple idea, phrase, or story concept. Watch as our AI transforms it into a beautifully narrated video story, complete with visuals and voice.
        </motion.p>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 mb-12 text-slate-600 dark:text-slate-300"
        >
          <div className="flex items-center space-x-2">
            <Type className="w-5 h-5 text-purple-600" />
            <span>Type or speak your idea</span>
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span>AI creates the story</span>
          </div>
          <div className="flex items-center space-x-2">
            <Play className="w-5 h-5 text-purple-600" />
            <span>Get your video in minutes</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
            onClick={handleGetStarted}
          >
            <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
            {user ? 'Create Your Story' : 'Start Creating For Free'}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-slate-300 hover:border-purple-300 px-8 py-4 text-lg hover:bg-purple-50 transition-all duration-300 group"
          >
            <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Watch Demo Video
          </Button>
        </motion.div>

        {/* Voice Input Demo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-purple-200/50 dark:border-purple-800/50 p-6 shadow-lg">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Button variant="outline" size="sm" className="border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950">
                <Type className="w-4 h-4 mr-2" />
                Type
              </Button>
              <span className="text-slate-400 dark:text-slate-500">or</span>
              <Button variant="outline" size="sm" className="border-pink-300 dark:border-pink-600 text-pink-700 dark:text-pink-300 hover:bg-pink-50 dark:hover:bg-pink-950">
                <Mic className="w-4 h-4 mr-2" />
                Speak
              </Button>
            </div>
            <div className="text-center text-slate-600 dark:text-slate-300 italic">
              &ldquo;A dragon who just wants to make friends...&rdquo;
            </div>
          </div>
        </motion.div>

        {/* Floating Animation Elements */}
        <motion.div
          animate={{ 
            y: [-10, 10, -10],
            rotate: [0, 5, 0, -5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-8 text-4xl opacity-20"
        >
          ✨
        </motion.div>
        <motion.div
          animate={{ 
            y: [10, -10, 10],
            rotate: [0, -5, 0, 5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-1/3 right-8 text-4xl opacity-20"
        >
          🎬
        </motion.div>
        <motion.div
          animate={{ 
            y: [-15, 15, -15],
            rotate: [0, 10, 0, -10, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 left-1/4 text-4xl opacity-20"
        >
          📖
        </motion.div>
      </div>
    </section>
  )
}