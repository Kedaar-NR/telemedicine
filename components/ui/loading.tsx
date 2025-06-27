"use client";

import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  };

  return (
    <div className={cn(
      "animate-spin rounded-full border-2 border-gray-300 border-t-blue-600",
      sizeClasses[size],
      className
    )} />
  );
}

interface LoadingSkeletonProps {
  className?: string;
  variant?: "text" | "rectangular" | "circular";
}

export function LoadingSkeleton({ className, variant = "rectangular" }: LoadingSkeletonProps) {
  const baseClasses = "animate-pulse bg-gray-200";
  
  const variantClasses = {
    text: "h-4 rounded",
    rectangular: "rounded-lg",
    circular: "rounded-full"
  };

  return (
    <div className={cn(
      baseClasses,
      variantClasses[variant],
      className
    )} />
  );
}

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  message?: string;
}

export function LoadingOverlay({ isLoading, children, message = "Loading..." }: LoadingOverlayProps) {
  if (!isLoading) return <>{children}</>;

  return (
    <div className="relative">
      <div className="opacity-50 pointer-events-none">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <div className="flex flex-col items-center space-y-3">
          <LoadingSpinner size="lg" />
          <p className="text-sm text-gray-600 font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
}

export function PatientCardSkeleton() {
  return (
    <div className="border-l-4 border-l-gray-200 bg-white p-6 space-y-3">
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1">
          <LoadingSkeleton className="h-4 w-32" variant="text" />
          <LoadingSkeleton className="h-4 w-24" variant="text" />
        </div>
        <LoadingSkeleton className="h-8 w-20" />
      </div>
      <div className="flex space-x-4">
        <LoadingSkeleton className="h-3 w-16" variant="text" />
        <LoadingSkeleton className="h-3 w-20" variant="text" />
      </div>
    </div>
  );
}

export function CalendarSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
      <div className="flex justify-between items-center">
        <LoadingSkeleton className="h-6 w-48" variant="text" />
        <div className="flex space-x-2">
          <LoadingSkeleton className="h-8 w-16" />
          <LoadingSkeleton className="h-8 w-16" />
          <LoadingSkeleton className="h-8 w-16" />
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-4">
        {Array.from({ length: 35 }).map((_, i) => (
          <LoadingSkeleton key={i} className="h-20" />
        ))}
      </div>
    </div>
  );
}
