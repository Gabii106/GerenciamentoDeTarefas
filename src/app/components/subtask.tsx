"use client";
import { useState } from "react";

interface SubtaskProps {
  label: string;
  isChecked: boolean;
  updateProgress: (isChecked: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function Subtask({ label, isChecked, updateProgress, onEdit, onDelete } : SubtaskProps) {
  const [checked, setChecked] = useState(isChecked);

  const toggleCheckbox = () => {
    setChecked(!checked);
    updateProgress(!checked); // Passa o novo estado para o cálculo correto do progresso
  };

  return (
    <div className="flex justify-between items-center p-2 mt-2 bg-gray-100 rounded shadow-sm">
      <label className="flex items-center">
        <input type="checkbox" checked={checked} onChange={toggleCheckbox} className="mr-2" />
        {label}
      </label>
      <div className="flex gap-2">
        <button className="text-blue-500 hover:text-blue-700" onClick={onEdit}>✏️</button>
        <button className="text-blue-500 hover:text-blue-700" onClick={onDelete}>🗑️</button>
      </div>
    </div>
  );
}
