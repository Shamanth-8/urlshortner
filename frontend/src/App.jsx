import { useState, useEffect } from 'react';
import ShortenForm from './components/ShortenForm';

function App() {
  const [lastResult, setLastResult] = useState(null);
  const [history, setHistory] = useState([]);

  // Load history from local storage on mount (optional, or just memory)
  useEffect(() => {
    const saved = localStorage.getItem('urlHistory');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const handleShorten = (data) => {
    setLastResult(data);
    const newHistory = [data, ...history];
    setHistory(newHistory);
    localStorage.setItem('urlHistory', JSON.stringify(newHistory));
  };

  return (
    <>
      <h1>URL Shortener</h1>

      <ShortenForm onShorten={handleShorten} />

      {lastResult && (
        <div className="card" style={{ marginTop: '20px', animation: 'fadeIn 0.5s' }}>
          <h3>Here is your short link:</h3>
          <div className="result">
            <a href={lastResult.shortUrl} target="_blank" rel="noopener noreferrer" className="short-url">
              {lastResult.shortUrl}
            </a>
            <p style={{ fontSize: '0.9rem', color: '#aaa', marginTop: '5px' }}>
              Redirects to: {lastResult.originalUrl}
            </p>
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="history">
          <h2>Recent Links</h2>
          <div className="history-list">
            {history.map((item, index) => (
              <div key={item.code + index} className="history-item">
                <span className="history-original">{item.originalUrl}</span>
                <a href={item.shortUrl} target="_blank" rel="noopener noreferrer" className="short-url" style={{ fontSize: '1rem' }}>
                  {item.shortUrl}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
