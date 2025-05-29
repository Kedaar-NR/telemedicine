import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const timeSlots = ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"]

const days = ["MON 21", "TUE 22", "WED 23", "THU 24", "FRI 25", "SAT 26", "SUN 27"]

const appointments = [
  {
    id: 1,
    title: "Follow-up Consultation",
    patient: "Sarah M.",
    time: "9:00 AM",
    duration: "30 min",
    type: "consultation",
    day: 0,
    slot: 1,
  },
  {
    id: 2,
    title: "Routine Checkup",
    patient: "John D.",
    time: "10:30 AM",
    duration: "45 min",
    type: "checkup",
    day: 1,
    slot: 2,
  },
  {
    id: 3,
    title: "Physical Therapy",
    patient: "Maria R.",
    time: "2:00 PM",
    duration: "60 min",
    type: "therapy",
    day: 2,
    slot: 6,
  },
]

const todaySchedule = [
  {
    time: "09:00",
    title: "Patient Meeting",
    attendees: ["Dr. Smith", "Nurse Johnson"],
  },
  {
    time: "10:30",
    title: "Review Meeting",
    attendees: ["Dr. Brown"],
  },
  {
    time: "14:00",
    title: "Patient Meeting",
    attendees: ["Dr. Wilson"],
  },
  {
    time: "15:30",
    title: "Patient Meeting",
    attendees: ["Dr. Davis"],
  },
]

export function Calendar() {
  return (
    <div className="flex h-full">
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">My day</h3>
            <div className="space-y-1">
              <div className="text-sm text-blue-600 cursor-pointer">Next 7 days</div>
              <div className="text-sm text-gray-600 cursor-pointer">All my tasks</div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-2">My lists</h3>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Tasks</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-2">Tags</h3>
            <div className="space-y-1">
              <Badge variant="secondary" className="text-xs">
                Important
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">January 2025</span>
              <Button variant="ghost" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Today
            </Button>
            <Button variant="outline" size="sm">
              Week
            </Button>
            <Button variant="outline" size="sm">
              Month
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="grid grid-cols-8 border-b border-gray-200">
            <div className="p-4 border-r border-gray-200"></div>
            {days.map((day, index) => (
              <div key={index} className="p-4 text-center border-r border-gray-200 last:border-r-0">
                <div className="text-sm font-medium text-gray-900">{day.split(" ")[0]}</div>
                <div className="text-lg font-bold text-gray-900">{day.split(" ")[1]}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-8">
            <div className="border-r border-gray-200">
              {timeSlots.map((time, index) => (
                <div key={index} className="h-16 p-2 border-b border-gray-200 text-sm text-gray-500">
                  {time}
                </div>
              ))}
            </div>

            {days.map((_, dayIndex) => (
              <div key={dayIndex} className="border-r border-gray-200 last:border-r-0">
                {timeSlots.map((_, slotIndex) => {
                  const appointment = appointments.find((apt) => apt.day === dayIndex && apt.slot === slotIndex)

                  return (
                    <div key={slotIndex} className="h-16 border-b border-gray-200 p-1">
                      {appointment && (
                        <div
                          className={`p-2 rounded text-xs ${
                            appointment.type === "consultation"
                              ? "bg-blue-100 text-blue-800"
                              : appointment.type === "checkup"
                                ? "bg-green-100 text-green-800"
                                : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          <div className="font-medium">{appointment.title}</div>
                          <div className="text-xs opacity-75">{appointment.patient}</div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-80 bg-white border-l border-gray-200 p-6">
        <div className="mb-6">
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-gray-900">January 2025</div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
            <div>MON</div>
            <div>TUE</div>
            <div>WED</div>
            <div>THU</div>
            <div>FRI</div>
            <div>SAT</div>
            <div>SUN</div>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 6
              const isCurrentMonth = day > 0 && day <= 31
              const isToday = day === 21

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
              )
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Today Schedule</h3>
            <span className="text-sm text-gray-500">Jan 21st</span>
          </div>

          <div className="space-y-3">
            {todaySchedule.map((item, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-900 min-w-[50px]">{item.time}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{item.title}</div>
                  <div className="flex items-center space-x-1 mt-1">
                    {item.attendees.map((attendee, i) => (
                      <div key={i} className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">{attendee.split(" ")[1]?.[0] || attendee[0]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
