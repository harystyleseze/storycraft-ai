"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Mic, 
  Type, 
  Brain, 
  Image, 
  Volume2, 
  Video, 
  Download, 
  Clock,
  Sparkles,
  Zap
} from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Type,
      title: "Text & Voice Input",
      description: "Type your story idea or speak it aloud. Our advanced voice recognition captures your creativity effortlessly.",
      badge: "Easy Start",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Brain,
      title: "AI Story Expansion",
      description: "Our AI takes your simple idea and crafts a complete narrative with introduction, build-up, climax, and resolution.",
      badge: "Smart AI",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Image,
      title: "Visual Scene Generation",
      description: "Each story beat is transformed into stunning visual scenes using state-of-the-art AI image generation.",
      badge: "Beautiful",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Volume2,
      title: "Professional Narration",
      description: "High-quality AI voices bring your story to life with natural, expressive narration in multiple voice styles.",
      badge: "Lifelike",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Video,
      title: "Automatic Video Assembly",
      description: "Seamlessly combine visuals, narration, and transitions into a polished 60-second video story.",
      badge: "Automated",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Download,
      title: "Instant Download & Share",
      description: "Your finished video is ready to download, share on social media, or embed anywhere you want.",
      badge: "Share Ready",
      color: "from-pink-500 to-rose-500"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.0, 0.0, 0.2, 1.0] as any
      }
    }
  }

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Badge variant="secondary" className="mb-4 text-sm py-2 px-4 bg-purple-100 text-purple-700">
            <Sparkles className="w-4 h-4 mr-2" />
            Powerful Features
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Create Magic
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            From idea to finished video in minutes. Our AI-powered platform handles every step of the creative process.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ 
                  y: -5, 
                  transition: { duration: 0.2, ease: [0.0, 0.0, 0.2, 1.0] as any }
                }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50/50">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white shadow-lg`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <Badge variant="secondary" className="bg-white/80 text-slate-700 text-xs">
                        {feature.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-semibold text-slate-900">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              <Clock className="w-8 h-8 mx-auto mb-2" />
              45s
            </div>
            <div className="text-slate-600">Average creation time</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              <Zap className="w-8 h-8 mx-auto mb-2" />
              10k+
            </div>
            <div className="text-slate-600">Stories created daily</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl">
            <div className="text-3xl font-bold text-emerald-600 mb-2">
              <Sparkles className="w-8 h-8 mx-auto mb-2" />
              4.9/5
            </div>
            <div className="text-slate-600">User satisfaction</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}