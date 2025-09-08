"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  History, 
  Clock,
  Video,
  Edit,
  Play,
  Trash2,
  Download,
  Calendar,
  Search,
  Filter
} from "lucide-react"
import { useRequireAuth } from "@/hooks/useRequireAuth"
import { DashboardLayout } from "@/components/DashboardLayout"

export default function HistoryPage() {
  const { user, loading } = useRequireAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-lg text-slate-600 dark:text-slate-300">Loading history...</div>
        </div>
      </div>
    )
  }

  const historyItems = [
    {
      id: 1,
      type: "created",
      title: "The Magical Forest Adventure",
      description: "Created a new story about a young explorer",
      timestamp: "2024-01-20T10:30:00Z",
      status: "completed",
    },
    {
      id: 2,
      type: "edited",
      title: "Space Station Mystery",
      description: "Updated story description and added new scenes",
      timestamp: "2024-01-19T15:45:00Z",
      status: "draft",
    },
    {
      id: 3,
      type: "downloaded",
      title: "Dragon's Quest",
      description: "Downloaded story in HD format",
      timestamp: "2024-01-18T09:15:00Z",
      status: "completed",
    },
    {
      id: 4,
      type: "deleted",
      title: "Underwater Adventure",
      description: "Moved story to trash",
      timestamp: "2024-01-17T14:20:00Z",
      status: "deleted",
    },
    {
      id: 5,
      type: "created",
      title: "Robot Friendship",
      description: "Started creating a heartwarming sci-fi story",
      timestamp: "2024-01-16T11:00:00Z",
      status: "processing",
    }
  ]

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'created': return Video
      case 'edited': return Edit
      case 'downloaded': return Download
      case 'deleted': return Trash2
      default: return Clock
    }
  }

  const getActionColor = (type: string) => {
    switch (type) {
      case 'created': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950'
      case 'edited': return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950'
      case 'downloaded': return 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950'
      case 'deleted': return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950'
      default: return 'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400'
      case 'processing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-400'
      case 'draft': return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400'
      case 'deleted': return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400'
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-950 dark:text-slate-400'
    }
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours} hours ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays} days ago`
    
    return date.toLocaleDateString()
  }

  return (
    <DashboardLayout activeTab="history">
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
              <History className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">History</h1>
              <p className="text-slate-600 dark:text-slate-400">View your recent activity and story changes</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </motion.div>

        {/* Activity Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Stories Created', value: '12', icon: Video },
            { label: 'Edits Made', value: '34', icon: Edit },
            { label: 'Downloads', value: '8', icon: Download },
            { label: 'This Week', value: '7', icon: Calendar }
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{stat.value}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                    </div>
                    <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </motion.div>

        {/* History Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-900 dark:text-slate-100">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Your story creation and editing history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {historyItems.map((item, index) => {
                  const Icon = getActionIcon(item.type)
                  return (
                    <div key={item.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActionColor(item.type)}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-slate-900 dark:text-slate-100">
                              {item.title}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                              {item.description}
                            </p>
                            <p className="text-xs text-slate-500 mt-2">
                              {formatDate(item.timestamp)}
                            </p>
                          </div>
                          <div className="flex items-center space-x-3 ml-4">
                            <Badge className={getStatusColor(item.status)}>
                              {item.status}
                            </Badge>
                            {item.type !== 'deleted' && (
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Play className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Load More */}
              <div className="text-center mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <Button variant="outline">
                  Load More Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Export History
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Download your complete activity history
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Trash2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Clear History
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Remove old activity records
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Schedule Report
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Get weekly activity summaries
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}