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

export default function Task({
  title,
  taskId,
  subtasks,
  fetchTasks,
}: TaskProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  // Função para calcular o progresso com base nas subtarefas
  const updateProgress = (isChecked: boolean) => {
    const completedCount = subtasks.filter(
      (subtask) => subtask.isChecked || subtask.isChecked === isChecked
    ).length;
    const newProgress = Math.round((completedCount / subtasks.length) * 100);
    setProgress(newProgress);
    saveTaskProgress(newProgress); // Salva o progresso atualizado no Firestore
  };

  // Salva o progresso da tarefa no Firestore
  const saveTaskProgress = async (newProgress: number) => {
    const taskRef = doc(firestore, "tasks", taskId);
    await updateDoc(taskRef, { progress: newProgress });
  };

  // Função para adicionar uma nova subtask
  const addSubtask = async () => {
    const newLabel = prompt("Digite o título da nova Subtask:");
    if (newLabel) {
      const taskRef = doc(firestore, "tasks", taskId);
      const updatedSubtasks = [
        ...subtasks,
        { label: newLabel, isChecked: false },
      ];
      await updateDoc(taskRef, { subtasks: updatedSubtasks });
      fetchTasks(); // Recarrega as tarefas após adicionar a subtask
      alert("Subtask adicionada com sucesso!");
    }
  };

  // Função para salvar uma edição de subtask
  const editSubtask = async (index: number, newLabel: string) => {
    const taskRef = doc(firestore, "tasks", taskId);
    const updatedTasks = subtasks.map((subtask, idx) =>
      idx === index ? { ...subtask, label: newLabel } : subtask
    );
    await updateDoc(taskRef, { subtasks: updatedTasks });
    fetchTasks(); // Recarrega as tarefas após a atualização
  };

  // Função para deletar uma subtask
  const deleteSubtask = async (index: number) => {
    const taskRef = doc(firestore, "tasks", taskId);
    const updatedTasks = subtasks.filter((_, idx) => idx !== index);
    await updateDoc(taskRef, { subtasks: updatedTasks });
    updateProgress(false); // Atualiza o progresso após a exclusão
    fetchTasks(); // Recarrega as tarefas após a exclusão da subtask
  };

  // Função para excluir a tarefa
  const deleteTask = async () => {
    try {
      const taskRef = doc(firestore, "tasks", taskId);
      await deleteDoc(taskRef); // Exclui a tarefa do Firestore
      fetchTasks(); // Recarrega as tarefas após a exclusão
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
      await updateDoc(taskRef, { title: newTitle }); // Atualiza o título da tarefa no Firestore
      fetchTasks(); // Recarrega as tarefas após a atualização
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
        {/* Botões de Atualizar e Excluir */}
        <div className="flex items-center">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={addSubtask}
            title="Adicionar Subtask"
          >
            ➕
          </button>
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={updateTask}
          >
            ✏️
          </button>
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={deleteTask}
          >
            🗑️
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="mt-2">
          {subtasks.map((subtask, index) => (
            <Subtask
              key={index}
              label={subtask.label}
              isChecked={subtask.isChecked}
              updateProgress={() => updateProgress(subtask.isChecked)}
              onEdit={() =>
                editSubtask(
                  index,
                  prompt("Editar Subtask", subtask.label) || subtask.label
                )
              }
              onDelete={() => deleteSubtask(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
