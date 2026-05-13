import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Index from "./pages/Index";
import Manufacturers from "./pages/Manufacturers";
import Investors from "./pages/Investors";
import Clinics from "./pages/Clinics";

import Login from "./pages/Login";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import Unsubscribe from "./pages/Unsubscribe";
import ProtectedRoute from "./components/ProtectedRoute";
import ManufacturerDashboard from "./pages/portal/ManufacturerDashboard";
import ClinicPortal from "./pages/portal/ClinicPortal";
import InvestorPortal from "./pages/portal/InvestorPortal";
import PartnerPortal from "./pages/portal/PartnerPortal";
import AdminPortal from "./pages/portal/AdminPortal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/manufacturers" element={<Manufacturers />} />
              <Route path="/investors" element={<Investors />} />
              <Route path="/clinics" element={<Clinics />} />
              
              <Route path="/login" element={<Login />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
              <Route path="/datenschutzerklaerung" element={<Datenschutz />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/unsubscribe" element={<Unsubscribe />} />
              <Route
                path="/portal/manufacturer/*"
                element={
                  <ProtectedRoute requiredRole="manufacturer">
                    <ManufacturerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/portal/clinic/*"
                element={
                  <ProtectedRoute requiredRole="clinic">
                    <ClinicPortal />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/portal/investor/*"
                element={
                  <ProtectedRoute requiredRole="investor">
                    <InvestorPortal />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/portal/partner/*"
                element={
                  <ProtectedRoute requiredRole="partner">
                    <PartnerPortal />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/portal/admin/*"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminPortal />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
