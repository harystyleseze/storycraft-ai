### ✅ Step 1: Go to Google Cloud Console

- Visit: [https://console.cloud.google.com/](https://console.cloud.google.com/)
- Sign in with your Google account.

---

### ✅ Step 2: Create a New Project (if needed)

1. Click on the **project dropdown** in the top bar.
2. Click **"New Project"**.
3. Give it a name (e.g., `My Supabase App`) and create it.

---

### ✅ Step 3: Enable "Google+ API" or "OAuth 2.0" (if not already enabled)

> Google Auth now uses **"OAuth 2.0 Client IDs"**, but some APIs might require "People API".

1. Go to **APIs & Services > Library**.
2. Search for and enable:

   - **"OAuth 2.0 Client IDs"**
   - **"People API"**

---

### ✅ Step 4: Configure OAuth Consent Screen

1. Go to **APIs & Services > OAuth consent screen**.
2. Choose **"External"** for user type (if you want public access).
3. Fill in:

   - App name
   - User support email
   - Developer contact info

4. Save and continue (you can skip Scopes and Test Users for now).

---

### ✅ Step 5: Create OAuth 2.0 Credentials

1. Go to **APIs & Services > Credentials**.

2. Click **"+ Create Credentials" > OAuth client ID**.

3. Choose **Web Application**.

4. Add the following:

   - **Name:** e.g., `Supabase App`
   - **Authorized JavaScript origins:**

     ```
     https://<your-supabase-project-ref>.supabase.co
     ```

   - **Authorized redirect URIs:**

     ```
     https://<your-supabase-project-ref>.supabase.co/auth/v1/callback
     ```

5. Click **Create**.

---

### ✅ Step 6: Copy the Client ID and Client Secret

- Google will now show your **Client ID** and **Client Secret**.
- Copy both values.

---

### ✅ Step 7: Add to Supabase

1. Go to your **Supabase project dashboard**.
2. Navigate to **Authentication > Providers > Google**.
3. Paste in the:

   - **Client ID**
   - **Client Secret**

4. Click **"Enable"** and save.

---

### ✅ Done! Test It

Now your Supabase project supports Google login. You can test it using:

```ts
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: "google",
});
```

---

### ⚠️ Notes:

- **Redirect URI must exactly match** what’s in Google Cloud Console.
- If you're using **localhost** during development:

  - Add `http://localhost:3000` as an authorized origin.
  - Add `http://localhost:3000/auth/v1/callback` as a redirect URI.

---
