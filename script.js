document.getElementById('checkBtn').addEventListener('click', async () => {
    const links = document.getElementById('links').value.split('\n').map(l => l.trim()).filter(l => l);
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    for (const link of links) {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'result';
        resultDiv.textContent = `Checking ${link}...`;
        resultsDiv.appendChild(resultDiv);

        try {
            const accessible = await checkLink(link);
            resultDiv.className = accessible ? 'result success' : 'result error';
            resultDiv.innerHTML = `<span class="icon">${accessible ? '✓' : '✗'}</span>${link}`;
        } catch (error) {
            resultDiv.className = 'result error';
            resultDiv.innerHTML = `<span class="icon">✗</span>${link} - Error: ${error.message}`;
        }
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
                          lowerHtml.includes('this video is private');

        return !isPrivate;
    } catch (error) {
        // If fetch fails, assume not accessible
        return false;
    }
}