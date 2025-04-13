
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";

type User = {
  email: string;
  name: string;
  points?: number;
} | null;

type AuthContextType = {
  user: User;
  login: (email: string, name: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  getUserPoints: () => number;
  addUserPoints: (points: number) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check for user in localStorage on page load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string, name: string) => {
    const newUser = { email, name };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(newUser));
    
    // Initialize user points if first login
    const userPoints = JSON.parse(localStorage.getItem("userPoints") || "{}");
    if (!userPoints[email]) {
      userPoints[email] = 0;
      localStorage.setItem("userPoints", JSON.stringify(userPoints));
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  const getUserPoints = () => {
    if (!user?.email) return 0;
    
    const userPoints = JSON.parse(localStorage.getItem("userPoints") || "{}");
    return userPoints[user.email] || 0;
  };

  const addUserPoints = (points: number) => {
    if (!user?.email) return;
    
    const userPoints = JSON.parse(localStorage.getItem("userPoints") || "{}");
    const currentPoints = userPoints[user.email] || 0;
    const newPoints = currentPoints + points;
    userPoints[user.email] = newPoints;
    localStorage.setItem("userPoints", JSON.stringify(userPoints));
    
    toast({
      title: "Points Added",
      description: `You've earned ${points} points! Total: ${newPoints}`,
    });
    
    // Check if user reached 1000 points
    if (currentPoints < 1000 && newPoints >= 1000) {
      toast({
        title: "Congratulations!",
        description: "You've reached 1000 points! Visit your profile to download your certificate.",
        duration: 5000,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated, 
      getUserPoints, 
      addUserPoints 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
