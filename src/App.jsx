import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import { FullPageLoader } from './components/FullPageLoader.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import TeacherDashboard from './pages/TeacherDashboard.jsx';
import TeacherMaterials from './pages/TeacherMaterials.jsx';
import TeacherStudents from './pages/TeacherStudents.jsx';
import NotFound from './pages/NotFound.jsx';

function HomeRedirect() {
  const { isAuthenticated, user, loading } = useAuth();
  if (loading) return <FullPageLoader />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Navigate to={`/${user.role}`} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher"
        element={
          <ProtectedRoute role="teacher">
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/materials"
        element={
          <ProtectedRoute role="teacher">
            <TeacherMaterials />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/students"
        element={
          <ProtectedRoute role="teacher">
            <TeacherStudents />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
