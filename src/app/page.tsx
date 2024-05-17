"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
const HomeSection = dynamic(() => import("@/components/sections/HomeSection"));
const Navbar = dynamic(() => import("@/components/ui/Navbar"));
import ProjectsSection from "@/components/sections/ProjectsSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/ui/Footer";
import ToastList from "@/components/ui/ToastList";

type Toast = {
  id: number;
  message: string;
  type: string;
};

export default function Home() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const position = "top-right";

  const showToast = (message: string, type: string) => {
    const toast: Toast = {
      id: Date.now(),
      message,
      type,
    };

    setToasts((prevToasts) => [...prevToasts, toast]);

    setTimeout(() => {
      removeToast(toast.id);
    }, 4000);
  };

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar />
      <HomeSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection showToast={showToast} removeToast={removeToast} />
      <Footer />
      <ToastList data={toasts} position={position} removeToast={removeToast} />
    </main>
  );
}
