import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MoreHorizontal, Filter } from "lucide-react";

const patients = [
  {
    id: 1,
    name: "A. Patel",
    condition: "Diabetes management",
    progress: 85,
    tasks: "4/5",
    frequency: "Daily",
    lastAttended: "2 days ago",
    timeToComplete: "3 days",
    status: "On track",
    progressColor: "bg-green-500",
  },
  {
    id: 2,
    name: "B. Chen",
    condition: "Hypertension monitoring",
    progress: 60,
    tasks: "3/5",
    frequency: "Weekly",
    lastAttended: "1 week ago",
    timeToComplete: "5 days",
    status: "Behind",
    progressColor: "bg-orange-500",
  },
  {
    id: 3,
    name: "C. Rodriguez",
    condition: "Physical therapy",
    progress: 90,
    tasks: "9/10",
    frequency: "Daily",
    lastAttended: "1 day ago",
    timeToComplete: "2 days",
    status: "Excellent",
    progressColor: "bg-green-500",
  },
  {
    id: 4,
    name: "D. Williams",
    condition: "Medication adherence",
    progress: 45,
    tasks: "2/5",
    frequency: "Twice daily",
    lastAttended: "3 days ago",
    timeToComplete: "7 days",
    status: "Needs attention",
    progressColor: "bg-yellow-500",
  },
  {
    id: 5,
    name: "E. Johnson",
    condition: "Post-surgery recovery",
    progress: 25,
    tasks: "1/4",
    frequency: "Daily",
    lastAttended: "5 days ago",
    timeToComplete: "10 days",
    status: "Critical",
    progressColor: "bg-red-500",
  },
];

interface PatientDashboardProps {
  onShowPatientProfile?: (patientId: string) => void;
}

export function PatientDashboard({
  onShowPatientProfile,
}: PatientDashboardProps) {
  return (
    <div className="flex h-full">
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Patient List</h1>
            <p className="text-gray-600">
              Monitor patient progress and care plans
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-500">
              <div>Progress</div>
              <div>Tasks</div>
              <div>Frequency</div>
              <div>Last Attended</div>
              <div>Average Time to Complete</div>
              <div>Actions</div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {patients.map((patient) => (
              <div key={patient.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="grid grid-cols-6 gap-4 items-center">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${patient.progressColor}`}
                    ></div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {patient.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {patient.condition}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{patient.tasks}</span>
                    <Progress value={patient.progress} className="w-16 h-2" />
                  </div>

                  <div>
                    <Badge variant="secondary" className="text-xs">
                      {patient.frequency}
                    </Badge>
                  </div>

                  <div className="text-sm text-gray-600">
                    {patient.lastAttended}
                  </div>

                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-full h-2 rounded-full ${patient.progressColor} opacity-20`}
                    >
                      <div
                        className={`h-2 rounded-full ${patient.progressColor}`}
                        style={{ width: `${patient.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {patient.timeToComplete}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <Button
                      variant="link"
                      size="sm"
                      className="text-blue-600 p-0"
                      onClick={() =>
                        onShowPatientProfile && onShowPatientProfile(patient.id.toString())
                      }
                    >
                      View Details
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

      <div className="w-80 bg-white border-l border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">All Categories</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Diabetes (22)</span>
            <input type="checkbox" className="rounded" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Hypertension (18)</span>
            <input type="checkbox" className="rounded" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Physical therapy (15)</span>
            <input type="checkbox" className="rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
