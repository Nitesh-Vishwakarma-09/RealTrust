import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import NotYourAverageRealtor from "@/components/landing/NotYourAverageRealtor";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import AboutUs from "@/components/landing/AboutUs";
import OurProjects from "@/components/landing/OurProjects";
import HappyClients from "@/components/landing/HappyClients";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <NotYourAverageRealtor />
      <WhyChooseUs />
      <AboutUs />
      <OurProjects />
      <HappyClients />
      <Footer />
    </main>
  );
};

export default Index;
