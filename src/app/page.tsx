import NeuralHero from "@/components/hero/NeuralHero";
import OrgBand from "@/components/OrgBand";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
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
        <OrgBand />
        <Services />
        <TrackRecord />
        <About />
        <Books />
        <Resources />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
