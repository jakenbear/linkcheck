const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/check', async (req, res) => {
  const { links } = req.body;
  const results = [];

  for (const link of links) {
    try {
      const response = await fetch(link, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      const html = await response.text();
      const lowerHtml = html.toLowerCase();

      let isPrivate = !response.ok; // If not 200, assume private

      if (!isPrivate) {
        // Additional checks for error messages in HTML
        isPrivate = lowerHtml.includes('this playlist is private') ||
                    lowerHtml.includes('you need permission') ||
                    lowerHtml.includes('access denied') ||
                    lowerHtml.includes('sign in to continue') ||
                    lowerHtml.includes('this video is private') ||
                    lowerHtml.includes('video unavailable') ||
                    lowerHtml.includes('this content is not available') ||
                    lowerHtml.includes('you need access') ||
                    lowerHtml.includes('this item has been made private') ||
                    lowerHtml.includes('file not found') ||
                    (lowerHtml.includes('private') && lowerHtml.includes('video')) ||
                    (lowerHtml.includes('private') && lowerHtml.includes('playlist')) ||
                    (lowerHtml.includes('private') && lowerHtml.includes('file'));
      }

      results.push({ link, accessible: !isPrivate });
    } catch (error) {
      results.push({ link, accessible: false, error: error.message });
    }
  }

  res.json(results);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});