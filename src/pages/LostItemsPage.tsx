
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ItemsGrid from "@/components/ItemsGrid";
import { mockLostItems } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import Subscribe from "@/components/Subscribe";

const LostItemsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allItems, setAllItems] = useState([...mockLostItems]);
  const [filteredItems, setFilteredItems] = useState([...mockLostItems]);

  useEffect(() => {
    // Get items from localStorage
    const storedItems = JSON.parse(localStorage.getItem("lostItems") || "[]");
    if (storedItems.length > 0) {
      const combinedItems = [...storedItems, ...mockLostItems];
      setAllItems(combinedItems);
      setFilteredItems(combinedItems);
    }
  }, []);

  const handleSearch = () => {
    const filtered = allItems.filter(item => 
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
        <div className="bg-gndec-blue text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">Lost Items</h1>
            <p>Browse through items that have been reported lost on GNDEC campus</p>
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
              <Button className="bg-gndec-blue hover:bg-gndec-blue/90 text-white" asChild>
                <Link to="/report/lost">
                  <Upload size={16} className="mr-2" />
                  Report Lost Item
                </Link>
              </Button>
            </div>

            <div className="mt-6">
              <Subscribe />
            </div>
          </div>
        </section>
        
        <ItemsGrid 
          items={filteredItems}
          title="Lost Items"
          description="Browse through items that have been reported lost on GNDEC campus."
          showViewAllButton={false}
        />
      </main>
      <Footer />
    </div>
  );
};

export default LostItemsPage;
