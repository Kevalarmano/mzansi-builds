import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      alert("Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">

      <div className="w-full max-w-sm">

        {/* LOGO / TITLE */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            MzansiBuilds
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Sign in to continue
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-[#111] border border-gray-800 text-sm focus:border-green-500 outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-[#111] border border-gray-800 text-sm focus:border-green-500 outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-sm font-medium transition ${
              loading
                ? "bg-gray-800 text-gray-500"
                : "bg-green-500 text-black hover:bg-green-400"
            }`}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-white hover:text-green-400 transition">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;