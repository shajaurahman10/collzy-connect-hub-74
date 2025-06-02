
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogSection from "@/components/BlogSection";
import LiveRatings from "@/components/LiveRatings";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navigation />
      <Hero />
      <LiveRatings />
      <BlogSection />
      <Footer />
    </div>
  );
};

export default Index;
