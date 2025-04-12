
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="py-4 px-4 md:px-6 sticky top-0 bg-background/80 backdrop-blur-lg z-50 border-b">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">L</span>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
            Lostify
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/lost" className="text-foreground hover:text-primary transition-colors">
            Lost Items
          </Link>
          <Link to="/found" className="text-foreground hover:text-primary transition-colors">
            Found Items
          </Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors">
            About
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-3">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Search size={16} />
            <span>Search</span>
          </Button>
          <Button>Sign In</Button>
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b p-4 animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/lost" 
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Lost Items
            </Link>
            <Link 
              to="/found" 
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Found Items
            </Link>
            <Link 
              to="/about" 
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-2 flex flex-col space-y-2">
              <Button variant="outline" size="sm" className="flex items-center justify-center gap-2 w-full">
                <Search size={16} />
                <span>Search</span>
              </Button>
              <Button className="w-full">Sign In</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
