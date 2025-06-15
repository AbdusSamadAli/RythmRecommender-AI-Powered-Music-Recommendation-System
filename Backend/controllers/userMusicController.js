const { PrismaClient } = require("@prisma/client");
const axios = require("axios");
const qs = require("qs");
const dotenv = require("dotenv");

dotenv.config();
const prisma = new PrismaClient();

const likeSong = async (req, res) => {
  const { songId, name, artist, moodLabel } = req.body;
  const userId = req.userId;
  if (!userId || !songId || !name || !artist) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const liked = await prisma.likedSong.create({
      data: {
        userId, songId, name, artist,moodLabel: moodLabel || null,
      },
    });

    return res.status(201).json({ message: "Song liked", liked });
  } catch (err) {
    console.error("Error in likeSong controller:", err);
    return res.status(500).json({ error: "Failed to like song" });
  }
};

const getLikedSongs = async (req, res) => {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ error: "User not authenticated" });
  try {
    const likedSongs = await prisma.likedSong.findMany({
      where: { userId },
    });
    res.status(200).json(likedSongs);
  } catch (error) {
    console.error("Error in getLikedSongs:", error);
    res.status(500).json({ error: "Failed to fetch liked songs" });
  }
};

const getPersonalizedSongs = async (req, res) => {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ error: "User not logged in" });
  try {
    const liked = await prisma.likedSong.findMany({
      where: { userId },
    });
    if (liked.length === 0) {
      return res.status(200).json({ message: "No likes yet", tracks: [] });
    }

    const topMood = mostFrequent(liked.map((s) => s.moodLabel).filter(Boolean));
    const topArtist = mostFrequent(liked.map((s) => s.artist).filter(Boolean));
    const token = await getAccessToken();
    const spotifyRes = await axios.get("https://api.spotify.com/v1/search", {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        q: topMood || topArtist,
        type: "track",
        limit: 10,
      },
    });

    res.json({
      basedOn: topMood || topArtist,
      tracks: spotifyRes.data.tracks.items,
    });
  } catch (error) {
    console.error("Personalized Error:", error);
    res.status(500).json({ error: "Failed to fetch personalized tracks" });
  }
};

function mostFrequent(arr) {
  if (!arr.length) return null;
  const freq = {};
  for (const val of arr) freq[val] = (freq[val] || 0) + 1;
  return Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
}

const getAccessToken = async () => {
  const tokenData = qs.stringify({ grant_type: "client_credentials" });

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    tokenData,
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data.access_token;
};
const fetchtracks = async (req, res) => {
  const { name, artist } = req.query;
  const token = await getAccessToken();

  try {
    const searchRes = await axios.get("https://api.spotify.com/v1/search", {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        q: `${name} ${artist}`,
        type: "track",
        limit: 1,
      },
    });

    const track = searchRes.data.tracks.items[0];
    const albumArt = track?.album?.images?.[0]?.url || null;
    res.json({ albumArt });
  } catch (err) {
    console.error("Failed to fetch track:", err.message);
    res.status(500).json({ error: "Failed to fetch album art" });
  }
};

module.exports = {likeSong,getLikedSongs,getPersonalizedSongs,fetchtracks};
