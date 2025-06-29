import { motion } from "framer-motion";

const playlists = [
  {
    src: "/music1.jpg",
    title: "Chill Vibes",
    description: "Relax with smooth and mellow tracks tailored for your downtime.",
  },
  {
    src: "/music2.jpeg",
    title: "Workout Boost",
    description: "High-energy songs to keep you motivated during workouts.",
  },
  {
    src: "/music3.jpg",
    title: "Late Night Grooves",
    description: "Perfect beats for winding down and late-night relaxation.",
  },
];

const SamplePlaylists = () => (
  <section className="text-center mt-12">
    <motion.h2
      className="text-3xl sm:text-4xl font-semibold mb-6"
      initial="hidden"
      animate="visible"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      custom={10}
    >
      Sample Playlists & Tracks
    </motion.h2>
    <p className="text-lg sm:text-xl text-gray-300 mb-6">
      Explore some example playlists and songs recommended by RythmRecommender.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {playlists.map((item, index) => (
        <motion.div
          key={index}
          className="bg-gray-800 p-4 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: index * 0.3 }}
        >
          <img
            src={item.src}
            alt={item.title}
            className="rounded-lg w-full h-64 object-cover"
          />
          <h3 className="text-xl font-bold mt-4">{item.title}</h3>
          <p className="text-gray-300">{item.description}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default SamplePlaylists;
