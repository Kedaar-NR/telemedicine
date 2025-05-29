"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { PatientDashboard } from "@/components/patient-dashboard";
import { PatientList } from "@/components/patient-list";
import { Calendar } from "@/components/calendar-view";
import { PatientProfile } from "@/components/PatientProfile";

export default function Home() {
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    null
  );

  const handleShowPatientProfile = (patientId: string) => {
    setSelectedPatientId(patientId);
    setActiveView("patient-profile");
  };

  const handleBackToList = () => {
    setSelectedPatientId(null);
    setActiveView("patient-list");
  };

  const renderContent = () => {
    if (activeView === "patient-profile" && selectedPatientId) {
      return (
        <PatientProfile
          patientId={selectedPatientId}
          onBack={handleBackToList}
        />
      );
    }
    switch (activeView) {
      case "dashboard":
        return (
          <PatientDashboard onShowPatientProfile={handleShowPatientProfile} />
        );
      case "patient-list":
        return <PatientList onShowPatientProfile={handleShowPatientProfile} />;
      case "calendar":
        return <Calendar />;
      default:
        return (
          <PatientDashboard onShowPatientProfile={handleShowPatientProfile} />
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 overflow-hidden">{renderContent()}</main>
    </div>
  );
}
