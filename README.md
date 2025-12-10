# Link Accessibility Checker

A simple static web app to check if Google Drive files or YouTube playlists are accessible (unlisted or public).

## Features

- Paste multiple links (one per line)
- Visual feedback: Green check (✓) for accessible, Red X (✗) for not
- Minimal and stylized UI

## Setup

1. Clone or download this repo.
2. Get a Google API key:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable YouTube Data API v3 and Google Drive API
   - Create credentials (API key)
3. In `script.js`, replace `'YOUR_GOOGLE_API_KEY_HERE'` with your API key.
4. Open `index.html` in a browser to test locally.

## Deployment on Render

1. Push this repo to GitHub.
2. Go to [Render](https://render.com/)
3. Create a new Static Site
4. Connect your GitHub repo
5. Set build command to (leave blank for static)
6. Publish directory: . (root)
7. Deploy

## Usage

- Paste links in the textarea
- Click "Check Links"
- See results below

Note: API key is exposed in client-side code. For production, consider server-side proxy for security.