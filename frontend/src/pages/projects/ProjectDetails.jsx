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

  // ✅ TOGGLE COMPLETE
  const toggleMilestone = async (milestone) => {
    const ref = doc(db, "projects", id, "milestones", milestone.id);

    await updateDoc(ref, {
      completed: !milestone.completed,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl text-green-500 mb-4">Project Milestones</h1>

      {/* ADD MILESTONE */}
      <div className="mb-4">
        <input
          className="p-2 text-black mr-2"
          placeholder="New milestone..."
          value={milestoneText}
          onChange={(e) => setMilestoneText(e.target.value)}
        />

        <button onClick={addMilestone} className="bg-green-500 px-4 py-2">
          Add
        </button>
      </div>

      {/* LIST */}
      {milestones.map((m) => (
        <div key={m.id} className="mb-2 flex items-center gap-3">
          <input
            type="checkbox"
            checked={m.completed}
            onChange={() => toggleMilestone(m)}
          />

          <span className={m.completed ? "line-through" : ""}>
            {m.title}
          </span>
        </div>
      ))}
    </div>
  );
}

export default ProjectDetails;