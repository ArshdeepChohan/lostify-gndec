
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const AboutProcessPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gndec-cream">
      <Navbar />
      <main className="flex-1">
        <div className="bg-gndec-blue text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">How Lostify Works</h1>
            <p>Learn about our process for reuniting lost items with their owners</p>
          </div>
        </div>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 mb-10">
              <h2 className="text-2xl font-bold mb-6 text-gndec-blue">Video Demonstration</h2>
              <div className="aspect-video bg-black rounded-md overflow-hidden mb-6">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Lostify Process Demonstration"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-muted-foreground mb-4">
                This video demonstrates how the Lostify platform works at GNDEC campus, from reporting lost items to finding and claiming them.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center text-gndec-blue">Our Process</h2>
              
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="bg-gndec-green/10 rounded-full p-6 flex items-center justify-center">
                    <span className="text-4xl font-bold text-gndec-green">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-gndec-burgundy">Reporting</h3>
                    <p className="text-muted-foreground">
                      Users can report lost or found items through our platform. We collect detailed information about the item, including photos, description, location, and date.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="bg-gndec-green/10 rounded-full p-6 flex items-center justify-center">
                    <span className="text-4xl font-bold text-gndec-green">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-gndec-burgundy">Matching</h3>
                    <p className="text-muted-foreground">
                      Our system automatically matches lost items with found items based on descriptions, locations, and other details. Users can also manually search for potential matches.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="bg-gndec-green/10 rounded-full p-6 flex items-center justify-center">
                    <span className="text-4xl font-bold text-gndec-green">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-gndec-burgundy">Verification</h3>
                    <p className="text-muted-foreground">
                      When a potential match is identified, we verify ownership through a series of questions about the item that only the true owner would know.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="bg-gndec-green/10 rounded-full p-6 flex items-center justify-center">
                    <span className="text-4xl font-bold text-gndec-green">4</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-gndec-burgundy">Return</h3>
                    <p className="text-muted-foreground">
                      We facilitate the return of items through our network of drop-off points across campus or by arranging direct handovers between parties.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="bg-gndec-green/10 rounded-full p-6 flex items-center justify-center">
                    <span className="text-4xl font-bold text-gndec-green">5</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-gndec-burgundy">Rewards</h3>
                    <p className="text-muted-foreground">
                      Users earn points for reporting items and successful returns. These points can lead to certificates and recognition for community service.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <Button className="gndec-btn" asChild>
                  <Link to="/report/lost">
                    Report a Lost Item
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutProcessPage;
