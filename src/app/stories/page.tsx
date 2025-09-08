"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Video, 
  Plus, 
  MoreHorizontal,
  Play,
  Download,
  Share2,
  Edit,
  Trash2,
  Clock,
  Eye,
  Heart
} from "lucide-react"
import { useRequireAuth } from "@/hooks/useRequireAuth"
import { DashboardLayout } from "@/components/DashboardLayout"

export default function MyStoriesPage() {
  const { user, loading } = useRequireAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-lg text-slate-600 dark:text-slate-300">Loading your stories...</div>
        </div>
      </div>
    )
  }

  // Mock data for demonstration
  const stories = [
    {
      id: 1,
      title: "The Magical Forest Adventure",
      description: "A young explorer discovers a hidden world filled with mystical creatures and ancient secrets.",
      thumbnail: "/api/placeholder/300/200",
      status: "completed",
      duration: "2:45",
      views: 127,
      likes: 23,
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      title: "Space Station Mystery",
      description: "When communication with Earth is lost, the crew must solve the mystery before it's too late.",
      thumbnail: "/api/placeholder/300/200", 
      status: "processing",
      duration: "3:12",
      views: 0,
      likes: 0,
      createdAt: "2024-01-20",
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400'
      case 'processing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-400'
      case 'draft': return 'bg-slate-100 text-slate-800 dark:bg-slate-950 dark:text-slate-400'
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-950 dark:text-slate-400'
    }
  }

  return (
    <DashboardLayout activeTab="stories">
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">My Stories</h1>
              <p className="text-slate-600 dark:text-slate-400">Manage and view all your created video stories</p>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Plus className="w-4 h-4 mr-2" />
            New Story
          </Button>
        </motion.div>

        {stories.length > 0 ? (
          <>
            {/* Stories Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {stories.map((story, index) => (
                <Card key={story.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 flex items-center justify-center">
                      <Video className="w-12 h-12 text-purple-400" />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <Button 
                        size="sm" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-slate-900 hover:bg-white"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Play
                      </Button>
                    </div>
                    <Badge className={`absolute top-2 right-2 ${getStatusColor(story.status)}`}>
                      {story.status}
                    </Badge>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg leading-tight text-slate-900 dark:text-slate-100">
                        {story.title}
                      </CardTitle>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                    <CardDescription className="text-sm line-clamp-2">
                      {story.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {story.duration}
                        </div>
                        <div className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {story.views}
                        </div>
                        <div className="flex items-center">
                          <Heart className="w-3 h-3 mr-1" />
                          {story.likes}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            {/* Pagination */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" className="bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center py-16"
          >
            <Card className="border-0 shadow-lg max-w-md mx-auto">
              <CardContent className="pt-12 pb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Video className="w-10 h-10 text-purple-600 dark:text-purple-400 opacity-50" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  No stories yet
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Start creating your first magical video story today!
                </p>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Story
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  )
}