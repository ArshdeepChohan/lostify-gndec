
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface MobileNavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export const MobileNavigation = ({ isMenuOpen, setIsMenuOpen }: MobileNavigationProps) => {
  const { isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  if (!isMenuOpen) return null;

  return (
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
  );
};
