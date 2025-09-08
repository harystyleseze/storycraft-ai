"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Star, 
  Play,
  Heart,
  Eye,
  Clock,
  User,
  Sparkles
} from "lucide-react"
import { useRequireAuth } from "@/hooks/useRequireAuth"
import { DashboardLayout } from "@/components/DashboardLayout"

export default function FavoritesPage() {
  const { user, loading } = useRequireAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-lg text-slate-600 dark:text-slate-300">Loading favorites...</div>
        </div>
      </div>
    )
  }

  // Mock data for demonstration
  const favoriteStories = [
    {
      id: 1,
      title: "The Dragon's Quest",
      author: "Sarah Chen",
      description: "An epic tale of courage and friendship in a world of magic and wonder.",
      duration: "4:23",
      views: "2.1k",
      likes: 245,
      category: "Fantasy",
      addedAt: "2 days ago",
    },
    {
      id: 2,
      title: "Underwater Mystery",
      author: "Mike Rodriguez",
      description: "Dive deep into the ocean to uncover ancient secrets and hidden treasures.",
      duration: "3:45",
      views: "1.8k", 
      likes: 189,
      category: "Adventure",
      addedAt: "1 week ago",
    },
    {
      id: 3,
      title: "Robot Friendship",
      author: "Alex Kim",
      description: "A heartwarming story about a lonely robot who learns the meaning of friendship.",
      duration: "2:56",
      views: "3.2k",
      likes: 412,
      category: "Sci-Fi",
      addedAt: "2 weeks ago",
    }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Fantasy': return 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-400'
      case 'Adventure': return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400'
      case 'Sci-Fi': return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400'
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-950 dark:text-slate-400'
    }
  }

  return (
    <DashboardLayout activeTab="favorites">
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Favorite Stories</h1>
              <p className="text-slate-600 dark:text-slate-400">Stories you&apos;ve saved and loved from the community</p>
            </div>
          </div>
        </motion.div>

        {favoriteStories.length > 0 ? (
          <>
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                { label: 'Total Favorites', value: favoriteStories.length.toString(), icon: Heart },
                { label: 'Watch Time', value: '11m 4s', icon: Clock },
                { label: 'Categories', value: '3', icon: Sparkles }
              ].map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card key={stat.label} className="border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.label}</p>
                          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </motion.div>

            {/* Favorites Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {favoriteStories.map((story, index) => (
                <Card key={story.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                  <div className="flex">
                    <div className="w-40 h-32 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 flex items-center justify-center relative">
                      <Play className="w-8 h-8 text-purple-400" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <Button 
                          size="sm" 
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-slate-900 hover:bg-white"
                        >
                          <Play className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                            {story.title}
                          </h3>
                          <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 mt-1">
                            <User className="w-3 h-3 mr-1" />
                            {story.author}
                          </div>
                        </div>
                        <Badge className={`ml-2 ${getCategoryColor(story.category)}`}>
                          {story.category}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                        {story.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center space-x-3">
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
                        <span>Added {story.addedAt}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>

            {/* Load More */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <Button variant="outline" size="lg">
                Load More Favorites
              </Button>
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
                <div className="w-20 h-20 bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-950 dark:to-rose-950 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-10 h-10 text-pink-600 dark:text-pink-400 opacity-50" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  No favorites yet
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Start exploring stories and add your favorites to see them here
                </p>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Explore Stories
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  )
}