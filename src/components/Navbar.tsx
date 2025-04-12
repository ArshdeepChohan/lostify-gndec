
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="py-3 px-4 md:px-6 sticky top-0 bg-white shadow-sm z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-white border border-gndec-blue/30 flex items-center justify-center overflow-hidden">
            <img src="/gndec-logo-light.png" alt="GNDEC Logo" className="h-8 w-8 object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gndec-blue leading-tight">
              Lostify
            </span>
            <span className="text-xs text-gndec-burgundy leading-tight">
              GNDEC Campus
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className="text-foreground hover:text-gndec-blue transition-colors px-3 py-2 text-sm font-medium">
                  Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/lost" className="text-foreground hover:text-gndec-blue transition-colors px-3 py-2 text-sm font-medium">
                  Lost Items
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/found" className="text-foreground hover:text-gndec-blue transition-colors px-3 py-2 text-sm font-medium">
                  Found Items
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-foreground hover:text-gndec-blue transition-colors px-3 py-2 text-sm font-medium">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                    <Link to="/image-search" className="flex items-start gap-3 p-3 rounded-md hover:bg-muted">
                      <Camera className="h-5 w-5 text-gndec-blue" />
                      <div>
                        <div className="font-medium">Image Search</div>
                        <p className="text-sm text-muted-foreground">
                          Find lost items using image recognition
                        </p>
                      </div>
                    </Link>
                    <a href="https://gndec.ac.in/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-md hover:bg-muted">
                      <div className="h-5 w-5 flex-shrink-0">
                        <img src="/gndec-logo-light.png" alt="GNDEC Logo" className="h-full w-full object-contain" />
                      </div>
                      <div>
                        <div className="font-medium">About GNDEC</div>
                        <p className="text-sm text-muted-foreground">
                          Learn more about Guru Nanak Dev Engineering College
                        </p>
                      </div>
                    </a>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="hidden md:flex items-center space-x-3">
          <Button variant="outline" size="sm" className="flex items-center gap-2 border-gndec-green text-gndec-green hover:bg-gndec-green/10">
            <Search size={16} />
            <span>Search</span>
          </Button>
          <Button className="gndec-btn">Sign In</Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b p-4 animate-fade-in shadow-md">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-foreground hover:text-gndec-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/lost" 
              className="text-foreground hover:text-gndec-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Lost Items
            </Link>
            <Link 
              to="/found" 
              className="text-foreground hover:text-gndec-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Found Items
            </Link>
            <Link 
              to="/image-search" 
              className="text-foreground hover:text-gndec-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Image Search
            </Link>
            <a 
              href="https://gndec.ac.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground hover:text-gndec-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About GNDEC
            </a>
            <div className="pt-2 flex flex-col space-y-2">
              <Button variant="outline" size="sm" className="flex items-center justify-center gap-2 w-full border-gndec-green text-gndec-green hover:bg-gndec-green/10">
                <Search size={16} />
                <span>Search</span>
              </Button>
              <Button className="w-full gndec-btn">Sign In</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
