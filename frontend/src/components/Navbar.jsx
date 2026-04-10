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
    <div className="w-full bg-black border-b border-gray-800 px-6 py-4 flex justify-between items-center">
      
      {/* LEFT = LOGO (GOES HOME) */}
      <Link to="/" className="text-green-500 text-xl font-bold">
        MzansiBuilds
      </Link>

      {/* RIGHT = ACTIONS */}
      <div className="flex gap-4">
        <Link
          to="/create"
          className="text-white hover:text-green-400"
        >
          New Project
        </Link>

        <button
          onClick={handleLogout}
          className="text-red-400 hover:text-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;