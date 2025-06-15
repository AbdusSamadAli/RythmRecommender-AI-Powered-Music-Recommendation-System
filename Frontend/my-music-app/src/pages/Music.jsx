import { useState } from "react";
import axios from "axios";
import MusicInput from "../components/MusicInput";
import SongGrid from "../components/SongGrid";

const Music = () => {
  const [query, setQuery] = useState("");
  const [mood, setMood] = useState("");
  const [songs, setSongs] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("search");

  const fetchSearchResults = async () => {
    const token = localStorage.getItem("token");
    if (!query.trim() || !token) return;

    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/music/search", {
        params: { query },
        headers: { Authorization: `Bearer ${token}` },
      });
      setSongs(response.data || []);
    } catch (error) {
      console.error("Search error:", error.response?.data || error.message);
      alert("Search failed. Please login again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMoodRecommendations = async () => {
    const token = localStorage.getItem("token");
    if (!mood.trim() || !token) return;

    setLoading(true);
    setSongs([]);
    try {
      const response = await axios.get("http://localhost:8000/api/music/recommend", {
        params: { mood },
        headers: { Authorization: `Bearer ${token}` },
        timeout: 30000,
      });
      if (response.data.tracks?.length > 0) {
        setSongs(response.data.tracks);
      }
    } catch (error) {
      console.error("Mood recommendation error:", error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (song, moodLabel = null) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Not logged in");

    try {
      await axios.post(
        "http://localhost:8000/api/usermusic/liked",
        {
          songId: song.id || "",
          name: song.name || "",
          artist: song.artists?.[0]?.name || "Unknown",
          moodLabel: moodLabel || null,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLikedSongs((prev) => [...prev, song.id]);
      if (mode === "mood") fetchMoodRecommendations();
    } catch (err) {
      console.error("Error liking song:", err.response?.data || err);
    }
  };

  const handleSearch = () => {
    mode === "search" ? fetchSearchResults() : fetchMoodRecommendations();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🎵 Mood-Based Music Finder
      </h1>
      <div className="flex justify-center mb-4 space-x-4">
        <button
          onClick={() => setMode("search")}
          className={`px-4 py-2 rounded ${
            mode === "search" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Search by Keyword
        </button>
        <button
          onClick={() => setMode("mood")}
          className={`px-4 py-2 rounded ${
            mode === "mood" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Recommend by Mood
        </button>
      </div>
      <MusicInput
        mode={mode}
        query={query}
        mood={mood}
        setQuery={setQuery}
        setMood={setMood}
        loading={loading}
        onSearch={handleSearch}
      />
      <SongGrid
        songs={songs}
        likedSongs={likedSongs}
        handleLike={handleLike}
        mode={mode}
        mood={mood}
      />
    </div>
  );
};

export default Music;