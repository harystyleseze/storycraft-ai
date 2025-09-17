### ✅ Here's how you can integrate it following your file structure:

- ✅ `lib/actions/` → Async functions for API logic (e.g., calling ElevenLabs)
- ✅ `app/api/` → Next.js route handlers to expose API endpoints
- ✅ `components/[feature]/` → UI components like music generation form or audio player
- ✅ `.env` → Store your ElevenLabs API key

---

## 🔧 1. Set up environment variables

Create a `.env.local` file in the root of your Next.js project:

```env
ELEVENLABS_API_KEY=your_api_key_here
```

Ensure it's loaded:

```ts
// next.config.js (if needed)
module.exports = {
  env: {
    ELEVENLABS_API_KEY: process.env.ELEVENLABS_API_KEY,
  },
};
```

---

## 📦 2. Install the SDK

```bash
npm install @elevenlabs/elevenlabs-js dotenv
```

You only need `dotenv` if you're running scripts directly (e.g., from `lib/actions/cli-script.ts`). For Next.js, it's not needed — it auto-loads `.env`.

---

## 🧠 3. Create a reusable API function

Inside `lib/actions/generateMusic.ts`:

```ts
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY!,
});

export async function generateMusic(prompt: string, duration = 10000) {
  try {
    const result = await elevenlabs.music.compose({
      prompt,
      musicLengthMs: duration,
    });

    return result; // Contains audio bytes, etc.
  } catch (err) {
    console.error("Music generation failed:", err);
    throw err;
  }
}
```

---

## 📡 4. Create an API route

Inside `app/api/music/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { generateMusic } from "@/lib/actions/generateMusic";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { prompt, duration } = body;

  try {
    const track = await generateMusic(prompt, duration);
    const audioBuffer = await track.arrayBuffer();

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate music" },
      { status: 500 }
    );
  }
}
```

---

## 🎛️ 5. Create a UI component

In `components/music/Generator.tsx`:

```tsx
"use client";

import { useState } from "react";

export default function MusicGenerator() {
  const [prompt, setPrompt] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    const res = await fetch("/api/music", {
      method: "POST",
      body: JSON.stringify({ prompt, duration: 10000 }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } else {
      alert("Failed to generate music");
    }
    setLoading(false);
  }

  return (
    <div className="space-y-4">
      <textarea
        className="w-full border p-2"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your music prompt"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Music"}
      </button>
      {audioUrl && <audio controls src={audioUrl} className="mt-4" />}
    </div>
  );
}
```

---

## 🧩 6. Use it in a page

In `app/music/page.tsx`:

```tsx
import MusicGenerator from "@/components/music/Generator";

export default function MusicPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">AI Music Generator</h1>
      <MusicGenerator />
    </div>
  );
}
```

---

## ✅ Final Structure Overview

```
/app
  /api
    /music
      route.ts       # API endpoint
  /music
    page.tsx         # Page with component

/lib
  /actions
    generateMusic.ts # SDK wrapper

/components
  /music
    Generator.tsx    # UI component

.env.local           # Your API key
```

---

## 💡 Optional Enhancements

- Use `compositionPlan` for more granular control.
- Add waveform visualization.
- Add ability to download audio.
- Stream audio response instead of waiting.
