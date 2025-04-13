
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import ItemCard from "@/components/ItemCard";
import { mockLostItems, mockFoundItems } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "lost" | "found">("all");
  const [results, setResults] = useState<typeof mockLostItems>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const performSearch = () => {
    if (!searchTerm.trim()) return;
    
    let filteredItems = [];
    const allItems = [...mockLostItems, ...mockFoundItems];
    
    if (activeTab === "all") {
      filteredItems = allItems.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (activeTab === "lost") {
      filteredItems = mockLostItems.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      filteredItems = mockFoundItems.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setResults(filteredItems);
    setHasSearched(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gndec-cream">
      <Navbar />
      <main>
        <div className="bg-gradient-to-r from-gndec-blue to-gndec-green text-white py-10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Lost & Found Items</h1>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Search through all items across GNDEC campus by name, category, or location
            </p>
            
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input 
                  placeholder="What are you looking for?" 
                  className="bg-white/90 border-none text-foreground" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button 
                  className="bg-gndec-burgundy hover:bg-gndec-burgundy/90 text-white" 
                  onClick={performSearch}
                >
                  <Search size={16} className="mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <section className="py-8 bg-white border-b border-gndec-green/10">
          <div className="container mx-auto px-4">
            <Tabs 
              value={activeTab} 
              onValueChange={(value) => setActiveTab(value as "all" | "lost" | "found")}
              className="w-full max-w-md mx-auto"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All Items</TabsTrigger>
                <TabsTrigger value="lost">Lost Items</TabsTrigger>
                <TabsTrigger value="found">Found Items</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </section>
        
        <section className="py-10">
          <div className="container mx-auto px-4">
            {hasSearched ? (
              results.length > 0 ? (
                <>
                  <h2 className="text-2xl font-bold mb-6 text-center">
                    Search Results: {results.length} item{results.length !== 1 ? 's' : ''} found
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {results.map((item) => (
                      <ItemCard key={item.id} {...item} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <h2 className="text-2xl font-bold mb-4">No items found</h2>
                  <p className="text-muted-foreground mb-6">
                    We couldn't find any items matching your search. Try different keywords or categories.
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchTerm("");
                      setHasSearched(false);
                    }} 
                    variant="outline"
                    className="border-gndec-blue text-gndec-blue hover:bg-gndec-blue/10"
                  >
                    Clear Search
                  </Button>
                </div>
              )
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold mb-4">Begin your search</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Enter a keyword, item type or location to find matching lost and found items across GNDEC campus.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
