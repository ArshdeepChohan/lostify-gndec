
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";

type Profile = {
  id: string;
  full_name?: string;
  user_type: string;
  photo_url?: string;
  branch?: string;
  roll_number?: string;
  year?: string;
  address?: string;
  email?: string;
  phone?: string;
};

type User = {
  id: string;
  email: string;
} | null;

type AuthContextType = {
  user: User;
  profile: Profile | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<{ error: any | null }>;
  signup: (email: string, password: string, userData: Partial<Profile>) => Promise<{ error: any | null }>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  getUserPoints: () => number;
  addUserPoints: (points: number) => void;
  updateProfile: (data: Partial<Profile>) => Promise<{ error: any | null }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsAuthenticated(!!session);
        
        if (session?.user) {
          // Fetch user profile after setting authenticated state
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setProfile(data as Profile);
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      toast({
        title: "Sign in successful",
        description: "Welcome back to Lostify!",
      });

      return { error: null };
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  const signup = async (email: string, password: string, userData: Partial<Profile>) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.full_name,
            user_type: userData.user_type || 'student',
          },
        },
      });

      if (error) {
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      toast({
        title: "Account created",
        description: "Welcome to Lostify!",
      });

      return { error: null };
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setSession(null);
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const updateProfile = async (data: Partial<Profile>) => {
    if (!user) return { error: "Not authenticated" };

    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);

      if (error) {
        toast({
          title: "Update failed",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      // Refresh profile data
      await fetchUserProfile(user.id);

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });

      return { error: null };
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  const getUserPoints = () => {
    if (!user?.id) return 0;
    
    const userPoints = JSON.parse(localStorage.getItem("userPoints") || "{}");
    return userPoints[user.id] || 0;
  };

  const addUserPoints = (points: number) => {
    if (!user?.id) return;
    
    const userPoints = JSON.parse(localStorage.getItem("userPoints") || "{}");
    const currentPoints = userPoints[user.id] || 0;
    const newPoints = currentPoints + points;
    userPoints[user.id] = newPoints;
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
      profile,
      session,
      login, 
      signup,
      logout, 
      isAuthenticated,
      isLoading,
      getUserPoints, 
      addUserPoints,
      updateProfile
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
