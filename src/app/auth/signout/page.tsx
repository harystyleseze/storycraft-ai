"use client"

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LogOut, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'

function SignOutContent() {
  const [status, setStatus] = useState<'signing-out' | 'success' | 'error'>('signing-out')
  const [error, setError] = useState<string | null>(null)
  
  const { signOut, user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/'
  const autoRedirect = searchParams.get('auto') === 'true'

  useEffect(() => {
    const handleSignOut = async () => {
      if (!user) {
        // Already signed out
        if (autoRedirect) {
          router.push(redirectTo)
        } else {
          setStatus('success')
        }
        return
      }

      try {
        const result = await signOut()
        if (result.error) {
          setError(result.error)
          setStatus('error')
        } else {
          setStatus('success')
          if (autoRedirect) {
            // Auto-redirect after a brief delay to show success state
            setTimeout(() => {
              router.push(redirectTo)
            }, 1500)
          }
        }
      } catch (err) {
        setError('An unexpected error occurred')
        setStatus('error')
      }
    }

    handleSignOut()
  }, [user, signOut, router, redirectTo, autoRedirect])

  const handleContinue = () => {
    router.push(redirectTo)
  }

  const renderContent = () => {
    switch (status) {
      case 'signing-out':
        return (
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <LogOut className="w-8 h-8 text-slate-600 dark:text-slate-300" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Signing you out...</h2>
            <p className="text-slate-600 dark:text-slate-300">Please wait while we securely sign you out.</p>
          </CardContent>
        )

      case 'success':
        return (
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Signed out successfully</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              You have been securely signed out of your StoryCraft AI account.
            </p>
            {!autoRedirect && (
              <div className="space-y-3">
                <Button
                  onClick={handleContinue}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Continue to Home
                </Button>
                <Link
                  href="/auth/signin"
                  className="block text-sm text-purple-600 hover:text-purple-700 hover:underline"
                >
                  Sign in again
                </Link>
              </div>
            )}
            {autoRedirect && (
              <p className="text-sm text-slate-500 dark:text-slate-400">Redirecting you back...</p>
            )}
          </CardContent>
        )

      case 'error':
        return (
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Sign out failed</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-2">
              We encountered an issue while signing you out.
            </p>
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 mb-6">{error}</p>
            )}
            <div className="space-y-3">
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="w-full"
              >
                Try Again
              </Button>
              <Button
                onClick={handleContinue}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Continue Anyway
              </Button>
            </div>
          </CardContent>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-purple-50/20 dark:from-slate-900 dark:to-purple-950/20 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Back to Home (only show if not auto-redirecting) */}
        {!autoRedirect && status !== 'signing-out' && (
          <Link
            href="/"
            className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to StoryCraft AI
          </Link>
        )}

        <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          {renderContent()}
        </Card>
      </motion.div>
    </div>
  )
}

export default function SignOutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-purple-50/20 dark:from-slate-900 dark:to-purple-950/20">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-lg text-slate-600 dark:text-slate-300">Loading...</div>
        </div>
      </div>
    }>
      <SignOutContent />
    </Suspense>
  )
}