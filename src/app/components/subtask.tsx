"use client";
import { useState } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { firestore } from "../connection/firebaseConfig";

interface SubtaskProps {
  label: string;
  isChecked: boolean;
  onEdit: () => void;
  onDelete: () => void;
  taskId: string;
  index: number;
}

interface SubtaskType {
  label: string;
  isChecked: boolean;
}

export default function Subtask({
  label,
  isChecked,
  onEdit,
  onDelete,
  taskId,
  index,
}: SubtaskProps) {
  const [checked, setChecked] = useState(isChecked);

  // Função para alternar o estado do checkbox
  const toggleCheckbox = async () => {
    try {
      const newChecked = !checked;
      setChecked(newChecked);

      // Referência ao documento da tarefa
      const taskRef = doc(firestore, "tasks", taskId);

      // Obter o documento da tarefa
      const taskSnap = await getDoc(taskRef);

      // Verificar se o documento existe
      if (taskSnap.exists()) {
        // Atualizar o estado da subtask
        const subtasks = taskSnap.data()?.subtasks || [];
        const updatedSubtasks = subtasks.map((subtask: SubtaskType, idx: number) =>
          idx === index ? { ...subtask, isChecked: newChecked } : subtask
        );

        // Persistindo no Firestore
        await updateDoc(taskRef, { subtasks: updatedSubtasks });
      } else {
        console.error("Documento não encontrado!");
      }
    } catch (error) {
      console.error("Erro ao atualizar checkbox da subtask:", error);
    }
  };

  return (
    <div className="flex justify-between items-center p-2 mt-2 bg-gray-100 rounded shadow-sm">
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={toggleCheckbox}
          className="mr-2"
        />
        {label}
      </label>
      <div className="flex gap-2">
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={onEdit}
        >
          ✏️
        </button>
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={onDelete}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
