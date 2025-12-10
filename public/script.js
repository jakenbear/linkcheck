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
            resultsDiv.innerHTML = `<h3>Failed Links (${failedLinks.length}):</h3>`;
            failedLinks.forEach(result => {
                const resultDiv = document.createElement('div');
                resultDiv.className = 'result error';
                resultDiv.innerHTML = `<span class="icon">✗</span>${result.link}`;
                resultsDiv.appendChild(resultDiv);
            });
        }
    } catch (error) {
        resultsDiv.innerHTML = '<p>Error checking links. Please try again.</p>';
    }
});