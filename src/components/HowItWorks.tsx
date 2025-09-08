"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  MessageCircle, 
  Brain, 
  Image, 
  Volume2, 
  Video, 
  Download,
  ArrowRight,
  Sparkles
} from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: MessageCircle,
      title: "Share Your Idea",
      description: "Type a simple phrase or speak your story concept. Even just 'A dragon who wants friends' is enough to get started.",
      example: "A dragon who just wants to make friends...",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50"
    },
    {
      number: 2,
      icon: Brain,
      title: "AI Crafts Your Story",
      description: "Our advanced AI expands your idea into a complete narrative with characters, plot, and emotional arc.",
      example: "Building: Introduction → Conflict → Resolution",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50"
    },
    {
      number: 3,
      icon: Image,
      title: "Generate Visual Scenes",
      description: "Each story beat becomes a beautiful, unique image that perfectly captures the moment and emotion.",
      example: "Creating 4-6 stunning visual scenes...",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50"
    },
    {
      number: 4,
      icon: Volume2,
      title: "Add Professional Voice",
      description: "Choose from premium AI voices that narrate your story with natural emotion and perfect pacing.",
      example: "Selecting voice: Warm, friendly storyteller",
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50"
    },
    {
      number: 5,
      icon: Video,
      title: "Assemble Your Video",
      description: "All elements combine seamlessly - visuals, narration, transitions, and timing - into your final video.",
      example: "Rendering your 60-second masterpiece...",
      color: "from-indigo-500 to-purple-500",
      bgColor: "from-indigo-50 to-purple-50"
    },
    {
      number: 6,
      icon: Download,
      title: "Download & Share",
      description: "Your story video is ready! Download it, share on social media, or send it to friends and family.",
      example: "Ready to share with the world! ✨",
      color: "from-pink-500 to-rose-500",
      bgColor: "from-pink-50 to-rose-50"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.6
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.0, 0.0, 0.2, 1.0] as any
      }
    }
  }

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-br from-slate-50 to-purple-50/20 dark:from-slate-900 dark:to-purple-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Badge variant="secondary" className="mb-4 text-sm py-2 px-4 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
            <Brain className="w-4 h-4 mr-2" />
            Simple Process
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            From Idea to Video in{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              6 Easy Steps
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            No technical skills required. No complex editing. Just your creativity and our AI doing the heavy lifting.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {steps.map((step, index) => {
            const IconComponent = step.icon
            const isEven = index % 2 === 1

            return (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
              >
                {/* Content Side */}
                <div className={`flex-1 ${isEven ? 'lg:text-right' : 'lg:text-left'} text-center`}>
                  <div className="flex items-center justify-center lg:justify-start mb-4">
                    {isEven && <div className="hidden lg:block flex-1" />}
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${step.color} text-white font-bold text-lg shadow-lg`}>
                      {step.number}
                    </div>
                    {!isEven && <div className="hidden lg:block flex-1" />}
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                    {step.description}
                  </p>
                  <div className={`inline-block px-4 py-2 rounded-xl bg-gradient-to-r ${step.bgColor} dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600`}>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 italic">
                      {step.example}
                    </span>
                  </div>
                </div>

                {/* Visual Side */}
                <div className="flex-1 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className={`relative w-64 h-64 rounded-3xl bg-gradient-to-br ${step.bgColor} dark:from-slate-800 dark:to-slate-700 border-2 border-white dark:border-slate-600 shadow-xl flex items-center justify-center overflow-hidden`}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-4 border-2 border-dashed border-current rounded-2xl"></div>
                      <div className="absolute inset-8 border border-dashed border-current rounded-xl"></div>
                    </div>
                    
                    {/* Icon */}
                    <div className={`relative z-10 p-6 rounded-2xl bg-gradient-to-r ${step.color} text-white shadow-lg`}>
                      <IconComponent className="w-12 h-12" />
                    </div>

                    {/* Floating Elements */}
                    <motion.div
                      animate={{ 
                        y: [-5, 5, -5],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                      className="absolute top-4 right-4 text-2xl"
                    >
                      ✨
                    </motion.div>
                  </motion.div>
                </div>

                {/* Arrow for non-last items */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="absolute left-1/2 transform -translate-x-1/2 mt-80 lg:mt-0 lg:left-auto lg:right-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-1/2"
                  >
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg border-2 border-slate-200 dark:border-slate-600">
                      <ArrowRight className="w-6 h-6 text-purple-600 dark:text-purple-400 lg:rotate-0 rotate-90" />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Create Your First Story?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of creators who are already turning their ideas into magical videos
            </p>
            <Button 
              size="lg"
              variant="secondary"
              className="bg-white text-purple-600 hover:bg-slate-100 px-8 py-4 text-lg font-semibold shadow-lg group"
            >
              <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
              Start Creating Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}