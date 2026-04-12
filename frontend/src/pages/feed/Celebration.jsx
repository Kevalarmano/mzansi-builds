import { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { motion } from "framer-motion";

function Celebration() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "projects"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(data);
    });

    return () => unsubscribe();
  }, []);

  const completed = projects.filter(p => p.status === "completed");

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold mb-8 text-green-400">
        Celebration Wall
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {completed.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-br from-[#0f0f0f] to-green-900/10 border border-green-500/20 rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-lg font-semibold text-white">
              {p.title}
            </h2>

            <p className="text-gray-400 text-sm mt-2">
              {p.description}
            </p>

            <div className="mt-4 flex justify-between text-xs">
              <span className="text-green-400">Completed</span>
              <span className="text-gray-500">{p.userEmail}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Celebration;