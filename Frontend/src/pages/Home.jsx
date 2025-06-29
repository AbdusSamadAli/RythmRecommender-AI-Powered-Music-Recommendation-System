import HeaderSection from "../components/HeaderSection";
import HowItWorks from "../components/HowItWorks";
import FeatureGrid from "../components/FeatureGrid";
import WhyChoose from "../components/WhyChoose";
import SamplePlaylists from "../components/SamplePlaylists";

const Home = () => {
  return (
    <div className="relative max-w-7xl mx-auto px-6 py-12 text-white">
      <HeaderSection />
      <HowItWorks />
      <FeatureGrid />
      <WhyChoose />
      <SamplePlaylists />
    </div>
  );
};

export default Home;
