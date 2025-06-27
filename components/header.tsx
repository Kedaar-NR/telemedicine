"use client";

import React from "react";
import { Home, Calendar, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface HeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
  user: { name: string; initials: string } | null;
  onSignOut: () => void;
}

const Header = React.memo<HeaderProps>(function Header({
  activeView,
  setActiveView,
  user,
  onSignOut,
}) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-12">
          {/* REIA Logo - styled to match the design */}
          <div className="flex items-center">
            <svg
              width="72"
              height="32"
              viewBox="0 0 72 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-auto mr-2"
            >
              <text
                x="0"
                y="24"
                fontFamily="'Inter', sans-serif"
                fontWeight="bold"
                fontSize="28"
                fill="#111"
              >
                REIA
              </text>
            </svg>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            <button
              onClick={() => setActiveView("dashboard")}
              className={`flex items-center space-x-2 px-4 py-2 text-base font-medium transition-colors ${
                activeView === "dashboard"
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveView("schedule")}
              className={`flex items-center space-x-2 px-4 py-2 text-base font-medium transition-colors ${
                activeView === "schedule"
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Calendar className="h-5 w-5" />
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
            <span className="text-sm font-semibold text-gray-700">
              {user?.initials || "YC"}
            </span>
          </button>

          {/* User dropdown menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name || "User"}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  onSignOut();
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
  );
});

export { Header };
