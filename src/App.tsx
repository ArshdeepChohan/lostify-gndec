
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationsBar } from "@/components/NotificationsBar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ImageSearchPage from "./pages/ImageSearchPage";
import LostItemsPage from "./pages/LostItemsPage";
import FoundItemsPage from "./pages/FoundItemsPage";
import SearchPage from "./pages/SearchPage";
import AuthPage from "./pages/AuthPage";
import ReportItemPage from "./pages/ReportItemPage";
import LocationsPage from "./pages/LocationsPage";
import AboutProcessPage from "./pages/AboutProcessPage";
import ShareExperiencePage from "./pages/ShareExperiencePage";
import UserPointsPage from "./pages/UserPointsPage";
import DashboardPage from "./pages/DashboardPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen">
            <NotificationsBar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/lost" element={<LostItemsPage />} />
              <Route path="/found" element={<FoundItemsPage />} />
              <Route path="/image-search" element={<ImageSearchPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/report/:type" element={<ReportItemPage />} />
              <Route path="/locations" element={<LocationsPage />} />
              <Route path="/about-process" element={<AboutProcessPage />} />
              <Route path="/share-experience" element={<ShareExperiencePage />} />
              <Route path="/points" element={<UserPointsPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
