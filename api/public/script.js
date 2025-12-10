document.getElementById('checkBtn').addEventListener('click', async () => {
    const links = document.getElementById('links').value.split('\n').map(l => l.trim()).filter(l => l);
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<p>Checking links...</p>';

    try {
        const response = await fetch('/check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ links })
        });
        const results = await response.json();

        resultsDiv.innerHTML = '';
        const failedLinks = results.filter(r => !r.accessible);

        if (failedLinks.length === 0) {
            resultsDiv.innerHTML = '<div class="success-message">✓ All links are accessible!</div>';
        } else {
            resultsDiv.innerHTML = `<h3>These Links need fixing (${failedLinks.length}):</h3>`;
            failedLinks.forEach(result => {
                const resultDiv = document.createElement('div');
                resultDiv.className = 'result error';
                let tip = '';
                if (result.link.includes('youtube.com')) {
                    tip = '<br><small>Tip: Set your YouTube playlist/video to "Unlisted" or "Public" (not "Private") in the visibility settings.</small>';
                } else if (result.link.includes('drive.google.com')) {
                    tip = '<br><small>Tip: In Google Drive, click "Share" and set to "Anyone with the link" can view.</small>';
                }
                resultDiv.innerHTML = `<span class="icon">✗</span>${result.link}${tip}`;
                resultsDiv.appendChild(resultDiv);
            });
        }
    } catch (error) {
        resultsDiv.innerHTML = '<p>Error checking links. Please try again.</p>';
    }
});