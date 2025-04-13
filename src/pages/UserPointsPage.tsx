
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Download, Award, Share2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UserPointsPage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [points, setPoints] = useState(0);
  const [activities, setActivities] = useState<any[]>([]);
  const [certificateEarned, setCertificateEarned] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to view your points.",
      });
      navigate("/auth");
      return;
    }

    // Load user points
    if (user?.email) {
      const userPoints = JSON.parse(localStorage.getItem("userPoints") || "{}");
      const currentPoints = userPoints[user.email] || 0;
      setPoints(currentPoints);
      setCertificateEarned(currentPoints >= 1000);

      // Generate mock activities
      const mockActivities = [
        {
          id: 1,
          type: "Report Lost Item",
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          points: 50,
        },
        {
          id: 2,
          type: "Report Found Item",
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          points: 50,
        },
        {
          id: 3,
          type: "Share Experience",
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          points: 20,
        },
        {
          id: 4,
          type: "Item Successfully Returned",
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          points: 100,
        },
      ];
      setActivities(mockActivities);
    }
  }, [isAuthenticated, navigate, toast, user]);

  const handleDownloadCertificate = () => {
    toast({
      title: "Certificate Downloaded",
      description: "Your digital certificate has been downloaded successfully.",
    });
  };

  const handleShareCertificate = () => {
    toast({
      title: "Share Feature",
      description: "Share functionality would allow sharing your certificate on social media.",
    });
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gndec-cream">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6 text-gndec-blue text-center">
            Your Reward Points
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Points Progress</CardTitle>
                <CardDescription>
                  Earn 1000 points to receive a certificate for social work and volunteering
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Progress to Certificate</span>
                      <span className="text-sm font-medium">{points} / 1000 points</span>
                    </div>
                    <Progress value={(points / 1000) * 100} className="h-3" />
                  </div>

                  {certificateEarned ? (
                    <div className="bg-green-50 border border-green-200 rounded-md p-4">
                      <div className="flex items-start">
                        <Award className="h-6 w-6 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <h3 className="text-green-800 font-medium">Congratulations!</h3>
                          <p className="text-green-700 text-sm mt-1">
                            You've earned your certificate for social work and volunteering!
                          </p>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" onClick={handleDownloadCertificate}>
                              <Download className="h-4 w-4 mr-1" />
                              Download Certificate
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleShareCertificate}>
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      You need {1000 - points} more points to earn your certificate. Keep reporting lost and found items!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Point Summary</CardTitle>
                <CardDescription>
                  Your contribution statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Points</span>
                    <span className="font-medium">{points}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items Reported</span>
                    <span className="font-medium">
                      {activities.filter(a => a.type.includes("Report")).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items Returned</span>
                    <span className="font-medium">
                      {activities.filter(a => a.type.includes("Returned")).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Experiences Shared</span>
                    <span className="font-medium">
                      {activities.filter(a => a.type.includes("Experience")).length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Point History</CardTitle>
              <CardDescription>
                Record of your activities and points earned
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead className="text-right">Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>{activity.date}</TableCell>
                      <TableCell>{activity.type}</TableCell>
                      <TableCell className="text-right">+{activity.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserPointsPage;
