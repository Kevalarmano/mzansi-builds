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
      alert("User registered successfully!");

      // Redirect to login (important UX fix)
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg"
      >
        <h2 className="text-3xl font-bold text-green-500 mb-6 text-center">
          Create Account
        </h2>

        {/* EMAIL */}
        <input
          className="w-full p-3 mb-4 rounded bg-black border border-gray-700 text-white focus:border-green-500 outline-none"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          className="w-full p-3 mb-4 rounded bg-black border border-gray-700 text-white focus:border-green-500 outline-none"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          className="w-full bg-green-500 py-3 rounded font-semibold hover:bg-green-600 transition active:scale-95"
        >
          Register
        </button>

        {/* LOGIN LINK */}
        <p className="text-sm text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;