document.getElementById('checkBtn').addEventListener('click', async () => {
    const links = document.getElementById('links').value.split('\n').map(l => l.trim()).filter(l => l);
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<p>Checking links...</p>';

    let failedLinks = [];

    for (const link of links) {
        try {
            const accessible = await checkLink(link);
            if (!accessible) {
                failedLinks.push(link);
            }
        } catch (error) {
            failedLinks.push(`${link} - Error: ${error.message}`);
        }
    }

    resultsDiv.innerHTML = '';
    if (failedLinks.length === 0) {
        resultsDiv.innerHTML = '<div class="success-message">✓ All links are accessible!</div>';
    } else {
        resultsDiv.innerHTML = `<h3>Failed Links (${failedLinks.length}):</h3>`;
        failedLinks.forEach(link => {
            const resultDiv = document.createElement('div');
            resultDiv.className = 'result error';
            resultDiv.innerHTML = `<span class="icon">✗</span>${link}`;
            resultsDiv.appendChild(resultDiv);
        });
    }
});

async function checkLink(link) {
    try {
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(link)}`;
        const res = await fetch(proxyUrl);
        const html = await res.text();
        const lowerHtml = html.toLowerCase();

        // Check for private/error indicators
        const isPrivate = lowerHtml.includes('this playlist is private') ||
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

        return !isPrivate;
    } catch (error) {
        // If fetch fails, assume not accessible
        return false;
    }
}