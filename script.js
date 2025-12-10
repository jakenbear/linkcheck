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
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(link)}`;
        const res = await fetch(proxyUrl);
        const data = await res.json();
        const html = data.contents.toLowerCase();

        // Check for private/error indicators
        const isPrivate = html.includes('this playlist is private') ||
                          html.includes('you need permission') ||
                          html.includes('access denied') ||
                          html.includes('sign in to continue');

        return !isPrivate;
    } catch (error) {
        // If fetch fails, assume not accessible
        return false;
    }
}