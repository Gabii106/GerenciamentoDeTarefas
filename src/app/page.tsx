"use client";
import Navbar from './components/navbar';
import TaskManager from './components/taskmanager';
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, DocumentData } from "firebase/firestore";
import TaskForm from './components/taskform';
import { firestore } from './connection/firebaseConfig';
import { useAuth } from './hooks/userAuth';
import { redirect } from 'next/navigation';

interface SubtaskType {
  label: string;
  isChecked: boolean;
}

interface TaskType {
  title: string;
  taskId: string;
  subtasks: SubtaskType[];
}

export default function Home() {
  const { user, loading } = useAuth();
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Redireciona se o usuário não estiver logado
  useEffect(() => {
    if (!loading && !user) {
      redirect('/login');
    }
  }, [user, loading]);

  const fetchTasks = async () => {
    try {
      const tasksCollection = collection(firestore, "tasks");
      const taskSnapshot = await getDocs(tasksCollection);
      const taskList = taskSnapshot.docs.map((doc: DocumentData) => ({
        taskId: doc.id,
        title: doc.data().title,
        subtasks: doc.data().subtasks || []
      })) as TaskType[];

      setTasks(taskList);
    } catch (error) {
      console.error("Erro ao buscar tarefas do Firestore:", error);
    }
  };

  const addTask = async (title: string, subtasks: string[]) => {
    try {
      const newTask = {
        title,
        subtasks: subtasks.map(label => ({ label, isChecked: false })),
      };
      const taskDoc = await addDoc(collection(firestore, "tasks"), newTask);
      setTasks((prevTasks) => [
        ...prevTasks, 
        { ...newTask, taskId: taskDoc.id }
      ]);
    } catch (error) {
      console.error("Erro ao adicionar nova tarefa:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar openForm={() => setIsFormOpen(true)} />
      <main className="flex flex-col items-center py-4">
        <TaskManager tasks={tasks} />
      </main>
      {isFormOpen && (
        <TaskForm 
          onSubmit={addTask} 
          onClose={() => setIsFormOpen(false)} 
        />
      )}
    </div>
  );
}
