
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";
import Index from "./pages/Index";
import DiscoverSalons from "./pages/DiscoverSalons";
import BusinessDiscovery from "./pages/BusinessDiscovery";
import Testing from "./pages/Testing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/discover-salons" element={<DiscoverSalons currentLanguage="english" />} />
              <Route path="/גלה-סלונים" element={<DiscoverSalons currentLanguage="hebrew" />} />
              <Route path="/discovery" element={<BusinessDiscovery currentLanguage="english" />} />
              <Route path="/גילוי" element={<BusinessDiscovery currentLanguage="hebrew" />} />
              <Route path="/testing" element={<Testing />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <AuthModal />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
