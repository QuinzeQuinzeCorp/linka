"use client";

import { authClient } from "@/lib/auth-client";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: any | null;
  session: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, name?: string) => Promise<any>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInitialSession = async () => {
      try {
        const { data } = await authClient.getSession();
        if (data) {
          setUser(data.user);
          setSession(data);
        }
      } catch (error) {
        console.error("Error getting session:", error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    const result = await authClient.signIn.email({
      email,
      password,
    });

    if (result.data) {
      setUser(result.data.user);
      setSession(result.data);
    }

    return result;
  };

  const signUp = async (email: string, password: string, name?: string) => {
    const result = await authClient.signUp.email({
      email,
      password,
      name: name || "",
    });

    if (result.data) {
      setUser(result.data.user);
      setSession(result.data);
    }

    return result;
  };

  const signOut = async () => {
    await authClient.signOut();
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
