# StoryCraft AI

An AI-powered video storytelling platform built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- 🎬 AI-powered story generation
- 🎥 Automated video assembly
- 🎨 Modern responsive UI with shadcn/ui
- 🔒 User authentication with Supabase
- 📊 PostgreSQL database integration
- 🚀 Server-side and client-side rendering with Next.js App Router

## Tech Stack

- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui with Radix UI primitives
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Supabase
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS with CSS Variables
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- OpenAI API key (for AI features)
- ElevenLabs API key (for voice generation)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/harystyleseze/storycraft-ai
   cd storycraft-ai
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.local.example .env.local
   ```

   Fill in your environment variables in `.env.local`:

   - Supabase URL and keys
   - OpenAI API key
   - ElevenLabs API key
   - Database connection string

4. Set up the database:

   ```bash
   # Run the schema.sql file in your Supabase SQL editor
   # Or use your preferred PostgreSQL client
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── projects/      # Project management endpoints
│   │   └── video-assembly/ # Video generation endpoints
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── supabase.ts        # Supabase client and types
│   ├── utils.ts           # Utility functions
│   └── video-assembly.ts  # Video generation service
└── utils/                 # Additional utilities
```

## API Endpoints

### Projects

- `GET /api/projects` - Get user projects
- `POST /api/projects` - Create new project
- `GET /api/projects/[id]` - Get specific project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Video Assembly

- `POST /api/video-assembly` - Start video generation process

### Authentication

- `POST /api/auth` - Handle signup/signin

## Database Schema

The application uses PostgreSQL with the following main tables:

- `projects` - Store user projects and stories
- `video_segments` - Store individual video segments
- Row Level Security (RLS) enabled for data protection

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Database
DATABASE_URL=your_postgresql_connection_string

# AI Services
OPENAI_API_KEY=your_openai_api_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key

# Next.js
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

### Adding Components

This project uses shadcn/ui. To add new components:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
# etc.
```

## Deployment

The application can be deployed on Vercel, Netlify, or any platform supporting Next.js.

1. Set up your production database on Supabase
2. Configure environment variables on your hosting platform
3. Deploy the application

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
