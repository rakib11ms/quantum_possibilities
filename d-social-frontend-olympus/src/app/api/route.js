// pages/api/fetchGitHubMetadata.js
import axios from 'axios';

export default async function handler(req, res) {
    try {
        const response = await axios.get('https://github.com');
        res.status(200).json(response.data);
    } catch (error) {
        console.error(`Error fetching GitHub metadata: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
