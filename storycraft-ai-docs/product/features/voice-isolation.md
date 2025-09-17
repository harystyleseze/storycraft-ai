## ✅ Overview: What You’ll Do

1. **Frontend**: Let the user upload or choose an audio file.
2. **Backend (API Route)**: Send the file to ElevenLabs Voice Isolator API.
3. **Frontend**: Receive and play the isolated voice audio.

---

## 🔧 1. Install Required Packages

In your **Next.js project root**, install:

```bash
npm install @elevenlabs/elevenlabs-js dotenv
```

Optional for audio playback (MPV/ffmpeg): Not needed for browser playback—you’ll use `<audio>` instead.

---

## 🗝️ 2. Set Up Your `.env` File

Create a `.env.local` file:

```env
ELEVENLABS_API_KEY=your_api_key_here
```

---

## 📁 3. Create Backend API Route in Next.js

In `pages/api/voice-isolate.ts`, add:

```ts
// pages/api/voice-isolate.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

export const config = {
  api: {
    bodyParser: false, // We'll manually parse the file
  },
};

import { Readable } from "stream";

function bufferToReadable(buffer: Buffer): Readable {
  const readable = new Readable();
  readable._read = () => {};
  readable.push(buffer);
  readable.push(null);
  return readable;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const chunks: Buffer[] = [];

  req.on("data", (chunk) => chunks.push(chunk));
  req.on("end", async () => {
    const fileBuffer = Buffer.concat(chunks);
    const blob = new Blob([fileBuffer], { type: "audio/mp3" });

    try {
      const audioStream = await elevenlabs.audioIsolation.convert({
        audio: blob,
      });

      const arrayBuffer = await audioStream.arrayBuffer();
      res.setHeader("Content-Type", "audio/mp3");
      res.send(Buffer.from(arrayBuffer));
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Audio processing failed" });
    }
  });
}
```

---

## 🎛️ 4. Frontend Upload + Playback

In `app/page.tsx` (or a component), add:

```tsx
"use client";

import { useState } from "react";

export default function VoiceIsolator() {
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const response = await fetch("/api/voice-isolate", {
      method: "POST",
      body: file,
    });

    if (!response.ok) {
      console.error("Failed to isolate voice");
      setLoading(false);
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    setAudioSrc(url);
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Voice Isolator</h2>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      {loading && <p className="text-blue-500 mt-2">Processing audio...</p>}
      {audioSrc && (
        <audio className="mt-4" controls>
          <source src={audioSrc} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}
```

---

## ✅ Result

- User uploads an audio file (e.g., `.mp3` with background noise).
- It’s sent to your `/api/voice-isolate` route.
- Your backend uses **Voice Isolator API** to remove the noise.
- You receive the cleaned audio and play it back in-browser.

---

## 🔒 Security & Notes

- You’re calling ElevenLabs API **server-side**, keeping your API key secure.
- Add size limits & file type validation to production uploads.
- For large files or uploads, consider using a multipart form library like `formidable`.

---

## 💡 Optional Improvements

- Show waveform UI (e.g., using `wavesurfer.js`)
- Add drag & drop or record-from-mic support
- Use the isolated voice in the next step
