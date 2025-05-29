"use client"

import { cn } from "@/lib/utils"
import { Calendar, Users, FileText, Pill, Activity, Settings, Home, Search } from "lucide-react"

interface SidebarProps {
  activeView: string
  setActiveView: (view: string) => void
}

export function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Overview", icon: Home },
    { id: "patient-list", label: "Patient List", icon: Users },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "procedures", label: "Procedure Notes", icon: FileText },
    { id: "prescriptions", label: "Routine Prescription", icon: Pill },
    { id: "laboratory", label: "Laboratory", icon: Activity },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">Medical Dashboard</h1>
      </div>

      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search function"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <nav className="flex-1 px-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={cn(
                  "w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  activeView === item.id
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
              </button>
            )
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">JP</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">James P.</p>
            <p className="text-xs text-gray-500">Doctor</p>
          </div>
          <Settings className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </div>
  )
}
