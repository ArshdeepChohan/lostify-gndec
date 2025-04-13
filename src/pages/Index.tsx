
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ItemsGrid from "@/components/ItemsGrid";
import Stats from "@/components/Stats";
import TestimonialSection from "@/components/TestimonialSection";
import Footer from "@/components/Footer";
import Subscribe from "@/components/Subscribe";
import { mockLostItems, mockFoundItems } from "@/data/mockData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Index = () => {
  const [lostItems, setLostItems] = useState([...mockLostItems]);
  const [foundItems, setFoundItems] = useState([...mockFoundItems]);

  useEffect(() => {
    // Get items from localStorage
    const storedLostItems = JSON.parse(localStorage.getItem("lostItems") || "[]");
    const storedFoundItems = JSON.parse(localStorage.getItem("foundItems") || "[]");
    
    if (storedLostItems.length > 0) {
      setLostItems([...storedLostItems, ...mockLostItems].slice(0, 8));
    }
    
    if (storedFoundItems.length > 0) {
      setFoundItems([...storedFoundItems, ...mockFoundItems].slice(0, 8));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <HowItWorks />
        <div className="bg-white py-6">
          <div className="container mx-auto px-4">
            <Subscribe />
          </div>
        </div>
        <ItemsGrid 
          items={lostItems}
          title="Recently Lost Items"
          description="Browse through recently reported lost items. Maybe you've found one of these?"
          viewAllLink="/lost"
        />
        <ItemsGrid 
          items={foundItems}
          title="Recently Found Items"
          description="Check out items that others have found. Is one of them yours?"
          viewAllLink="/found"
        />
        <TestimonialSection />
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-gndec-blue mb-6">Check Your Reward Points</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Earn points by reporting lost items, found items, and helping others recover their belongings.
              Get a certificate for social work and volunteering after reaching 1000 points!
            </p>
            <Button className="gndec-btn" asChild>
              <Link to="/points">View Your Points</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
