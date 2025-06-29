import { motion } from "framer-motion";

const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};

const HowItWorks = () => (
  <section className="text-center mb-12">
    <motion.h2
      className="text-3xl sm:text-4xl font-semibold mb-4"
      initial="hidden"
      animate="visible"
      variants={textVariant}
      custom={2}
    >
      How It Works
    </motion.h2>
    <motion.p
      className="text-lg sm:text-xl max-w-3xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={textVariant}
      custom={3}
    >
      RythmRecommender analyzes your listening habits and musical preferences
      through AI-driven models to recommend songs and playlists you'll love.
      The system continuously learns from your feedback to refine
      recommendations.
    </motion.p>
  </section>
);

export default HowItWorks;