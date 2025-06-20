
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { X, AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Notification {
  id: string;
  message: string;
  type: 'lost' | 'found';
  timestamp: Date;
}

export const NotificationsBar = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0);

  useEffect(() => {
    const channel = supabase
      .channel('notifications-bar')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'items'
        },
        (payload) => {
          console.log('New item notification:', payload);
          const newItem = payload.new;
          const notification: Notification = {
            id: newItem.id,
            message: `New ${newItem.type} item reported: ${newItem.title} at ${newItem.location || 'Unknown location'}`,
            type: newItem.type as 'lost' | 'found',
            timestamp: new Date(newItem.created_at)
          };
          
          setNotifications(prev => [notification, ...prev].slice(0, 10)); // Keep only last 10 notifications
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Auto-rotate notifications every 5 seconds if there are multiple
  useEffect(() => {
    if (notifications.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentNotificationIndex(prev => (prev + 1) % notifications.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [notifications.length]);

  const dismissNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    if (currentNotificationIndex >= notifications.length - 1) {
      setCurrentNotificationIndex(0);
    }
  };

  if (notifications.length === 0) return null;

  const currentNotification = notifications[currentNotificationIndex];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 border-b border-blue-200">
      <div className="container mx-auto px-4 py-2">
        <Alert className="border-0 bg-transparent shadow-none p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1">
              {currentNotification.type === 'lost' ? (
                <AlertCircle className="h-4 w-4 text-red-500" />
              ) : (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
              <AlertDescription className="text-sm font-medium text-gray-700 mb-0">
                {currentNotification.message}
              </AlertDescription>
              {notifications.length > 1 && (
                <span className="text-xs text-gray-500 ml-2">
                  ({currentNotificationIndex + 1} of {notifications.length})
                </span>
              )}
            </div>
            <button
              onClick={() => dismissNotification(currentNotification.id)}
              className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </Alert>
      </div>
    </div>
  );
};
