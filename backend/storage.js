import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'database.json');

// Initialize DB file if not exists
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

export const saveUrl = (urlObj) => {
    const data = JSON.parse(fs.readFileSync(DB_FILE));
    data.push(urlObj);
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    return urlObj;
};

export const getUrl = (code) => {
    const data = JSON.parse(fs.readFileSync(DB_FILE));
    return data.find(item => item.code === code);
};

export const getAllUrls = () => {
    const data = JSON.parse(fs.readFileSync(DB_FILE));
    return data;
}
