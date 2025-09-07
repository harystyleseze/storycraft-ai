# 📄 Product Requirements Document (PRD) — FINAL

**Product Name:** *StoryCraft AI*
**Version:** 1.0 (MVP)
**Date:** September 7, 2025
**Author:** ChatGPT

---

## ✅ Overview

**StoryCraft AI** is a **mobile-first AI platform** that transforms **any story idea** — from a simple phrase to a short spoken sentence — into a **narrated visual story video**, ready to download or share.

---

### 🎯 Vision

**🧠 User Input (Idea)** → **🤖 AI Generation** → **🎞️ Story Video (60 seconds)**

---

### 🧰 Target Users

* Creative hobbyists
* Children (with adult supervision)
* Educators and parents
* Storytellers & YouTubers
* Non-writers who want to tell stories

---

## 💡 Key Features Summary (MVP)

| Feature               | Description                                  |
| --------------------- | -------------------------------------------- |
| ✍️ Text input         | Type a short idea or phrase                  |
| 🎙️ Voice input       | Record story idea (voice-to-text)            |
| 🧠 AI story expansion | LLM builds structured story (intro → ending) |
| 🎞️ Scene generation  | Break story into 4–6 visual beats            |
| 🖼️ Image generation  | Each beat → Gemini Flash or SDXL image       |
| 🔊 Narration          | AI TTS of full story (via ElevenLabs)        |
| 🎬 Video generation   | Combine narration + images (ffmpeg or Fal)   |
| 👤 User auth          | Sign up/login via Supabase                   |
| 💾 Story history      | Dashboard of saved story videos              |
| 📥 Download & share   | Final story video downloadable or linkable   |

---

## 🔮 Optional (Post-MVP) Features

| Feature          | Notes                                   |
| ---------------- | --------------------------------------- |
| Background music | Music per story or scene (ElevenLabs)   |
| Voice cloning    | Use user’s own voice for narration      |
| Animated scenes  | Slight animation/parallax in visuals    |
| PDF storybook    | Convert to printable PDF book           |
| Genre control    | Choose “kids”, “sci-fi”, “horror”, etc. |
| Language support | Multilingual narration + captions       |

---

## 🔧 Technical Stack

| Layer       | Tech                                               |
| ----------- | -------------------------------------------------- |
| Frontend    | **Next.js (App Router)**, TypeScript, Tailwind CSS |
| UI Toolkit  | **ShadCN UI**, Radix UI                            |
| Backend     | Supabase (Auth, DB, Storage) + Edge Functions      |
| AI APIs     | OpenAI (GPT-4) or Gemini Pro, Gemini Flash, SDXL   |
| Audio & TTS | ElevenLabs, Whisper (Fal), FFmpeg (or Fal Video)   |
| Deployment  | Vercel (frontend) + Supabase (backend)             |

---

## 🚶 Beginner-Friendly User Journey

1. **Landing page**
   ➤ “Tell Your Story” CTA → input (text or mic)

2. **Story Input**
   ➤ Text field or mic button → auto-transcribe

3. **Story Generation**
   ➤ AI builds story structure (5 scenes)

4. **Scene Processing**
   ➤ Generate prompts ➤ Generate 1 image per scene

5. **Narration**
   ➤ AI voice reads the story (TTS)

6. **Video Assembly**
   ➤ Merge audio + images ➤ Create 60s video

7. **Preview**
   ➤ Show video ➤ User can download/share

8. **Account (optional)**
   ➤ User signs in → saves past stories

---

## 🧩 App Routing — Next.js App Router Structure

```ts
/app
├── layout.tsx             // Root layout
├── page.tsx               // Landing page
├── input/                 // Step 1: Enter story idea
│   └── page.tsx
├── processing/            // Step 2: Loading screen
│   └── page.tsx
├── preview/[id]/          // Step 3: Watch/download video
│   └── page.tsx
├── dashboard/             // Saved stories
│   └── page.tsx
├── api/                   // Server-side route handlers
│   └── story/
│       ├── expand/route.ts
│       ├── scenes/route.ts
│   └── images/generate/route.ts
│   └── audio/narrate/route.ts
│   └── video/assemble/route.ts
│   └── video/[id]/route.ts
```

---

## 🖼️ File Structure (Client vs Server Explained)

```ts
/components         // UI Components (Client Only)
/lib                // Shared logic (can be server or client)
/types              // Global TypeScript interfaces
/styles             // Tailwind / Global CSS
/public             // Static assets (videos, images, audio)
```

### Examples:

* `/components/VoiceRecorder.tsx`: Records mic input (client only)
* `/lib/storyBuilder.ts`: GPT prompt logic (server only)
* `/lib/supabase.ts`: Shared Supabase client

---

## 📁 API Specs

### POST `/api/story/expand`

**Input:**

```json
{ "idea": "A dragon who wants to stop fighting" }
```

**Response:**

```json
{
  "title": "The Peaceful Dragon",
  "introduction": "...",
  "hook": "...",
  "build_up": "...",
  "climax": "...",
  "ending": "..."
}
```

---

### POST `/api/story/scenes`

**Input:**

```json
{ "story": { full_story_object } }
```

**Response:**

```json
[
  "A dragon sits on a mountain, looking tired...",
  "A knight walks toward it with a sword...",
  ...
]
```

---

### POST `/api/images/generate`

**Input:**

```json
{ "prompts": ["Scene 1...", "Scene 2..."] }
```

**Response:**

```json
[
  { "scene": 0, "imageUrl": "https://..." },
  ...
]
```

---

### POST `/api/audio/narrate`

**Input:**

```json
{ "story": "Full story text", "voiceId": "Rachel" }
```

**Response:**

```json
{ "audioUrl": "https://..." }
```

---

### POST `/api/video/assemble`

**Input:**

```json
{ "audioUrl": "...", "imageUrls": [ ... ] }
```

**Response:**

```json
{ "videoUrl": "https://..." }
```

---

### GET `/api/video/:id`

Returns final video file URL + metadata

---

## 🛢️ Supabase Database Schema

### 🧑 `users`

| Field       | Type      |
| ----------- | --------- |
| id          | UUID      |
| email       | TEXT      |
| created\_at | TIMESTAMP |

---

### 📖 `stories`

| Field       | Type      |
| ----------- | --------- |
| id          | UUID      |
| user\_id    | UUID      |
| idea        | TEXT      |
| full\_story | JSONB     |
| created\_at | TIMESTAMP |

---

### 🖼️ `scenes`

| Field        | Type    |
| ------------ | ------- |
| id           | UUID    |
| story\_id    | UUID    |
| prompt       | TEXT    |
| image\_url   | TEXT    |
| scene\_index | INTEGER |

---

### 🔊 `narrations`

| Field      | Type |
| ---------- | ---- |
| id         | UUID |
| story\_id  | UUID |
| audio\_url | TEXT |
| voice\_id  | TEXT |

---

### 🎥 `videos`

| Field       | Type      |
| ----------- | --------- |
| id          | UUID      |
| story\_id   | UUID      |
| video\_url  | TEXT      |
| created\_at | TIMESTAMP |

---

## 🧰 Dependencies (Installation)

```bash
# Framework & Styling
npm install next@latest tailwindcss typescript shadcn-ui

# Auth / DB
npm install @supabase/supabase-js

# AI APIs
npm install openai @google/generative-ai

# Voice / Audio
npm install elevenlabs @ffmpeg/ffmpeg whisper-fal-sdk

# Utilities
npm install zod axios dotenv
```

---

## 🎬 Story-to-Scene Timing Logic

Target: **5 scenes = 60 seconds**
→ Each scene = 10–12 seconds of narration

**Step-by-step:**

```ts
const totalAudioDuration = getDuration(audioUrl);
const sceneDuration = totalAudioDuration / imageUrls.length;

```


for (let i = 0; i < imageUrls.length; i++) {
ffmpeg.input(imageUrls\[i])
.loop(sceneDuration)
.addInput(audioUrl)
.outputOptions(...)
}

```

> ⚠️ If narration is longer than expected → compress audio slightly or trim ending.

---

## 🔐 Non-Functional Requirements

| Area            | Requirement                                       |
|-----------------|--------------------------------------------------|
| ⚡ Performance   | Generation pipeline < 45 seconds per story       |
| 📱 Mobile-first | Optimized layouts via Tailwind + responsive grid |
| 🧠 Scalable      | Serverless architecture (Supabase, Edge APIs)    |
| 🔐 Secure        | Auth via Supabase, scoped access, CORS           |
| 🔗 Shareable     | Public video links with unique ID                |
| ♿ Accessible     | Captioning + voice input                         |

---

## ✅ Summary

**StoryCraft AI** allows anyone to create a 60-second **video story** from a simple **idea**, with no editing needed.

This PRD is beginner-friendly, modular, scalable, and production-ready. The architecture properly separates **client vs server logic**, and uses the most modern web dev tools (Next.js App Router, Supabase, Gemini, ElevenLabs).

