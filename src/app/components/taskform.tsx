"use client";
import { useState } from 'react';

interface TaskFormProps {
  onSubmit: (title: string, subtasks: string[]) => void;
  onClose: () => void;
}

export default function TaskForm({ onSubmit, onClose }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [subtaskInput, setSubtaskInput] = useState('');
  const [subtasks, setSubtasks] = useState<string[]>([]);

  const handleAddSubtask = () => {
    if (subtaskInput.trim()) {
      setSubtasks((prevSubtasks) => [...prevSubtasks, subtaskInput]);
      setSubtaskInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, subtasks);
    onClose(); // Fecha o formulário após enviar
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md mb-4 w-full">
      <h2 className="text-lg font-bold">Adicionar Tarefa</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="title" className="block">Título da Tarefa:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="subtask" className="block">Adicionar Subtarefa:</label>
          <div className="flex">
            <input
              type="text"
              id="subtask"
              value={subtaskInput}
              onChange={(e) => setSubtaskInput(e.target.value)}
              className="flex-1 border border-gray-300 rounded p-2"
            />
            <button
              type="button"
              onClick={handleAddSubtask}
              className="ml-2 bg-blue-500 text-white rounded p-2"
            >
              Adicionar
            </button>
          </div>
          <ul className="mt-2">
            {subtasks.map((subtask, index) => (
              <li key={index} className="flex justify-between">
                {subtask}
                <button
                  type="button"
                  onClick={() => setSubtasks(subtasks.filter((_, i) => i !== index))}
                  className="text-red-500"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit" className="mt-4 bg-green-500 text-white rounded p-2">
          Salvar Tarefa
        </button>
        <button type="button" onClick={onClose} className="mt-4 ml-2 bg-gray-300 text-black rounded p-2">
          Cancelar
        </button>
      </form>
    </div>
  );
}
