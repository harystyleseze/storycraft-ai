"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  BarChart3, 
  TrendingUp,
  Eye,
  Heart,
  Download,
  Share2,
  Users,
  Clock,
  Calendar,
  ArrowUp,
  ArrowDown
} from "lucide-react"
import { useRequireAuth } from "@/hooks/useRequireAuth"
import { DashboardLayout } from "@/components/DashboardLayout"

export default function AnalyticsPage() {
  const { user, loading } = useRequireAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-lg text-slate-600 dark:text-slate-300">Loading analytics...</div>
        </div>
      </div>
    )
  }

  const stats = [
    { 
      label: 'Total Views', 
      value: '2,847', 
      change: '+12.5%', 
      trend: 'up', 
      icon: Eye, 
      color: 'from-blue-500 to-cyan-500' 
    },
    { 
      label: 'Likes', 
      value: '459', 
      change: '+8.2%', 
      trend: 'up', 
      icon: Heart, 
      color: 'from-pink-500 to-rose-500' 
    },
    { 
      label: 'Downloads', 
      value: '127', 
      change: '+15.3%', 
      trend: 'up', 
      icon: Download, 
      color: 'from-purple-500 to-indigo-500' 
    },
    { 
      label: 'Shares', 
      value: '89', 
      change: '-2.1%', 
      trend: 'down', 
      icon: Share2, 
      color: 'from-emerald-500 to-teal-500' 
    },
  ]

  const topStories = [
    { title: "The Magical Forest Adventure", views: 1247, likes: 234, duration: "2:45" },
    { title: "Space Station Mystery", views: 892, likes: 156, duration: "3:12" },
    { title: "Dragon's Quest", views: 708, likes: 89, duration: "4:23" },
  ]

  return (
    <DashboardLayout activeTab="analytics">
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Analytics</h1>
              <p className="text-slate-600 dark:text-slate-400">Track your story performance and engagement</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`flex items-center text-sm font-medium ${
                      stat.trend === 'up' 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {stat.trend === 'up' ? (
                        <ArrowUp className="w-3 h-3 mr-1" />
                      ) : (
                        <ArrowDown className="w-3 h-3 mr-1" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                      {stat.value}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Views Over Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-slate-900 dark:text-slate-100">
                    <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                    Views Over Time
                  </CardTitle>
                  <CardDescription>
                    Daily views for the past 30 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-500 dark:text-slate-400">Chart visualization coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Audience Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-slate-900 dark:text-slate-100">
                    <Users className="w-5 h-5 mr-2 text-green-600" />
                    Audience Insights
                  </CardTitle>
                  <CardDescription>
                    Demographics and viewing patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-3">Top Countries</h4>
                      <div className="space-y-2">
                        {[
                          { country: "United States", percentage: "45%" },
                          { country: "United Kingdom", percentage: "18%" },
                          { country: "Canada", percentage: "12%" },
                          { country: "Australia", percentage: "9%" },
                        ].map((item) => (
                          <div key={item.country} className="flex items-center justify-between">
                            <span className="text-sm text-slate-600 dark:text-slate-400">{item.country}</span>
                            <span className="text-sm font-medium">{item.percentage}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-3">Age Groups</h4>
                      <div className="space-y-2">
                        {[
                          { age: "18-24", percentage: "32%" },
                          { age: "25-34", percentage: "28%" },
                          { age: "35-44", percentage: "22%" },
                          { age: "45+", percentage: "18%" },
                        ].map((item) => (
                          <div key={item.age} className="flex items-center justify-between">
                            <span className="text-sm text-slate-600 dark:text-slate-400">{item.age}</span>
                            <span className="text-sm font-medium">{item.percentage}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Performing Stories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-slate-100">Top Stories</CardTitle>
                  <CardDescription>Your best performing content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topStories.map((story, index) => (
                      <div key={story.title} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                            {story.title}
                          </p>
                          <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mt-1 space-x-2">
                            <span>{story.views} views</span>
                            <span>•</span>
                            <span>{story.likes} likes</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-slate-900 dark:text-slate-100">
                    <Clock className="w-5 h-5 mr-2 text-orange-600" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { action: "New viewer from Canada", time: "2 minutes ago" },
                      { action: "Story liked by user", time: "15 minutes ago" },
                      { action: "Story shared on social media", time: "1 hour ago" },
                      { action: "New comment received", time: "2 hours ago" },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {activity.action}
                        </p>
                        <span className="text-xs text-slate-500">{activity.time}</span>
                      </div>
                    ))}
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