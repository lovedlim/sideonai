import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import NeuralHero from "@/components/hero/NeuralHero";
import About from "@/components/sections/About";
import Books from "@/components/sections/Books";
import Contact from "@/components/sections/Contact";
import Resources from "@/components/sections/Resources";
import Services from "@/components/sections/Services";
import TrackRecord from "@/components/sections/TrackRecord";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <NeuralHero />
        {/* 밤의 히어로에서 낮의 본문으로 넘어가는 새벽 */}
        <div className="dawn" aria-hidden="true" />
        <About />
        <Services />
        <TrackRecord />
        <Books />
        <Resources />
        {/* 낮이 저물어 다시 밤의 문의 섹션으로 */}
        <div className="dawn dusk" aria-hidden="true" />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
