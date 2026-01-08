import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';
import { saveUrl, getUrl, getAllUrls } from './storage.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Routes
app.post('/api/shorten', (req, res) => {
    const { originalUrl } = req.body;
    if (!originalUrl) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const code = nanoid(6); // Generate 6-char ID
    const shortUrl = `http://localhost:${PORT}/${code}`;
    const newUrl = { originalUrl, shortUrl, code, createdAt: new Date() };

    saveUrl(newUrl);
    res.json(newUrl);
});

app.get('/api/urls', (req, res) => {
    const urls = getAllUrls();
    res.json(urls);
});

app.get('/:code', (req, res) => {
    const { code } = req.params;
    const urlEntry = getUrl(code);

    if (urlEntry) {
        return res.redirect(urlEntry.originalUrl);
    } else {
        return res.status(404).json({ error: 'URL not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
