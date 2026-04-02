import { useState, useContext } from "react";
import { db } from "../../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";

function CreateProject() {
  const { user } = useContext(AuthContext);

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

      alert("Project created!");

      setTitle("");
      setDescription("");
      setStage("");
      setSupportNeeded("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl text-green-500 mb-4">Create Project</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="w-full p-2 mb-2 text-black"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full p-2 mb-2 text-black"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="w-full p-2 mb-2 text-black"
          placeholder="Stage (Idea, MVP, Production)"
          value={stage}
          onChange={(e) => setStage(e.target.value)}
        />

        <input
          className="w-full p-2 mb-2 text-black"
          placeholder="Support Needed"
          value={supportNeeded}
          onChange={(e) => setSupportNeeded(e.target.value)}
        />

        <button className="bg-green-500 px-4 py-2">
          Create Project
        </button>
      </form>
    </div>
  );
}

export default CreateProject;