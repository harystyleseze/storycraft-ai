"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Plus, 
  Sparkles, 
  Upload,
  Wand2,
  FileText,
  Video,
  Image,
  Music
} from "lucide-react"
import { useRequireAuth } from "@/hooks/useRequireAuth"
import { DashboardLayout } from "@/components/DashboardLayout"

export default function CreateStoryPage() {
  const { user, loading } = useRequireAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-lg text-slate-600 dark:text-slate-300">Loading creator...</div>
        </div>
      </div>
    )
  }

  return (
    <DashboardLayout activeTab="create">
      <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Create New Story</h1>
              <p className="text-slate-600 dark:text-slate-400">Transform your ideas into magical video stories</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Story Creation Form */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-slate-900 dark:text-slate-100">
                    <FileText className="w-5 h-5 mr-2 text-purple-600" />
                    Story Details
                  </CardTitle>
                  <CardDescription>
                    Provide the basic information for your video story
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Story Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter your story title..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Story Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your story idea in detail..."
                      className="min-h-[120px]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="genre">Genre</Label>
                      <Input
                        id="genre"
                        placeholder="e.g., Fantasy, Adventure"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Target Duration</Label>
                      <Input
                        id="duration"
                        placeholder="e.g., 2-3 minutes"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-slate-900 dark:text-slate-100">
                    <Upload className="w-5 h-5 mr-2 text-blue-600" />
                    Media Assets
                  </CardTitle>
                  <CardDescription>
                    Upload images, audio, or reference materials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center">
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-2">
                      Drop files here or click to upload
                    </p>
                    <p className="text-sm text-slate-500">
                      Supports images, audio files, and documents
                    </p>
                    <Button variant="outline" className="mt-4">
                      Choose Files
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex gap-4"
            >
              <Button size="lg" className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Wand2 className="w-5 h-5 mr-2" />
                Generate Story
              </Button>
              <Button variant="outline" size="lg">
                Save Draft
              </Button>
            </motion.div>
          </div>

          {/* Creation Options Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-slate-900 dark:text-slate-100">
                    <Sparkles className="w-5 h-5 mr-2 text-emerald-600" />
                    Quick Templates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { title: "Adventure Quest", icon: Video },
                    { title: "Fairy Tale", icon: Sparkles },
                    { title: "Space Explorer", icon: Video },
                    { title: "Mystery Story", icon: Video }
                  ].map((template) => {
                    const Icon = template.icon
                    return (
                      <Button 
                        key={template.title}
                        variant="ghost" 
                        className="w-full justify-start text-left hover:bg-purple-50 dark:hover:bg-purple-950"
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {template.title}
                      </Button>
                    )
                  })}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-slate-100">Style Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Animated", icon: Video },
                      { label: "Realistic", icon: Image },
                      { label: "Cartoon", icon: Sparkles },
                      { label: "Cinematic", icon: Music }
                    ].map((style) => {
                      const Icon = style.icon
                      return (
                        <Button 
                          key={style.label}
                          variant="outline" 
                          className="flex flex-col h-16 text-xs"
                        >
                          <Icon className="w-5 h-5 mb-1" />
                          {style.label}
                        </Button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}