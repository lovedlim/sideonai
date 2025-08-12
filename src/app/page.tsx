
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EmpathySection from "@/components/EmpathySection";
import IntroSection from "@/components/IntroSection";
import LearningRoadmap from "@/components/LearningRoadmap";
import CommunitySection from "@/components/CommunitySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <EmpathySection />
        <IntroSection />
        <LearningRoadmap />
        <CommunitySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
