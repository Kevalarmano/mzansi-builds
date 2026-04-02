import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("User registered!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Register</h2>
      <input
        className="block mb-2 p-2 text-black"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="block mb-2 p-2 text-black"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-green-500 px-4 py-2"
        onClick={handleRegister}
      >
        Register
      </button>
    </div>
  );
}

export default Register;
