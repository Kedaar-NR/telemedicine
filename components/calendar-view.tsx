import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Save,
  Printer,
  Search,
} from "lucide-react";

const timeSlots = [
  "7 AM",
  "8 AM",
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
];

const days = [
  "SUN 21",
  "MON 22",
  "TUE 23",
  "WED 24",
  "THU 25",
  "FRI 26",
  "SAT 27",
];

const appointments = [
  {
    id: 1,
    title: "Review patient files and prepare therapy sessions",
    patient: "A",
    time: "9:00 AM",
    duration: "1h",
    type: "review",
    day: 1,
    slot: 2,
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: 2,
    title: "Chat with patient A",
    patient: "A",
    time: "10:00 AM",
    duration: "30m",
    type: "chat",
    day: 1,
    slot: 3,
    color: "bg-cyan-100 text-cyan-800",
  },
  {
    id: 3,
    title: "Team meeting to discuss patients' progress and treatment plans",
    patient: "Group",
    time: "11:00 AM",
    duration: "1h",
    type: "meeting",
    day: 1,
    slot: 4,
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: 4,
    title: "Chat with patient B",
    patient: "B",
    time: "1:00 PM",
    duration: "30m",
    type: "chat",
    day: 1,
    slot: 6,
    color: "bg-cyan-100 text-cyan-800",
  },
];

const todaySchedule = [
  {
    time: "11:30 AM",
    title: "Patient Meeting",
    subtitle: "Chat with patient Group D",
    avatars: ["A", "B", "C", "D"],
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    time: "1:00 PM",
    title: "Patient Meeting",
    subtitle: "Chat with patient N.",
  },
  {
    time: "1:30 PM",
    title: "Patient Meeting",
    subtitle: "Chat with patient O.",
  },
  {
    time: "2:30 PM",
    title: "Patient Meeting",
    subtitle: "Chat with patient P.",
  },
  {
    time: "3:30 PM",
    title: "Patient Meeting",
    subtitle: "Chat with patient Q.",
  },
];

export function Calendar() {
  return (
    <div className="flex flex-col md:flex-row h-full bg-[#F6F7F9]">
      <div className="flex-1 p-4 md:p-8 overflow-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Plus />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900 ml-2">Calendar</h1>
            <Button variant="ghost" size="icon">
              <Save />
            </Button>
            <Button variant="ghost" size="icon">
              <Printer />
            </Button>
          </div>
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Today
            </Button>
            <Button variant="outline" size="sm">
              Day
            </Button>
            <Button variant="outline" size="sm">
              Week
            </Button>
            <Button variant="outline" size="sm">
              Month
            </Button>
            <Button variant="outline" size="sm">
              Year
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">January 2023</span>
            <Button variant="ghost" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-8 border-b border-gray-200">
              <div className="p-4 border-r border-gray-200"></div>
              {days.map((day, index) => (
                <div
                  key={index}
                  className="p-4 text-center border-r border-gray-200 last:border-r-0"
                >
                  <div className="text-sm font-medium text-gray-900">
                    {day.split(" ")[0]}
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {day.split(" ")[1]}
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-8 gap-x-4">
              <div className="border-r border-gray-200">
                {timeSlots.map((time, index) => (
                  <div
                    key={index}
                    className="h-20 p-2 border-b border-gray-200 text-sm text-gray-500 flex items-center"
                  >
                    {time}
                  </div>
                ))}
              </div>
              {days.map((_, dayIndex) => (
                <div
                  key={dayIndex}
                  className="border-r border-gray-200 last:border-r-0 flex flex-col gap-y-4"
                >
                  {timeSlots.map((_, slotIndex) => {
                    const appointment = appointments.find(
                      (apt) => apt.day === dayIndex && apt.slot === slotIndex
                    );
                    return (
                      <div
                        key={slotIndex}
                        className="h-20 border-b border-gray-200 p-1 flex items-center justify-center"
                      >
                        {appointment && (
                          <div
                            className={`p-3 rounded-lg text-xs font-medium shadow-sm ${appointment.color} w-full text-center whitespace-normal break-words`}
                          >
                            <div className="font-medium mb-1">
                              {appointment.title}
                            </div>
                            <div className="text-xs opacity-75">
                              {appointment.patient}
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
        </div>
      </div>
      <div className="w-full md:w-80 bg-white border-l border-gray-200 p-6 flex flex-col">
        <div className="mb-6">
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-gray-900">January 2023</div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
            <div>SUN</div>
            <div>MON</div>
            <div>TUE</div>
            <div>WED</div>
            <div>THU</div>
            <div>FRI</div>
            <div>SAT</div>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 6;
              const isCurrentMonth = day > 0 && day <= 31;
              const isToday = day === 9;

              return (
                <div
                  key={i}
                  className={`h-8 w-8 flex items-center justify-center text-sm rounded ${
                    isToday
                      ? "bg-blue-500 text-white"
                      : isCurrentMonth
                      ? "text-gray-900 hover:bg-gray-100"
                      : "text-gray-300"
                  }`}
                >
                  {isCurrentMonth ? day : ""}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Today Schedule</h3>
            <span className="text-sm text-gray-500">
              55°/40° <span className="ml-1">☀️</span>
            </span>
          </div>

          <div className="space-y-3">
            {todaySchedule.map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="text-sm font-medium text-gray-900 min-w-[50px]">
                  {item.time}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-500">{item.subtitle}</div>
                  {item.avatars && (
                    <div className="flex items-center space-x-1 mt-1">
                      {item.avatars.map((a, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                        >
                          <span className="text-xs text-white">{a}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const mockExerciseHistory = {
  p1: [
    // ...existing exercises...
  ],
  p2: [
    // ...existing exercises...
  ],
  p3: [
    {
      id: "ex4",
      taskName: "Balance Training",
      status: "active",
      frequency: "weekly",
      progress: 70,
      lastAttempt: "2024-06-03T10:00:00Z",
      averageTime: 150,
    },
    {
      id: "ex5",
      taskName: "Hand Squeeze",
      status: "inactive",
      frequency: "daily",
      progress: 40,
      lastAttempt: "2024-05-30T09:00:00Z",
      averageTime: 90,
    },
  ],
};
