# Deployment Guide

## Vercel Deployment (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on every push to main

### Environment Variables for Vercel:
```
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-secret-key
DATABASE_URL=your-database-connection-string
```

## Docker Deployment

1. Build the Docker image:
```bash
docker build -t reia-telemedicine .
```

2. Run the container:
```bash
docker run -p 3000:3000 \
  -e NEXTAUTH_URL=https://your-domain.com \
  -e NEXTAUTH_SECRET=your-secret-key \
  -e DATABASE_URL=your-database-url \
  reia-telemedicine
```

## AWS Deployment

### Using AWS Amplify
1. Connect GitHub repository
2. Configure build settings
3. Set environment variables
4. Deploy

### Using AWS ECS
1. Build and push Docker image to ECR
2. Create ECS task definition
3. Deploy to ECS cluster

## Environment Configuration

### Required Variables
- `NEXTAUTH_URL`: Full URL of your application
- `NEXTAUTH_SECRET`: Random string for JWT signing
- `DATABASE_URL`: Database connection string

### Optional Variables
- `NODE_ENV`: Set to 'production' for production builds
- `PORT`: Port number (default: 3000)

## Health Checks

The application provides a health check endpoint at `/api/health`:

```json
{
  "status": "healthy",
  "timestamp": "2025-01-01T00:00:00.000Z",
  "version": "1.0.0"
}
```

## SSL/HTTPS

Ensure your deployment includes SSL certificates for secure communication, especially important for healthcare data.

## Database Migration

Before deploying, ensure your database schema is up to date:

```bash
npm run db:migrate
```

## Monitoring

Set up monitoring for:
- Application uptime
- Response times
- Database connections
- Error rates

## Security Considerations

- Use HTTPS in production
- Set secure headers
- Configure CORS properly
- Use environment variables for secrets
- Enable database connection pooling
- Implement rate limiting
