import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in!");
      navigate("/"); // ✅ redirect to dashboard
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form
        onSubmit={handleLogin}
        className="p-6 bg-gray-900 rounded-lg w-full max-w-md"
      >
        <h2 className="text-2xl mb-4 text-green-500 text-center">
          Login
        </h2>

        <input
          className="block mb-3 p-2 text-black w-full rounded"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="block mb-4 p-2 text-black w-full rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-green-500 px-4 py-2 w-full rounded hover:bg-green-600">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;