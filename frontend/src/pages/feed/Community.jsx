import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../services/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { motion } from "framer-motion";

function Community() {
  const { user } = useContext(AuthContext);
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

  const others = projects.filter(p => p.userId !== user.uid);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold mb-8 text-white">
        Community Builds
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {others.map(p => (
          <motion.div
            key={p.id}
            whileHover={{ scale: 1.02 }}
            className="bg-[#0f0f0f] border border-gray-800 rounded-2xl p-5 hover:border-green-500/40 transition"
          >
            <h2 className="text-lg font-medium">{p.title}</h2>
            <p className="text-gray-400 text-sm mt-2">{p.description}</p>

            <div className="mt-4 flex justify-between text-xs text-gray-500">
              <span>By {p.userEmail}</span>
              <span>{p.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Community;