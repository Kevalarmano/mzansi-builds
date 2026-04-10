import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../services/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [commentText, setCommentText] = useState({});
  const navigate = useNavigate();

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

  const activeProjects = projects.filter((p) => p.status !== "completed");
  const completedProjects = projects.filter((p) => p.status === "completed");

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-6xl mx-auto">

        {/* HEADER (NO BUTTONS) */}
        <h1 className="text-4xl font-bold text-green-400 mb-2">
          Live Developer Feed
        </h1>

        <p className="text-gray-400 mb-10">
          See what other developers are building and collaborate.
        </p>

        {/* ACTIVE PROJECTS */}
        <h2 className="text-2xl text-green-400 mb-6">Active Builds</h2>

        {activeProjects.length === 0 ? (
          <p className="text-gray-500 mb-10 text-center">
            No projects yet — start building in public
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {activeProjects.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ scale: 1.03 }}
                className="bg-zinc-900/80 backdrop-blur-lg p-6 rounded-2xl border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.15)]"
              >
                <h2 className="text-xl text-green-300">{p.title}</h2>

                <p className="text-gray-400 text-sm mt-1">
                  {p.description}
                </p>

                <p className="text-xs text-gray-500 mt-2">
                  By {p.userEmail}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Stage: {p.stage}
                </p>

                {/* VIEW PROJECT */}
                <button
                  onClick={() => navigate(`/project/${p.id}`)}
                  className="text-green-400 mt-4 text-sm hover:underline"
                >
                  View Progress →
                </button>

                {/* COMMENT */}
                <div className="mt-4">
                  <input
                    placeholder="Comment or collaborate..."
                    className="w-full p-2 bg-black border border-gray-700 rounded text-sm text-white"
                    value={commentText[p.id] || ""}
                    onChange={(e) =>
                      setCommentText({
                        ...commentText,
                        [p.id]: e.target.value,
                      })
                    }
                  />

                  <button
                    onClick={() => handleComment(p.id)}
                    className="mt-2 text-xs bg-green-500 px-3 py-1 rounded hover:bg-green-600"
                  >
                    Send
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CELEBRATION WALL */}
        <h2 className="text-2xl text-white mt-16 mb-6 border-b border-gray-700 pb-2">
          Celebration Wall
        </h2>

        {completedProjects.length === 0 ? (
          <p className="text-gray-500 text-center">
            No completed projects yet
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {completedProjects.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900 border border-green-500/30 p-6 rounded-2xl shadow-[0_0_20px_rgba(34,197,94,0.15)] hover:shadow-[0_0_30px_rgba(34,197,94,0.25)] transition"
              >
                <h2 className="text-xl text-white font-semibold">
                  {p.title}
                </h2>

                <p className="text-gray-400 text-sm mt-2">
                  {p.description}
                </p>

                <p className="text-xs text-gray-500 mt-3">
                  Built by {p.userEmail}
                </p>

                <p className="text-green-400 text-sm mt-3 font-medium">
                  ✔ Completed
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;