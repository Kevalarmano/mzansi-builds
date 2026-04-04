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
  const [commentText, setCommentText] = useState({}); // ✅ per-project comments

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

  // ✅ ADD COMMENT FUNCTION
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

  return (
    <div className="p-6">
      <h1 className="text-2xl text-green-500 mb-4">Live Feed</h1>

      <div className="flex gap-4 mb-4">
        <Link to="/create" className="bg-green-500 px-4 py-2">
          + New Project
        </Link>

        <button onClick={handleLogout} className="bg-red-500 px-4 py-2">
          Logout
        </button>
      </div>

      {projects.length === 0 ? (
        <p>No projects yet</p>
      ) : (
        projects.map((project) => (
          <div
            key={project.id}
            className="border border-gray-700 p-4 mb-3 rounded"
          >
            <h2 className="text-xl text-green-400">{project.title}</h2>
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

            {/* ✅ COMMENT INPUT */}
            <div className="mt-3">
              <input
                className="p-2 text-black w-full mb-2"
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
                className="bg-blue-500 px-3 py-1"
              >
                Send
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;