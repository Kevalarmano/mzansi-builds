import { Link, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  // helper for active link styling
  const isActive = (path) =>
    location.pathname === path
      ? "text-green-400"
      : "text-gray-400 hover:text-white";

  return (
    <div className="w-full sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO → HOME */}
        <Link
          to="/home"
          className="text-white text-xl font-semibold tracking-tight hover:text-green-400 transition"
        >
          MzansiBuilds
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6 text-sm">

          {/* HOME LINK */}
          <Link to="/home" className={isActive("/home")}>
            Home
          </Link>

          <Link to="/my" className={isActive("/my")}>
            My Projects
          </Link>

          <Link to="/community" className={isActive("/community")}>
            Community
          </Link>

          <Link to="/celebration" className={isActive("/celebration")}>
            Celebration
          </Link>

          <Link to="/create" className={isActive("/create")}>
            New Project
          </Link>

          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-white transition"
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}

export default Navbar;