import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [severityLevel, setSeverityLevel] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setUrl(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      setError('Please enter a valid URL.');
      return;
    }

    try {
      setIsSubmitting(true);

      // Simulate a delay for processing (optional, can be removed)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Determine severity level (simplified logic)
      const severity = determineSeverityLevel();
      setSeverityLevel(severity);

      // Save the new link to localStorage
      const newLink = {
        url: url.trim(),
        date: new Date().toLocaleDateString(),
        level: severity,
        timestamp: new Date().getTime(),
      };

      const existingLinks = JSON.parse(localStorage.getItem('links') || '[]');
      localStorage.setItem('links', JSON.stringify([...existingLinks, newLink]));

      // Clear the input field after submission
      setUrl('');
    } catch (error) {
      setError('Failed to process URL. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Simplified severity level checker
  const determineSeverityLevel = () => {
    const levels = ['Low', 'Medium', 'High', 'Critical'];
    const randomIndex = Math.floor(Math.random() * levels.length); // Randomly pick a level
    return levels[randomIndex];
  };

  const getSeverityColor = (level) => {
    switch (level) {
      case 'Low':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Upload URL</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={handleChange}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            placeholder="Enter URL to analyze"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className={`px-6 py-2 bg-blue-500 text-white rounded-lg transition-colors
              ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-600'}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Analyze'}
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
      </form>

      {severityLevel && (
        <div className="w-full max-w-md mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Analysis Result</h2>
          <div className={`p-6 rounded-lg shadow-md text-center ${getSeverityColor(severityLevel)}`}>
            <p className="text-2xl font-bold">{severityLevel}</p>
            <p className="text-sm mt-2">Severity Level</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;