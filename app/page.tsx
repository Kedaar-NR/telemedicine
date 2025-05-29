"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { PatientList } from "@/components/patient-list";
import { Calendar } from "@/components/calendar-view";
import { PatientProfile } from "@/components/PatientProfile";
import { mockPatients } from "@/lib/mockData";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [activeView, setActiveView] = useState("patient-list");
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    null
  );
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // For Exercise History page: patient selector
  const handleSelectPatientForExercise = (patientId: string) => {
    setSelectedPatientId(patientId);
  };
  const handleBackToPatientSelector = () => {
    setSelectedPatientId(null);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login: accept any non-empty email/password
    if (email && password) {
      setLoggedIn(true);
      setError("");
    } else {
      setError("Please enter email and password.");
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case "patient-list":
        return <PatientList onShowPatientProfile={setSelectedPatientId} />;
      case "exercise-history":
        if (!selectedPatientId) {
          return (
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4">
                Exercise History: Select a Patient
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockPatients.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white rounded-xl shadow p-6 flex flex-col items-start border border-gray-200"
                  >
                    <div className="font-semibold text-lg mb-1">{p.name}</div>
                    <div className="text-gray-500 text-sm mb-2">
                      MRN: {p.mrn}
                    </div>
                    <div className="text-gray-500 text-sm mb-2">
                      DOB: {p.dob}
                    </div>
                    <div className="text-gray-500 text-sm mb-4">
                      Diagnosis: {p.diagnosis}
                    </div>
                    <Button
                      variant="secondary"
                      onClick={() => handleSelectPatientForExercise(p.id)}
                      className="mt-auto"
                    >
                      View Report
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          );
        }
        return (
          <PatientProfile
            patientId={selectedPatientId}
            onBack={handleBackToPatientSelector}
          />
        );
      case "calendar":
        return <Calendar />;
      default:
        return <PatientList onShowPatientProfile={setSelectedPatientId} />;
    }
  };

  if (!loggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col gap-6"
        >
          <h2 className="text-2xl font-bold text-center mb-2">
            Sign in to Dashboard
          </h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-md py-2 font-semibold hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 overflow-hidden">{renderContent()}</main>
    </div>
  );
}
