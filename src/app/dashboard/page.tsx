"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Video,
  Clock,
  Star,
  TrendingUp,
  Users,
  Play,
  Download,
  Eye,
  Heart,
  Zap,
  Sparkles,
  ArrowRight,
  BarChart3,
  User,
  Mail,
} from "lucide-react";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function DashboardPage() {
  const { user, loading } = useRequireAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-lg text-slate-600 dark:text-slate-300">
            Loading your dashboard...
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Stories Created",
      value: "0",
      icon: Video,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Total Views",
      value: "0",
      icon: Eye,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Favorites",
      value: "0",
      icon: Heart,
      color: "from-pink-500 to-rose-500",
    },
    {
      label: "Downloads",
      value: "0",
      icon: Download,
      color: "from-purple-500 to-indigo-500",
    },
  ];

  const quickActions = [
    {
      title: "Create New Story",
      description: "Transform your ideas into magical video stories",
      icon: Plus,
      action: "Start Creating",
      gradient: "from-purple-600 to-pink-600",
      bgGradient:
        "from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50",
    },
    {
      title: "Browse Templates",
      description: "Get inspired by popular story templates",
      icon: Sparkles,
      action: "Explore Templates",
      gradient: "from-blue-600 to-cyan-600",
      bgGradient:
        "from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50",
    },
    {
      title: "View Analytics",
      description: "Track your story performance and engagement",
      icon: BarChart3,
      action: "View Analytics",
      gradient: "from-emerald-600 to-teal-600",
      bgGradient:
        "from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50",
    },
  ];

  return (
    <DashboardLayout activeTab="dashboard">
      <div className="p-6 lg:p-8 space-y-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">
                  Welcome back,{" "}
                  {user?.user_metadata?.full_name || user?.email?.split("@")[0]}
                  !
                </h1>
                <p className="text-purple-100">
                  Ready to create your next amazing story?
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-6">
              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                <Zap className="w-3 h-3 mr-1" />
                Premium User
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                <Users className="w-3 h-3 mr-1" />
                Community Member
              </Badge>
            </div>
          </div>

          {/* Background decorations */}
          <div className="absolute top-4 right-4 text-6xl opacity-10">✨</div>
          <div className="absolute bottom-4 right-16 text-4xl opacity-10">
            🎬
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.label}
                className="border-0 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Quick Actions
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.title}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group cursor-pointer"
                >
                  <Card
                    className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${action.bgGradient} relative overflow-hidden`}
                  >
                    <CardHeader className="pb-4">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${action.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl text-slate-900 dark:text-slate-100">
                        {action.title}
                      </CardTitle>
                      <CardDescription className="text-slate-600 dark:text-slate-300">
                        {action.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        className={`w-full bg-gradient-to-r ${action.gradient} hover:opacity-90 group`}
                      >
                        {action.action}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Activity & Trending */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="border-0 shadow-lg h-full">
              <CardHeader>
                <CardTitle className="flex items-center text-slate-900 dark:text-slate-100">
                  <Clock className="w-5 h-5 mr-2 text-purple-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Video className="w-8 h-8 text-purple-600 dark:text-purple-400 opacity-50" />
                  </div>
                  <p className="text-lg mb-2 font-medium">
                    No stories created yet
                  </p>
                  <p className="text-sm mb-4">
                    Your created stories will appear here
                  </p>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Story
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Trending Stories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="border-0 shadow-lg h-full">
              <CardHeader>
                <CardTitle className="flex items-center text-slate-900 dark:text-slate-100">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  Trending Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      title: "Adventure Quest",
                      category: "Fantasy",
                      views: "1.2k",
                    },
                    {
                      title: "Space Explorer",
                      category: "Sci-Fi",
                      views: "956",
                    },
                    {
                      title: "Magic School",
                      category: "Fantasy",
                      views: "847",
                    },
                  ].map((template) => (
                    <div
                      key={template.title}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <Play className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {template.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {template.category}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          {template.views}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          views
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* User Profile Section at Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12"
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                      {user?.user_metadata?.full_name || 'User'}
                    </h3>
                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-400">
                      Premium
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">
                      {user?.email || 'ceze5265@gmail.com'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                    Member since {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">0</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Stories Created</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
