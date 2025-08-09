import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import BIRDS from "vanta/dist/vanta.birds.min";

const Layout = ({ children }) => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        BIRDS({
          el: vantaRef.current,
          backgroundColor: 0x000000,
          color1: 0xff0000,
          color2: 0x00ff00,
          birdSize: 1.5,
          wingSpan: 20,
          speedLimit: 4,
          separation: 50,
          alignment: 50,
          cohesion: 50,
          quantity: 4,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        ref={vantaRef}
        className="absolute inset-0 -z-10 w-full h-full"
      ></div>
      <div className="relative z-10 flex flex-col min-h-screen text-white">
        <Navbar />
        <main className="flex-grow">
          <div className="container mx-auto py-12 px-6">{children}</div>
        </main>
        <footer className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-6 z-10 border-t border-gray-800">
          <div className="container mx-auto text-center space-y-2">
            <p className="font-semibold text-lg">
              &copy; 2025 RythmRecommender - Your Smart Music Companion
            </p>
            <p className="text-sm">
              Powered by AI. Discover music that understands you.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
