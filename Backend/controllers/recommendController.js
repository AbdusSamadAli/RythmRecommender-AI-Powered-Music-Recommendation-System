const axios = require("axios");
const dotenv = require("dotenv");
const qs = require("qs");
dotenv.config();

const getAccessToken = async () => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const tokenData = qs.stringify({ grant_type: "client_credentials" });
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    tokenData,
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data.access_token;
};

const searchSongs = async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: "Query is required" });
  try {
    const token = await getAccessToken();
    const spotifyRes = await axios.get("https://api.spotify.com/v1/search", {
      params: { q: query, type: "track", limit: 10 },
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json(spotifyRes.data.tracks.items);
  } catch (error) {
    console.error("Spotify Search Error:", error.response?.data || error.message);
    return res.status(500).json({ error: "Failed to search songs" });
  }
};

const recommendByMood = async (req, res) => {
  const { mood } = req.query;
  if (!mood) return res.status(400).json({ error: "Mood input is required" });

  try {
    const labels = ["happy", "sad", "energetic", "calm", "romantic", "relaxing", "angry", "uplifting"];
    const hfResponse = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
      {
        inputs: mood,
        parameters: {
          candidate_labels: labels.join(", "),
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
      }
    );

    const topLabel = hfResponse.data?.labels?.[0];
    const token = await getAccessToken();
    const spotifyRes = await axios.get("https://api.spotify.com/v1/search", {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        q: topLabel,
        type: "track",
        limit: 10,
      },
    });

    return res.json({
      moodDetails: {
        userInput: mood,
        classifiedAs: topLabel,
      },
      tracks: spotifyRes.data.tracks.items,
    });
  } catch (error) {
    console.error("Error in recommendByMood:", error.response?.data || error.message);
    return res.status(500).json({ error: "Failed to get recommendations" });
  }
};

module.exports = { searchSongs, recommendByMood};
