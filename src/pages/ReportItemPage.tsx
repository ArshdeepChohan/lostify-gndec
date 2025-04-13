
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { Camera, Upload } from "lucide-react";

type ItemType = "lost" | "found";

const categories = [
  "Electronics",
  "Books",
  "Clothing",
  "Accessories",
  "ID Cards",
  "Keys",
  "Other",
];

const locations = [
  "Main Building",
  "Library",
  "Hostel Buildings",
  "Cafeteria",
  "Sports Complex",
  "Parking Area",
  "Laboratories",
  "Auditorium",
  "Other",
];

const ReportItemPage = () => {
  const { type } = useParams<{ type: ItemType }>();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Redirect to auth page if not authenticated
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: `Please sign in to report a ${type} item.`,
      });
      navigate("/auth", { state: { returnUrl: `/report/${type}` } });
    }
  }, [isAuthenticated, navigate, toast, type]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !category || !location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Create a new item object
    const newItem = {
      id: Date.now().toString(),
      title,
      description,
      category,
      location,
      date: date || new Date().toISOString().split('T')[0],
      image: imagePreview || "/placeholder.svg",
      status: "active",
      reportedBy: user?.email,
      type,
    };

    // In a real application, this would be an API call
    // For now, we'll store in localStorage
    const storageKey = type === "lost" ? "lostItems" : "foundItems";
    const existingItems = JSON.parse(localStorage.getItem(storageKey) || "[]");
    const updatedItems = [newItem, ...existingItems];
    localStorage.setItem(storageKey, JSON.stringify(updatedItems));

    // Update user points
    updateUserPoints(50);

    // Send notification email
    sendNotificationEmail(newItem);

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Success!",
        description: `Your ${type} item report has been submitted successfully. You earned 50 points!`,
      });
      navigate(`/${type}`);
    }, 1500);
  };

  const updateUserPoints = (points: number) => {
    if (user?.email) {
      const userPoints = JSON.parse(localStorage.getItem("userPoints") || "{}");
      const currentPoints = userPoints[user.email] || 0;
      userPoints[user.email] = currentPoints + points;
      localStorage.setItem("userPoints", JSON.stringify(userPoints));
      
      // Check if user reached 1000 points
      if (currentPoints < 1000 && currentPoints + points >= 1000) {
        generateCertificate();
      }
    }
  };

  const generateCertificate = () => {
    toast({
      title: "Congratulations!",
      description: "You've reached 1000 points! Your digital certificate for social work and volunteering has been generated.",
    });
    // In a real app, we would generate and store the certificate
  };

  const sendNotificationEmail = (item: any) => {
    console.log(`Email notification sent about ${type} item: ${title}`);
    // In a real app, this would call a backend API to send the email
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col bg-gndec-cream">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className={`text-2xl ${type === 'lost' ? 'text-gndec-blue' : 'text-gndec-green'}`}>
                Report {type === 'lost' ? 'a Lost' : 'a Found'} Item
              </CardTitle>
              <CardDescription>
                Please provide as much detail as possible to help {type === 'lost' ? 'find your item' : 'return this item to its owner'}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Item Name</Label>
                  <Input
                    id="title"
                    placeholder="What is the item?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select value={location} onValueChange={setLocation} required>
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Where was it lost/found?" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date">{type === 'lost' ? 'When did you lose it?' : 'When did you find it?'}</Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide details about the item..."
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="image">Upload Image</Label>
                  <div className="mt-1 flex items-center space-x-4">
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <div className="flex items-center justify-center w-32 h-32 border-2 border-dashed rounded-md border-gray-300 p-2 hover:border-gndec-green">
                        {imagePreview ? (
                          <img src={imagePreview} alt="Preview" className="h-full w-full object-cover rounded" />
                        ) : (
                          <div className="flex flex-col items-center">
                            <Camera className="h-10 w-10 text-gray-400" />
                            <span className="mt-2 text-sm text-center text-gray-500">Add photo</span>
                          </div>
                        )}
                      </div>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                    {imagePreview && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setImage(null);
                          setImagePreview(null);
                        }}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className={`w-full ${type === 'lost' ? 'bg-gndec-blue hover:bg-gndec-blue/90' : 'bg-gndec-green hover:bg-gndec-green/90'}`}
                  disabled={isSubmitting}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {isSubmitting ? 'Submitting...' : `Submit ${type === 'lost' ? 'Lost' : 'Found'} Item Report`}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReportItemPage;
