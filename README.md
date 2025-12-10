# Link Accessibility Checker

A simple web app to check if Google Drive files or YouTube videos/playlists are accessible (unlisted or public). Built with Node.js, Express, and deployed on Vercel for free.

## Live Demo

Try it out: [https://linkcheck-ddp.vercel.app/](https://linkcheck-ddp.vercel.app/)

## Features

- Paste multiple links (one per line)
- Visual feedback: Green check (✓) for accessible, Red X (✗) for inaccessible
- Modern, responsive UI with glassmorphism styling
- Server-side link checking to avoid CORS issues
- No API keys required—fetches content directly
- Sequential checking to be respectful to servers

## How It Works

- Frontend: HTML/CSS/JS for UI and API calls
- Backend: Node.js Express server that fetches each link with a browser User-Agent
- Detection: Checks HTTP status and scans HTML for error messages (e.g., "this video is private")
- Deployment: Serverless on Vercel

## Local Setup

1. Clone this repo: `git clone https://github.com/jakenbear/linkcheck.git`
2. Install dependencies: `npm install`
3. Run locally: `npm start` (serves on http://localhost:3000)
4. Open `http://localhost:3000` in your browser

## Deployment on Vercel

1. Push this repo to GitHub.
2. Go to [Vercel](https://vercel.com/)
3. Import your GitHub repo
4. Deploy (Vercel auto-detects the Node.js app)

The app will be live at your Vercel URL.

## Usage

- Paste links in the textarea (e.g., `https://drive.google.com/file/d/...` or `https://youtube.com/playlist?list=...`)
- Click "Check Links"
- View results: Accessible links show green checks; inaccessible ones show red X's with tips

## Limitations

- Relies on HTML scraping, so accuracy depends on platform error messages
- May be rate-limited by YouTube/Google if abused
- For private content, assumes 200 status with error text in HTML

## Contributing

Feel free to open issues or PRs for improvements!