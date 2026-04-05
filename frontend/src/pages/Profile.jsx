import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center px-4">
      <div className="bg-zinc-900 p-6 rounded-xl border border-green-500/20 text-center w-full max-w-sm">
        <h1 className="text-2xl text-green-400 mb-4">Profile</h1>
        <p className="text-gray-300">{user?.email}</p>
      </div>
    </div>
  );
}

export default Profile;