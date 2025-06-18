
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ItemsGrid from "@/components/ItemsGrid";
import Stats from "@/components/Stats";
import TestimonialSection from "@/components/TestimonialSection";
import Footer from "@/components/Footer";
import Subscribe from "@/components/Subscribe";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useRealtimeNotifications } from "@/hooks/useRealtimeNotifications";

const Index = () => {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Enable realtime notifications
  useRealtimeNotifications();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      // Fetch lost items
      const { data: lostData, error: lostError } = await supabase
        .from('items')
        .select('*')
        .eq('type', 'lost')
        .eq('status', 'open')
        .order('created_at', { ascending: false })
        .limit(8);

      if (lostError) {
        console.error('Error fetching lost items:', lostError);
      } else {
        setLostItems(lostData || []);
      }

      // Fetch found items
      const { data: foundData, error: foundError } = await supabase
        .from('items')
        .select('*')
        .eq('type', 'found')
        .eq('status', 'open')
        .order('created_at', { ascending: false })
        .limit(8);

      if (foundError) {
        console.error('Error fetching found items:', foundError);
      } else {
        setFoundItems(foundData || []);
      }
    } catch (error) {
      console.error('Error in fetchItems:', error);
    } finally {
      setLoading(false);
    }
  };

  // Transform data to match ItemCardProps interface
  const transformItems = (items: any[]) => {
    return items.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description || '',
      category: item.category || 'Other',
      location: item.location || 'Unknown',
      date: new Date(item.created_at).toLocaleDateString(),
      image: item.image_url || '/placeholder.svg',
      type: item.type as 'lost' | 'found',
      user_id: item.user_id,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <HowItWorks />
        <div className="bg-white py-6">
          <div className="container mx-auto px-4">
            <Subscribe />
          </div>
        </div>
        {!loading && (
          <>
            <ItemsGrid 
              items={transformItems(lostItems)}
              title="Recently Lost Items"
              description="Browse through recently reported lost items. Maybe you've found one of these?"
              viewAllLink="/lost"
            />
            <ItemsGrid 
              items={transformItems(foundItems)}
              title="Recently Found Items"
              description="Check out items that others have found. Is one of them yours?"
              viewAllLink="/found"
            />
          </>
        )}
        <TestimonialSection />
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-gndec-blue mb-6">Check Your Reward Points</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Earn points by reporting lost items, found items, and helping others recover their belongings.
              Get a certificate for social work and volunteering after reaching 1000 points!
            </p>
            <Button className="gndec-btn" asChild>
              <Link to="/points">View Your Points</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
