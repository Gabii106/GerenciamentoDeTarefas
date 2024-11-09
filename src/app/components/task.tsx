"use client";
import { useState } from "react";
import Subtask from "./subtask";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { firestore } from "../connection/firebaseConfig";

// Interface para Subtask
interface SubtaskType {
  label: string;
  isChecked: boolean;
}

// Interface para as props de Task
interface TaskProps {
  title: string;
  taskId: string;
  subtasks: SubtaskType[];
  fetchTasks: () => void; // Função para recarregar as tarefas
}

export default function Task({ title, taskId, subtasks, fetchTasks }: TaskProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [newSubtask, setNewSubtask] = useState(""); // Campo para adicionar nova subtask
  const [localSubtasks, setLocalSubtasks] = useState<SubtaskType[]>(subtasks); // Subtasks locais para evitar reload imediato

  // Função para calcular o progresso com base nas subtarefas
  const updateProgress = (isChecked: boolean) => {
    const completedCount = localSubtasks.filter((subtask) => subtask.isChecked || subtask.isChecked === isChecked).length;
    const newProgress = Math.round((completedCount / localSubtasks.length) * 100);
    setProgress(newProgress);
    saveTaskProgress(newProgress);
  };

  // Salva o progresso da tarefa no Firestore
  const saveTaskProgress = async (newProgress: number) => {
    const taskRef = doc(firestore, "tasks", taskId);
    await updateDoc(taskRef, { progress: newProgress });
  };

  // Função para adicionar uma nova subtask
  const addSubtask = async () => {
    if (newSubtask.trim() === "") {
      alert("Por favor, insira o título da subtask.");
      return;
    }

    const updatedSubtasks = [
      ...localSubtasks,
      { label: newSubtask, isChecked: false },
    ];

    try {
      const taskRef = doc(firestore, "tasks", taskId);
      await updateDoc(taskRef, { subtasks: updatedSubtasks });
      setLocalSubtasks(updatedSubtasks);
      setNewSubtask(""); // Limpa o campo de input após adicionar
      fetchTasks();
      alert("Subtask adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar subtask:", error);
      alert("Erro ao adicionar a subtask.");
    }
  };

  // Função para salvar uma edição de subtask
  const editSubtask = async (index: number, newLabel: string) => {
    const updatedSubtasks = localSubtasks.map((subtask, idx) =>
      idx === index ? { ...subtask, label: newLabel } : subtask
    );

    try {
      const taskRef = doc(firestore, "tasks", taskId);
      await updateDoc(taskRef, { subtasks: updatedSubtasks });
      setLocalSubtasks(updatedSubtasks);
      fetchTasks();
    } catch (error) {
      console.error("Erro ao editar subtask:", error);
      alert("Erro ao editar a subtask.");
    }
  };

  // Função para deletar uma subtask
  const deleteSubtask = async (index: number) => {
    const updatedSubtasks = localSubtasks.filter((_, idx) => idx !== index);

    try {
      const taskRef = doc(firestore, "tasks", taskId);
      await updateDoc(taskRef, { subtasks: updatedSubtasks });
      setLocalSubtasks(updatedSubtasks);
      updateProgress(false);
      fetchTasks();
    } catch (error) {
      console.error("Erro ao deletar subtask:", error);
      alert("Erro ao deletar a subtask.");
    }
  };

  // Função para excluir a tarefa
  const deleteTask = async () => {
    try {
      const taskRef = doc(firestore, "tasks", taskId);
      await deleteDoc(taskRef);
      fetchTasks();
      alert("Tarefa excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir a tarefa:", error);
      alert("Erro ao excluir a tarefa.");
    }
  };

  // Função para atualizar o título da tarefa
  const updateTask = async () => {
    const newTitle = prompt("Digite o novo título da tarefa:", title);
    if (newTitle && newTitle !== title) {
      const taskRef = doc(firestore, "tasks", taskId);
      await updateDoc(taskRef, { title: newTitle });
      fetchTasks();
      alert("Tarefa atualizada com sucesso!");
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md mb-4 w-full">
      <div className="flex justify-between items-center cursor-pointer pb-2 border-b-2">
        <div
          className={`flex justify-between w-full ${
            progress === 100
              ? "text-green-500"
              : progress > 0
              ? "text-yellow-500"
              : "text-gray-500"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{title}</span>
          <span>{progress}%</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={updateTask}
            title="Editar Tarefa"
          >
            ✏️
          </button>
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={deleteTask}
            title="Excluir Tarefa"
          >
            🗑️
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4">
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              placeholder="Adicionar nova subtask"
              className="border rounded p-2 w-full"
            />
            <button
              onClick={addSubtask}
              className="bg-blue-500 text-white rounded p-2 hover:bg-blue-700"
            >
              Adicionar
            </button>
          </div>

          {localSubtasks.map((subtask, index) => (
            <Subtask
              key={index}
              label={subtask.label}
              isChecked={subtask.isChecked}
              updateProgress={() => updateProgress(subtask.isChecked)}
              onEdit={() => editSubtask(index, prompt("Editar Subtask", subtask.label) || subtask.label)}
              onDelete={() => deleteSubtask(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
