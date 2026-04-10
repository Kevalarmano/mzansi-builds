import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { editProject } from "../../services/projectService";

function EditProject() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [title, setTitle] = useState(state.title);
  const [description, setDescription] = useState(state.description);
  const [stage, setStage] = useState(state.stage);
  const [supportNeeded, setSupportNeeded] = useState(state.supportNeeded);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await editProject(state.id, {
      title,
      description,
      stage,
      supportNeeded,
    });

    alert("Project updated!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center px-4 py-10">
      <div className="w-full max-w-2xl">

        {/* 🔙 BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-green-400 hover:underline"
        >
          ← Back
        </button>

        {/* HEADER */}
        <h2 className="text-3xl font-bold text-green-500 mb-6 text-center">
          Edit Project
        </h2>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg"
        >
          <input
            className="w-full p-3 mb-4 bg-black border border-gray-700 rounded text-white focus:border-green-500 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full p-3 mb-4 bg-black border border-gray-700 rounded text-white focus:border-green-500 outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            className="w-full p-3 mb-4 bg-black border border-gray-700 rounded text-white focus:border-green-500 outline-none"
            value={stage}
            onChange={(e) => setStage(e.target.value)}
          />

          <input
            className="w-full p-3 mb-6 bg-black border border-gray-700 rounded text-white focus:border-green-500 outline-none"
            value={supportNeeded}
            onChange={(e) => setSupportNeeded(e.target.value)}
          />

          <button className="w-full bg-green-500 py-3 rounded font-semibold hover:bg-green-600 transition">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProject;