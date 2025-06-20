
import { Camera } from "lucide-react";
import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

export const DesktopNavigation = () => {
  return (
    <div className="hidden md:flex items-center space-x-6">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/" className="text-foreground hover:text-gndec-blue transition-colors px-3 py-2 text-sm font-medium">
              Home
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/lost" className="text-foreground hover:text-gndec-blue transition-colors px-3 py-2 text-sm font-medium">
              Lost Items
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/found" className="text-foreground hover:text-gndec-blue transition-colors px-3 py-2 text-sm font-medium">
              Found Items
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-foreground hover:text-gndec-blue transition-colors px-3 py-2 text-sm font-medium">
              Services
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                <Link to="/image-search" className="flex items-start gap-3 p-3 rounded-md hover:bg-muted">
                  <Camera className="h-5 w-5 text-gndec-blue" />
                  <div>
                    <div className="font-medium">Image Search</div>
                    <p className="text-sm text-muted-foreground">
                      Find lost items using image recognition
                    </p>
                  </div>
                </Link>
                <a href="https://gndec.ac.in/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-md hover:bg-muted">
                  <div className="h-5 w-5 flex-shrink-0">
                    <img src="/gndec-logo-light.png" alt="GNDEC Logo" className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <div className="font-medium">About GNDEC</div>
                    <p className="text-sm text-muted-foreground">
                      Learn more about Guru Nanak Dev Engineering College
                    </p>
                  </div>
                </a>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
