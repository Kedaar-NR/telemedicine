"use client";

import {
  Calendar,
  Check,
  Clock,
  X,
  Video,
  Phone,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";
import { VideoMeeting } from "@/components/video-meeting";

const todaysPatients = [
  {
    time: "11:00 - 11:30AM",
    name: "James Patelyaha",
    gender: "Male",
    dob: "01/01/1980 (44 y.o)",
    status: "finished",
    borderColor: "border-l-gray-300",
  },
  {
    time: "11:30 - 12:00AM",
    name: "Fatima Hussein",
    gender: "Female",
    dob: "01/01/1980 (44 y.o)",
    status: "finished",
    borderColor: "border-l-gray-300",
  },
  {
    time: "13:00 - 13:30PM",
    name: "David Johnson",
    gender: "Male",
    dob: "01/01/1980 (44 y.o)",
    status: "waiting",
    borderColor: "border-l-purple-500",
  },
  {
    time: "13:30 - 14:00PM",
    name: "Hiroshi Tanaka",
    gender: "Male",
    dob: "01/01/1980 (44 y.o)",
    status: "waiting",
    borderColor: "border-l-purple-400",
  },
  {
    time: "14:00 - 14:30PM",
    name: "Chloe Adams",
    gender: "Female",
    dob: "01/01/1980 (44 y.o)",
    status: "canceled",
    borderColor: "border-l-blue-500",
  },
  {
    time: "14:30 - 15:00PM",
    name: "Aisha Khan",
    gender: "Female",
    dob: "01/01/1980 (44 y.o)",
    status: "canceled",
    borderColor: "border-l-cyan-400",
  },
  {
    time: "15:00 - 15:30PM",
    name: "Arjun Patel",
    gender: "Male",
    dob: "01/01/1980 (44 y.o)",
    status: "waiting",
    borderColor: "border-l-teal-400",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "finished":
      return (
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-5 h-5 bg-gray-400 rounded-full">
            <Check className="h-3 w-3 text-white" />
          </div>
          <span className="text-gray-600 font-medium">Finished</span>
        </div>
      );
    case "waiting":
      return (
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-5 h-5 bg-green-500 rounded-full">
            <Clock className="h-3 w-3 text-white" />
          </div>
          <span className="text-green-600 font-medium">Waiting</span>
        </div>
      );
    case "canceled":
      return (
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-5 h-5 bg-red-500 rounded-full">
            <X className="h-3 w-3 text-white" />
          </div>
          <span className="text-red-600 font-medium">Canceled</span>
        </div>
      );
    default:
      return null;
  }
};

export function Dashboard() {
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
  const [showVideoMeeting, setShowVideoMeeting] = useState(false);
  const [currentMeetingPatient, setCurrentMeetingPatient] = useState<{
    name: string;
    time: string;
  } | null>(null);

  const handleStartMeeting = (patientName: string, appointmentTime: string) => {
    setCurrentMeetingPatient({ name: patientName, time: appointmentTime });
    setShowVideoMeeting(true);
  };

  const handleSendMessage = (patientName: string) => {
    // Mock messaging functionality
    alert(`Opening chat with ${patientName}`);
  };

  return (
    <div className="p-8 bg-gray-50 h-full">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 bg-gray-100 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Calendar className="h-6 w-6 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Today's Patients | Mon, June 9, 2025
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
                    Patient's Name
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
                  <th className="px-8 py-4 text-left text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {todaysPatients.map((patient, index) => {
                  const isLast = index === todaysPatients.length - 1;

                  return (
                    <>
                      <tr 
                        key={index} 
                        className={`${patient.borderColor} border-l-4 hover:bg-gray-50 cursor-pointer transition-all duration-200 hover:shadow-sm`}
                        onClick={() =>
                          setSelectedPatient(
                            selectedPatient === index ? null : index
                          )
                        }
                      >
                        <td className="px-8 py-4 text-sm font-medium text-gray-900">
                          {patient.time}
                        </td>
                        <td className="px-8 py-4 text-sm text-gray-900">
                          {patient.name}
                        </td>
                        <td className="px-8 py-4 text-sm text-gray-700">
                          {patient.gender}
                        </td>
                        <td className="px-8 py-4 text-sm text-gray-700">
                          {patient.dob}
                        </td>
                        <td className="px-8 py-4 text-sm">
                          {getStatusBadge(patient.status)}
                        </td>
                        <td className="px-8 py-4 text-sm">
                          <div className="flex items-center space-x-3">
                            {patient.status === "waiting" && (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStartMeeting(
                                      patient.name,
                                      patient.time
                                    );
                                  }}
                                  className="flex items-center justify-center w-8 h-8 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors"
                                  title="Start Video Call"
                                >
                                  <Video className="h-4 w-4 text-blue-600" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSendMessage(patient.name);
                                  }}
                                  className="flex items-center justify-center w-8 h-8 bg-green-100 hover:bg-green-200 rounded-full transition-colors"
                                  title="Send Message"
                                >
                                  <MessageSquare className="h-4 w-4 text-green-600" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>

                      {/* Free time indicator after second appointment */}
                      {index === 1 && (
                        <tr>
                          <td colSpan={6} className="px-0 py-0">
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
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Video Meeting Component */}
      {showVideoMeeting && currentMeetingPatient && (
        <VideoMeeting
          isOpen={showVideoMeeting}
          onClose={() => {
            setShowVideoMeeting(false);
            setCurrentMeetingPatient(null);
          }}
          patientName={currentMeetingPatient.name}
          appointmentTime={currentMeetingPatient.time}
        />
      )}
    </div>
  );
}
