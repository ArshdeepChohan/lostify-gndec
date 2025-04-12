
import Navbar from "@/components/Navbar";
import ImageSearch from "@/components/ImageSearch";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { mockLostItems } from "@/data/mockData";
import ItemCard from "@/components/ItemCard";

const ImageSearchPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <div className="bg-gndec-blue text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">Image Search</h1>
            <p>Find lost items across GNDEC campus using image recognition technology</p>
          </div>
        </div>
        
        <ImageSearch />
        
        <section className="py-12 bg-gradient-to-b from-white to-gndec-gray/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-gndec-blue text-center">Recently Reported Items</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Browse through these recently reported items from across GNDEC campus. 
              Your lost item might already be here!
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockLostItems.slice(0, 8).map((item) => (
                <ItemCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card className="gndec-card border-t-4 border-t-gndec-burgundy">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gndec-burgundy">Campus Lost & Found Locations</h3>
                  <p className="text-muted-foreground mb-4">
                    If you've lost an item on campus, check these designated lost and found collection points:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Main Administration Building - Reception Desk</li>
                    <li>• Library - Circulation Counter</li>
                    <li>• Student Center - Information Desk</li>
                    <li>• Hostels - Respective Warden Offices</li>
                    <li>• Sports Complex - Main Office</li>
                    <li>• Cafeteria - Manager's Office</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ImageSearchPage;
