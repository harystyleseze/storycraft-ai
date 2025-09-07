"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Target, 
  Heart, 
  Lightbulb, 
  Users, 
  Rocket, 
  Sparkles,
  ArrowRight,
  Globe,
  Shield,
  Zap
} from "lucide-react"

export function About() {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "We push the boundaries of AI technology to make story creation accessible to everyone, regardless of technical skill.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Heart,
      title: "Human-Centered",
      description: "Every feature we build serves real human needs - from teachers engaging students to parents bonding with children.",
      color: "from-pink-500 to-red-500"
    },
    {
      icon: Globe,
      title: "Inclusive Access",
      description: "Stories are universal. We're building technology that breaks down barriers and gives everyone a voice.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "We prioritize user privacy, content safety, and ethical AI practices in everything we create.",
      color: "from-green-500 to-emerald-500"
    }
  ]

  const stats = [
    { number: "2023", label: "Founded" },
    { number: "10K+", label: "Stories Created" },
    { number: "50+", label: "Countries" },
    { number: "99.9%", label: "Uptime" }
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
    <section id="about" className="py-24 bg-white">
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
            <Target className="w-4 h-4 mr-2" />
            Our Story
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Democratizing{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Creative Expression
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto">
            We believe everyone has a story to tell. StoryCraft AI was born from the simple idea that creativity shouldn&apos;t be limited by technical barriers or expensive tools.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white mb-20"
        >
          <div className="text-center">
            <Rocket className="w-16 h-16 mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
            <p className="text-xl leading-relaxed max-w-3xl mx-auto">
              To empower every person on Earth to transform their imagination into beautiful, shareable stories. 
              We&apos;re building the bridge between human creativity and AI capability, making professional-quality 
              storytelling accessible to teachers, parents, creators, and dreamers everywhere.
            </p>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">What Drives Us</h3>
            <p className="text-lg text-slate-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-xl font-semibold text-slate-900 mb-3">
                        {value.title}
                      </h4>
                      <p className="text-slate-600 leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="bg-slate-50 rounded-3xl p-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-900 mb-2">By the Numbers</h3>
              <p className="text-slate-600">Our impact in the creative community</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-purple-600 mb-2">{stat.number}</div>
                  <div className="text-slate-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Team Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <div>
            <Badge className="mb-4 bg-green-100 text-green-700">
              <Users className="w-4 h-4 mr-2" />
              Our Team
            </Badge>
            <h3 className="text-3xl font-bold text-slate-900 mb-6">
              Built by Storytellers, for Storytellers
            </h3>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Our diverse team combines expertise in AI research, creative writing, education, and user experience. 
              We&apos;re not just building technology&mdash;we&apos;re crafting tools that amplify human imagination.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              From former teachers who understand classroom dynamics to AI researchers pushing technological boundaries, 
              every team member brings unique perspectives to making creativity more accessible.
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">AI Research</Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">Creative Writing</Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-700">Education</Badge>
              <Badge variant="secondary" className="bg-orange-100 text-orange-700">UX Design</Badge>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8 text-center">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {['🎨', '🧠', '📚', '💻', '🎭', '✨'].map((emoji, index) => (
                  <motion.div
                    key={index}
                    animate={{ 
                      y: [-5, 5, -5],
                      rotate: [-5, 5, -5]
                    }}
                    transition={{ 
                      duration: 3 + index,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                    className="text-4xl"
                  >
                    {emoji}
                  </motion.div>
                ))}
              </div>
              <p className="text-slate-700 italic">
                &ldquo;Every great story starts with &lsquo;What if?&rsquo; We&apos;re here to help you explore those possibilities.&rdquo;
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-12 text-white">
            <Zap className="w-16 h-16 mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4">Ready to Join Our Story?</h3>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Whether you&apos;re a teacher, parent, creator, or dreamer, we&apos;d love to see what stories you&apos;ll tell.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 text-lg group">
                <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
                Start Creating Today
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-slate-500 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg">
                Learn More About Us
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}