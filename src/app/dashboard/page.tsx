"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Video, Clock, Star } from "lucide-react"
import { useRequireAuth } from "@/hooks/useRequireAuth"

export default function DashboardPage() {
  const { user, loading } = useRequireAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-purple-50/20 dark:from-slate-900 dark:to-purple-950/20">
        <div className="animate-pulse text-lg text-slate-600 dark:text-slate-300">Loading your dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50/20 dark:from-slate-900 dark:to-purple-950/20 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0]}!
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Ready to create your next amazing story?
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Create New Story</CardTitle>
                <CardDescription>
                  Turn your ideas into magical video stories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Start Creating
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">My Stories</CardTitle>
                <CardDescription>
                  View and manage your created stories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  View All Stories
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Favorites</CardTitle>
                <CardDescription>
                  Your starred stories and templates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  View Favorites
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <Video className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No stories created yet</p>
                <p className="text-sm">Your created stories will appear here</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}