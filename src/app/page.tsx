
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyNowStory from "@/components/WhyNowStory";
import RealSkillsShowcase from "@/components/RealSkillsShowcase";
import AIJourney from "@/components/AIJourney";
import SuccessStories from "@/components/SuccessStories";
import About from "@/components/About";
import Courses from "@/components/Courses";
import Achievements from "@/components/Achievements";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <WhyNowStory />
        <RealSkillsShowcase />
        <AIJourney />
        <SuccessStories />
        <About />
        <Courses />
        <Achievements />
      </main>
      <Footer />
    </div>
  );
}
