"use client";
import { useState } from 'react';
import Subtask from './subtask';

export default function Task({ title, tasks }) {
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggleTaskList = () => {
    setIsOpen(!isOpen);
  };

  const updateProgress = () => {
    const checkedCount = tasks.filter((_, index) => subtasksStatus[index]).length;
    setProgress(Math.round((checkedCount / tasks.length) * 100));
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md mb-4 w-full">
      <div
        className={`flex justify-between items-center cursor-pointer pb-2 border-b-2 ${progress === 100 ? 'text-green-500' : progress > 0 ? 'text-yellow-500' : 'text-gray-500'}`}
        onClick={toggleTaskList}
      >
        <span>{title}</span>
        <span>{progress}%</span>
      </div>
      {isOpen && (
        <div className="mt-2">
          {tasks.map((task, index) => (
            <Subtask key={index} label={task} updateProgress={updateProgress} />
          ))}
          <div className="flex justify-end gap-2 mt-2">
            <button className="text-blue-500 hover:text-blue-700">➕</button>
            <button className="text-blue-500 hover:text-blue-700">✏️</button>
            <button className="text-blue-500 hover:text-blue-700">🗑️</button>
          </div>
        </div>
      )}
    </div>
  );
}
