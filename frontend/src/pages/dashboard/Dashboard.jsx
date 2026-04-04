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

  // 🤝 RAISE HAND
  const handleRaiseHand = async (projectId) => {
    await addDoc(collection(db, "projects", projectId, "comments"), {
      text: "🤝 I’d like to collaborate!",
      userEmail: user.email,
      createdAt: serverTimestamp(),
    });
  };

  // SPLIT PROJECTS
  const activeProjects = projects.filter((p) => p.status !== "completed");
  const completedProjects = projects.filter((p) => p.status === "completed");

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-green-500 mb-6">
        MzansiBuilds 🚀
      </h1>

      <div className="flex gap-4 mb-6">
        <Link className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition" to="/create">
          + New Project
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* ACTIVE PROJECTS */}
      <h2 className="text-xl text-green-400 mb-3 mt-6">Active Projects</h2>

      {activeProjects.length === 0 ? (
        <p className="text-gray-400">
          No projects yet. Be the first to build something 🚀
        </p>
      ) : (
        activeProjects.map((project) => (
          <div
            key={project.id}
            className="border border-gray-700 p-4 mb-4 rounded bg-gray-900 shadow-md hover:shadow-green-500/30 hover:scale-[1.01] transition"
          >
            <h2 className="text-xl text-green-300">{project.title}</h2>

            {/* 👤 OWNER TAG */}
            {project.userId === user.uid && (
              <p className="text-xs text-green-400">Your Project</p>
            )}

            <p>{project.description}</p>

            <p className="text-sm text-gray-400">
              Stage: {project.stage}
            </p>

            <p className="text-sm text-gray-400">
              Needs: {project.supportNeeded}
            </p>

            <p className="text-xs text-gray-500 mt-2">
              By: {project.userEmail}
            </p>

            {/* 🔗 VIEW */}
            <Link
              to={`/project/${project.id}`}
              className="text-blue-400 block mt-2 hover:underline"
            >
              View Project →
            </Link>

            {/* 💬 COMMENT */}
            <div className="mt-3">
              <input
                className="p-2 text-black w-full mb-2 rounded"
                placeholder="Raise hand / comment..."
                value={commentText[project.id] || ""}
                onChange={(e) =>
                  setCommentText({
                    ...commentText,
                    [project.id]: e.target.value,
                  })
                }
              />

              <button
                onClick={() => handleComment(project.id)}
                className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 transition"
              >
                Send
              </button>

              {/* 🤝 RAISE HAND */}
              <button
                onClick={() => handleRaiseHand(project.id)}
                className="bg-purple-500 px-3 py-1 mt-2 rounded hover:bg-purple-600 transition ml-2"
              >
                🤝 Raise Hand
              </button>
            </div>
          </div>
        ))
      )}

      {/* 🏆 CELEBRATION WALL */}
      <h2 className="text-xl text-yellow-400 mt-10 mb-3">
        Celebration Wall 🎉
      </h2>

      {completedProjects.length === 0 ? (
        <p className="text-gray-400">No completed projects yet</p>
      ) : (
        completedProjects.map((project) => (
          <div
            key={project.id}
            className="border border-yellow-500 p-4 mb-4 rounded bg-gray-900 shadow-md"
          >
            <h2 className="text-xl text-yellow-300">{project.title}</h2>
            <p>{project.description}</p>

            <p className="text-sm text-gray-400">
              Completed by: {project.userEmail}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;