export default function Navbar() {
    return (
      <nav className="w-full bg-white shadow-md sticky top-0 z-50 flex justify-between items-center p-4">
        <span className="text-xl font-bold text-gray-800">Adicionar Tarefa</span>
        <div className="flex items-center">
          <button className="text-gray-800 text-2xl">➕</button>
          <div className="ml-4 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold cursor-pointer">
            U
          </div>
        </div>
      </nav>
    );
  }
  