
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Map, Search, Upload } from "lucide-react";

const features = [
  {
    icon: <Upload className="h-10 w-10 text-primary" />,
    title: "Report",
    description:
      "Easily report lost or found items with details and photos to help with identification.",
  },
  {
    icon: <Search className="h-10 w-10 text-primary" />,
    title: "Search",
    description:
      "Browse through listings or use our powerful search to find matching items.",
  },
  {
    icon: <Map className="h-10 w-10 text-primary" />,
    title: "Connect",
    description:
      "Get matched with potential item owners or finders and arrange for item return.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How Lostify Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform makes it easy to report, search, and connect to find your lost items
            or return found items to their owners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="bg-card border-border hover-scale"
            >
              <CardContent className="pt-6 text-center">
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center">
          <a 
            href="/about" 
            className="text-primary font-medium hover:underline flex items-center gap-1 group"
          >
            Learn more about our process
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
