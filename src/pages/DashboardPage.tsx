
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Upload, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const DashboardPage = () => {
  const { profile, isAuthenticated, isLoading, updateProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    branch: profile?.branch || "",
    roll_number: profile?.roll_number || "",
    year: profile?.year || "",
    address: profile?.address || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
  });
  const [activeTab, setActiveTab] = useState("profile");

  // Redirect if not authenticated
  if (!isLoading && !isAuthenticated) {
    navigate("/auth", { state: { returnUrl: "/dashboard" } });
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gndec-blue" />
        </main>
        <Footer />
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await updateProfile(formData);
    if (!error) {
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      });
    }
  };

  const uploadPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${profile?.id}/${uuidv4()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("lostify_images")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from("lostify_images")
        .getPublicUrl(filePath);

      const { error: updateError } = await updateProfile({
        photo_url: data.publicUrl,
      });

      if (updateError) {
        throw updateError;
      }

      toast({
        title: "Photo Uploaded",
        description: "Your profile photo has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gndec-cream">
      <Navbar />
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>User Dashboard</CardTitle>
              <CardDescription>
                Manage your profile and view your activities
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative mb-4">
                <Avatar className="h-24 w-24 border-2 border-gndec-blue/20">
                  <AvatarImage src={profile?.photo_url} alt={profile?.full_name} />
                  <AvatarFallback className="bg-gndec-blue/10 text-gndec-blue text-lg">
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0">
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <div className="bg-gndec-blue text-white p-1 rounded-full hover:bg-gndec-blue/80 transition-colors">
                      {uploading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="h-4 w-4" />
                      )}
                    </div>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={uploadPhoto}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              
              <h2 className="text-xl font-semibold">{profile?.full_name || "User"}</h2>
              <p className="text-muted-foreground capitalize">{profile?.user_type}</p>
              
              <div className="w-full mt-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="items">My Items</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>
                {activeTab === "profile" ? "Profile Information" : "My Items"}
              </CardTitle>
              <CardDescription>
                {activeTab === "profile" 
                  ? "Update your personal information" 
                  : "View and manage your lost and found items"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TabsContent value="profile" className="mt-0">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input
                        id="full_name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="branch">Branch/Department</Label>
                      <Input
                        id="branch"
                        name="branch"
                        value={formData.branch}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="roll_number">Roll Number</Label>
                      <Input
                        id="roll_number"
                        name="roll_number"
                        value={formData.roll_number}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year">Year of Study</Label>
                      <Input
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={formData.address || ""}
                        onChange={handleInputChange}
                        rows={3}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="gndec-btn mt-4">
                    Save Changes
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="items" className="mt-0">
                <Alert>
                  <AlertTitle>Your reported items</AlertTitle>
                  <AlertDescription>
                    You haven't reported any lost or found items yet. When you do, they'll appear here.
                  </AlertDescription>
                </Alert>
                <div className="flex justify-between mt-4">
                  <Button variant="outline" onClick={() => navigate("/report/lost")}>
                    Report Lost Item
                  </Button>
                  <Button className="gndec-btn" onClick={() => navigate("/report/found")}>
                    Report Found Item
                  </Button>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
