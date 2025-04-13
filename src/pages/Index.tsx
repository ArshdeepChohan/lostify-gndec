
import Navbar from "@/components/Navbar";
import HowItWorks from "@/components/HowItWorks";
import ItemsGrid from "@/components/ItemsGrid";
import Stats from "@/components/Stats";
import TestimonialSection from "@/components/TestimonialSection";
import Footer from "@/components/Footer";
import { mockLostItems, mockFoundItems } from "@/data/mockData";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Stats />
        <HowItWorks />
        <ItemsGrid 
          items={mockLostItems}
          title="Recently Lost Items"
          description="Browse through recently reported lost items. Maybe you've found one of these?"
        />
        <ItemsGrid 
          items={mockFoundItems}
          title="Recently Found Items"
          description="Check out items that others have found. Is one of them yours?"
        />
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
