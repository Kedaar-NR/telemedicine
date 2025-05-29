// Mock data and API functions for the physiotherapy portal

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
    return mockExerciseHistory[patientId] || []
}

export function getTherapistCalendar(therapistId: string) {
    // In a real app, filter by therapistId
    return mockCalendarEvents
} 