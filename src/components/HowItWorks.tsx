
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Map, Search, Upload, Camera } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <Upload className="h-10 w-10 text-gndec-blue" />,
    title: "Report",
    description:
      "Easily report lost or found items on GNDEC campus with details and photos to help with identification.",
  },
  {
    icon: <Search className="h-10 w-10 text-gndec-blue" />,
    title: "Search",
    description:
      "Browse through listings or use our powerful search to find matching items across campus locations.",
  },
  {
    icon: <Camera className="h-10 w-10 text-gndec-blue" />,
    title: "Image Search",
    description:
      "Upload an image of your lost item to find similar items using advanced image recognition technology.",
  },
  {
    icon: <Map className="h-10 w-10 text-gndec-blue" />,
    title: "Connect",
    description:
      "Get matched with potential item owners or finders and arrange for item return within GNDEC campus.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gndec-gray/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gndec-blue">How Lostify Works at GNDEC</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform makes it easy to report, search, and connect to find your lost items
            or return found items to their owners within the GNDEC campus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="gndec-card bg-white"
            >
              <CardContent className="pt-6 text-center">
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gndec-burgundy">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center">
          <Link 
            to="/about-process" 
            className="text-gndec-blue font-medium hover:underline flex items-center gap-1 group"
          >
            Learn more about our process
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
