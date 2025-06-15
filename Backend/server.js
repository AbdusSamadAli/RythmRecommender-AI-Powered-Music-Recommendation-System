const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const musicRoutes = require("./routes/musicRoutes");
const usermusicRoutes = require("./routes/usermusicRoutes");
dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/music", musicRoutes);
app.use("/api/usermusic", usermusicRoutes);
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function checkDbConnection() {
  try {
    const count = await prisma.user.count();
    console.log(`MongoDB connected! User count: ${count}`);
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

checkDbConnection();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
