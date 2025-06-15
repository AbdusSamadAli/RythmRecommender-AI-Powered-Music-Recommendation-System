import { motion } from "framer-motion";

const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};

const HeaderSection = () => (
  <header className="relative text-center mb-8">
    <motion.h1
      className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
      initial="hidden"
      animate="visible"
      variants={textVariant}
      custom={0}
    >
      Welcome to RythmRecommender: Your Favorite AI-Powered Music
      Recommendation System
    </motion.h1>
    <motion.p
      className="text-xl sm:text-2xl"
      initial="hidden"
      animate="visible"
      variants={textVariant}
      custom={1}
    >
      Discover personalized playlists and tracks curated just for you using
      advanced AI algorithms.
    </motion.p>
  </header>
);

export default HeaderSection;