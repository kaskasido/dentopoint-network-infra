import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Manufacturers from "./pages/Manufacturers";
import Investors from "./pages/Investors";
import Clinics from "./pages/Clinics";
import Login from "./pages/Login";
import ClinicDashboard from "./pages/portal/ClinicDashboard";
import ManufacturerDashboard from "./pages/portal/ManufacturerDashboard";
import InvestorDashboard from "./pages/portal/InvestorDashboard";
import AdminDashboard from "./pages/portal/AdminDashboard";
import Impressum from "./pages/Impressum";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Index />} />
            <Route path="/manufacturers" element={<Manufacturers />} />
            <Route path="/investors" element={<Investors />} />
            <Route path="/clinics" element={<Clinics />} />
            <Route path="/login" element={<Login />} />
            <Route path="/impressum" element={<Impressum />} />

            {/* Clinic Portal */}
            <Route path="/portal/clinic/*" element={
              <ProtectedRoute requiredRole="clinic">
                <ClinicDashboard />
              </ProtectedRoute>
            } />

            {/* Manufacturer Portal */}
            <Route path="/portal/manufacturer/*" element={
              <ProtectedRoute requiredRole="manufacturer">
                <ManufacturerDashboard />
              </ProtectedRoute>
            } />

            {/* Investor Portal */}
            <Route path="/portal/investor/*" element={
              <ProtectedRoute requiredRole="investor">
                <InvestorDashboard />
              </ProtectedRoute>
            } />

            {/* Admin Portal */}
            <Route path="/portal/admin/*" element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
