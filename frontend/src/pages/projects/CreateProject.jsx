import { useState, useContext } from "react";
import { db } from "../../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CreateProject() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stage, setStage] = useState("");
  const [supportNeeded, setSupportNeeded] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "projects"), {
        title,
        description,
        stage,
        supportNeeded,
        userId: user.uid,
        userEmail: user.email,
        status: "in-progress",
        createdAt: serverTimestamp(),
      });

      alert("Project created successfully!");

      // Redirect to dashboard
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center px-4 py-10">
      <div className="w-full max-w-2xl">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-green-400 hover:underline"
        >
          ← Back
        </button>

        {/* HEADER */}
        <h2 className="text-3xl font-bold text-green-500 mb-6 text-center">
          Create New Project
        </h2>

        {/* FORM CARD */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg"
        >
          {/* TITLE */}
          <input
            className="w-full p-3 mb-4 rounded bg-black border border-gray-700 text-white focus:border-green-500 outline-none"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* DESCRIPTION */}
          <textarea
            className="w-full p-3 mb-4 rounded bg-black border border-gray-700 text-white focus:border-green-500 outline-none"
            placeholder="Project Description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* STAGE */}
          <input
            className="w-full p-3 mb-4 rounded bg-black border border-gray-700 text-white focus:border-green-500 outline-none"
            placeholder="Stage (Idea, MVP, Production)"
            value={stage}
            onChange={(e) => setStage(e.target.value)}
          />

          {/* SUPPORT */}
          <input
            className="w-full p-3 mb-6 rounded bg-black border border-gray-700 text-white focus:border-green-500 outline-none"
            placeholder="Support Needed (e.g. frontend dev, UI help)"
            value={supportNeeded}
            onChange={(e) => setSupportNeeded(e.target.value)}
          />

          {/* BUTTON */}
          <button
            className="w-full bg-green-500 py-3 rounded font-semibold hover:bg-green-600 transition active:scale-95"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;