import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";

const Upload = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [type, setType] = useState("web"); // "web" or "github"
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setUrl(e.target.value);
    setError("");
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setError("Please enter a valid URL.");
      return;
    }

    setIsSubmitting(true);
    try {
      const endpoint = type === "github" ? "api/scan/github" : "api/scan/scan";
      const response = await axiosInstance.post(endpoint, { url });
      console.log(response.data);
    } catch (err) {
      setError("Failed to process URL. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Upload URL</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div className="flex flex-col gap-2">
          <select
            value={type}
            onChange={handleTypeChange}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="web">Website URL</option>
            <option value="github">GitHub Repository</option>
          </select>
          <input
            type="url"
            value={url}
            onChange={handleChange}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            placeholder="Enter URL"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className={`px-6 py-2 bg-blue-500 text-white rounded-lg transition-colors ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Analyze"}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default Upload;
