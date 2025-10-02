"use client";

import { useAuth } from "@/components/auth-provider";
import { AuthModal } from "@/components/auth/auth-modal";
import { UserMenu } from "@/components/auth/user-menu";
import { useEffect, useState } from "react";

export default function Home() {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (user && showAuthModal) {
      setShowAuthModal(false);
    }
  }, [user, showAuthModal]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white/80 shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Linka
              </h1>
            </div>

            {user ? (
              <UserMenu />
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="btn-primary"
              >
                Se connecter
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Partagez votre musique avec vos amis
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Ajoutez vos chansons favorites et partagez-les avec votre communauté.
            Spotify, YouTube, Deezer... Tout est supporté !
          </p>

          {user ? (
            <div className="card max-w-2xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">✓</span>
                </div>
                <h3 className="text-2xl font-semibold mb-4">
                  Bienvenue, {user.name || user.email} !
                </h3>
                <p className="text-gray-600 mb-6">
                  Vous êtes maintenant connecté. Bientôt, vous pourrez ajouter vos chansons favorites !
                </p>
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  🎉 Connexion réussie ! L'authentification fonctionne parfaitement.
                </div>
              </div>
            </div>
          ) : (
            <div className="card max-w-2xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🎵</span>
                </div>
                <h3 className="text-2xl font-semibold mb-4">
                  Commencez votre voyage musical
                </h3>
                <p className="text-gray-600 mb-6">
                  Connectez-vous pour commencer à partager vos chansons favorites
                </p>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="btn-primary text-lg px-8 py-3"
                >
                  Commencer
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {showAuthModal && (
        <AuthModal />
      )}
    </div>
  );
}
