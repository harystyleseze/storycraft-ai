import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'
  const type = searchParams.get('type')
  const error_param = searchParams.get('error')
  const error_description = searchParams.get('error_description')

  console.log('Callback received:', { 
    code: !!code, 
    next, 
    type, 
    error_param, 
    error_description,
    allParams: Object.fromEntries(searchParams.entries()),
    fullUrl: request.url
  })

  // Handle OAuth errors from provider
  if (error_param) {
    console.error('OAuth provider error:', error_param, error_description)
    
    if (error_param === 'access_denied') {
      return NextResponse.redirect(`${origin}/auth/signin?error=access_denied`)
    }
    
    return NextResponse.redirect(`${origin}/auth/signin?error=oauth_provider_error`)
  }

  if (code) {
    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      console.log('Exchange result:', { 
        success: !error, 
        error: error?.message, 
        user: data?.user?.email 
      })
      
      if (!error && data?.user) {
        // If this is an email confirmation, redirect to confirmation success page
        if (type === 'signup') {
          return NextResponse.redirect(`${origin}/auth/confirmed`)
        }
        
        // For successful OAuth, redirect to dashboard
        return NextResponse.redirect(`${origin}${next}`)
      }
      
      // Handle specific error cases
      if (error) {
        console.error('Auth callback error:', error.message)
        
        if (error.message.includes('Email not confirmed')) {
          return NextResponse.redirect(`${origin}/auth/signin?error=email_not_confirmed`)
        }
        
        if (error.message.includes('already registered') || error.message.includes('email already exists')) {
          return NextResponse.redirect(`${origin}/auth/signin?error=account_exists`)
        }
        
        return NextResponse.redirect(`${origin}/auth/signin?error=oauth_session_error&details=${encodeURIComponent(error.message)}`)
      }
    } catch (err) {
      console.error('Callback processing error:', err)
      return NextResponse.redirect(`${origin}/auth/signin?error=callback_processing_error`)
    }
  }

  console.log('No code received in callback')
  // If there's no code, redirect to sign in with error
  return NextResponse.redirect(`${origin}/auth/signin?error=no_auth_code`)
}