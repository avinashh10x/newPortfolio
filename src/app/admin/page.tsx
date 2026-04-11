"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginScreen from "./_components/LoginScreen";
import Dashboard from "./_components/Dashboard";

export default function AdminPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Fast login via localStorage to skip loader
    if (localStorage.getItem("adminAuth") === "true") {
      setAuthenticated(true);
    }
    
    // Background validation of cookie
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/admin/projects");
        if (res.ok) {
           // still valid
          setAuthenticated(true);
          localStorage.setItem("adminAuth", "true");
        } else {
           // cookie expired or invalid
          setAuthenticated(false);
          localStorage.removeItem("adminAuth");
        }
      } catch {
        if (authenticated === null) {
          setAuthenticated(false);
        }
      }
    };

    checkAuth();
  }, []);

  // Avoid hydrating mismatch on very first render
  if (authenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-6 h-6 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!authenticated) {
    return <LoginScreen onLogin={() => {
      localStorage.setItem("adminAuth", "true");
      setAuthenticated(true);
    }} />;
  }

  return <Dashboard onLogout={() => {
    localStorage.removeItem("adminAuth");
    setAuthenticated(false);
    router.push("/");
  }} />;
}

