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

      {/* CARD */}
      <div className="w-full max-w-md bg-zinc-900/80 backdrop-blur-lg border border-green-500/20 rounded-2xl p-8 shadow-[0_0_30px_rgba(34,197,94,0.2)]">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-green-400 text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-400 text-center mb-6 text-sm">
          Continue building in public
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:border-green-500 outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:border-green-500 outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              loading
                ? "bg-gray-700"
                : "bg-green-500 hover:bg-green-600 shadow-[0_0_15px_#22c55e]"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-sm text-gray-400 text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-green-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;