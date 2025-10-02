"use client";

import { useState } from "react";
import { SignInForm } from "./sign-in-form";
import { SignUpForm } from "./sign-up-form";

export function AuthModal() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 p-1 rounded-lg flex">
            <button
              onClick={() => setIsSignUp(false)}
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                !isSignUp
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                isSignUp
                  ? "bg-white text-green-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Inscription
            </button>
          </div>
        </div>

        {isSignUp ? <SignUpForm /> : <SignInForm />}
      </div>
    </div>
  );
}
