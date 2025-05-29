import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Star, Search, Filter, Plus } from "lucide-react";

const patients = [
  {
    mrn: "MRN123",
    name: "James Miller",
    dob: "03/15/1985 (38 y.o)",
    gender: "Male",
    diagnosis: "Breast Biopsy",
    recentOrder: "Breast Biopsy",
    orderDate: "05/29/2025",
    status: "Active",
  },
  {
    mrn: "MRN124",
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
  return (
    <div className="flex h-full">
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Patient List</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="grid grid-cols-8 gap-4 text-sm font-medium text-gray-500">
              <div></div>
              <div>MRN</div>
              <div>Name</div>
              <div>Date of Birth</div>
              <div>Gender</div>
              <div>Diagnosis</div>
              <div>Date of Recent Order</div>
              <div>Action</div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {patients.map((patient, index) => (
              <div key={patient.mrn} className="px-6 py-4 hover:bg-gray-50">
                <div className="grid grid-cols-8 gap-4 items-center">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-gray-300" />
                  </div>

                  <div className="text-sm font-medium text-gray-900">
                    {patient.mrn}
                  </div>

                  <div className="text-sm font-medium text-gray-900">
                    {patient.name}
                  </div>

                  <div className="text-sm text-gray-600">{patient.dob}</div>

                  <div className="text-sm text-gray-600">{patient.gender}</div>

                  <div className="text-sm text-gray-600">
                    {patient.diagnosis}
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600">
                      {patient.recentOrder}
                    </span>
                    <Badge variant="secondary" className="text-xs w-fit mt-1">
                      {patient.orderDate}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-2">
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

      <div className="w-80 bg-white border-l border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Searches</h3>
        <div className="space-y-2">
          <div className="text-sm text-blue-600 cursor-pointer hover:underline">
            James Johnson
          </div>
          <div className="text-sm text-blue-600 cursor-pointer hover:underline">
            Maria Rodriguez
          </div>
          <div className="text-sm text-blue-600 cursor-pointer hover:underline">
            Alex Chen
          </div>
          <div className="text-sm text-blue-600 cursor-pointer hover:underline">
            View More
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-4 mt-8">Filters</h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm">
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Assigned to me
            </label>
            <input type="checkbox" className="ml-2 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
