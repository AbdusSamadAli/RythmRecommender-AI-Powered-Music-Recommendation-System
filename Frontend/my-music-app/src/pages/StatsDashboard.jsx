import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const mostFrequent = (arr) => {
  if (!arr.length) return null;
  const freq = {};
  for (const val of arr) freq[val] = (freq[val] || 0) + 1;
  return Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
};

const StatsDashboard = () => {
  const [likedSongs, setLikedSongs] = useState([]);
  const [moodStats, setMoodStats] = useState({});
  const [albumArtMap, setAlbumArtMap] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not authenticated.");
          return;
        }

        const likedRes = await axios.get(
          "http://localhost:8000/api/usermusic/userliked",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const songs = likedRes.data || [];
        setLikedSongs(songs);
        const moodCount = {};
        songs.forEach((song) => {
          if (song.moodLabel) {
            moodCount[song.moodLabel] = (moodCount[song.moodLabel] || 0) + 1;
          }
        });
        setMoodStats(moodCount);
        const artMap = {};
        for (const song of songs) {
          try {
            const res = await axios.get(
              "http://localhost:8000/api/usermusic/fetchtrack",
              {
                params: { name: song.name, artist: song.artist },
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            const key = song.id || `${song.name}-${song.artist}`;
            artMap[key] = res.data.albumArt || null;
          } catch (err) {
            console.warn("Album art fetch failed for:", song.name);
          }
        }
        setAlbumArtMap(artMap);
      } catch (err) {
        console.error("Error fetching stats:", err.message);
        setError("Failed to load stats.");
      }
    };

    fetchLikedSongs();
  }, []);

  const mostMood = mostFrequent(
    likedSongs.map((s) => s.moodLabel).filter(Boolean)
  );
  const mostArtist = mostFrequent(
    likedSongs.map((s) => s.artist).filter(Boolean)
  );

  const pieData = {
    labels: Object.keys(moodStats),
    datasets: [
      {
        label: "Mood Distribution",
        data: Object.values(moodStats),
        backgroundColor: [
          "#f87171", "#60a5fa", "#34d399", "#facc15", "#c084fc", "#f97316","#a3e635", "#22d3ee",
        ],
        borderWidth: 1,
      },
    ],
  };

  if (error) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        📊 Stats Dashboard
      </h1>

      <div className="mb-8 text-lg text-center text-white">
        {mostMood && (
          <p>
            You mostly like 🎧 <strong>{mostMood}</strong> music
          </p>
        )}
        {mostArtist && (
          <p>
            Top liked artist: <strong>{mostArtist}</strong>
          </p>
        )}
      </div>

      {Object.keys(moodStats).length > 0 && (
        <div className="max-w-md mx-auto mb-10">
          <Pie data={pieData} />
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4 text-white">❤️ Liked Songs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {likedSongs.map((song) => {
          const key = song.id || `${song.name}-${song.artist}`;
          const albumArt = albumArtMap[key];

          return (
            <div
              key={key}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 hover:bg-blue-50"
            >
              {albumArt ? (
                <img
                  src={albumArt}
                  alt="Album Art"
                  className="w-32 h-32 object-cover rounded mb-2"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded mb-2 text-black text-sm">
                  No Art
                </div>
              )}
              <p className="font-semibold text-black">{song.name}</p>
              <p className="text-sm text-gray-600">{song.artist}</p>
              {song.moodLabel && (
                <p className="text-sm text-blue-500">Mood: {song.moodLabel}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsDashboard;
