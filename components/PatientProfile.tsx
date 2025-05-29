import { getPatientProfile, getExerciseHistory } from "@/lib/mockData";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";

interface PatientProfileProps {
  patientId: string;
  onBack: () => void;
}

interface Exercise {
  id: string;
  taskName: string;
  status: string;
  frequency: string;
  progress: number;
  lastAttempt: string;
  averageTime: number;
}

const categories = [
  { name: "Workout", count: 23 },
  { name: "Basic ADL", count: 17 },
  { name: "Instrumental ADL", count: 5 },
];

export function PatientProfile({ patientId, onBack }: PatientProfileProps) {
  const patient = getPatientProfile(patientId);
  const allExercises: Exercise[] = getExerciseHistory(patientId);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const exercises = allExercises.filter((ex) =>
    ex.taskName.toLowerCase().includes(search.toLowerCase())
  );

  if (!patient) return <div className="p-6">Patient not found.</div>;

  return (
    <div className="flex flex-col md:flex-row h-full bg-[#F6F7F9]">
      {/* Main Table */}
      <div className="flex-1 p-4 md:p-8 overflow-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <div className="flex items-center space-x-4">
            <Button
              onClick={onBack}
              variant="ghost"
              className="rounded-full px-3 py-2 text-blue-600 font-semibold hover:bg-blue-50 transition"
            >
              &larr; Patient List
            </Button>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              {patient.name}
            </h2>
          </div>
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search exercises..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-base w-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="sticky top-0 z-10 bg-white rounded-t-2xl">
              <div className="px-6 py-4 border-b border-gray-200 grid grid-cols-7 gap-4 text-sm font-semibold text-gray-700">
                <div>Task</div>
                <div>Status</div>
                <div>Frequency</div>
                <div>Last Attempt</div>
                <div>Avg. Time</div>
                <div>Progress</div>
                <div>Action</div>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {exercises.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                  No exercises found.
                </div>
              ) : (
                exercises.map((ex, idx) => (
                  <div
                    key={ex.id}
                    className={`grid grid-cols-7 gap-4 items-center px-6 py-4 transition-colors ${
                      idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-blue-50/60`}
                    style={{
                      borderRadius: idx === 0 ? "1rem 1rem 0 0" : undefined,
                    }}
                  >
                    <div className="font-medium text-gray-900">
                      {ex.taskName}
                    </div>
                    <div
                      className={
                        ex.status === "active"
                          ? "text-blue-600 font-semibold"
                          : "text-gray-400"
                      }
                    >
                      {ex.status === "active" ? "Active" : "Inactive"}
                    </div>
                    <div className="text-gray-700">{ex.frequency}</div>
                    <div className="text-green-600 font-semibold">
                      {new Date(ex.lastAttempt).toLocaleDateString()}
                    </div>
                    <div className="text-gray-700">{ex.averageTime} sec</div>
                    <div className="flex flex-col min-w-[120px]">
                      <Progress
                        value={ex.progress}
                        className="w-full h-2 rounded-full"
                      />
                      <span className="text-xs text-gray-500 mt-1">
                        {ex.progress}%
                      </span>
                    </div>
                    <div>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-lg px-4 py-2 font-semibold shadow-sm hover:bg-blue-600 hover:text-white transition"
                        onClick={() => alert(`Viewing more for ${ex.taskName}`)}
                      >
                        View More
                      </Button>
                    </div>
                  </div>
                ))
              )}
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
        <h3 className="text-lg font-semibold mb-4">
          All Categories{" "}
          <span className="text-xs text-blue-600 cursor-pointer ml-2">
            Clear filters
          </span>
        </h3>
        <div className="space-y-3">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg border border-gray-100 hover:bg-blue-50 transition"
              onClick={() => alert(`Filter: ${cat.name}`)}
            >
              <span className="text-sm text-gray-600">
                {cat.name} ({cat.count})
              </span>
              <input type="checkbox" className="rounded" readOnly />
            </button>
          ))}
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
