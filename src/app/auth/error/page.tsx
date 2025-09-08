"use client"

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case 'access_denied':
        return {
          title: 'Access Denied',
          description: 'You cancelled the authentication process or denied access to your account.',
          suggestion: 'Try signing in again and grant the necessary permissions.'
        }
      case 'invalid_request':
        return {
          title: 'Invalid Request',
          description: 'The authentication request was invalid or malformed.',
          suggestion: 'Please try signing in again from the beginning.'
        }
      case 'unauthorized_client':
        return {
          title: 'Authentication Error',
          description: 'There was a problem with the authentication service configuration.',
          suggestion: 'This is a technical issue. Please contact support if it persists.'
        }
      case 'server_error':
        return {
          title: 'Server Error',
          description: 'The authentication server encountered an error.',
          suggestion: 'This is usually temporary. Please try again in a few moments.'
        }
      case 'temporarily_unavailable':
        return {
          title: 'Service Temporarily Unavailable',
          description: 'The authentication service is temporarily unavailable.',
          suggestion: 'Please try again in a few minutes.'
        }
      default:
        return {
          title: 'Authentication Error',
          description: errorDescription || 'An unexpected error occurred during authentication.',
          suggestion: 'Please try signing in again. If the problem persists, contact support.'
        }
    }
  }

  const errorInfo = getErrorMessage(error)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-purple-50/20 dark:from-slate-900 dark:to-purple-950/20 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to StoryCraft AI
        </Link>

        <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              {errorInfo.title}
            </h1>
            
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              {errorInfo.description}
            </p>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              {errorInfo.suggestion}
            </p>

            {/* Error details (for debugging, only show if there's technical info) */}
            {error && (
              <div className="mb-6 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">Error Code:</p>
                <p className="text-sm font-mono text-slate-600 dark:text-slate-300">{error}</p>
                {errorDescription && (
                  <>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-1 mt-2">Details:</p>
                    <p className="text-sm font-mono text-slate-600 dark:text-slate-300">{errorDescription}</p>
                  </>
                )}
              </div>
            )}

            <div className="space-y-3">
              <Button
                onClick={() => window.location.href = '/auth/signin'}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Signing In Again
              </Button>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/auth/signup'}
                  className="flex-1"
                >
                  Create Account
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/'}
                  className="flex-1"
                >
                  Go Home
                </Button>
              </div>
            </div>

            {/* Support link */}
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Need help?{' '}
                <Link
                  href="/support"
                  className="text-purple-600 hover:text-purple-700 hover:underline"
                >
                  Contact Support
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-purple-50/20 dark:from-slate-900 dark:to-purple-950/20">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-lg text-slate-600 dark:text-slate-300">Loading...</div>
        </div>
      </div>
    }>
      <AuthErrorContent />
    </Suspense>
  )
}