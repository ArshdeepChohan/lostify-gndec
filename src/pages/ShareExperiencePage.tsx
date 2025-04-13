
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StarIcon, Send } from "lucide-react";

const ShareExperiencePage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState<string | undefined>();
  const [experienceType, setExperienceType] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !message || !rating || !experienceType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call to submit testimonial
    setTimeout(() => {
      // Update user points
      if (user?.email) {
        const userPoints = JSON.parse(localStorage.getItem("userPoints") || "{}");
        const currentPoints = userPoints[user.email] || 0;
        userPoints[user.email] = currentPoints + 20;
        localStorage.setItem("userPoints", JSON.stringify(userPoints));
      }
      
      setIsSubmitting(false);
      toast({
        title: "Thank You!",
        description: "Your experience has been shared successfully. You earned 20 points!",
      });
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gndec-cream">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-gndec-blue">Share Your Experience</CardTitle>
              <CardDescription>
                Tell us about your experience with Lostify and help improve our service.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Summarize your experience"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experienceType">Type of Experience</Label>
                  <Select value={experienceType} onValueChange={setExperienceType}>
                    <SelectTrigger id="experienceType">
                      <SelectValue placeholder="Select experience type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lostItem">Lost Item</SelectItem>
                      <SelectItem value="foundItem">Found Item</SelectItem>
                      <SelectItem value="itemReturn">Item Return Process</SelectItem>
                      <SelectItem value="appFeedback">App Feedback</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Button
                        key={star}
                        type="button"
                        variant="outline"
                        className={`p-2 ${parseInt(rating || '0') >= star ? 'bg-yellow-100 border-yellow-400' : ''}`}
                        onClick={() => setRating(star.toString())}
                      >
                        <StarIcon className={`h-6 w-6 ${parseInt(rating || '0') >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Your Experience</Label>
                  <Textarea
                    id="message"
                    placeholder="Share your story with us..."
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gndec-blue hover:bg-gndec-blue/90"
                  disabled={isSubmitting}
                >
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? 'Submitting...' : 'Share Your Experience'}
                </Button>
                
                <p className="text-sm text-center text-muted-foreground">
                  By sharing your experience, you'll earn 20 points towards your rewards!
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShareExperiencePage;
