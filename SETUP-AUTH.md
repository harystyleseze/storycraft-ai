# StoryCraft AI - Authentication Setup Guide

## 🚀 Quick Setup Steps

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project:
   - Project name: `storycraft-ai` 
   - Database password: (choose a secure password)
   - Region: (select closest to your users)

### 2. Configure Environment Variables

Update your `.env.local` file with your Supabase credentials:

```bash
# Get these from Supabase > Settings > API
NEXT_PUBLIC_SUPABASE_URL=your_actual_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key
```

### 3. Set Up Database Tables

1. Go to your Supabase project dashboard
2. Navigate to "SQL Editor"
3. Run the SQL from `supabase-setup.sql` file

### 4. Configure Authentication Providers

#### Email Authentication (Already enabled)
- Go to Authentication > Settings
- Email auth is enabled by default

#### Google OAuth (Optional)
1. Go to Authentication > Providers
2. Enable Google provider
3. Add your Google OAuth credentials:
   - Client ID
   - Client Secret
4. Set redirect URL to: `https://yourproject.supabase.co/auth/v1/callback`

### 5. Configure Site URL

In Supabase Authentication > Settings:
- Site URL: `http://localhost:3000` (development)
- Additional Redirect URLs: 
  - `http://localhost:3000/auth/callback`
  - (Add production URLs when deploying)

## 🎯 What's Included

✅ **Email/Password Authentication**
- Sign up with email and password
- Sign in with existing credentials
- Automatic profile creation
- Secure password handling

✅ **Google OAuth Integration**
- One-click Google sign-in
- Automatic account linking
- Profile data sync

✅ **User Session Management**
- Persistent sessions across page reloads
- Automatic token refresh
- Secure logout

✅ **Protected Routes**
- `useRequireAuth` hook for protected pages
- Automatic redirect to home if not authenticated
- Loading states during authentication checks

✅ **UI Components**
- Beautiful modal-based authentication
- Responsive design (mobile + desktop)
- Form validation and error handling
- Loading states and feedback

## 🔧 Usage Examples

### Protect a Page

```tsx
import { useRequireAuth } from '@/hooks/useRequireAuth'

export default function ProtectedPage() {
  const { user, loading } = useRequireAuth()
  
  if (loading) return <div>Loading...</div>
  
  return <div>Welcome {user.email}!</div>
}
```

### Access User Data

```tsx
import { useAuth } from '@/contexts/AuthContext'

export default function UserProfile() {
  const { user, profile, updateProfile } = useAuth()
  
  const handleUpdateName = async (newName: string) => {
    await updateProfile({ full_name: newName })
  }
  
  return (
    <div>
      <h1>{profile?.full_name || user?.email}</h1>
    </div>
  )
}
```

### Manual Authentication

```tsx
import { useAuth } from '@/contexts/AuthContext'

export default function CustomAuth() {
  const { signIn, signUp, signOut } = useAuth()
  
  const handleSignUp = async () => {
    const result = await signUp('user@example.com', 'password123', 'John Doe')
    if (result.error) {
      console.error(result.error)
    }
  }
  
  return <button onClick={handleSignUp}>Sign Up</button>
}
```

## 🗄️ Database Schema

The authentication setup creates:

### `profiles` table
- `id` (UUID, foreign key to auth.users)
- `email` (TEXT)
- `full_name` (TEXT, nullable)
- `avatar_url` (TEXT, nullable)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Row Level Security (RLS)
- Users can only access their own profile data
- Automatic profile creation on signup
- Secure data isolation

## 🔒 Security Features

- **Row Level Security (RLS)** enabled on all tables
- **Automatic profile creation** on user signup
- **Secure token handling** with automatic refresh
- **CSRF protection** through Supabase
- **Email verification** (configurable)
- **Password requirements** (configurable)

## 🎨 Customization

### Styling
- Modify `AuthModal.tsx` for custom UI
- Update `Header.tsx` for different navigation
- Customize colors in `tailwind.config.ts`

### Additional Providers
- Add Facebook, Twitter, GitHub, etc.
- Configure in Supabase dashboard
- Update `signInWithProvider()` method

### Email Templates
- Customize in Supabase Auth > Templates
- Brand with your colors and logo
- Add custom email content

## 🚀 Ready to Use!

Your authentication system is now fully configured and ready for production. Users can:

1. **Sign up** with email/password or Google
2. **Sign in** securely with session persistence  
3. **Access protected routes** with automatic redirects
4. **Manage their profile** with real-time updates
5. **Sign out** with proper session cleanup

Start building your authenticated features! 🎉