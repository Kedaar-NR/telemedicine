import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string; // ISO date string
  startTime: string; // e.g. '13:00'
  endTime: string; // e.g. '13:30'
  type: "video" | "phone" | "in-person";
  notes?: string;
  status: "waiting" | "finished" | "canceled";
}

interface BookingContextType {
  appointments: Appointment[];
  addBooking: (appt: Omit<Appointment, "id" | "status">) => {
    success: boolean;
    error?: string;
  };
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  function addBooking(appt: Omit<Appointment, "id" | "status">) {
    // Check for conflict (same date and overlapping time)
    const conflict = appointments.some(
      (existing) =>
        existing.date === appt.date &&
        ((appt.startTime >= existing.startTime &&
          appt.startTime < existing.endTime) ||
          (appt.endTime > existing.startTime &&
            appt.endTime <= existing.endTime))
    );
    if (conflict) {
      return {
        success: false,
        error: "Booking conflict: overlapping appointment.",
      };
    }
    const newAppt: Appointment = {
      ...appt,
      id: Math.random().toString(36).slice(2),
      status: "waiting",
    };
    setAppointments((prev) => [...prev, newAppt]);
    return { success: true };
  }

  return (
    <BookingContext.Provider value={{ appointments, addBooking }}>
      {children}
    </BookingContext.Provider>
  );
}
