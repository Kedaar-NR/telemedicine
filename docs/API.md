# REIA Telemedicine API Documentation

## Authentication Endpoints

### POST /api/auth/signin
Sign in a healthcare provider

**Request Body:**
```json
{
  "email": "doctor@example.com",
  "password": "password"
}
```

**Response:**
```json
{
  "user": {
    "id": "user_id",
    "email": "doctor@example.com", 
    "name": "Dr. Smith"
  },
  "accessToken": "jwt_token"
}
```

### POST /api/auth/signout
Sign out current user

## Patient Endpoints

### GET /api/patients
Get list of patients for current provider

**Response:**
```json
{
  "patients": [
    {
      "id": "p1",
      "name": "James Patelyaha",
      "email": "james@example.com",
      "phone": "+1234567890",
      "dateOfBirth": "1980-01-01",
      "gender": "Male"
    }
  ]
}
```

### GET /api/patients/:id
Get specific patient details

**Response:**
```json
{
  "id": "p1",
  "name": "James Patelyaha",
  "medicalHistory": ["Hypertension"],
  "allergies": ["Penicillin"],
  "currentMedications": ["Metformin 500mg"]
}
```

## Appointment Endpoints

### GET /api/appointments
Get appointments for current provider

**Query Parameters:**
- `date`: Filter by date (YYYY-MM-DD)
- `status`: Filter by status (waiting, finished, canceled)

**Response:**
```json
{
  "appointments": [
    {
      "id": "apt1",
      "patientId": "p1",
      "patientName": "James Patelyaha",
      "date": "2025-06-09",
      "startTime": "11:00",
      "endTime": "11:30",
      "status": "waiting",
      "type": "video"
    }
  ]
}
```

### POST /api/appointments
Create new appointment

**Request Body:**
```json
{
  "patientId": "p1",
  "date": "2025-06-09",
  "startTime": "14:00",
  "endTime": "14:30",
  "type": "video",
  "notes": "Follow-up consultation"
}
```

### PUT /api/appointments/:id
Update appointment status

**Request Body:**
```json
{
  "status": "finished",
  "notes": "Patient responded well to treatment"
}
```

## Video Meeting Endpoints

### POST /api/meetings/start
Start video meeting for appointment

**Request Body:**
```json
{
  "appointmentId": "apt1"
}
```

**Response:**
```json
{
  "meetingUrl": "https://meet.reia.com/room/12345",
  "roomId": "12345"
}
```

### POST /api/meetings/end
End video meeting

**Request Body:**
```json
{
  "meetingId": "12345",
  "duration": 1800,
  "notes": "Meeting completed successfully"
}
```

## Error Responses

All endpoints return errors in this format:

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request was invalid",
    "details": "Additional error details"
  }
}
```

## HTTP Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error
