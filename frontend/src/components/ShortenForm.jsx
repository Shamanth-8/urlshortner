import { useState } from 'react';
import axios from 'axios';

const ShortenForm = ({ onShorten }) => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!url) return;

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:3001/api/shorten', {
                originalUrl: url
            });
            onShorten(response.data);
            setUrl('');
        } catch (err) {
            console.error(err);
            setError('Failed to shorten URL. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="url"
                        placeholder="Paste your long link here..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                        autoFocus
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Shortening...' : 'Shorten'}
                    </button>
                </div>
                {error && <p style={{ color: '#ff6b6b', marginTop: '10px' }}>{error}</p>}
            </form>
        </div>
    );
};

export default ShortenForm;
