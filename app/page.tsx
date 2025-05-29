"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { PatientList } from "@/components/patient-list";
import { Calendar } from "@/components/calendar-view";
import { PatientProfile } from "@/components/PatientProfile";
import { mockPatients } from "@/lib/mockData";

export default function Home() {
  const [activeView, setActiveView] = useState("patient-list");
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    null
  );

  // For Exercise History page: patient selector
  const handleSelectPatientForExercise = (patientId: string) => {
    setSelectedPatientId(patientId);
  };
  const handleBackToPatientSelector = () => {
    setSelectedPatientId(null);
  };

  const renderContent = () => {
    switch (activeView) {
      case "patient-list":
        return <PatientList onShowPatientProfile={setSelectedPatientId} />;
      case "exercise-history":
        if (!selectedPatientId) {
          return (
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4">Select a Patient</h2>
              <ul className="space-y-2">
                {mockPatients.map((p) => (
                  <li key={p.id}>
                    <button
                      className="text-blue-600 underline text-lg"
                      onClick={() => handleSelectPatientForExercise(p.id)}
                    >
                      {p.name}
                    </button>
                  </li>
                ))}
              </ul>
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

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 overflow-hidden">{renderContent()}</main>
    </div>
  );
}
