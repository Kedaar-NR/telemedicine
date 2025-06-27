"use client";

import { Button } from "@/components/ui/button";
import {
  Calendar,
  Edit2,
  X,
} from "lucide-react";
import { useState } from "react";
import { AppointmentBooking } from "@/components/appointment-booking";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ScheduleViewProps {}

const timeSlots = [
  "GMT+7",
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
];

const days = [
  { name: "Sunday", date: "8" },
  { name: "Monday", date: "9" },
  { name: "Tuesday", date: "10" },
  { name: "Wednesday", date: "11" },
  { name: "Thursday", date: "12" },
];

const appointments = [
  { id: 1, day: 1, slot: 1, patient: "James Patelyaha", type: "blue" },
  { id: 2, day: 1, slot: 2, patient: "James Patelyaha", type: "blue" },
  { id: 3, day: 2, slot: 2, patient: "James Patelyaha", type: "blue" },
  { id: 4, day: 3, slot: 2, patient: "James Patelyaha", type: "blue" },
  { id: 5, day: 3, slot: 3, patient: "James Patelyaha", type: "blue" },
  { id: 6, day: 3, slot: 4, patient: "James Patelyaha", type: "blue" },
  { id: 7, day: 3, slot: 5, patient: "James Patelyaha", type: "blue" },
  { id: 8, day: 1, slot: 3, patient: "James Patelyaha", type: "gray" },
  { id: 9, day: 1, slot: 4, patient: "James Patelyaha", type: "gray" },
  { id: 10, day: 1, slot: 5, patient: "James Patelyaha", type: "gray" },
  { id: 11, day: 1, slot: 6, patient: "James Patelyaha", type: "gray" },
  { id: 12, day: 2, slot: 6, patient: "James Patelyaha", type: "gray" },
  { id: 13, day: 2, slot: 7, patient: "James Patelyaha", type: "gray" },
  { id: 14, day: 2, slot: 8, patient: "James Patelyaha", type: "gray" },
  { id: 15, day: 3, slot: 6, patient: "James Patelyaha", type: "blue" },
  { id: 16, day: 3, slot: 7, patient: "James Patelyaha", type: "blue" },
  { id: 17, day: 3, slot: 8, patient: "James Patelyaha", type: "blue" },
  { id: 18, day: 4, slot: 2, patient: "James Patelyaha", type: "blue" },
  { id: 19, day: 4, slot: 6, patient: "James Patelyaha", type: "gray" },
  { id: 20, day: 4, slot: 7, patient: "James Patelyaha", type: "gray" },
  { id: 21, day: 4, slot: 8, patient: "James Patelyaha", type: "gray" },
];

export function ScheduleView({}: ScheduleViewProps) {
  const [showCreateModal, setShowCreateModal] = useState(true); // Show by default to match screenshot
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{
    date: Date;
    time: string;
  } | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [viewMode, setViewMode] = useState("Week");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleTimeSlotClick = (dayIndex: number, slotIndex: number) => {
    // Check if slot already has appointment
      const hasAppointment = appointments.find(
        (apt) => apt.day === dayIndex && apt.slot === slotIndex + 1
      );

      if (!hasAppointment) {
        // Calculate date and time for selected slot
        const selectedDate = new Date(2025, 3, 14 + dayIndex); // April 14 + dayIndex
        const timeSlot = timeSlots[slotIndex + 1];

        setSelectedSlot({ date: selectedDate, time: timeSlot });
        setShowBookingModal(true);
      }
  };

  const getAppointmentStyle = (type: string) => {
    if (type === "blue") {
      return "bg-blue-100 border border-blue-300 text-blue-800";
    }
    return "bg-gray-100 border border-gray-300 text-gray-700";
  };

  return (
    <div className="flex h-full bg-gray-50">
      {/* Main calendar area */}
      <div className="flex-1 p-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden h-full">
          {/* Header */}
          <div className="px-8 py-6 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calendar className="h-6 w-6 text-gray-600" />
                <span className="text-xl font-semibold text-gray-900">
                  June 2025 | April 14, 2025 - April 20, 2025
                </span>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                    Day
                  </button>
                  <button className="px-4 py-2 text-sm bg-gray-200 border border-gray-300 rounded-lg font-medium">
                    Week
                  </button>
                  <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                    Month
                  </button>
                </div>
                <Button
                  onClick={() => setShowCreateModal(!showCreateModal)}
                  className="flex items-center space-x-2 bg-black text-white hover:bg-gray-800 rounded-lg px-4 py-2"
                >
                  <Edit2 className="h-4 w-4" />
                  <span>Create Schedule</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="flex-1 overflow-auto">
            {/* Mobile Calendar Message */}
            <div className="lg:hidden p-8 text-center">
              <p className="text-gray-600 mb-4">Calendar view is optimized for larger screens.</p>
              <p className="text-sm text-gray-500">Please use a tablet or desktop for the best scheduling experience.</p>
            </div>
            <div className="min-w-[1000px]">
              {/* Days header */}
              <div className="grid grid-cols-6 bg-gray-50">
                <div className="p-4 border-r border-gray-200 bg-white">
                  <span className="text-sm font-medium text-gray-600">
                    GMT+7
                  </span>
                </div>
                {days.map((day, index) => (
                  <div
                    key={index}
                    className="p-4 text-center border-r border-gray-200 last:border-r-0"
                  >
                    <div className="text-sm font-medium text-gray-900">
                      {day.name} {day.date}
                    </div>
                    {/* Add underline for Monday (active day) */}
                    {day.name === "Monday" && (
                      <div className="h-0.5 bg-gray-900 mt-2 mx-auto w-12"></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Time slots and appointments */}
              <div className="grid grid-cols-6">
                {/* Time column */}
                <div className="bg-white border-r border-gray-200">
                  {timeSlots.slice(1).map((time, index) => (
                    <div
                      key={index}
                      className="h-20 px-4 py-2 border-b border-gray-200 text-sm text-gray-500 flex items-start pt-4"
                    >
                      {time}
                    </div>
                  ))}
                </div>

                {/* Day columns */}
                {days.map((_, dayIndex) => (
                  <div
                    key={dayIndex}
                    className="border-r border-gray-200 last:border-r-0 bg-white"
                  >
                    {timeSlots.slice(1).map((_, slotIndex) => {
                      const appointment = appointments.find(
                        (apt) =>
                          apt.day === dayIndex && apt.slot === slotIndex + 1
                      );
                      return (
                        <div
                          key={slotIndex}
                          className="h-20 border-b border-gray-200 p-2"
                        >
                          {appointment && (
                            <div
                              className={`p-3 rounded-xl text-xs ${getAppointmentStyle(
                                appointment.type
                              )} h-full flex items-center justify-center shadow-sm`}
                            >
                              <div className="text-center">
                                <div className="flex items-center justify-center space-x-1 mb-1">
                                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs">
                                      👤
                                    </span>
                                  </div>
                                </div>
                                <div className="font-medium text-xs">James</div>
                                <div className="text-xs">Patelyaha</div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Blue progress indicator at bottom */}
            <div className="h-1 bg-blue-500 mx-8"></div>
          </div>
        </div>
      </div>

      {/* Create Schedule Sidebar */}
      {showCreateModal && (
        <div className="w-96 bg-white border-l border-gray-200 p-8 shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-semibold text-gray-900">
              Create a Schedule
            </h3>
            <button
              onClick={() => setShowCreateModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-6 w-6 text-gray-400" />
            </button>
          </div>

          <form className="space-y-6">
            <div>
              <label className="flex items-center space-x-2 text-base font-medium text-gray-700 mb-3">
                <div className="w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">👤</span>
                </div>
                <span>Patient Name</span>
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Select patient...</option>
                <option>James Patelyaha</option>
              </select>
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 mb-3">
                Date & Time
              </label>
              <input
                type="date"
                defaultValue="2025-04-17"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base mb-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">🕐</span>
                  </div>
                  <input
                    type="time"
                    defaultValue="10:00"
                    className="border border-gray-300 rounded-lg px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <span className="text-gray-500 font-medium">—</span>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">🕐</span>
                  </div>
                  <input
                    type="time"
                    defaultValue="10:30"
                    className="border border-gray-300 rounded-lg px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flex justify-center space-x-4">
                <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                <span className="w-2 h-2 bg-gray-900 rounded-full"></span>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <Button
                variant="outline"
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-3 text-base rounded-lg"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-6 py-3 text-base bg-black text-white hover:bg-gray-800 rounded-lg"
              >
                Continue
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Appointment Booking Modal */}
      <AppointmentBooking
        isOpen={showBookingModal}
        onClose={() => {
          setShowBookingModal(false);
          setSelectedSlot(null);
        }}
        selectedDate={selectedSlot?.date}
        selectedTime={selectedSlot?.time}
      />
    </div>
  );
}
