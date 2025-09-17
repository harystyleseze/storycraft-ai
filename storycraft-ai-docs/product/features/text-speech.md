Yes, you **can absolutely use ElevenLabs' text-to-speech (TTS) features in a full-stack Next.js application**, whether you're streaming audio directly or generating and storing audio files. Here's how to **integrate both streaming and non-streaming TTS into your Next.js project** in a modular, maintainable way.

---

## 🧩 Integration Overview

You’ll typically implement this on the **backend (API routes)** of your Next.js app, since you need to **protect your ElevenLabs API key** and possibly interact with AWS S3.

We’ll break it down into these parts:

1. **Setup**
2. **Install dependencies**
3. **Create reusable TTS utility**
4. **Expose API routes (streaming & non-streaming)**
5. (Optional) Upload to **S3 + generate presigned URL**
6. **Frontend integration**

---

## 1. ✅ Project Setup (Next.js Full Stack)

Make sure your project is structured like this:

```
/my-nextjs-app
├── /app
│   ├── /api
│   │   ├── tts-file.ts
│   │   └── tts-stream.ts
├── /lib/actions
│       ├── elevenlabs.ts
│       └── s3.ts (optional)
├── .env.local
```

---

## 2. 📦 Install Dependencies

Install required packages:

```bash
npm install @elevenlabs/elevenlabs-js dotenv uuid
npm install aws-sdk # if you plan to use S3
```

---

## 3. 🔧 Create ElevenLabs Client (`lib/actions/elevenlabs.ts`)

```ts
// lib/actions/elevenlabs.ts
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { createWriteStream } from "fs";
import { v4 as uuid } from "uuid";
import path from "path";

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY!,
});

const VOICE_ID = "JBFqnCBsd6RMkjVDRZzb"; // Replace with your chosen voice ID

export async function createAudioFileFromText(text: string): Promise<string> {
  const audio = await elevenlabs.textToSpeech.convert(VOICE_ID, {
    modelId: "eleven_multilingual_v2",
    text,
    outputFormat: "mp3_44100_128",
    voiceSettings: {
      stability: 0,
      similarityBoost: 0,
      useSpeakerBoost: true,
      speed: 1.0,
    },
  });

  const fileName = `${uuid()}.mp3`;
  const filePath = path.resolve("./public/audio", fileName);
  const fileStream = createWriteStream(filePath);

  return new Promise((resolve, reject) => {
    audio.pipe(fileStream);
    fileStream.on("finish", () => resolve(`/audio/${fileName}`));
    fileStream.on("error", reject);
  });
}

export async function createAudioStreamFromText(text: string): Promise<Buffer> {
  const audioStream = await elevenlabs.textToSpeech.stream(VOICE_ID, {
    modelId: "eleven_multilingual_v2",
    text,
    outputFormat: "mp3_44100_128",
    voiceSettings: {
      stability: 0,
      similarityBoost: 1.0,
      useSpeakerBoost: true,
      speed: 1.0,
    },
  });

  const chunks: Buffer[] = [];
  for await (const chunk of audioStream) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks);
}
```

---

## 4. 🧠 API Routes

### **API Route 1 – Generate and save file (`app/api/tts-file.ts`)**

```ts
import { NextApiRequest, NextApiResponse } from "next";
import { createAudioFileFromText } from "@/lib/actions/elevenlabs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const fileUrl = await createAudioFileFromText(text);
    res.status(200).json({ url: fileUrl });
  } catch (error) {
    res.status(500).json({ error: "Failed to create audio file" });
  }
}
```

---

### **API Route 2 – Stream audio directly (`app/api/tts-stream.ts`)**

```ts
import { NextApiRequest, NextApiResponse } from "next";
import { createAudioStreamFromText } from "@/lib/actions/elevenlabs";

export const config = {
  api: {
    responseLimit: false, // Allow streaming large audio
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { text } = req.query;

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const audioBuffer = await createAudioStreamFromText(text);
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Disposition", 'inline; filename="output.mp3"');
    res.send(audioBuffer);
  } catch (error) {
    res.status(500).json({ error: "Failed to stream audio" });
  }
}
```

---

## 5. ☁️ (Optional) AWS S3 Upload

If you want to **upload to S3 and generate signed URLs**, create a file `lib/actions/s3.ts` and I can walk you through that part too. Let me know.

---

## 6. 🧑‍💻 Frontend Example (Streaming)

```tsx
// app/index.tsx
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const handleStream = async () => {
    const res = await fetch(`/api/tts-stream?text=${encodeURIComponent(text)}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);
  };

  return (
    <div>
      <h1>Text to Speech</h1>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleStream}>Play Stream</button>
      {audioUrl && <audio controls src={audioUrl} autoPlay />}
    </div>
  );
}
```

---

## ✅ Summary

You now have:

- 📄 **Audio file generation API**
- 🎧 **Audio streaming API**
- 🔐 API key secured in `.env.local`
- 🧠 Modular logic in `lib/actions/tts.ts`
- 🎵 Simple frontend to test playback

---

## Want Bonus Features?

Let me know if you'd like to add:

- ✅ Uploading to S3
- 🎧 Voice picker from ElevenLabs API
- 📱 PWA for offline TTS playback
- 📚 Save transcripts/audio to database
