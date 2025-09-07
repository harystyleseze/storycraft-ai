"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export function useRequireAuth(redirectTo: string = '/') {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [shouldRedirect, setShouldRedirect] = useState(false)

  useEffect(() => {
    if (!loading) {
      if (!user) {
        setShouldRedirect(true)
      } else {
        setShouldRedirect(false)
      }
    }
  }, [user, loading])

  useEffect(() => {
    if (shouldRedirect) {
      router.push(redirectTo)
    }
  }, [shouldRedirect, redirectTo, router])

  return {
    user,
    loading: loading || shouldRedirect,
    isAuthenticated: !!user && !shouldRedirect
  }
}