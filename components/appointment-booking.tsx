"use client";

import { useState } from "react";
import { User, Video, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

interface AppointmentBookingProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date;
  selectedTime?: string;
}

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM"
];

const patients = [
  { id: "1", name: "James Patelyaha", email: "james.p@email.com" },
  { id: "2", name: "Fatima Hussein", email: "fatima.h@email.com" },
  { id: "3", name: "David Johnson", email: "david.j@email.com" },
  { id: "4", name: "Hiroshi Tanaka", email: "hiroshi.t@email.com" },
  { id: "5", name: "Chloe Adams", email: "chloe.a@email.com" },
  { id: "6", name: "Aisha Khan", email: "aisha.k@email.com" },
  { id: "7", name: "Arjun Patel", email: "arjun.p@email.com" }
];

export function AppointmentBooking({ isOpen, onClose, selectedDate, selectedTime }: AppointmentBookingProps) {
  const [, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    patientId: "",
    date: selectedDate || new Date(),
    startTime: selectedTime || "",
    endTime: "",
    type: "video" as "video" | "phone" | "in-person",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedPatient = patients.find(p => p.id === formData.patientId);
    
    // Mock appointment booking
    alert(`Appointment booked successfully!
    
Patient: ${selectedPatient?.name}
Date: ${formData.date.toLocaleDateString()}
Time: ${formData.startTime} - ${formData.endTime}
Type: ${formData.type.charAt(0).toUpperCase() + formData.type.slice(1)} consultation
    
Confirmation email sent to ${selectedPatient?.email}`);
    
    // Reset form and close
    setCurrentStep(1);
    setFormData({
      patientId: "",
      date: new Date(),
      startTime: "",
      endTime: "",
      type: "video",
      notes: ""
    });
    onClose();
  };

  const calculateEndTime = (startTime: string) => {
    if (!startTime) return "";
    
    const [time, period] = startTime.split(" ");
    const [hours, minutes] = time.split(":").map(Number);
    
    let endHours = hours;
    let endMinutes = minutes + 30; // 30 minute appointments
    
    if (endMinutes >= 60) {
      endHours += 1;
      endMinutes -= 60;
    }
    
    // Convert back to 12-hour format
    let endPeriod = period;
    if (endHours > 12) {
      endHours -= 12;
      endPeriod = "PM";
    } else if (endHours === 12 && period === "AM") {
      endPeriod = "PM";
    }
    
    const formattedEndTime = `${endHours.toString().padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")} ${endPeriod}`;
    return formattedEndTime;
  };

  const handleStartTimeChange = (time: string) => {
    const endTime = calculateEndTime(time);
    setFormData(prev => ({
      ...prev,
      startTime: time,
      endTime: endTime
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Book New Appointment"
      className="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Patient Selection */}
        <div className="space-y-4">
          <div>
            <label className="flex items-center space-x-2 text-base font-medium text-gray-700 mb-3">
              <div className="w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center">
                <User className="h-3 w-3 text-white" />
              </div>
              <span>Select Patient</span>
            </label>
            <select
              value={formData.patientId}
              onChange={(e) => setFormData(prev => ({ ...prev, patientId: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Choose a patient...</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-3">
              Date & Time
            </label>
            <input
              type="date"
              value={formData.date.toISOString().split('T')[0]}
              onChange={(e) => setFormData(prev => ({ ...prev, date: new Date(e.target.value) }))}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base mb-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Start Time</label>
                <select
                  value={formData.startTime}
                  onChange={(e) => handleStartTimeChange(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select time</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">End Time</label>
                <input
                  type="text"
                  value={formData.endTime}
                  readOnly
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base bg-gray-50"
                  placeholder="Auto-calculated"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-3">
              Consultation Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: "video" }))}
                className={`p-3 border-2 rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                  formData.type === "video" 
                    ? "border-blue-500 bg-blue-50 text-blue-700" 
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <Video className="h-6 w-6" />
                <span className="text-sm font-medium">Video</span>
              </button>
              
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: "phone" }))}
                className={`p-3 border-2 rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                  formData.type === "phone" 
                    ? "border-green-500 bg-green-50 text-green-700" 
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <Phone className="h-6 w-6" />
                <span className="text-sm font-medium">Phone</span>
              </button>
              
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: "in-person" }))}
                className={`p-3 border-2 rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                  formData.type === "in-person" 
                    ? "border-purple-500 bg-purple-50 text-purple-700" 
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <User className="h-6 w-6" />
                <span className="text-sm font-medium">In-person</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-3">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add any additional notes or special instructions..."
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="px-6 py-3 text-base rounded-lg"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="px-6 py-3 text-base bg-black text-white hover:bg-gray-800 rounded-lg"
            disabled={!formData.patientId || !formData.startTime}
          >
            Book Appointment
          </Button>
        </div>
      </form>
    </Modal>
  );
}
