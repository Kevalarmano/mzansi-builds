import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../services/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { addComment, deleteProject } from "../../services/projectService";

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

    await addComment(projectId, text, user.email);

    setCommentText({
      ...commentText,
      [projectId]: "",
    });
  };

  const handleDelete = async (projectId) => {
    const confirmDelete = confirm("Delete this project?");
    if (!confirmDelete) return;

    await deleteProject(projectId);
  };

  const handleEdit = (project) => {
    navigate(`/edit/${project.id}`, { state: project });
  };

  const activeProjects = projects.filter((p) => p.status !== "completed");
  const completedProjects = projects.filter((p) => p.status === "completed");

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Developer Feed
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Explore what others are building and collaborate.
          </p>
        </div>

        {/* ACTIVE PROJECTS */}
        <h2 className="text-lg text-gray-400 mb-6 uppercase tracking-wider">
          Active Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {activeProjects.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0f0f0f] border border-gray-800 rounded-2xl p-5 hover:border-green-500/40 transition"
            >
              <h2 className="text-lg font-medium text-white">
                {p.title}
              </h2>

              <p className="text-gray-400 text-sm mt-2">
                {p.description}
              </p>

              <p className="text-xs text-gray-600 mt-3">
                {p.userEmail}
              </p>

              {/* ACTION ROW */}
              <div className="flex justify-between items-center mt-4">

                <button
                  onClick={() => navigate(`/project/${p.id}`)}
                  className="text-sm text-green-400 hover:text-green-300 transition"
                >
                  View →
                </button>

                {p.userId === user.uid && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-xs text-white border border-gray-700 px-3 py-1 rounded hover:border-green-500 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-xs text-white border border-gray-700 px-3 py-1 rounded hover:border-red-500 transition"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {/* COMMENT */}
              <div className="mt-4">
                <input
                  className="w-full bg-black border border-gray-800 rounded-lg p-2 text-sm text-white focus:border-green-500 outline-none"
                  placeholder="Write a comment..."
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
                  className="mt-2 text-sm text-green-400 hover:text-green-300 transition"
                >
                  Send
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CELEBRATION WALL */}
        <h2 className="text-lg text-gray-400 mt-16 mb-6 uppercase tracking-wider">
          Celebration Wall
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {completedProjects.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0f0f0f] border border-green-500/20 rounded-2xl p-5"
            >
              <h2 className="text-lg text-white font-medium">
                {p.title}
              </h2>

              <p className="text-gray-400 text-sm mt-2">
                {p.description}
              </p>

              <p className="text-xs text-gray-600 mt-3">
                {p.userEmail}
              </p>

              <p className="text-green-400 text-xs mt-2">
                Completed
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;