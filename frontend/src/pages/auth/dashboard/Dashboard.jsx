import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";

function Dashboard() {
  const { user } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl text-green-500">Dashboard</h1>

      {user ? (
        <>
          <p>Welcome, {user.email}</p>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 mt-4 rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <p>You are not logged in</p>
      )}
    </div>
  );
}

export default Dashboard;