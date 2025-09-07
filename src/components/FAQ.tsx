"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion"
import { HelpCircle, Clock, Video, Download, Users, Shield } from "lucide-react"

export function FAQ() {
  const faqs = [
    {
      question: "How long does it take to create a video?",
      answer: "Most videos are ready in under 60 seconds! The AI works incredibly fast to analyze your idea, create the story, generate visuals, add narration, and assemble everything into a polished video. Complex stories might take up to 2 minutes.",
      icon: Clock
    },
    {
      question: "Do I need any video editing experience?",
      answer: "Absolutely not! That's the beauty of StoryCraft AI. Simply share your idea through text or voice, and our AI handles everything else. No editing skills, technical knowledge, or complex software required.",
      icon: Video
    },
    {
      question: "What formats can I download my videos in?",
      answer: "Your videos are available in high-quality MP4 format, optimized for all major platforms including YouTube, TikTok, Instagram, LinkedIn, and more. We also provide different resolution options based on your needs.",
      icon: Download
    },
    {
      question: "Can I customize the voices and visuals?",
      answer: "Yes! Choose from a variety of professional AI voices with different styles and personalities. While the AI generates visuals automatically, you can regenerate specific scenes if you'd like different imagery.",
      icon: Users
    },
    {
      question: "Is there a limit to how many videos I can create?",
      answer: "Our free plan includes 3 videos per month. Premium plans offer unlimited video creation, priority processing, additional voice options, and commercial usage rights.",
      icon: Shield
    },
    {
      question: "What kind of stories work best?",
      answer: "Any story idea works! From children's tales and educational content to business presentations and creative narratives. The AI excels at expanding simple concepts like 'a robot learning to paint' into compelling full stories.",
      icon: HelpCircle
    },
    {
      question: "Can I use these videos commercially?",
      answer: "Premium subscribers get full commercial rights to use their videos for business, marketing, social media, or any commercial purpose. Free plan videos are for personal use only.",
      icon: Shield
    },
    {
      question: "What languages are supported?",
      answer: "Currently, we support English for both input and narration. We're actively working on adding Spanish, French, German, and other major languages. Subscribe to our newsletter for updates!",
      icon: Users
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <section id="faq" className="py-24 bg-gradient-to-br from-slate-50 to-purple-50/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 text-sm py-2 px-4 bg-purple-100 text-purple-700">
            <HelpCircle className="w-4 h-4 mr-2" />
            Got Questions?
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to know about creating magical video stories with AI.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => {
              const IconComponent = faq.icon
              return (
                <motion.div key={index} variants={itemVariants}>
                  <AccordionItem 
                    value={`item-${index}`} 
                    className="border-b border-slate-100 last:border-b-0"
                  >
                    <AccordionTrigger className="px-6 py-6 hover:no-underline hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-center space-x-4 text-left">
                        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-2 rounded-lg flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="font-semibold text-slate-900 text-lg">
                          {faq.question}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="ml-16 text-slate-600 leading-relaxed text-base">
                        {faq.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              )
            })}
          </Accordion>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-3">
              Still have questions?
            </h3>
            <p className="text-slate-300 mb-6">
              Our support team is here to help you create amazing stories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="mailto:support@storycraftai.com" 
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                support@storycraftai.com
              </a>
              <span className="hidden sm:block text-slate-500">•</span>
              <a 
                href="#" 
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                Live Chat Support
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}