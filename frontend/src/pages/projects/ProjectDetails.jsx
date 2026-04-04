import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  doc,
  getDocs,
} from "firebase/firestore";

function ProjectDetails() {
  const { id } = useParams();

  const [milestones, setMilestones] = useState([]);
  const [milestoneText, setMilestoneText] = useState("");

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

  const addMilestone = async () => {
    if (!milestoneText) return;

    await addDoc(collection(db, "projects", id, "milestones"), {
      title: milestoneText,
      completed: false,
      createdAt: serverTimestamp(),
    });

    setMilestoneText("");
  };

  const checkIfCompleted = async () => {
    const snapshot = await getDocs(
      collection(db, "projects", id, "milestones")
    );

    const data = snapshot.docs.map((doc) => doc.data());

    if (data.length > 0 && data.every((m) => m.completed)) {
      await updateDoc(doc(db, "projects", id), {
        status: "completed",
      });
    }
  };

  const toggleMilestone = async (milestone) => {
    const ref = doc(db, "projects", id, "milestones", milestone.id);

    await updateDoc(ref, {
      completed: !milestone.completed,
    });

    await checkIfCompleted();
  };

  const completedCount = milestones.filter((m) => m.completed).length;
  const progress =
    milestones.length === 0
      ? 0
      : Math.round((completedCount / milestones.length) * 100);

  return (
    <div className="min-h-screen bg-black text-white flex justify-center px-4 py-10">
      <div className="w-full max-w-3xl">

        {/* HEADER */}
        <h1 className="text-4xl font-bold text-green-500 mb-6 text-center">
          Project Progress 🚀
        </h1>

        {/* PROGRESS BAR */}
        <div className="mb-8">
          <div className="bg-gray-800 h-5 rounded-full overflow-hidden">
            <div
              className="bg-green-500 h-5 transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-center text-sm mt-2 text-gray-400">
            {progress}% completed
          </p>
        </div>

        {/* ADD MILESTONE CARD */}
        <div className="bg-gray-900 border border-green-500/20 p-4 rounded-xl shadow-lg mb-6">
          <h2 className="text-lg text-green-400 mb-3">Add Milestone</h2>

          <div className="flex gap-2">
            <input
              className="flex-1 p-3 rounded bg-black text-white border border-gray-700 focus:border-green-500 outline-none"
              placeholder="e.g. Build login system"
              value={milestoneText}
              onChange={(e) => setMilestoneText(e.target.value)}
            />

            <button
              onClick={addMilestone}
              className="bg-green-500 px-5 py-2 rounded hover:bg-green-600 transition font-semibold"
            >
              Add
            </button>
          </div>
        </div>

        {/* MILESTONE LIST */}
        {milestones.length === 0 ? (
          <p className="text-center text-gray-500">
            No milestones yet — start building 🔥
          </p>
        ) : (
          milestones.map((m) => (
            <div
              key={m.id}
              className="flex items-center gap-3 mb-3 p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-green-500/40 transition"
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
                <span className="text-green-500 text-sm">
                  ✔ Done
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;