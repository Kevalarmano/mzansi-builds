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
      <Link to="/" className="text-green-500 text-xl font-bold">
        MzansiBuilds
      </Link>

      <div className="flex gap-4">
        <Link
          to="/"
          className="text-white hover:text-green-400 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/create"
          className="text-white hover:text-green-400 transition"
        >
          New Project
        </Link>

        <button
          onClick={handleLogout}
          className="text-red-400 hover:text-red-500 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;