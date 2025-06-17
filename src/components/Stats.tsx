
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface StatsData {
  totalItems: number;
  resolvedItems: number;
  totalUsers: number;
  activeItems: number;
}

const Stats = () => {
  const [stats, setStats] = useState<StatsData>({
    totalItems: 0,
    resolvedItems: 0,
    totalUsers: 0,
    activeItems: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Get total items count
      const { count: totalItems } = await supabase
        .from('items')
        .select('*', { count: 'exact', head: true });

      // Get resolved items count
      const { count: resolvedItems } = await supabase
        .from('items')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'resolved');

      // Get total users count
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Get active (open) items count
      const { count: activeItems } = await supabase
        .from('items')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'open');

      setStats({
        totalItems: totalItems || 0,
        resolvedItems: resolvedItems || 0,
        totalUsers: totalUsers || 0,
        activeItems: activeItems || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsData = [
    { 
      label: "Total Items Reported", 
      value: loading ? "..." : `${stats.totalItems}+`, 
      icon: "📚" 
    },
    { 
      label: "Successfully Resolved", 
      value: loading ? "..." : `${stats.resolvedItems}+`, 
      icon: "🔄" 
    },
    { 
      label: "Active Users", 
      value: loading ? "..." : `${stats.totalUsers}+`, 
      icon: "👥" 
    },
    { 
      label: "Currently Open Items", 
      value: loading ? "..." : `${stats.activeItems}+`, 
      icon: "🔍" 
    },
  ];

  return (
    <section className="py-14 section-accent">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gndec-blue">
          Lost &amp; Found at GNDEC
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <Card key={index} className="light-card border-t-4 border-t-gndec-lightGreen">
              <CardContent className="p-6 text-center">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <p className="text-3xl sm:text-4xl font-bold text-gndec-burgundy mb-2">{stat.value}</p>
                <p className="text-gndec-blue font-medium">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
