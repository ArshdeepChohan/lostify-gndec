
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-muted/50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">L</span>
              </div>
              <span className="text-xl font-bold">Lostify</span>
            </div>
            <p className="text-muted-foreground">
              Connecting people with their lost belongings, one item at a time.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</a></li>
              <li><a href="/lost" className="text-muted-foreground hover:text-primary transition-colors">Lost Items</a></li>
              <li><a href="/found" className="text-muted-foreground hover:text-primary transition-colors">Found Items</a></li>
              <li><a href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest updates.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="max-w-[250px]" 
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-8 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} Lostify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
