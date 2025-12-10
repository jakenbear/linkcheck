const API_KEY = 'YOUR_GOOGLE_API_KEY_HERE'; // Replace with your Google API key

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
    if (link.includes('youtube.com/playlist')) {
        const id = extractYouTubePlaylistId(link);
        if (!id) throw new Error('Invalid YouTube playlist link');
        return await checkYouTubePlaylist(id);
    } else if (link.includes('drive.google.com/file')) {
        const id = extractDriveFileId(link);
        if (!id) throw new Error('Invalid Google Drive link');
        return await checkDriveFile(id);
    } else {
        throw new Error('Unsupported link type');
    }
}

function extractYouTubePlaylistId(url) {
    const match = url.match(/[?&]list=([^#\&\?]*)/);
    return match ? match[1] : null;
}

function extractDriveFileId(url) {
    const match = url.match(/\/file\/d\/([^\/]+)/);
    return match ? match[1] : null;
}

async function checkYouTubePlaylist(id) {
    const url = `https://www.googleapis.com/youtube/v3/playlists?part=status&id=${id}&key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.items && data.items.length > 0) {
        const privacy = data.items[0].status.privacyStatus;
        return privacy !== 'private';
    }
    return false;
}

async function checkDriveFile(id) {
    const url = `https://www.googleapis.com/drive/v3/files/${id}/permissions?key=${API_KEY}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.permissions) {
            return data.permissions.some(p => p.type === 'anyone');
        }
        return false;
    } catch {
        return false;
    }
}