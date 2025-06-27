"use client";

import { SessionProvider } from "next-auth/react";
import { BookingProvider } from "@/components/BookingContext";

interface ProvidersProps {
  children: React.ReactNode;
}

export function ClientProviders({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <BookingProvider>{children}</BookingProvider>
    </SessionProvider>
  );
}
