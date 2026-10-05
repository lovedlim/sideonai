import CardGlow from "@/components/CardGlow";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import NeuralHero from "@/components/hero/NeuralHero";
import Books from "@/components/sections/Books";
import Contact from "@/components/sections/Contact";
import Resources from "@/components/sections/Resources";
import Services from "@/components/sections/Services";
import TrackRecord from "@/components/sections/TrackRecord";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <NeuralHero />
        <Services />
        <TrackRecord />
        <Books />
        <Resources />
        <Contact />
      </main>
      <SiteFooter />
      <CardGlow />
    </>
  );
}
