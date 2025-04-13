
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockLostItems, mockFoundItems } from "@/data/mockData";

const locations = [
  {
    name: "Main Building",
    description: "Administrative offices, classrooms, and faculty chambers",
    image: "/placeholder.svg",
    lostCount: mockLostItems.filter(item => item.location.includes("Main")).length,
    foundCount: mockFoundItems.filter(item => item.location.includes("Main")).length,
  },
  {
    name: "Library",
    description: "Central library with study zones and digital resources",
    image: "/placeholder.svg",
    lostCount: mockLostItems.filter(item => item.location.includes("Library")).length,
    foundCount: mockFoundItems.filter(item => item.location.includes("Library")).length,
  },
  {
    name: "Hostel Buildings",
    description: "Student residential areas including all hostel blocks",
    image: "/placeholder.svg",
    lostCount: mockLostItems.filter(item => item.location.includes("Hostel")).length,
    foundCount: mockFoundItems.filter(item => item.location.includes("Hostel")).length,
  },
  {
    name: "Cafeteria",
    description: "Main dining hall and food court areas",
    image: "/placeholder.svg",
    lostCount: mockLostItems.filter(item => item.location.includes("Cafeteria")).length,
    foundCount: mockFoundItems.filter(item => item.location.includes("Cafeteria")).length,
  },
  {
    name: "Sports Complex",
    description: "Indoor and outdoor sports facilities and equipment",
    image: "/placeholder.svg",
    lostCount: mockLostItems.filter(item => item.location.includes("Sports")).length,
    foundCount: mockFoundItems.filter(item => item.location.includes("Sports")).length,
  },
  {
    name: "Parking Area",
    description: "Vehicle parking zones around campus",
    image: "/placeholder.svg",
    lostCount: mockLostItems.filter(item => item.location.includes("Parking")).length,
    foundCount: mockFoundItems.filter(item => item.location.includes("Parking")).length,
  },
  {
    name: "Laboratories",
    description: "Research labs, computer labs, and technical workshops",
    image: "/placeholder.svg",
    lostCount: mockLostItems.filter(item => item.location.includes("Lab")).length,
    foundCount: mockFoundItems.filter(item => item.location.includes("Lab")).length,
  },
  {
    name: "Auditorium",
    description: "Event spaces and presentation halls",
    image: "/placeholder.svg",
    lostCount: mockLostItems.filter(item => item.location.includes("Auditorium")).length,
    foundCount: mockFoundItems.filter(item => item.location.includes("Auditorium")).length,
  },
];

const LocationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLocations, setFilteredLocations] = useState(locations);
  const navigate = useNavigate();

  const handleSearch = () => {
    const filtered = locations.filter(
      location => location.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLocations(filtered);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLocationClick = (locationName: string) => {
    navigate("/search", { state: { location: locationName } });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gndec-cream">
      <Navbar />
      <main>
        <div className="bg-gndec-green text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">Campus Locations</h1>
            <p>Browse lost and found items by GNDEC campus locations</p>
          </div>
        </div>
        
        <section className="py-8 bg-white border-b border-gndec-green/10">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 max-w-md mx-auto">
              <Input 
                placeholder="Search locations..." 
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
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLocations.map((location, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video bg-gray-200">
                    <img 
                      src={location.image} 
                      alt={location.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{location.name}</CardTitle>
                    <CardDescription>{location.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm">
                      <span className="text-gndec-blue font-medium">Lost: {location.lostCount}</span>
                      <span className="text-gndec-green font-medium">Found: {location.foundCount}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full text-gndec-blue border-gndec-blue hover:bg-gndec-blue/10"
                      onClick={() => handleLocationClick(location.name)}
                    >
                      View Items at this Location
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LocationsPage;
