import { motion } from "framer-motion";

const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};

const WhyChoose = () => (
  <section className="text-center mt-12">
    <motion.h2
      className="text-3xl sm:text-4xl font-semibold mb-4"
      initial="hidden"
      animate="visible"
      variants={textVariant}
      custom={8}
    >
      Why Choose RythmRecommender?
    </motion.h2>
    <motion.p
      className="text-lg sm:text-xl max-w-3xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={textVariant}
      custom={9}
    >
      Our AI-based recommendation engine adapts to your listening behavior and
      evolving tastes, delivering a truly personalized music experience.
      Discover hidden gems and enjoy seamless music discovery.
    </motion.p>
  </section>
);

export default WhyChoose;