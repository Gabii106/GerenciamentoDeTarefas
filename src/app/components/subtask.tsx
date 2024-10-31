"use client";
import { useState } from 'react';

export default function Subtask({ label, updateProgress }) {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    updateProgress();
  };

  return (
    <div className="flex justify-between items-center p-2 mt-2 bg-gray-100 rounded shadow-sm">
      <label className="flex items-center">
        <input type="checkbox" checked={isChecked} onChange={toggleCheckbox} className="mr-2" />
        {label}
      </label>
      <div className="flex gap-2">
        <button className="text-blue-500 hover:text-blue-700">✏️</button>
        <button className="text-blue-500 hover:text-blue-700">🗑️</button>
      </div>
    </div>
  );
}
