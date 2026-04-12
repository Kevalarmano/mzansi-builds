import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { db } from "../../services/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [milestones, setMilestones] = useState([]);
  const [milestoneText, setMilestoneText] = useState("");

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  // FETCH MILESTONES
  useEffect(() => {
    const q = collection(db, "projects", id, "milestones");

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMilestones(data);
    });

    return () => unsubscribe();
  }, [id]);

  // FETCH COMMENTS
  useEffect(() => {
    const q = collection(db, "projects", id, "comments");

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(data);
    });

    return () => unsubscribe();
  }, [id]);

  // PROGRESS CALCULATION
  const completedCount = milestones.filter((m) => m.completed).length;
  const totalCount = milestones.length;
  const progress = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

  // ADD MILESTONE
  const addMilestone = async () => {
    if (!milestoneText) return;

    await addDoc(collection(db, "projects", id, "milestones"), {
      title: milestoneText,
      completed: false,
      createdAt: serverTimestamp(),
    });

    setMilestoneText("");
  };

  // TOGGLE MILESTONE
  const toggleMilestone = async (milestone) => {
    const ref = doc(db, "projects", id, "milestones", milestone.id);

    await updateDoc(ref, {
      completed: !milestone.completed,
    });
  };

  // ADD COMMENT
  const handleComment = async () => {
    if (!commentText) return;

    await addDoc(collection(db, "projects", id, "comments"), {
      text: commentText,
      userEmail: user.email,
      createdAt: serverTimestamp(),
    });

    setCommentText("");
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-3xl mx-auto">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-green-400 hover:underline text-sm"
        >
          ← Back
        </button>

        {/* TITLE */}
        <h1 className="text-3xl font-semibold text-green-400 mb-8">
          Project Details
        </h1>

        {/* MILESTONES */}
        <div className="bg-zinc-900 border border-gray-800 rounded-2xl p-6 mb-8">

          <h2 className="text-xl text-green-400 mb-4">
            Milestones
          </h2>

          {/* PROGRESS BAR */}
          <div className="mb-6">
            <div className="w-full bg-gray-800 h-2 rounded-full">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-xs text-gray-400 mt-2">
              {completedCount} / {totalCount} completed
            </p>
          </div>

          {/* ADD INPUT */}
          <div className="flex gap-2 mb-4">
            <input
              className="flex-1 p-2 bg-black border border-gray-700 rounded-lg text-sm"
              placeholder="Add milestone..."
              value={milestoneText}
              onChange={(e) => setMilestoneText(e.target.value)}
            />

            <button
              onClick={addMilestone}
              className="bg-green-500 px-4 rounded-lg text-black text-sm hover:bg-green-400 transition"
            >
              Add
            </button>
          </div>

          {/* LIST */}
          {milestones.map((m) => (
            <div
              key={m.id}
              className="flex items-center gap-3 mb-2"
            >
              <input
                type="checkbox"
                checked={m.completed}
                onChange={() => toggleMilestone(m)}
              />

              <span className={`text-sm ${m.completed ? "line-through text-gray-500" : ""}`}>
                {m.title}
              </span>
            </div>
          ))}
        </div>

        {/* COMMENTS */}
        <div className="bg-zinc-900 border border-gray-800 rounded-2xl p-6">

          <h2 className="text-xl text-green-400 mb-4">
            Comments
          </h2>

          {/* COMMENTS LIST */}
          <div className="space-y-2 mb-4">
            {comments.map((c) => (
              <div
                key={c.id}
                className="bg-black border border-gray-800 p-3 rounded-lg"
              >
                <p className="text-green-400 text-xs">{c.userEmail}</p>
                <p className="text-gray-300 text-sm">{c.text}</p>
              </div>
            ))}
          </div>

          {/* INPUT */}
          <input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-2 bg-black border border-gray-700 rounded-lg text-sm"
          />

          <button
            onClick={handleComment}
            className="mt-3 bg-green-500 px-4 py-1 rounded-lg text-black text-sm hover:bg-green-400 transition"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProjectDetails;