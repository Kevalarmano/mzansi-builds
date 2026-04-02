import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-6">
      <h1 className="text-2xl text-green-500">Dashboard</h1>

      {user ? (
        <p>Welcome, {user.email}</p>
      ) : (
        <p>You are not logged in</p>
      )}
    </div>
  );
}

export default Dashboard;