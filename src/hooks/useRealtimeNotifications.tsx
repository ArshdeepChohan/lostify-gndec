
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export const useRealtimeNotifications = () => {
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'items'
        },
        (payload) => {
          console.log('New item reported:', payload);
          toast({
            title: "New Item Reported",
            description: `A new ${payload.new.type} item has been reported: ${payload.new.title}`,
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'claims',
          filter: `item_id=in.(SELECT id FROM items WHERE user_id = ${user.id})`
        },
        (payload) => {
          console.log('New claim on your item:', payload);
          toast({
            title: "Someone Claimed Your Item!",
            description: "Check your email for details on how to contact them.",
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, toast]);
};
