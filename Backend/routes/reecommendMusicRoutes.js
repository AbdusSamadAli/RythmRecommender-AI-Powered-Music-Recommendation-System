const express = require("express");
const router = express.Router();
const { searchSongs, recommendByMood } = require("../controllers/musicController");
const authMiddleware = require("../middleware/auth");
router.get("/search", authMiddleware, searchSongs); 
router.get("/recommend", authMiddleware, recommendByMood);
module.exports = router;
