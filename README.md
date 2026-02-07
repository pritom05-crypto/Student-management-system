# Student Management System

A comprehensive student management system built with Node.js, Express, and MongoDB, fully containerized with Docker.

## Features

- ✅ Create, Read, Update, and Delete (CRUD) students
- ✅ MongoDB database for persistent data storage
- ✅ RESTful API endpoints
- ✅ Docker and Docker Compose support
- ✅ Health check endpoints
- ✅ CORS enabled for cross-origin requests
- ✅ Environment-based configuration

## Project Structure

```
student-management-system/
├── server.js              # Main application server
├── package.json           # Node.js dependencies
├── Dockerfile             # Docker image configuration
├── docker-compose.yml     # Docker Compose services configuration
├── .env                   # Environment variables
├── init-mongo.js          # MongoDB initialization script
└── README.md              # This file
```

## Prerequisites

- Docker (v20.10+)
- Docker Compose (v1.29+)
- Or Node.js 18+ and MongoDB 6.0+ for local development

## Quick Start with Docker

### 1. Build and Run Services

```bash
docker-compose up --build
```

This will:
- Build the Node.js application image
- Start MongoDB service with initialized data
- Start the Express API server
- Expose MongoDB on port 27017
- Expose API on port 5000

### 2. Test the API

Once the containers are running, test the API:

```bash
# Get all students
curl http://localhost:5000/api/students

# Get health status
curl http://localhost:5000/health

# Create a new student
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "phone": "5555555555",
    "rollNumber": "STU003",
    "course": "Engineering",
    "gpa": 3.7,
    "address": "789 Pine Road"
  }'

# Get a specific student (replace ID with actual MongoDB ObjectId)
curl http://localhost:5000/api/students/<student_id>

# Update a student
curl -X PUT http://localhost:5000/api/students/<student_id> \
  -H "Content-Type: application/json" \
  -d '{
    "gpa": 3.85
  }'

# Delete a student
curl -X DELETE http://localhost:5000/api/students/<student_id>
```

## Local Development (Without Docker)

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up MongoDB

Ensure MongoDB is running on localhost:27017 or update `.env` with your MongoDB URI.

### 3. Run the Server

```bash
npm run dev
```

The server will start on http://localhost:5000

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students |
| GET | `/api/students/:id` | Get a specific student |
| POST | `/api/students` | Create a new student |
| PUT | `/api/students/:id` | Update a student |
| DELETE | `/api/students/:id` | Delete a student |
| GET | `/health` | Health check |

## Student Data Model

```json
{
  "_id": "ObjectId",
  "name": "String (required)",
  "email": "String (required, unique)",
  "phone": "String (required)",
  "rollNumber": "String (required, unique)",
  "course": "String (required)",
  "enrollmentDate": "Date (default: now)",
  "gpa": "Number (0-4.0)",
  "address": "String",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Environment Variables

- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `NODE_ENV`: Environment (development/production)

## Docker Commands

### Start Services
```bash
docker-compose up
```

### Start in Background
```bash
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f
```

### View Specific Service Logs
```bash
docker-compose logs -f app
docker-compose logs -f mongodb
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB container is healthy: `docker-compose logs mongodb`
- Check connection string in `.env` matches docker-compose configuration
- Wait for health check to pass before app starts

### Port Already in Use
- Change ports in `docker-compose.yml`
- Or stop existing containers: `docker-compose down`

### Rebuild After Code Changes
```bash
docker-compose up --build
```

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration

## License

MIT License

## Support

For issues or questions, please refer to the documentation or contact the development team.
