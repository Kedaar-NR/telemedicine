import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Star, Search, Filter } from "lucide-react";
import { useState } from "react";

const patients = [
  {
    mrn: "1682230",
    name: "James Miller",
    dob: "03/15/1943 (80 yo)",
    gender: "Male",
    diagnosis: ["Facial drooping", "Arm weakness", "Speech difficulty"],
    strokeOnset: "10/26/2024",
    lastSeen: "2 days ago",
    favorite: true,
  },
  {
    mrn: "1688881",
    name: "James Patelyaha",
    dob: "01/01/1980 (44 yo)",
    gender: "Male - Transgender",
    diagnosis: ["Facial drooping", "Arm weakness", "Speech difficulty"],
    strokeOnset: "10/26/2024",
    lastSeen: "2 days ago",
    favorite: false,
  },
  {
    mrn: "1242024",
    name: "Fatima Hussein",
    dob: "01/10/1974 (50 yo)",
    gender: "Female",
    diagnosis: ["Facial drooping", "Arm weakness", "Speech difficulty"],
    strokeOnset: "10/26/2024",
    lastSeen: "2 days ago",
    favorite: false,
  },
  {
    mrn: "MRN123",
    name: "James Rodriguez",
    dob: "07/22/1978 (46 y.o)",
    gender: "Male",
    diagnosis: "Hypertension",
    recentOrder: "Breast Biopsy",
    orderDate: "05/28/2025",
    status: "Active",
  },
  {
    mrn: "MRN125",
    name: "Fatima Hussein",
    dob: "12/18/1992 (32 y.o)",
    gender: "Female",
    diagnosis: "Breast Biopsy",
    recentOrder: "Breast Biopsy",
    orderDate: "05/27/2025",
    status: "Active",
  },
  {
    mrn: "MRN126",
    name: "David Johnson",
    dob: "09/03/1965 (59 y.o)",
    gender: "Male",
    diagnosis: "Breast Biopsy",
    recentOrder: "Breast Biopsy",
    orderDate: "05/26/2025",
    status: "Active",
  },
  {
    mrn: "MRN127",
    name: "Maria Vargas",
    dob: "04/11/1980 (44 y.o)",
    gender: "Female",
    diagnosis: "Breast Biopsy",
    recentOrder: "Breast Biopsy",
    orderDate: "05/25/2025",
    status: "Active",
  },
];

interface PatientListProps {
  onShowPatientProfile?: (patientId: string) => void;
}

export function PatientList({ onShowPatientProfile }: PatientListProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="flex flex-col md:flex-row h-full bg-[#F6F7F9]">
      {/* Main Table */}
      <div className="flex-1 p-4 md:p-8 overflow-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="grid grid-cols-8 gap-4 text-sm font-medium text-gray-500">
                <div></div>
                <div>MRN</div>
                <div>Name</div>
                <div>Date of Birth</div>
                <div>Gender</div>
                <div>Diagnosis</div>
                <div>Date of Stroke Onset</div>
                <div>Action</div>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {patients.map((patient) => (
                <div key={patient.mrn} className="px-6 py-4 hover:bg-gray-50">
                  <div className="grid grid-cols-8 gap-4 items-center">
                    <div className="flex items-center space-x-2">
                      <Star
                        className={`h-4 w-4 ${
                          patient.favorite ? "text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {patient.mrn}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {patient.name}
                    </div>
                    <div className="text-sm text-gray-600">{patient.dob}</div>
                    <div className="text-sm text-gray-600">
                      {patient.gender}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {(Array.isArray(patient.diagnosis)
                        ? patient.diagnosis
                        : [patient.diagnosis]
                      ).map((d, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {d}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">
                      {patient.strokeOnset}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-green-600">
                        {patient.lastSeen}
                      </span>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-blue-600 p-0"
                        onClick={() =>
                          onShowPatientProfile &&
                          onShowPatientProfile(patient.mrn)
                        }
                      >
                        View More
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar (collapsible) */}
      <div
        className={`w-full md:w-80 bg-white border-l border-gray-200 p-6 min-w-[200px] transition-all duration-200 ${
          sidebarOpen ? "block" : "hidden md:block"
        }`}
      >
        <button
          className="mb-4 text-xs text-blue-600 underline md:hidden"
          onClick={() => setSidebarOpen((v) => !v)}
        >
          {sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
        </button>
        <h3 className="text-lg font-semibold mb-4">Recent Searches</h3>
        <div className="space-y-2 mb-8">
          <div className="text-sm text-blue-600 cursor-pointer hover:underline">
            David Johnson
          </div>
          <div className="text-sm text-blue-600 cursor-pointer hover:underline">
            Aisha Khan
          </div>
          <div className="text-sm text-blue-600 cursor-pointer hover:underline">
            Sophia Martinez
          </div>
          <div className="text-sm text-blue-600 cursor-pointer hover:underline">
            View More
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <div className="space-y-3">
          <div className="flex items-center mb-2">
            <input type="checkbox" className="rounded mr-2" />
            <span>Favorites</span>
          </div>
          <div className="flex items-center mb-2">
            <input type="checkbox" className="rounded mr-2" />
            <span>Assigned to me</span>
          </div>
          <input
            type="text"
            placeholder="Name"
            className="w-full mb-2 p-2 border border-gray-300 rounded-md text-sm"
          />
          <input
            type="text"
            placeholder="MRN"
            className="w-full mb-2 p-2 border border-gray-300 rounded-md text-sm"
          />
          <input
            type="text"
            placeholder="Date of Birth"
            className="w-full mb-2 p-2 border border-gray-300 rounded-md text-sm"
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full mb-2 p-2 border border-gray-300 rounded-md text-sm"
          />
          <input
            type="text"
            placeholder="Address"
            className="w-full mb-2 p-2 border border-gray-300 rounded-md text-sm"
          />
          <Button className="w-full mt-2">Apply</Button>
        </div>
      </div>
      {/* Toggle Sidebar Button for mobile */}
      {!sidebarOpen && (
        <button
          className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          Show Sidebar
        </button>
      )}
    </div>
  );
}
