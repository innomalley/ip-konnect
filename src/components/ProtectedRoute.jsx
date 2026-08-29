import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { FullPageLoader } from './FullPageLoader.jsx';

/**
 * Guards portal routes. `role` optionally restricts a route to one user type.
 */
export function ProtectedRoute({ role, children }) {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) return <FullPageLoader />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (role && user.role !== role) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return children;
}
