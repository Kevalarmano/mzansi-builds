import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import CreateProject from "./pages/projects/CreateProject";
import ProjectDetails from "./pages/projects/ProjectDetails";
import EditProject from "./pages/projects/EditProject";
import NotFound from "./pages/NotFound";
import Profile from "./pages/profile";

// New Pages
import MyProjects from "./pages/feed/MyProjects";
import Community from "./pages/feed/Community";
import Celebration from "./pages/feed/Celebration";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

/* Layout wrapper */
function Layout({ children }) {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {!hideNavbar && <Navbar />}

      <div className="flex-1 px-4 md:px-8 py-6">
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>

          {/* Redirect root → home */}
          <Route path="/" element={<Navigate to="/home" />} />

          {/* HOME (Dashboard) */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* NEW STRUCTURED PAGES */}
          <Route
            path="/my"
            element={
              <ProtectedRoute>
                <MyProjects />
              </ProtectedRoute>
            }
          />

          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            }
          />

          <Route
            path="/celebration"
            element={
              <ProtectedRoute>
                <Celebration />
              </ProtectedRoute>
            }
          />

          {/* PROJECT ROUTES */}
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateProject />
              </ProtectedRoute>
            }
          />

          <Route
            path="/project/:id"
            element={
              <ProtectedRoute>
                <ProjectDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditProject />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;