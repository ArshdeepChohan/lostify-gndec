
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Logo } from "./navbar/Logo";
import { DesktopNavigation } from "./navbar/DesktopNavigation";
import { UserDropdown } from "./navbar/UserDropdown";
import { MobileNavigation } from "./navbar/MobileNavigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate("/search");
  };

  return (
    <nav className="py-3 px-4 md:px-6 sticky top-0 bg-white shadow-sm z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Logo />

        <DesktopNavigation />
        
        <div className="hidden md:flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2 border-gndec-green text-gndec-green hover:bg-gndec-green/10"
            onClick={handleSearchClick}
          >
            <Search size={16} />
            <span>Search</span>
          </Button>
          
          <UserDropdown />
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <MobileNavigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </nav>
  );
};

export default Navbar;
