"use client";
import Task from "./task";

// Interface para Subtask
interface SubtaskType {
  label: string;
  isChecked: boolean;
}

// Interface para uma Tarefa
interface TaskType {
  title: string;
  taskId: string;
  subtasks: SubtaskType[];
}

// Interface para as props do TaskManager
interface TaskManagerProps {
  tasks: TaskType[];
}

export default function TaskManager({ tasks }: TaskManagerProps) {
  return (
    <div className="w-full max-w-lg p-4">
      {tasks.map((task) => (
        <Task
          key={task.taskId}
          title={task.title}
          taskId={task.taskId}
          subtasks={task.subtasks}
        />
      ))}
    </div>
  );
}
