# REIA Telemedicine Platform - Setup Guide

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy environment variables: `cp .env.example .env`
4. Fill in your environment variables

## Development

```bash
npm run dev
```

Opens on http://localhost:3000

## Production Build

```bash
npm run build
npm start
```

## Environment Variables

See `.env.example` for required variables.

### Authentication
- `NEXTAUTH_URL`: Your application URL
- `NEXTAUTH_SECRET`: Random secret for JWT signing

### Database
- `DATABASE_URL`: Database connection string

## Architecture

This is a Next.js 15 application with:
- TypeScript for type safety
- Tailwind CSS for styling
- NextAuth.js for authentication
- Context providers for state management

## Features

- Doctor dashboard with patient appointments
- Video meeting interface
- Appointment scheduling system
- Patient management
- Responsive design
- Real-time status updates
