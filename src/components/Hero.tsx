
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Upload } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[30%] -right-[10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-[60%] -left-[10%] w-[400px] h-[400px] rounded-full bg-purple-300/20 blur-3xl" />
      </div>

      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary">
            Lost something?<br />
            We'll help you find it.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Lostify connects people who have lost items with those who have found them.
            Our platform makes it easy to report lost or found items and bring them back to their owners.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto gap-2">
              <Upload size={18} />
              Report Lost Item
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
              <Upload size={18} />
              Report Found Item
            </Button>
          </div>

          <div className="mt-16 flex items-center justify-center">
            <Button variant="ghost" className="text-muted-foreground gap-2 group">
              <span>Browse Lost Items</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
