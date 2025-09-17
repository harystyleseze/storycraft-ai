## ✅ What You Can Do

### ✔️ Server-side:

- Use ElevenLabs API to generate sound effects.
- Send the audio back to the client as a stream or downloadable file.
- Cache or store audio files for reuse.

### ✔️ Client-side:

- Fetch generated audio from your own API route.
- Play it using `<audio>` tags or Web Audio API.

---

## 🔧 Step-by-Step Integration in Next.js

### **1. Install Dependencies**

```bash
npm install @elevenlabs/elevenlabs-js dotenv
```

> If you're using `.ts` files in your project, you're good to go.

---

### **2. Add API Key to `.env.local`**

Create a `.env.local` in your Next.js root:

```env
ELEVENLABS_API_KEY=your_real_api_key_here
```

Next.js automatically loads `.env.local` into `process.env`.

---

### **3. Create a Server-Side API Route**

Inside your `pages/api/` folder, create a file like `sound.ts`:

```ts
// pages/api/sound.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const audio = await elevenlabs.textToSoundEffects.convert({ text });

    res.setHeader("Content-Type", "audio/mpeg");
    res.send(audio);
  } catch (error) {
    console.error("Error generating sound:", error);
    res.status(500).json({ error: "Failed to generate sound" });
  }
}
```

---

### **4. Client-Side: Fetch & Play Audio**

You can use this in a React component:

```tsx
// components/SoundPlayer.tsx
import { useState } from "react";

export default function SoundPlayer() {
  const [loading, setLoading] = useState(false);

  const playSound = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/sound", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: "Cinematic Braam, Horror" }),
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const audio = new Audio(url);
      audio.play();
    } catch (err) {
      console.error("Failed to play sound", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={playSound} disabled={loading}>
        {loading ? "Loading..." : "Play Sound"}
      </button>
    </div>
  );
}
```

---

## ⚠️ Notes and Considerations

- **No `play()` function in browser** from `@elevenlabs/elevenlabs-js`. You must play the audio manually like shown above.
- The Node-only `play()` function (that uses MPV/ffmpeg) is for local dev or CLI use only.
- You **can store** the returned audio blob in a cloud storage service (e.g. S3) if you want to reuse them later.

---

## ✅ Summary

| Part                  | Technology Used                              |
| --------------------- | -------------------------------------------- |
| Generate sound        | Server-side API route (`pages/api/sound.ts`) |
| Secure API key        | `.env.local` and `process.env`               |
| Play audio in browser | `<audio>` or `new Audio(url).play()`         |
| Client interaction    | React + Fetch API                            |
