
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ItemsGrid from "@/components/ItemsGrid";
import { mockFoundItems } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

const FoundItemsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(mockFoundItems);

  const handleSearch = () => {
    const filtered = mockFoundItems.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gndec-cream">
      <Navbar />
      <main>
        <div className="bg-gndec-green text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">Found Items</h1>
            <p>Browse through items that have been found on GNDEC campus</p>
          </div>
        </div>
        
        <section className="py-8 bg-white border-b border-gndec-green/10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex gap-2">
                <Input 
                  placeholder="Search by name, category, location..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="border-gndec-green/30 focus-visible:ring-gndec-green"
                />
                <Button 
                  className="bg-gndec-green hover:bg-gndec-green/90 text-white" 
                  onClick={handleSearch}
                >
                  <Search size={16} className="mr-2" />
                  Search
                </Button>
              </div>
              <Button variant="outline" className="border-gndec-burgundy text-gndec-burgundy hover:bg-gndec-burgundy/10">
                <Filter size={16} className="mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </section>
        
        <ItemsGrid 
          items={filteredItems}
          title="Found Items"
          description="Browse through items that have been found on GNDEC campus."
          showViewAllButton={false}
        />
      </main>
      <Footer />
    </div>
  );
};

export default FoundItemsPage;
