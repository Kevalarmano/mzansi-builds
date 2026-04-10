import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [milestones, setMilestones] = useState([]);
  const [milestoneText, setMilestoneText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = collection(db, "projects", id, "milestones");

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMilestones(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  // Add milestone
  const addMilestone = async () => {
    if (!milestoneText.trim()) return;

    await addDoc(collection(db, "projects", id, "milestones"), {
      title: milestoneText.trim(),
      completed: false,
      createdAt: serverTimestamp(),
    });

    setMilestoneText("");
  };

  // Toggle + smart completion check (NO extra reads)
  const toggleMilestone = async (milestone) => {
    const ref = doc(db, "projects", id, "milestones", milestone.id);

    const updatedStatus = !milestone.completed;

    await updateDoc(ref, {
      completed: updatedStatus,
    });

    // Check completion locally (fast + efficient)
    const updatedMilestones = milestones.map((m) =>
      m.id === milestone.id ? { ...m, completed: updatedStatus } : m
    );

    const allDone =
      updatedMilestones.length > 0 &&
      updatedMilestones.every((m) => m.completed);

    if (allDone) {
      await updateDoc(doc(db, "projects", id), {
        status: "completed",
      });
    }
  };

  const completedCount = milestones.filter((m) => m.completed).length;
  const progress =
    milestones.length === 0
      ? 0
      : Math.round((completedCount / milestones.length) * 100);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 flex justify-center">
      <div className="w-full max-w-3xl">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-400 hover:text-green-400 transition"
          >
            ← Back
          </button>

          <h1 className="text-2xl md:text-3xl font-bold text-green-500">
            Project Progress
          </h1>

          <div className="w-12" />
        </div>

        {/* PROGRESS */}
        <div className="bg-zinc-900 border border-green-500/20 p-5 rounded-2xl shadow-[0_0_15px_rgba(34,197,94,0.15)] mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Completion</span>
            <span>{progress}%</span>
          </div>

          <div className="bg-gray-800 h-4 rounded-full overflow-hidden">
            <div
              className="bg-green-500 h-4 transition-all duration-700 ease-out shadow-[0_0_12px_#22c55e]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* ADD MILESTONE */}
        <div className="bg-zinc-900 border border-green-500/20 p-4 rounded-2xl mb-6">
          <h2 className="text-green-400 mb-3 text-sm uppercase tracking-wide">
            Add Milestone
          </h2>

          <div className="flex gap-2">
            <input
              className="flex-1 p-3 rounded-lg bg-black border border-gray-700 focus:border-green-500 outline-none transition"
              placeholder="Build authentication system..."
              value={milestoneText}
              onChange={(e) => setMilestoneText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addMilestone()}
            />

            <button
              onClick={addMilestone}
              disabled={!milestoneText.trim()}
              className={`px-5 rounded-lg font-semibold transition ${
                milestoneText.trim()
                  ? "bg-green-500 hover:bg-green-600 shadow-[0_0_10px_#22c55e]"
                  : "bg-gray-700 cursor-not-allowed"
              }`}
            >
              Add
            </button>
          </div>
        </div>

        {/* CONTENT */}
        {loading ? (
          <p className="text-center text-gray-500 mt-10">Loading...</p>
        ) : milestones.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            <p className="text-lg">No milestones yet</p>
            <p className="text-sm mt-2">Start building something great.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {milestones.map((m) => (
              <div
                key={m.id}
                className={`flex items-center gap-3 p-4 rounded-xl border transition ${
                  m.completed
                    ? "bg-green-900/10 border-green-500/30"
                    : "bg-zinc-900 border-gray-800 hover:border-green-500/40"
                }`}
              >
                <input
                  type="checkbox"
                  checked={m.completed}
                  onChange={() => toggleMilestone(m)}
                  className="w-5 h-5 accent-green-500"
                />

                <span
                  className={`flex-1 ${
                    m.completed
                      ? "line-through text-gray-500"
                      : "text-white"
                  }`}
                >
                  {m.title}
                </span>

                {m.completed && (
                  <span className="text-green-400 text-xs font-semibold">
                    DONE
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;