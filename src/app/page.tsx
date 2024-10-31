import Navbar from './components/navbar';
import TaskManager from './components/taskmanager';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex flex-col items-center py-4">
        <TaskManager />
      </main>
    </div>
  );
}
