"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, Sparkles, User, LogOut, Moon, Sun } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useTheme } from "@/contexts/ThemeContext"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  
  const { user, loading } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleSignOut = () => {
    router.push('/auth/signout?auto=true')
  }

  const handleSignIn = () => {
    router.push('/auth/signin')
  }

  const handleSignUp = () => {
    router.push('/auth/signup')
  }

  const navItems = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How it Works" },
    { href: "#testimonials", label: "Reviews" },
    { href: "#faq", label: "FAQ" },
    { href: "#about", label: "About" },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center space-x-2"
          >
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              StoryCraft AI
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 font-medium transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden md:flex items-center space-x-4"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
            {loading ? (
              <div className="w-20 h-10 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-md" />
            ) : user ? (
              <>
                <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                  <User className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <Button 
                  variant="ghost" 
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                  onClick={handleSignIn}
                >
                  Sign In
                </Button>
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={handleSignUp}
                >
                  Start Creating
                </Button>
              </>
            )}
          </motion.div>

          {/* Mobile menu button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden overflow-hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 mt-4"
        >
          <div className="py-4 space-y-4">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200"
              >
                {item.label}
              </motion.a>
            ))}
            <div className="px-4 pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
              <Button
                variant="ghost"
                onClick={toggleTheme}
                className="w-full justify-start text-slate-600 dark:text-slate-400"
              >
                {theme === 'light' ? <Moon className="w-4 h-4 mr-2" /> : <Sun className="w-4 h-4 mr-2" />}
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </Button>
              {user ? (
                <>
                  <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 px-4 py-2">
                    <User className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-slate-600 dark:text-slate-400"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-slate-600 dark:text-slate-400"
                    onClick={handleSignIn}
                  >
                    Sign In
                  </Button>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    onClick={handleSignUp}
                  >
                    Start Creating
                  </Button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  )
}