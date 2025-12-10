# Link Accessibility Checker

A simple static web app to check if links (e.g., Google Drive files or YouTube playlists) are accessible (unlisted or public) by fetching their content.

## Features

- Paste multiple links (one per line)
- Visual feedback: Green check (✓) for accessible, Red X (✗) for not
- Minimal and stylized UI
- No API keys required—uses a public CORS proxy to check link responses

## Setup

1. Clone or download this repo.
2. Open `index.html` in a browser to test locally.

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

Note: Relies on a public CORS proxy (api.allorigins.win). For production, consider a custom proxy for reliability.