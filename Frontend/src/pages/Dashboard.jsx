import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [tracks, setTracks] = useState([]);
  const [basedOn, setBasedOn] = useState("");
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPersonalized = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/usermusic/personalmusic", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTracks(res.data.tracks);
        setBasedOn(res.data.basedOn);
      } catch (err) {
        console.error("Error fetching personalized songs:", err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPersonalized();
    }
  }, [token]);

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">👋 Welcome, {user?.name}</h1>
      <h2 className="text-xl text-gray-300 mb-6">Based on: <span className="text-blue-400 font-semibold">{basedOn || "your preferences"}</span></h2>

      {loading ? (
        <p>Loading recommendations...</p>
      ) : tracks.length === 0 ? (
        <p>No recommendations found. Like some songs to get started!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tracks.map((track) => (
            <div key={track.id} className="bg-gray-800 p-4 rounded shadow">
              <p className="font-bold text-lg">{track.name}</p>
              <p className="text-gray-300">{track.artists.map(a => a.name).join(", ")}</p>
              <a
                href={track.external_urls.spotify}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-blue-400 underline mt-2 inline-block"
              >
                Listen on Spotify
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
