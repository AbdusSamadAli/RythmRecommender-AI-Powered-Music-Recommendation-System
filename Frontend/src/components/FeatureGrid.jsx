import { motion } from "framer-motion";

const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};

const FeatureGrid = () => {
  const features = [
    "Sign in with Google",
    "Personalized Music Playlists",
    "Real-time Mood-Based Recommendations",
    "Visual Stats Dashboard for Your Music Preferences",
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center relative z-10">
      {features.map((title, index) => (
        <motion.div
          key={index}
          className="p-6 bg-gray-800 rounded-lg shadow-lg"
          initial="hidden"
          animate="visible"
          variants={textVariant}
          custom={index + 4}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-300">
            {index === 0
              ? "Authenticate securely with your Google account to start your personalized music journey."
              : index === 1
              ? "Get curated playlists that fit your unique taste, powered by AI."
              : index === 2
              ? "Receive music recommendations based on your current mood and activity."
              : "Track your favorite moods, artists, and see album art visuals with our interactive stats dashboard."}
          </p>
        </motion.div>
      ))}
    </section>
  );
};

export default FeatureGrid;
