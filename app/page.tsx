"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { SignInPage } from "@/components/signin-page"
import { Header } from "@/components/header"
import { DashboardView } from "@/components/dashboard-view"
import { ScheduleView } from "@/components/schedule-view"

export default function Home() {
  const { data: session, status } = useSession()
  const [activeView, setActiveView] = useState<"dashboard" | "schedule">("dashboard")

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 mb-2">REIA</div>
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    )
  }

  if (!session) {
    return <SignInPage />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeView={activeView} onViewChange={setActiveView} />
      {activeView === "dashboard" ? <DashboardView /> : <ScheduleView />}
    </div>
  )
}
