## ✅ 1. **Install the fal client**

First, install the `@fal-ai/client` in your project:

```bash
npm install @fal-ai/client
```

---

## ✅ 2. **Set up a reusable fal client**

Create a utility function to handle your fal setup in `lib/actions/falClient.ts`:

```ts
// lib/actions/falClient.ts
import { fal } from "@fal-ai/client";

// Optionally, configure your fal API key
fal.config({
  credentials: "YOUR_FAL_API_KEY", // ideally use process.env.FAL_API_KEY
});

export default fal;
```

---

## ✅ 3. **Create a Server Action to trigger the video generation**

You can add a server action in `lib/actions/generateVideo.ts`:

```ts
// lib/actions/generateVideo.ts
"use server";

import fal from "./falClient";

export async function generateVideoFromImage({
  prompt,
  imageUrl,
}: {
  prompt: string;
  imageUrl: string;
}) {
  try {
    const result = await fal.subscribe("fal-ai/minimax-video/image-to-video", {
      input: {
        prompt,
        image_url: imageUrl,
      },
    });

    return result.output; // result may include video URL or job info
  } catch (error) {
    console.error("Error generating video:", error);
    throw new Error("Failed to generate video");
  }
}
```

> 🔐 Don’t forget to use environment variables for API keys:
>
> - `.env.local`
>
> ```env
> FAL_API_KEY=your_fal_api_key
> ```

---

## ✅ 4. **Create an API route (optional alternative to Server Actions)**

If you prefer an API route over server actions, do this in `app/api/generate-video/route.ts`:

```ts
// app/api/generate-video/route.ts
import { NextResponse } from "next/server";
import fal from "@/lib/actions/falClient";

export async function POST(req: Request) {
  const { prompt, imageUrl } = await req.json();

  try {
    const result = await fal.subscribe("fal-ai/minimax-video/image-to-video", {
      input: {
        prompt,
        image_url: imageUrl,
      },
    });

    return NextResponse.json(result.output);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate video" },
      { status: 500 }
    );
  }
}
```

---

## ✅ 5. **Build your UI component**

In `components/VideoGeneratorForm/`:

```tsx
// components/VideoGeneratorForm/index.tsx
"use client";

import { useState } from "react";

export default function VideoGeneratorForm() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/generate-video", {
      method: "POST",
      body: JSON.stringify({ prompt, imageUrl }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setVideoUrl(data.video_url || ""); // adjust key depending on API response
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Generating..." : "Generate Video"}
      </button>

      {videoUrl && <video src={videoUrl} controls autoPlay loop />}
    </form>
  );
}
```

---

## ✅ 6. **Use the component in a page**

For example in `app/page.tsx` or `app/generate-video/page.tsx`:

```tsx
// app/page.tsx
import VideoGeneratorForm from "@/components/VideoGeneratorForm";

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Image to Video Generator</h1>
      <VideoGeneratorForm />
    </main>
  );
}
```

---

## ✅ 7. **Optional: Add Model Selector**

You can let users choose between models like:

- `fal-ai/minimax-video/image-to-video`
- `fal-ai/luma-dream-machine`
- `fal-ai/kling-video/v1/standard`

Just pass the selected model ID from your form and update the `subscribe` call.

---

## 🧪 Test It

- Enter a **prompt** and **public image URL**
- Submit the form
- You should receive a video response and preview it in the video tag.

---

## ✅ Summary

| Task                     | Path                              |
| ------------------------ | --------------------------------- |
| Fal client setup         | `lib/actions/falClient.ts`        |
| Server action (optional) | `lib/actions/generateVideo.ts`    |
| API route (if used)      | `app/api/generate-video/route.ts` |
| UI component             | `components/VideoGeneratorForm/`  |
| Page usage               | `app/page.tsx` or similar         |

---
