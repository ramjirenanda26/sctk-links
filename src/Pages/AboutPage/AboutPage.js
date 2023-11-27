import About from '../../Components/AboutComp/AboutComp';
import Values from '../../Components/AboutComp/Values';
import VisiMisi from '../../Components/AboutComp/Visimisi';
import Footer from '../../Components/Footer/Footer';
import Navigation from '../../Components/Navigation/Navigation';
const AboutPage = () => {
  return (
    <>
      <Navigation />
      <About />
      <Values />
      <VisiMisi />
      <Footer />
    </>
  );
};

export default AboutPage;
