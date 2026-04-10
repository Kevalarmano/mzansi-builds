import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="w-full sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link
          to="/"
          className="text-white text-xl font-semibold tracking-tight hover:text-green-400 transition"
        >
          MzansiBuilds
        </Link>

        {/* ACTIONS */}
        <div className="flex items-center gap-6 text-sm">

          <Link
            to="/create"
            className="text-gray-300 hover:text-green-400 transition"
          >
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