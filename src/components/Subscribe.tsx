
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to subscribe.",
        variant: "destructive",
      });
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Store in localStorage
    const subscribers = JSON.parse(localStorage.getItem("subscribers") || "[]");
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      localStorage.setItem("subscribers", JSON.stringify(subscribers));
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
      toast({
        title: "Subscription Successful!",
        description: "You'll now receive notifications about lost and found items.",
      });
    }, 1000);
  };

  return (
    <div className="bg-gndec-green/10 rounded-lg p-6 mb-8">
      <h3 className="text-lg font-medium mb-2 text-gndec-blue">Stay Updated</h3>
      <p className="text-muted-foreground mb-4 text-sm">
        Subscribe to receive real-time notifications when new items are reported.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
        />
        <Button 
          type="submit" 
          className="bg-gndec-green hover:bg-gndec-green/90 text-white" 
          disabled={isSubmitting}
        >
          <Bell className="mr-2 h-4 w-4" />
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </div>
  );
};

export default Subscribe;
