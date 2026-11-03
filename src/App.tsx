import Masthead from "./components/layout/Masthead";
import Footer from "./components/layout/Footer";
import MobileBookBar from "./components/layout/MobileBookBar";
import Hero from "./components/sections/Hero";
import Philosophy from "./components/sections/Philosophy";
import Menu from "./components/sections/Menu";
import Transformations from "./components/sections/Transformations";
import Interlude from "./components/sections/Interlude";
import Space from "./components/sections/Space";
import GroomerNote from "./components/sections/GroomerNote";
import Reviews from "./components/sections/Reviews";
import Reservation from "./components/reservation/Reservation";
import Location from "./components/sections/Location";

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        본문으로 건너뛰기
      </a>
      <Masthead />
      <main id="main">
        <Hero />
        <Philosophy />
        <Menu />
        <Transformations />
        <Interlude />
        <Space />
        <GroomerNote />
        <Reviews />
        <Reservation />
        <Location />
      </main>
      <Footer />
      <MobileBookBar />
    </>
  );
}
