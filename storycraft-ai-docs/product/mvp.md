# 🚀 StoryCraft AI — MVP Roadmap (Step-by-Step Guide)

**Goal:** Launch a working platform that takes a user’s story idea (text or voice) and returns a 60-second narrated video with images — within 3–4 weeks.

---

## 🧱 Phase 0: Project Setup & Boilerplate (Day 1–2)

| Task                        | Description                                                  |
| --------------------------- | ------------------------------------------------------------ |
| ✅ Initialize Project       | Create Next.js App (App Router, TypeScript)                  |
| ✅ Add TailwindCSS + ShadCN | Install and configure styling and UI components              |
| ✅ Set Up Supabase          | Create Supabase project, enable Auth, Postgres, Storage      |
| ✅ Set Up `.env`            | Store Supabase keys, API tokens for OpenAI, ElevenLabs, etc. |
| ✅ Configure Routing        | Add `/input`, `/processing`, `/preview`, `/dashboard` routes |
| ✅ Mobile-First UI          | Set layout base with Tailwind for mobile responsiveness      |

> 🔧 Deliverable: A basic project structure with working navigation and dummy pages.

---

## 🧠 Phase 1: Collect Story Idea Input (Day 3–5)

| Task                   | Description                                                              |
| ---------------------- | ------------------------------------------------------------------------ |
| ✅ Text Input Form     | Create component to enter a story idea (sentence or phrase)              |
| ✅ Voice Recorder      | Use mic to record user input (`MediaRecorder API`)                       |
| ✅ Whisper Integration | Transcribe voice input into text (Fal Whisper SDK or OpenAI Whisper API) |
| ✅ Input Validation    | Basic Zod schema to limit length (e.g. 1–2 sentences)                    |

> 🎯 Deliverable: Users can type or speak their idea → it is captured and stored in state.

---

## 🧠 Phase 2: Story Generation & Scene Breakdown (Day 5–8)

| Task                                     | Description                                                                    |
| ---------------------------------------- | ------------------------------------------------------------------------------ |
| ✅ API Route: `/api/story/expand`        | Sends idea to GPT/Gemini and returns structured story (intro, hook, climax...) |
| ✅ Scene Generation: `/api/story/scenes` | Breaks full story into 4–6 key scene prompts                                   |
| ✅ Display Story + Prompts               | Show user the generated story and each scene description for preview           |
| ✅ Save to Supabase                      | Save full story + prompts to `stories` and `scenes` tables                     |

> 🎯 Deliverable: Given an idea, the system generates and displays a structured story + scenes.

---

## 🎨 Phase 3: Generate Scene Images (Day 9–12)

| Task                                 | Description                                             |
| ------------------------------------ | ------------------------------------------------------- |
| ✅ Image Prompt Formatting           | Format each scene into rich visual prompts              |
| ✅ API Route: `/api/images/generate` | Calls Gemini Flash / SDXL to generate 1 image per scene |
| ✅ Store Images                      | Upload to Supabase Storage or save URL                  |
| ✅ Display Images                    | Preview the scene images in a grid or slider view       |
| ✅ Update DB                         | Link each image URL to `scenes.image_url` field in DB   |

> 🎯 Deliverable: Users see each scene’s image generated from AI.

---

## 🔊 Phase 4: Narration (TTS) (Day 13–15)

| Task                               | Description                                             |
| ---------------------------------- | ------------------------------------------------------- |
| ✅ Convert Story to Script         | Flatten story parts into a narration-friendly paragraph |
| ✅ API Route: `/api/audio/narrate` | Use ElevenLabs to generate narration                    |
| ✅ Play & Store Audio              | Preview the voiceover + save URL to Supabase Storage    |
| ✅ Update DB                       | Save narration audio link in `narrations` table         |

> 🎯 Deliverable: Narrated voiceover is generated for the full story.

---

## 🎞️ Phase 5: Video Assembly (Day 16–18)

| Task                          | Description                                             |
| ----------------------------- | ------------------------------------------------------- |
| ✅ Prepare Inputs             | Fetch image URLs and narration audio from DB            |
| ✅ Assemble Video             | Use FFmpeg or Fal Video API to merge scenes + narration |
| ✅ Set Duration               | Ensure each image is timed to narration (e.g. 5–10s)    |
| ✅ Store Final Video          | Upload to Supabase or temporary storage                 |
| ✅ API: `/api/video/assemble` | Final video endpoint returns video link                 |
| ✅ Update DB                  | Save video in `videos` table with reference to story ID |

> 🎯 Deliverable: A complete 60-second video is generated and can be streamed/downloaded.

---

## 👀 Phase 6: Preview + Dashboard (Day 19–20)

| Task                                 | Description                                      |
| ------------------------------------ | ------------------------------------------------ |
| ✅ Video Player Page `/preview/[id]` | Show final video with download or share buttons  |
| ✅ Dashboard `/dashboard`            | List previous stories + videos by logged-in user |
| ✅ Add Pagination / Lazy Load        | Improve performance on dashboard (if needed)     |

> 🎯 Deliverable: Users can watch, download, and revisit their generated stories.

---

## 🔒 Phase 7: Auth & Accounts (Day 20–22)

| Task                | Description                                          |
| ------------------- | ---------------------------------------------------- |
| ✅ Supabase Auth    | Add login/signup (email/password or OAuth)           |
| ✅ Protect Routes   | Restrict dashboard + story access to logged-in users |
| ✅ Story Ownership  | Save stories by `user_id` in DB                      |
| ✅ Logout + Profile | Basic account menu and session handling              |

> 🎯 Deliverable: Each user can create and access only their own stories.

---

## 🧪 Phase 8: QA Testing + Polish (Day 23–24)

| Task                | Description                                               |
| ------------------- | --------------------------------------------------------- |
| ✅ Mobile Testing   | Test entire UX on phones (iOS & Android)                  |
| ✅ Loading Feedback | Add step-by-step loading indicators                       |
| ✅ Error Handling   | Add toast messages and fallback UIs                       |
| ✅ Video Hosting    | Ensure videos play across devices/browsers                |
| ✅ Story Retry      | Allow regenerating story or images if user wants to retry |

> 🎯 Deliverable: Fully working end-to-end MVP ready for soft launch.

---

## 🚀 Phase 9: Launch MVP (Day 25–28)

| Task                                            | Description                                   |
| ----------------------------------------------- | --------------------------------------------- |
| ✅ Deploy to Vercel                             | Ship frontend live on `storycraft.vercel.app` |
| ✅ Enable Supabase Storage + Auth in production |                                               |
| ✅ Set Up Logging                               | Track errors and performance                  |
| ✅ Share Demo                                   | Test with beta users or early access group    |

> 🎯 Final Outcome: Working MVP where users can turn ideas into videos in minutes.

---

## 📦 Summary of MVP Capabilities

| Feature                  | Status  |
| ------------------------ | ------- |
| Text + voice input       | ✅ Done |
| Story generation         | ✅ Done |
| Scene + image generation | ✅ Done |
| Narration voiceover      | ✅ Done |
| Video assembly (60s)     | ✅ Done |
| User login + dashboard   | ✅ Done |
| Share/download video     | ✅ Done |

---

## 💡 After MVP (Optional Extensions)

| Feature                | Description                                |
| ---------------------- | ------------------------------------------ |
| 🎵 Music/SFX           | Add ElevenLabs Music API                   |
| 🧑‍🎤 Voice Cloning       | Let user record and clone their voice      |
| 🌍 Language Support    | Narration + UI in multiple languages       |
| 📖 Export as Storybook | PDF with images and story                  |
| ✨ Animate Scenes      | Add parallax or transitions between images |

---
