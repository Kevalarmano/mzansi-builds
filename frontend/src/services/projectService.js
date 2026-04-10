import { db } from "./firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// CREATE PROJECT
export const createProject = async (data) => {
  return await addDoc(collection(db, "projects"), {
    ...data,
    createdAt: serverTimestamp(),
  });
};

// ADD COMMENT
export const addComment = async (projectId, text, userEmail) => {
  return await addDoc(
    collection(db, "projects", projectId, "comments"),
    {
      text,
      userEmail,
      createdAt: serverTimestamp(),
    }
  );
};

// EDIT PROJECT
export const editProject = async (projectId, data) => {
  return await updateDoc(doc(db, "projects", projectId), data);
};

// DELETE PROJECT
export const deleteProject = async (projectId) => {
  return await deleteDoc(doc(db, "projects", projectId));
};