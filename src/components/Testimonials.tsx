"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, Heart, Zap } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Elementary Teacher",
      avatar: "👩‍🏫",
      content: "My students absolutely love the stories we create together! It's incredible how a simple idea becomes a beautiful video in minutes. This has revolutionized our creative writing lessons.",
      rating: 5,
      category: "Education"
    },
    {
      name: "Marcus Rodriguez",
      role: "Content Creator",
      avatar: "👨‍💻",
      content: "As someone who struggles with writing, StoryCraft AI is a game-changer. I can focus on my ideas while the AI handles the storytelling. The quality is amazing!",
      rating: 5,
      category: "Creator"
    },
    {
      name: "Emily Watson",
      role: "Parent of 3",
      avatar: "👩‍👧‍👦",
      content: "Bedtime stories just got a major upgrade! My kids love creating their own adventure videos. It's educational, fun, and gives us quality time together.",
      rating: 5,
      category: "Family"
    },
    {
      name: "David Kim",
      role: "YouTuber",
      avatar: "🎥",
      content: "The production value is stunning. I use StoryCraft AI for my channel intros and short-form content. My audience engagement has increased by 300%!",
      rating: 5,
      category: "YouTube"
    },
    {
      name: "Lisa Johnson",
      role: "Marketing Director",
      avatar: "📊",
      content: "We use this for brand storytelling and social media content. The speed and quality are unmatched. Our campaigns have never performed better!",
      rating: 5,
      category: "Business"
    },
    {
      name: "Alex Thompson",
      role: "Indie Author",
      avatar: "✍️",
      content: "Perfect for creating book trailers and promotional content. What used to take weeks now takes minutes. The AI really understands narrative structure.",
      rating: 5,
      category: "Author"
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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.0, 0.0, 0.2, 1.0] as any
      }
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
    )
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Education: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
      Creator: "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300",
      Family: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
      YouTube: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300",
      Business: "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300",
      Author: "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300"
    }
    return colors[category] || "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
  }

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-slate-900">
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
            <Heart className="w-4 h-4 mr-2" />
            Loved by Creators
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            What Our Users{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Are Saying
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Join thousands of happy creators, educators, and storytellers who have transformed their ideas into magical videos.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">10,000+</div>
            <div className="text-slate-600 dark:text-slate-400">Stories Created</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">4.9★</div>
            <div className="text-slate-600 dark:text-slate-400">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
            <div className="text-slate-600 dark:text-slate-400">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">45s</div>
            <div className="text-slate-600 dark:text-slate-400">Avg. Creation Time</div>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={`${testimonial.name}-${index}`}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2, ease: [0.0, 0.0, 0.2, 1.0] as any }
              }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-800 dark:to-slate-800/50 relative overflow-hidden">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-purple-200 dark:text-purple-700">
                  <Quote className="w-8 h-8" />
                </div>
                
                <CardContent className="p-6 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{testimonial.avatar}</div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100">{testimonial.name}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{testimonial.role}</p>
                      </div>
                    </div>
                    <Badge className={`text-xs ${getCategoryColor(testimonial.category)}`}>
                      {testimonial.category}
                    </Badge>
                  </div>

                  {/* Rating */}
                  <div className="mb-4">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Content */}
                  <blockquote className="text-slate-700 dark:text-slate-300 leading-relaxed flex-grow">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>

                  {/* Decorative Element */}
                  <div className="mt-4 flex items-center text-purple-500 dark:text-purple-400">
                    <Zap className="w-4 h-4 mr-2" />
                    <span className="text-xs font-medium">Verified User</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-slate-500 dark:text-slate-400 mb-8">Trusted by creators from</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-slate-400 dark:text-slate-500">YouTube</div>
            <div className="text-2xl font-bold text-slate-400 dark:text-slate-500">TikTok</div>
            <div className="text-2xl font-bold text-slate-400 dark:text-slate-500">Instagram</div>
            <div className="text-2xl font-bold text-slate-400 dark:text-slate-500">LinkedIn</div>
            <div className="text-2xl font-bold text-slate-400 dark:text-slate-500">Twitter</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}