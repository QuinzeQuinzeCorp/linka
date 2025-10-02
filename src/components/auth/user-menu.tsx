"use client";

import { useAuth } from "../auth-provider";

export function UserMenu() {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">
            {(user.name || user.email).charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">
            {user.name || user.email}
          </span>
          <span className="text-xs text-gray-500">
            Connecté
          </span>
        </div>
      </div>

      <button
        onClick={() => signOut()}
        className="text-sm text-gray-600 hover:text-gray-800 px-3 py-1 rounded-md hover:bg-gray-100 transition-colors"
      >
        Déconnexion
      </button>
    </div>
  );
}
