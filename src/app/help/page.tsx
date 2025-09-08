"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  HelpCircle, 
  Search,
  MessageCircle,
  Book,
  Video,
  Mail,
  FileText,
  Users,
  Lightbulb,
  ChevronRight,
  ExternalLink
} from "lucide-react"
import { useRequireAuth } from "@/hooks/useRequireAuth"
import { DashboardLayout } from "@/components/DashboardLayout"

export default function HelpPage() {
  const { user, loading } = useRequireAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-lg text-slate-600 dark:text-slate-300">Loading help center...</div>
        </div>
      </div>
    )
  }

  const helpCategories = [
    {
      title: "Getting Started",
      description: "Learn the basics of creating your first story",
      icon: Lightbulb,
      articles: [
        "How to create your first story",
        "Understanding story templates", 
        "Basic editing tools and features",
        "Publishing and sharing stories"
      ]
    },
    {
      title: "Story Creation",
      description: "Advanced techniques for crafting amazing stories",
      icon: Video,
      articles: [
        "Advanced editing features",
        "Using AI story generation",
        "Adding custom media assets",
        "Optimizing story performance"
      ]
    },
    {
      title: "Account & Settings",
      description: "Manage your account and preferences",
      icon: Users,
      articles: [
        "Profile settings and customization",
        "Privacy and security settings",
        "Billing and subscription management", 
        "Data export and deletion"
      ]
    },
    {
      title: "Troubleshooting",
      description: "Solutions to common issues and problems",
      icon: FileText,
      articles: [
        "Story processing issues",
        "Upload and export problems",
        "Performance optimization",
        "Browser compatibility"
      ]
    }
  ]

  const quickActions = [
    {
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      icon: MessageCircle,
      action: "Start Chat",
      available: true
    },
    {
      title: "Email Support",
      description: "Send us a detailed message about your issue",
      icon: Mail,
      action: "Send Email",
      available: true
    },
    {
      title: "Community Forum",
      description: "Connect with other users and share tips",
      icon: Users,
      action: "Visit Forum",
      available: true
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step guides and tutorials",
      icon: Video,
      action: "Watch Videos",
      available: true
    }
  ]

  const popularArticles = [
    { title: "How to create your first story", views: "2.3k views" },
    { title: "Understanding AI story generation", views: "1.8k views" },
    { title: "Troubleshooting upload issues", views: "1.5k views" },
    { title: "Advanced editing techniques", views: "1.2k views" },
    { title: "Sharing and publishing stories", views: "1.1k views" }
  ]

  return (
    <DashboardLayout activeTab="help">
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            How can we help you?
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Search our knowledge base or get in touch with our support team
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 h-5 w-5" />
            <Input
              placeholder="Search help articles..."
              className="pl-12 h-12 text-lg border-2 focus:border-purple-500 dark:focus:border-purple-400"
            />
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">Quick Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Card key={action.title} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                      {action.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      {action.description}
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      {action.action}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Help Categories */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">Browse by Category</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {helpCategories.map((category, index) => {
                  const Icon = category.icon
                  return (
                    <Card key={category.title} className="border-0 shadow-lg hover:shadow-xl transition-shadow group cursor-pointer">
                      <CardHeader className="pb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-slate-900 dark:text-slate-100">{category.title}</CardTitle>
                            <CardDescription className="text-sm">{category.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {category.articles.slice(0, 3).map((article, articleIndex) => (
                            <div key={articleIndex} className="flex items-center justify-between p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group-hover:text-purple-600 dark:group-hover:text-purple-400">
                              <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                                {article}
                              </span>
                              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          ))}
                          <Button variant="ghost" size="sm" className="w-full text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
                            View all articles
                            <ChevronRight className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Articles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-slate-900 dark:text-slate-100">
                    <Book className="w-5 h-5 mr-2 text-emerald-600" />
                    Popular Articles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {popularArticles.map((article, index) => (
                      <div key={index} className="flex items-start space-x-3 p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                        <div className="w-6 h-6 bg-slate-100 dark:bg-slate-700 rounded flex items-center justify-center text-xs font-medium text-slate-600 dark:text-slate-400">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 line-clamp-2">
                            {article.title}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">{article.views}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-slate-100">Need More Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                        Can&apos;t find what you&apos;re looking for? Our support team is here to help.
                      </p>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Contact Support
                      </Button>
                    </div>
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                      <div className="text-center text-sm text-slate-500 space-y-1">
                        <p>Average response time: 2 hours</p>
                        <p>Support hours: 24/7</p>
                      </div>
                    </div>
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