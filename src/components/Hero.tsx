
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Upload, Camera } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-gndec-cream overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[30%] -right-[10%] w-[500px] h-[500px] rounded-full bg-gndec-green/5 blur-3xl" />
        <div className="absolute top-[60%] -left-[10%] w-[400px] h-[400px] rounded-full bg-gndec-burgundy/5 blur-3xl" />
      </div>

      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <img 
              src="https://gndec.ac.in/sites/default/files/logo.png" 
              alt="GNDEC Logo" 
              className="h-20 w-auto object-contain"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gndec-blue">
            Lost Something on<br />
            <span className="text-gndec-burgundy">GNDEC Campus?</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Lostify connects GNDEC students and faculty who have lost items with those who have found them.
            Our platform makes it easy to report and find lost belongings across campus.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto gap-2 gndec-btn">
              <Upload size={18} />
              Report Lost Item
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 border-gndec-burgundy text-gndec-burgundy hover:bg-gndec-burgundy/10">
              <Upload size={18} />
              Report Found Item
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center">
            <Link to="/image-search">
              <Button variant="ghost" className="text-gndec-green gap-2 group">
                <Camera size={18} />
                <span>Search by Image</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          <div className="mt-16 p-4 bg-white/80 rounded-lg shadow-md border border-gndec-green/10 max-w-2xl mx-auto">
            <h3 className="text-xl font-medium text-gndec-blue mb-2">
              Campus Lost &amp; Found
            </h3>
            <p className="text-muted-foreground mb-4">
              Find or report lost items across GNDEC campus locations: Main Building, Hostels, Library, Sports Complex, and Cafeteria.
            </p>
            <div className="flex justify-center">
              <Button variant="outline" className="text-gndec-green border-gndec-green hover:bg-gndec-green/10 gap-2">
                <Search size={16} />
                <span>Browse All Locations</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
