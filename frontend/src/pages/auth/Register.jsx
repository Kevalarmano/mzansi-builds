import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">

      <div className="w-full max-w-sm">

        {/* TITLE */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Create Account
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Start building in public
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleRegister} className="space-y-4">

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-[#111] border border-gray-800 text-sm focus:border-green-500 outline-none transition"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-[#111] border border-gray-800 text-sm focus:border-green-500 outline-none transition"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* BUTTON */}
          <button
            className="w-full py-3 rounded-lg text-sm font-medium bg-green-500 text-black hover:bg-green-400 transition"
          >
            Create Account
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-white hover:text-green-400 transition"
          >
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;