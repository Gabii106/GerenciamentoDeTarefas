"use client";
import { useState } from "react";
import { signOut as signOutAuth } from "firebase/auth";
import { signOut as signOutNextAuth } from "next-auth/react";
import { auth } from '../connection/firebaseConfig';
import { redirect } from 'next/navigation';

interface NavbarProps {
  openForm: () => void;
}

export default function Navbar({ openForm }: NavbarProps) {
  const [showLogout, setShowLogout] = useState(false);

  const toggleLogoutMenu = () => {
    setShowLogout(!showLogout);
  };

  const handleLogout = async () => {
    try {
      // Logout do Firebase
      await signOutAuth(auth);

      // Logout do NextAuth (caso esteja usando NextAuth para login com provedores externos)
      await signOutNextAuth();

      // Redireciona para a página de login usando redirect
      redirect('/login');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50 flex justify-between items-center p-4">
      <span className="text-xl font-bold text-gray-800">Adicionar Tarefa</span>
      <div className="flex items-center relative">
        <button onClick={openForm} className="text-gray-800 text-2xl">➕</button>
        <div
          id="profile"
          className="ml-4 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold cursor-pointer"
          onClick={toggleLogoutMenu}
        >
          U
        </div>

        {showLogout && (
          <div className="absolute right-0 mt-12 w-32 bg-white border rounded-lg shadow-lg">
            <button
              onClick={handleLogout}
              className="w-full text-left p-2 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
