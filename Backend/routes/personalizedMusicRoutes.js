const express = require("express");
const router = express.Router();
const { likeSong, getPersonalizedSongs, getLikedSongs, fetchtracks } = require("../controllers/userMusicController");
const authMiddleware = require("../middleware/auth");
router.post("/liked", authMiddleware, likeSong); 
router.get("/userliked", authMiddleware, getLikedSongs);
router.get("/personalmusic", authMiddleware, getPersonalizedSongs);
router.get("/fetchtrack", authMiddleware, fetchtracks);
module.exports = router;
