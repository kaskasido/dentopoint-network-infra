import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

type AppRole = "clinic" | "manufacturer" | "investor" | "partner" | "admin";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: AppRole;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, role, loading } = useAuth();

  // Wait for auth AND role lookup to settle before deciding.
  if (loading || (user && requiredRole && role === null)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole && role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
