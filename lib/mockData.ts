// Mock data and API functions for the telemedicine portal

// Appointment types and statuses
export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'waiting' | 'finished' | 'canceled' | 'in-progress';
  type: 'video' | 'phone' | 'in-person';
  notes?: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory: string[];
  allergies: string[];
  currentMedications: string[];
}

// Mock appointments for today
export const todaysAppointments: Appointment[] = [
  {
    id: 'apt1',
    patientId: 'p1',
    patientName: 'James Patelyaha',
    date: '2025-06-09',
    startTime: '11:00',
    endTime: '11:30',
    status: 'finished',
    type: 'video',
    notes: 'Follow-up consultation'
  },
  {
    id: 'apt2',
    patientId: 'p2',
    patientName: 'Fatima Hussein',
    date: '2025-06-09',
    startTime: '11:30',
    endTime: '12:00',
    status: 'finished',
    type: 'video'
  },
  {
    id: 'apt3',
    patientId: 'p3',
    patientName: 'David Johnson',
    date: '2025-06-09',
    startTime: '13:00',
    endTime: '13:30',
    status: 'waiting',
    type: 'video'
  },
  {
    id: 'apt4',
    patientId: 'p4',
    patientName: 'Hiroshi Tanaka',
    date: '2025-06-09',
    startTime: '13:30',
    endTime: '14:00',
    status: 'waiting',
    type: 'phone'
  },
  {
    id: 'apt5',
    patientId: 'p5',
    patientName: 'Chloe Adams',
    date: '2025-06-09',
    startTime: '14:00',
    endTime: '14:30',
    status: 'canceled',
    type: 'video'
  },
  {
    id: 'apt6',
    patientId: 'p6',
    patientName: 'Aisha Khan',
    date: '2025-06-09',
    startTime: '14:30',
    endTime: '15:00',
    status: 'canceled',
    type: 'in-person'
  },
  {
    id: 'apt7',
    patientId: 'p7',
    patientName: 'Arjun Patel',
    date: '2025-06-09',
    startTime: '15:00',
    endTime: '15:30',
    status: 'waiting',
    type: 'video'
  }
];

// Enhanced patient data
export const mockPatientsDetailed: Patient[] = [
  {
    id: 'p1',
    name: 'James Patelyaha',
    email: 'james.patelyaha@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1980-01-01',
    gender: 'Male',
    address: '123 Main St, San Francisco, CA 94102',
    emergencyContact: {
      name: 'Sarah Patelyaha',
      phone: '+1 (555) 123-4568',
      relationship: 'Spouse'
    },
    medicalHistory: ['Hypertension', 'Type 2 Diabetes'],
    allergies: ['Penicillin'],
    currentMedications: ['Metformin 500mg', 'Lisinopril 10mg']
  },
  {
    id: 'p2',
    name: 'Fatima Hussein',
    email: 'fatima.hussein@email.com',
    phone: '+1 (555) 234-5678',
    dateOfBirth: '1980-01-01',
    gender: 'Female',
    address: '456 Oak Ave, San Francisco, CA 94103',
    emergencyContact: {
      name: 'Ahmed Hussein',
      phone: '+1 (555) 234-5679',
      relationship: 'Brother'
    },
    medicalHistory: ['Asthma'],
    allergies: ['Shellfish'],
    currentMedications: ['Albuterol inhaler']
  },
  {
    id: 'p3',
    name: 'David Johnson',
    email: 'david.johnson@email.com',
    phone: '+1 (555) 345-6789',
    dateOfBirth: '1980-01-01',
    gender: 'Male',
    address: '789 Pine St, San Francisco, CA 94104',
    emergencyContact: {
      name: 'Lisa Johnson',
      phone: '+1 (555) 345-6790',
      relationship: 'Wife'
    },
    medicalHistory: ['High cholesterol'],
    allergies: ['None known'],
    currentMedications: ['Atorvastatin 20mg']
  },
  {
    id: 'p4',
    name: 'Hiroshi Tanaka',
    email: 'hiroshi.tanaka@email.com',
    phone: '+1 (555) 456-7890',
    dateOfBirth: '1980-01-01',
    gender: 'Male',
    address: '321 Elm St, San Francisco, CA 94105',
    emergencyContact: {
      name: 'Yuki Tanaka',
      phone: '+1 (555) 456-7891',
      relationship: 'Wife'
    },
    medicalHistory: [],
    allergies: ['Latex'],
    currentMedications: []
  },
  {
    id: 'p5',
    name: 'Chloe Adams',
    email: 'chloe.adams@email.com',
    phone: '+1 (555) 567-8901',
    dateOfBirth: '1980-01-01',
    gender: 'Female',
    address: '654 Birch Ln, San Francisco, CA 94106',
    emergencyContact: {
      name: 'Michael Adams',
      phone: '+1 (555) 567-8902',
      relationship: 'Husband'
    },
    medicalHistory: ['Anxiety', 'Depression'],
    allergies: ['Sulfa drugs'],
    currentMedications: ['Sertraline 50mg']
  },
  {
    id: 'p6',
    name: 'Aisha Khan',
    email: 'aisha.khan@email.com',
    phone: '+1 (555) 678-9012',
    dateOfBirth: '1980-01-01',
    gender: 'Female',
    address: '987 Cedar Dr, San Francisco, CA 94107',
    emergencyContact: {
      name: 'Omar Khan',
      phone: '+1 (555) 678-9013',
      relationship: 'Husband'
    },
    medicalHistory: ['Migraine'],
    allergies: ['Ibuprofen'],
    currentMedications: ['Sumatriptan 50mg']
  },
  {
    id: 'p7',
    name: 'Arjun Patel',
    email: 'arjun.patel@email.com',
    phone: '+1 (555) 789-0123',
    dateOfBirth: '1980-01-01',
    gender: 'Male',
    address: '147 Maple Way, San Francisco, CA 94108',
    emergencyContact: {
      name: 'Priya Patel',
      phone: '+1 (555) 789-0124',
      relationship: 'Wife'
    },
    medicalHistory: ['Back pain'],
    allergies: ['None known'],
    currentMedications: ['Ibuprofen 400mg as needed']
  }
];

export const mockPatients = [
    {
        id: "p1",
        mrn: "MRN123",
        name: "James Miller",
        dob: "1985-03-15",
        gender: "Male",
        diagnosis: "Stroke",
        strokeOnset: "2023-01-15",
        status: "Active",
    },
    {
        id: "p2",
        mrn: "MRN124",
        name: "Fatima Hussein",
        dob: "1992-12-18",
        gender: "Female",
        diagnosis: "Stroke",
        strokeOnset: "2022-11-10",
        status: "Active",
    },
    {
        id: "p3",
        mrn: "MRN125",
        name: "David Johnson",
        dob: "1965-09-03",
        gender: "Male",
        diagnosis: "Stroke",
        strokeOnset: "2021-06-20",
        status: "Inactive",
    },
]

export const mockExerciseHistory = {
    p1: [
        {
            id: "ex1",
            taskName: "Arm Raise",
            status: "active",
            frequency: "daily",
            progress: 80,
            lastAttempt: "2024-06-01T10:00:00Z",
            averageTime: 120,
        },
        {
            id: "ex2",
            taskName: "Leg Stretch",
            status: "inactive",
            frequency: "weekly",
            progress: 60,
            lastAttempt: "2024-05-28T10:00:00Z",
            averageTime: 180,
        },
    ],
    p2: [
        {
            id: "ex3",
            taskName: "Grip Strength",
            status: "active",
            frequency: "daily",
            progress: 90,
            lastAttempt: "2024-06-02T09:00:00Z",
            averageTime: 100,
        },
        {
            id: "ex6",
            taskName: "Shoulder Flexion",
            status: "active",
            frequency: "weekly",
            progress: 75,
            lastAttempt: "2024-06-03T11:00:00Z",
            averageTime: 110,
        },
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
}

export const mockCalendarEvents = [
    {
        id: "ev1",
        therapistId: "t1",
        title: "Patient Chat: James Miller",
        type: "chat",
        start: "2024-06-02T14:00:00Z",
        end: "2024-06-02T14:30:00Z",
        notes: "Discuss progress",
    },
    {
        id: "ev2",
        therapistId: "t1",
        title: "Team Meeting",
        type: "meeting",
        start: "2024-06-03T10:00:00Z",
        end: "2024-06-03T11:00:00Z",
        notes: "Weekly sync",
    },
]

// Mock API functions
export function getPatientsForTherapist(therapistId: string) {
    // In a real app, filter by therapistId
    return mockPatients
}

export function getPatientProfile(patientId: string) {
    return mockPatients.find((p) => p.id === patientId)
}

export function getExerciseHistory(patientId: string) {
    return (mockExerciseHistory as Record<string, any>)[patientId] || []
}

export function getTherapistCalendar(therapistId: string) {
    // In a real app, filter by therapistId
    return mockCalendarEvents
} 