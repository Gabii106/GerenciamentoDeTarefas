"use client";
import { useState, useEffect } from "react";
import Subtask from "./subtask";
//import { firestore } from "../connection/firebaseConfig";
import { doc, updateDoc, setDoc, arrayUnion, deleteField } from "firebase/firestore";
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
}

export default function Task({ title, taskId, subtasks }: TaskProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  // Função para calcular o progresso com base nas subtarefas
  const updateProgress = (isChecked: boolean) => {
    const completedCount = subtasks.filter((subtask) => subtask.isChecked || subtask.isChecked === isChecked).length;
    const newProgress = Math.round((completedCount / subtasks.length) * 100);
    setProgress(newProgress);
    saveTaskProgress(newProgress); // Salva o progresso atualizado no Firestore
  };

  // Salva o progresso da tarefa no Firestore
  const saveTaskProgress = async (newProgress : number) => {
    const taskRef = doc(firestore, "tasks", taskId);
    await updateDoc(taskRef, { progress: newProgress });
  };

  // Função para salvar uma edição de subtask
  const editSubtask = async (index: number, newLabel: string) => {
    const taskRef = doc(firestore, "tasks", taskId);
    const updatedTasks = subtasks.map((subtask, idx) => idx === index ? { ...subtask, label: newLabel } : subtask);
    await updateDoc(taskRef, { subtasks: updatedTasks });
  };

  // Função para deletar uma subtask
  const deleteSubtask = async (index: number) => {
    const taskRef = doc(firestore, "tasks", taskId);
    const updatedTasks = subtasks.filter((_, idx) => idx !== index);
    await updateDoc(taskRef, { subtasks: updatedTasks });
    updateProgress(false); // Atualiza o progresso após a exclusão
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md mb-4 w-full">
      <div
        className={`flex justify-between items-center cursor-pointer pb-2 border-b-2 ${progress === 100 ? 'text-green-500' : progress > 0 ? 'text-yellow-500' : 'text-gray-500'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <span>{progress}%</span>
      </div>
      {isOpen && (
        <div className="mt-2">
          {subtasks.map((subtask, index) => (
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
