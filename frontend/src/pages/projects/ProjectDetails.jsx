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

  // 🔁 FETCH MILESTONES
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

  // ➕ ADD MILESTONE
  const addMilestone = async () => {
    if (!milestoneText) return;

    await addDoc(collection(db, "projects", id, "milestones"), {
      title: milestoneText,
      completed: false,
      createdAt: serverTimestamp(),
    });

    setMilestoneText("");
  };

  // 🔥 AUTO COMPLETE PROJECT
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

  // ✅ TOGGLE COMPLETE
  const toggleMilestone = async (milestone) => {
    const ref = doc(db, "projects", id, "milestones", milestone.id);

    await updateDoc(ref, {
      completed: !milestone.completed,
    });

    await checkIfCompleted(); // 🔥 KEY FEATURE
  };

  // 📊 PROGRESS %
  const completedCount = milestones.filter((m) => m.completed).length;
  const progress =
    milestones.length === 0
      ? 0
      : Math.round((completedCount / milestones.length) * 100);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-green-500 mb-6">
        Project Progress 🚀
      </h1>

      {/* 📊 PROGRESS BAR */}
      <div className="mb-6">
        <div className="bg-gray-700 h-4 rounded">
          <div
            className="bg-green-500 h-4 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm mt-2 text-gray-400">
          {progress}% completed
        </p>
      </div>

      {/* ➕ ADD MILESTONE */}
      <div className="mb-6 flex gap-2">
        <input
          className="p-2 text-black flex-1 rounded"
          placeholder="New milestone..."
          value={milestoneText}
          onChange={(e) => setMilestoneText(e.target.value)}
        />

        <button
          onClick={addMilestone}
          className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Add
        </button>
      </div>

      {/* 📋 LIST */}
      {milestones.length === 0 ? (
        <p className="text-gray-400">No milestones yet</p>
      ) : (
        milestones.map((m) => (
          <div
            key={m.id}
            className="mb-3 flex items-center gap-3 p-3 bg-gray-900 rounded shadow"
          >
            <input
              type="checkbox"
              checked={m.completed}
              onChange={() => toggleMilestone(m)}
            />

            <span
              className={`flex-1 ${
                m.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {m.title}
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default ProjectDetails;