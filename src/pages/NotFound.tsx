
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="container px-4 text-center">
          <div className="mb-6">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
              <span className="text-6xl font-bold text-primary">?</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto">
            Sorry, we couldn't find the page you're looking for. It might be lost too!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/">Return Home</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link to="/lost">Report Lost Item</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
