
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, School } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gndec-blue text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <School className="text-gndec-blue h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white leading-tight">Lostify</span>
                <span className="text-xs text-white/80 leading-tight">GNDEC Campus</span>
              </div>
            </div>
            <p className="text-white/80">
              The official lost and found platform for Guru Nanak Dev Engineering College, Ludhiana.
            </p>
            
            <div className="mt-4 flex items-center space-x-4">
              <a href="https://www.facebook.com/officialgndec" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com/gndecludhiana" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/gndecludhiana/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/school/gndecludhiana/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 border-b border-white/20 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-white/80 hover:text-white transition-colors">Home</a></li>
              <li><a href="/lost" className="text-white/80 hover:text-white transition-colors">Lost Items</a></li>
              <li><a href="/found" className="text-white/80 hover:text-white transition-colors">Found Items</a></li>
              <li><a href="/image-search" className="text-white/80 hover:text-white transition-colors">Image Search</a></li>
              <li><a href="https://gndec.ac.in/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">About GNDEC</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 border-b border-white/20 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="text-white/80 mt-0.5" />
                <span className="text-white/80">
                  Guru Nanak Dev Engineering College, Gill Park, Ludhiana, Punjab 141006
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-white/80" />
                <a href="tel:+911612502700" className="text-white/80 hover:text-white">+91 161 2502700</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-white/80" />
                <a href="mailto:info@gndec.ac.in" className="text-white/80 hover:text-white">info@gndec.ac.in</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 border-b border-white/20 pb-2">Campus Updates</h3>
            <p className="text-white/80 mb-4">
              Subscribe to get updates about lost and found items on campus.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white"
              />
              <Button className="bg-white text-gndec-blue hover:bg-white/90 font-medium">Subscribe</Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm">
          <p>© {new Date().getFullYear()} Lostify - GNDEC Campus. All rights reserved.</p>
          <p className="mt-1">A service provided by Guru Nanak Dev Engineering College, Ludhiana</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
