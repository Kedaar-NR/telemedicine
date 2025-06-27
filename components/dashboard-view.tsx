"use client"

import { Calendar, Clock, Check, X } from "lucide-react"

interface Appointment {
  id: string
  time: string
  patientName: string
  gender: string
  dob: string
  status: "finished" | "waiting" | "canceled"
  leftBorderColor: string
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    time: "11:00 - 11:30AM",
    patientName: "James Patelyaha",
    gender: "Male",
    dob: "01/01/1980 (44 y.o)",
    status: "finished",
    leftBorderColor: "border-l-gray-300"
  },
  {
    id: "2", 
    time: "11:30 - 12:00AM",
    patientName: "Fatima Hussein",
    gender: "Female",
    dob: "01/01/1980 (44 y.o)",
    status: "finished",
    leftBorderColor: "border-l-gray-300"
  },
  {
    id: "3",
    time: "13:00 - 13:30PM",
    patientName: "David Johnson",
    gender: "Male", 
    dob: "01/01/1980 (44 y.o)",
    status: "waiting",
    leftBorderColor: "border-l-purple-500"
  },
  {
    id: "4",
    time: "13:30 - 14:00PM",
    patientName: "Hiroshi Tanaka",
    gender: "Male",
    dob: "01/01/1980 (44 y.o)",
    status: "waiting", 
    leftBorderColor: "border-l-purple-400"
  },
  {
    id: "5",
    time: "14:00 - 14:30PM",
    patientName: "Chloe Adams",
    gender: "Female",
    dob: "01/01/1980 (44 y.o)",
    status: "canceled",
    leftBorderColor: "border-l-blue-500"
  },
  {
    id: "6",
    time: "14:30 - 15:00PM",
    patientName: "Aisha Khan",
    gender: "Female",
    dob: "01/01/1980 (44 y.o)",
    status: "canceled",
    leftBorderColor: "border-l-cyan-400"
  },
  {
    id: "7",
    time: "15:00 - 15:30PM",
    patientName: "Arjun Patel",
    gender: "Male",
    dob: "01/01/1980 (44 y.o)",
    status: "waiting",
    leftBorderColor: "border-l-teal-400"
  }
]

function StatusBadge({ status }: { status: Appointment["status"] }) {
  switch (status) {
    case "finished":
      return (
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center">
            <Check className="h-3 w-3 text-white" />
          </div>
          <span className="text-gray-600 font-medium">Finished</span>
        </div>
      )
    case "waiting":
      return (
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <Clock className="h-3 w-3 text-white" />
          </div>
          <span className="text-green-600 font-medium">Waiting</span>
        </div>
      )
    case "canceled":
      return (
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <X className="h-3 w-3 text-white" />
          </div>
          <span className="text-red-600 font-medium">Canceled</span>
        </div>
      )
  }
}

export function DashboardView() {
  return (
    <div className="p-8 bg-gray-50 h-full min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 bg-gray-100 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Calendar className="h-6 w-6 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Today&apos;s Patients | Mon, June 9, 2025
              </h2>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden">
            <table className="w-full">
              <thead className="bg-white border-b border-gray-200">
                <tr>
                  <th className="px-8 py-4 text-left text-sm font-medium text-gray-700">
                    Appt. Time
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-medium text-gray-700">
                    Patient&apos;s Name
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-medium text-gray-700">
                    Gender
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-medium text-gray-700">
                    DOB/Age
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-medium text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {mockAppointments.map((appointment, index) => (
                  <tr key={appointment.id}>
                    <td colSpan={5} className="p-0">
                      <div className={`${appointment.leftBorderColor} border-l-4 px-8 py-4 hover:bg-gray-50 transition-colors`}>
                        <div className="grid grid-cols-5 gap-8">
                          <div className="text-sm font-medium text-gray-900">
                            {appointment.time}
                          </div>
                          <div className="text-sm text-gray-900">
                            {appointment.patientName}
                          </div>
                          <div className="text-sm text-gray-700">
                            {appointment.gender}
                          </div>
                          <div className="text-sm text-gray-700">
                            {appointment.dob}
                          </div>
                          <div className="text-sm">
                            <StatusBadge status={appointment.status} />
                          </div>
                        </div>
                      </div>
                      
                      {/* Free time indicator after second appointment */}
                      {index === 1 && (
                        <div className="relative bg-blue-50 border-l-4 border-l-blue-400">
                          <div className="px-8 py-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-blue-800">
                                1 hour free
                              </span>
                              <span className="text-sm text-blue-600">
                                40 mins left
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
