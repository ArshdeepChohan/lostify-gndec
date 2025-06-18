
-- Delete all existing items from the table
DELETE FROM items;

-- Create a claims table to track when someone claims a lost/found item
CREATE TABLE public.claims (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  item_id UUID REFERENCES public.items(id) ON DELETE CASCADE NOT NULL,
  claimant_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  claim_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'pending'
);

-- Enable RLS on claims table
ALTER TABLE public.claims ENABLE ROW LEVEL SECURITY;

-- Create policies for claims table
CREATE POLICY "Users can view claims for their items" 
  ON public.claims 
  FOR SELECT 
  USING (
    claimant_id = auth.uid() OR 
    item_id IN (SELECT id FROM items WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can create claims" 
  ON public.claims 
  FOR INSERT 
  WITH CHECK (claimant_id = auth.uid());

CREATE POLICY "Item owners can update claim status" 
  ON public.claims 
  FOR UPDATE 
  USING (item_id IN (SELECT id FROM items WHERE user_id = auth.uid()));

-- Enable realtime for items and claims tables
ALTER TABLE items REPLICA IDENTITY FULL;
ALTER TABLE claims REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER publication supabase_realtime ADD TABLE items;
ALTER publication supabase_realtime ADD TABLE claims;

-- Create a function to send email notifications
CREATE OR REPLACE FUNCTION notify_item_activity()
RETURNS TRIGGER AS $$
DECLARE
  item_owner_email TEXT;
  item_title TEXT;
  notification_type TEXT;
BEGIN
  -- Determine notification type and get item details
  IF TG_TABLE_NAME = 'items' AND TG_OP = 'INSERT' THEN
    notification_type := 'new_item';
    item_title := NEW.title;
  ELSIF TG_TABLE_NAME = 'claims' AND TG_OP = 'INSERT' THEN
    notification_type := 'item_claimed';
    -- Get item title and owner email
    SELECT i.title, p.email INTO item_title, item_owner_email
    FROM items i
    JOIN profiles p ON i.user_id = p.id
    WHERE i.id = NEW.item_id;
  END IF;

  -- For now, we'll just log the notification
  -- In production, this would trigger an edge function to send actual emails
  RAISE NOTICE 'Email notification: % for item: %', notification_type, item_title;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create triggers for email notifications
CREATE TRIGGER item_notification_trigger
  AFTER INSERT ON items
  FOR EACH ROW
  EXECUTE FUNCTION notify_item_activity();

CREATE TRIGGER claim_notification_trigger
  AFTER INSERT ON claims
  FOR EACH ROW
  EXECUTE FUNCTION notify_item_activity();
