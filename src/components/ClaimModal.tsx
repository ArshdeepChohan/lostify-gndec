
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemId: string;
  itemTitle: string;
  itemOwnerId: string;
}

const ClaimModal = ({ isOpen, onClose, itemId, itemTitle, itemOwnerId }: ClaimModalProps) => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, profile } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to claim this item.",
        variant: "destructive",
      });
      return;
    }

    if (user.id === itemOwnerId) {
      toast({
        title: "Cannot claim own item",
        description: "You cannot claim your own item.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create the claim
      const { error: claimError } = await supabase
        .from('claims')
        .insert({
          item_id: itemId,
          claimant_id: user.id,
          claim_message: message.trim() || null,
        });

      if (claimError) {
        throw claimError;
      }

      // Get item owner details for email notification
      const { data: ownerData, error: ownerError } = await supabase
        .from('profiles')
        .select('email, full_name')
        .eq('id', itemOwnerId)
        .single();

      if (ownerError) {
        console.error('Error fetching owner details:', ownerError);
      } else if (ownerData?.email) {
        // Send email notification
        try {
          await supabase.functions.invoke('send-notification', {
            body: {
              type: 'item_claimed',
              recipientEmail: ownerData.email,
              recipientName: ownerData.full_name,
              itemTitle,
              claimantName: profile?.full_name || 'Someone',
              claimMessage: message.trim() || undefined,
            },
          });
        } catch (emailError) {
          console.error('Error sending email notification:', emailError);
        }
      }

      toast({
        title: "Claim submitted",
        description: "The item owner has been notified of your claim.",
      });

      onClose();
      setMessage("");
    } catch (error: any) {
      toast({
        title: "Error submitting claim",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Claim Item: {itemTitle}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="message">Message to owner (optional)</Label>
            <Textarea
              id="message"
              placeholder="Describe how you found this item or provide additional details..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              className="bg-gndec-green hover:bg-gndec-green/90"
            >
              {isSubmitting ? "Submitting..." : "Submit Claim"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClaimModal;
