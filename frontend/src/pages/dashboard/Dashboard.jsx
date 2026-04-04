import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../../services/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Link } from "react-router-dom";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [commentText, setCommentText] = useState({});

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(data);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleComment = async (projectId) => {
    const text = commentText[projectId];
    if (!text) return;

    await addDoc(collection(db, "projects", projectId, "comments"), {
      text,
      userEmail: user.email,
      createdAt: serverTimestamp(),
    });

    setCommentText({
      ...commentText,
      [projectId]: "",
    });
  };

  const handleRaiseHand = async (projectId) => {
    await addDoc(collection(db, "projects", projectId, "comments"), {
      text: "🤝 I’d like to collaborate!",
      userEmail: user.email,
      createdAt: serverTimestamp(),
    });
  };

  const activeProjects = projects.filter((p) => p.status !== "completed");
  const completedProjects = projects.filter((p) => p.status === "completed");

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10 flex justify-center">
      <div className="w-full max-w-5xl">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h1 className="text-4xl font-bold text-green-500">
            MzansiBuilds 🚀
          </h1>

          <div className="flex gap-3">
            <Link
              to="/create"
              className="bg-green-500 px-5 py-2 rounded-lg hover:bg-green-600 transition font-semibold shadow-md"
            >
              + New Project
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-5 py-2 rounded-lg hover:bg-red-600 transition font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

        {/* ACTIVE PROJECTS */}
        <h2 className="text-2xl text-green-400 mb-4">Active Projects</h2>

        {activeProjects.length === 0 ? (
          <p className="text-gray-500 mb-8">
            No projects yet — start building something amazing 🔥
          </p>
        ) : (
          activeProjects.map((project) => (
            <div
              key={project.id}
              className="mb-6 p-5 rounded-xl bg-gray-900 border border-gray-800 shadow-lg hover:shadow-green-500/30 hover:border-green-500/40 transition"
            >
              <h2 className="text-2xl text-green-300 mb-1">
                {project.title}
              </h2>

              {project.userId === user.uid && (
                <p className="text-xs text-green-400 mb-2">
                  Your Project
                </p>
              )}

              <p className="mb-2 text-gray-300">
                {project.description}
              </p>

              <div className="text-sm text-gray-400 space-y-1">
                <p>Stage: {project.stage}</p>
                <p>Needs: {project.supportNeeded}</p>
                <p>By: {project.userEmail}</p>
              </div>

              {/* VIEW */}
              <Link
                to={`/project/${project.id}`}
                className="text-green-400 mt-3 inline-block hover:underline"
              >
                View Progress →
              </Link>

              {/* INTERACTION */}
              <div className="mt-4">
                <input
                  className="w-full p-3 rounded bg-black border border-gray-700 focus:border-green-500 outline-none text-white mb-2"
                  placeholder="Comment or collaborate..."
                  value={commentText[project.id] || ""}
                  onChange={(e) =>
                    setCommentText({
                      ...commentText,
                      [project.id]: e.target.value,
                    })
                  }
                />

                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleComment(project.id)}
                    className="bg-green-500 px-4 py-1 rounded hover:bg-green-600 transition text-sm"
                  >
                    Send
                  </button>

                  <button
                    onClick={() => handleRaiseHand(project.id)}
                    className="bg-purple-500 px-4 py-1 rounded hover:bg-purple-600 transition text-sm"
                  >
                    🤝 Collaborate
                  </button>
                </div>
              </div>
            </div>
          ))
        )}

        {/* CELEBRATION WALL */}
        <h2 className="text-2xl text-yellow-400 mt-12 mb-4">
          Celebration Wall 🎉
        </h2>

        {completedProjects.length === 0 ? (
          <p className="text-gray-500">
            No completed projects yet
          </p>
        ) : (
          completedProjects.map((project) => (
            <div
              key={project.id}
              className="mb-4 p-5 rounded-xl bg-gray-900 border border-yellow-500/40 shadow-lg"
            >
              <h2 className="text-xl text-yellow-300">
                {project.title}
              </h2>

              <p className="text-gray-300">
                {project.description}
              </p>

              <p className="text-sm text-gray-400 mt-2">
                Completed by {project.userEmail}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;