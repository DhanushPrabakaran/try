import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axiosInstance.get("api/scan/history");
        console.log(response);
        setHistory(response.data);
      } catch (err) {
        setError("Failed to load history");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test History</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : history.length === 0 ? (
        <p>No test results found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Website</th>
              <th className="border p-2">Tech Stack</th>
              <th className="border p-2">Vulnerabilities</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((test) => (
              <tr key={test._id} className="border">
                <td className="p-2">{test.website}</td>
                <td className="p-2">
                  {test.techStack
                    ? Object.keys(test.techStack).join(", ")
                    : "N/A"}
                </td>
                <td className="p-2">
                  {test.vulnerabilities
                    ? JSON.stringify(test.vulnerabilities)
                    : "None"}
                </td>
                <td className="p-2">
                  {new Date(test.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
