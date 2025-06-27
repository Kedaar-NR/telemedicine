"use client"

import { useState } from "react"
import { signOut } from "next-auth/react"
import { Home, Calendar, LogOut } from "lucide-react"

interface HeaderProps {
  activeView: "dashboard" | "schedule"
  onViewChange: (view: "dashboard" | "schedule") => void
}

export function Header({ activeView, onViewChange }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleSignOut = () => {
    signOut({ redirect: true, callbackUrl: "/" })
  }

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-12">
          {/* REIA Logo */}
          <div className="text-2xl font-bold text-black">REIA</div>

          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            <button
              onClick={() => onViewChange("dashboard")}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-colors ${
                activeView === "dashboard"
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => onViewChange("schedule")}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-colors ${
                activeView === "schedule"
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span>Schedule</span>
            </button>
          </nav>
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
          >
            <span className="text-sm font-semibold text-gray-700">YC</span>
          </button>

          {/* User dropdown menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">Dr. Smith</p>
                <p className="text-sm text-gray-500">doctor@reia.com</p>
              </div>
              <button
                onClick={() => {
                  setShowUserMenu(false)
                  handleSignOut()
                }}
                className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
