import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, Camera, LogOut, UserCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { useAuth } from "@/contexts/AuthContext";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const handleSearchClick = () => {
    navigate("/search");
  };

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
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2 border-gndec-green text-gndec-green hover:bg-gndec-green/10"
            onClick={handleSearchClick}
          >
            <Search size={16} />
            <span>Search</span>
          </Button>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <UserCircle className="h-6 w-6 text-gndec-blue" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>
                  {profile?.full_name || "GNDEC User"}
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  {user?.email || "user@gndec.ac.in"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/dashboard" className="flex items-center w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/my-items" className="flex items-center w-full">
                    My Items
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button className="gndec-btn" onClick={() => navigate("/auth")}>
              Sign In
            </Button>
          )}
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
            <Link 
              to="/search" 
              className="text-foreground hover:text-gndec-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Search
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
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  className="text-foreground hover:text-gndec-blue transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link 
                  to="/my-items" 
                  className="text-foreground hover:text-gndec-blue transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Items
                </Link>
                <button 
                  className="text-red-500 hover:text-red-600 transition-colors text-left"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link 
                to="/auth" 
                className="text-gndec-blue font-medium hover:text-gndec-blue/80 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
