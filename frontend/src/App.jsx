import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import CreateProject from "./pages/projects/CreateProject";
import ProjectDetails from "./pages/projects/ProjectDetails";
import NotFound from "./pages/NotFound";
import Profile from "./pages/profile";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

/*  Hide Navbar on auth pages */
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

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

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
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Auth Routes */}
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