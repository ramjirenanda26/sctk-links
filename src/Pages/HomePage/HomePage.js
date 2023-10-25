import Footer from "../../Components/Footer/Footer";
import Hero from "../../Components/HomeComp/HomeComp";
import Navigation from "../../Components/Navigation/Navigation";
import Faq from "../../Components/HomeComp/Faq";
import Features from "../../Components/HomeComp/Features";
import Layanan from "../../Components/HomeComp/Layanan";

const HomePage = () => {
  return (
    <>
      <Navigation />
      <Hero />
      <Layanan />
      <Features />
      <Faq />
      <Footer />
    </>
  );
};

export default HomePage;
