<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1R3gfDMD_PaZ-AJHRKBHZk65Bf6EX21pt

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. If you need a Gemini API key, store it securely (do NOT commit it). Recommended options:

- For local development: create a local `.env` file (added to `.gitignore`) and add `GEMINI_API_KEY=your-key`.
- For production: use Google Secret Manager and attach the secret to your Cloud Run service (do not embed secrets in client bundles).
3. Run the app:
   `npm run dev`
