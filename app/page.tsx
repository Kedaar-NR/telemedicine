"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Dashboard } from "@/components/dashboard";
import { ScheduleView } from "@/components/schedule-view";
import { SignInPage } from "@/components/signin-page";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const [activeView, setActiveView] = useState("dashboard");

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }
  if (!session) {
    return <SignInPage />;
  }

  const user = session.user
    ? {
        name: session.user.name || session.user.email?.split("@")[0] || "User",
        initials: session.user.name
          ? session.user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
          : session.user.email?.slice(0, 2).toUpperCase() || "YC",
      }
    : null;

  const handleSignOut = () => {
    signOut();
    setActiveView("dashboard");
  };

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "schedule":
        return <ScheduleView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        user={user}
        onSignOut={handleSignOut}
      />
      <main className="flex-1 overflow-hidden">{renderContent()}</main>
    </div>
  );
}
