"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export function useRequireAuth(redirectTo: string = '/auth/signin') {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [hasChecked, setHasChecked] = useState(false)

  useEffect(() => {
    if (!loading && !hasChecked) {
      setHasChecked(true)
      if (!user) {
        // Add a small delay before redirecting to avoid flash
        const timer = setTimeout(() => {
          setShouldRedirect(true)
        }, 100)
        return () => clearTimeout(timer)
      } else {
        setShouldRedirect(false)
      }
    }
  }, [user, loading, hasChecked])

  useEffect(() => {
    if (shouldRedirect && hasChecked) {
      router.push(`${redirectTo}${redirectTo.includes('?') ? '&' : '?'}redirect=${encodeURIComponent(window.location.pathname)}`)
    }
  }, [shouldRedirect, redirectTo, router, hasChecked])

  return {
    user,
    loading: loading || (!hasChecked && !user),
    isAuthenticated: !!user && hasChecked && !shouldRedirect
  }
}