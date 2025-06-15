![Homepage Screenshot](./Frontend/my-music-app/public/homepagess.jpg)
# 🎵 RythmRecommender – AI-Powered Music Recommendation System

RythmRecommender is a full-stack web application that delivers personalized music recommendations based on user mood and search queries. It combines real-time mood analysis with Spotify's Web API to suggest relevant tracks, leveraging AI to enhance user experience.

## 🚀 Features

- 🔍 **Search Songs & Artists** using keywords
- 🎧 **Mood-Based Music Recommendations** powered by AI
- ❤️ **Like Songs** and save preferences
- 🔐 **JWT Authentication** for user sessions
- 🌐 **Google Sign-In** for quick and secure access
- 📊 **Prisma ORM** for robust database management
- 📈 **Dynamic UI** with Tailwind CSS & React
- 🎵 **Spotify Web API** for accurate music data

## 🤖 AI Integration

- **AI Use Case**: Detects emotional tone from user input (e.g., "stressed", "happy", "calm") and maps it to music genres for recommendations.
- **Model/Resource Used**: [`facebook/bart-large-mnli`](https://huggingface.co/facebook/bart-large-mnli) – a Natural Language Inference model used via Hugging Face Inference API.
- **How it Works**: User mood input is passed to the BART model, which classifies it against emotion-related labels. Based on the predicted emotion, the system queries Spotify for matching genre tracks.

## 🛠 Tech Stack

- **Frontend**: React.js, Tailwind CSS, Framer Motion, Vanta js
- **Backend**: Node.js, Express.js
- **Authentication**: JWT & Google Sign-In
- **Database**: MongoDB Atlas with Prisma ORM
- **External APIs**:
  - Spotify Web API
  - Hugging Face Inference API (`facebook/bart-large-mnli`)
