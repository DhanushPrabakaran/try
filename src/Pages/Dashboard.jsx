import { useState, useEffect } from "react";
import React from "react";

const Dashboard = () => {
  const [query, setQuery] = useState("");
  const [links, setLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load links from localStorage on component mount
  useEffect(() => {
    const savedLinks = JSON.parse(localStorage.getItem("links") || "[]");
    setLinks(savedLinks);
    setFilteredLinks(savedLinks);
    setIsLoading(false);
  }, []);

  // Handle change in input field
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle form submission (filtering links based on the query)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      const filtered = links.filter((link) =>
        link.url.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredLinks(filtered);
    } else {
      setFilteredLinks(links);
    }
  };

  // Open Upload page in a new tab
  const openUploadPage = () => {
    window.open("/upload", "_blank");
  };

  // Function to get color based on severity level
  const getSeverityColor = (level) => {
    switch (level) {
      case "Low":
        return "text-green-700";
      case "Medium":
        return "text-yellow-700";
      case "High":
        return "text-orange-700";
      case "Critical":
        return "text-red-700";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 bg-gray-50">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-fuchsia-400">
        Welcome to the Dashboard
      </h1>

      {/* Search Bar and Buttons */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-row gap-2 max-w-screen-2xl justify-center"
      >
        {/* Search Input */}
        <input
          type="text"
          value={query}
          onChange={handleChange}
          className="px-6 min-w-full h-10 rounded-lg shadow-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a link to search"
        />

        {/* Buttons Container */}
        <div className="flex gap-2">
          {/* Search Button */}
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap"
          >
            Search
          </button>

          {/* Add New Button */}
          <button
            type="button"
            onClick={openUploadPage}
            className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap"
          >
            Analyze
          </button>
        </div>
      </form>

      {/* Loading State */}
      {isLoading ? (
        <p className="mt-10 text-gray-600">Loading...</p>
      ) : filteredLinks.length > 0 ? (
        // Card Grid
        <div className="mt-10 w-full max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredLinks.map((link, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 break-words"
              >
                {link.url}
              </a>
              <p className="text-sm text-gray-600 mt-2">Date: {link.date}</p>
              <p
                className={`text-sm font-bold ${getSeverityColor(link.level)}`}
              >
                Level: {link.level}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-10 text-gray-600">No links found matching your search.</p>
      )}
    </div>
  );
};

export default Dashboard;