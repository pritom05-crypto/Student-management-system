# Student Management System

A comprehensive full-stack student management system built with React, Node.js, Express, and MongoDB, fully containerized with Docker for easy deployment on AWS EC2.

## Features

- ✅ **Frontend**: React SPA with modern UI (Tailwind-inspired styling)
- ✅ **Backend**: RESTful API with Node.js and Express
- ✅ **Database**: MongoDB with persistent storage
- ✅ **Docker**: Both frontend and backend containerized
- ✅ **Nginx**: Reverse proxy for single-port access
- ✅ **CRUD Operations**: Complete student management
- ✅ **AWS EC2 Ready**: Optimized for cloud deployment
- ✅ **Health Checks**: Built-in service monitoring
- ✅ **Responsive Design**: Mobile-friendly UI

## Project Structure

```
student-management-system/
├── server.js                    # Backend Express server
├── package.json                 # Backend dependencies
├── Dockerfile                   # Backend Docker configuration
├── init-mongo.sh               # MongoDB initialization
├── frontend/
│   ├── src/
│   │   ├── App.js              # Main React component
│   │   ├── App.css             # Styling
│   │   ├── index.js            # React entry point
│   │   └── components/
│   │       ├── StudentList.js   # Student list component
│   │       ├── StudentForm.js   # Add/Edit form component
│   │       └── *.css           # Component styles
│   ├── public/
│   │   └── index.html          # HTML template
│   ├── package.json            # Frontend dependencies
│   ├── Dockerfile              # Frontend Docker config
│   └── nginx.conf              # Frontend Nginx config
├── docker-compose.yml          # Multi-port setup (dev)
├── docker-compose.prod.yml     # Single-port setup (prod)
├── nginx.conf                  # Main Nginx config
├── .env                        # Environment variables
└── README.md                   # This file
```

## Prerequisites

- Docker (v20.10+)
- Docker Compose (v1.29+)
- AWS EC2 instance (optional)
- Node.js 18+ and MongoDB 6.0+ for local development (optional)

## Quick Start (Development - Multi-Port)

### 1. Build and Run Services

```bash
cd student-management-system
docker-compose up --build
```

This will:
- Build Frontend and Backend images
- Start MongoDB service with initialized data
- Start the Express API server
- Start React frontend
- Setup internal Docker network

### 2. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health**: http://localhost:5000/health
- **MongoDB**: localhost:27017 (internal only)

### 3. Test the Application

Open http://localhost:3000 in your browser and:
- View all students
- Add a new student
- Edit existing students
- Delete students

## Production Setup (AWS EC2 - Single Port)

### 1. Build and Run with Nginx Reverse Proxy

```bash
docker-compose -f docker-compose.prod.yml up --build
```

### 2. Access the Application

- **Frontend & API**: http://your-ec2-ip:80
  - Frontend routes: `/`
  - API routes: `/api/*`
  - Health check: `/health`


## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students |
| GET | `/api/students/:id` | Get a specific student |
| POST | `/api/students` | Create a new student |
| PUT | `/api/students/:id` | Update a student |
| DELETE | `/api/students/:id` | Delete a student |

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

Create or modify `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://admin:password@mongodb:27017/student-management?authSource=admin
NODE_ENV=production
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password
MONGO_INITDB_DATABASE=student-management
```

⚠️ **For production**: Change default passwords and use AWS Secrets Manager.

## Docker Commands

### Start All Services
```bash
docker-compose up -d
```

### Start with Nginx (Single Port)
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### View Logs
```bash
docker-compose logs -f
docker-compose logs -f app
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### Stop Services
```bash
docker-compose down
```

### Remove All Data (Including MongoDB)
```bash
docker-compose down -v
```

### Rebuild Images
```bash
docker-compose up --build -d
```

### Connect to MongoDB
```bash
docker exec -it student-management-mongodb mongosh -u admin -p password
```

## AWS EC2 Deployment

### Prerequisites
- Ubuntu 22.04 LTS or Amazon Linux 2 EC2 instance
- Security Group allowing:
  - Port 80 (HTTP)
  - Port 443 (HTTPS - optional)
  - Port 22 (SSH)

### Step 1: Install Docker

**For Ubuntu 22.04:**
```bash
sudo apt-get update
sudo apt-get install docker.io docker-compose-v2 -y
sudo usermod -a -G docker $USER
logout  # Log out and back in
```

**For Amazon Linux 2:**
```bash
sudo yum install docker -y
sudo service docker start
sudo usermod -a -G docker ec2-user
logout  # Log out and back in
```

### Step 2: Clone Repository

```bash
git clone <your-repo-url>
cd student-management-system
```

### Step 3: Update Environment Variables

```bash
nano .env
```

Update with secure credentials for production.

### Step 4: Start Services

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Step 5: Verify Deployment

```bash
# Check running containers
docker-compose -f docker-compose.prod.yml ps

# Test frontend
curl http://localhost/

# Test API
curl http://localhost/api/students

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

## Advanced Configuration

### Use MongoDB Atlas

Replace `MONGODB_URI` in `.env`:

```env
MONGODB_URI=mongodb+srv://username:password@your-cluster.mongodb.net/student-management
```

### Use AWS RDS MongoDB

```env
MONGODB_URI=mongodb://admin:password@your-rds-endpoint:27017/student-management
```

### HTTPS with Let's Encrypt

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx -y

# Get certificate
sudo certbot certonly --standalone -d your-domain.com

# Update nginx.conf with SSL certificates
```

## Troubleshooting

### Containers Not Starting

```bash
# Check logs
docker-compose logs -f

# Verify MongoDB is healthy
docker-compose ps

# Wait 40+ seconds for MongoDB healthcheck
```

### Port Already in Use

```bash
# Find process using port
sudo lsof -i :80
sudo lsof -i :3000
sudo lsof -i :5000

# Kill process
sudo kill -9 <PID>
```

### API Connection Issues

```bash
# Test backend from frontend container
docker exec student-management-frontend curl http://app:5000/health

# Check network
docker network ls
docker network inspect student-management_student-network
```

### MongoDB Connection Failed

```bash
# Check MongoDB logs
docker logs student-management-mongodb

# Verify credentials
docker exec student-management-mongodb mongosh -u admin -p password --authenticationDatabase admin
```

## Development Workflow

### Local Development (Without Docker)

```bash
# Backend
npm install
npm run dev

# Frontend (separate terminal)
cd frontend
npm install
npm start
```

### Update Code and Restart

```bash
# After code changes
docker-compose up --build
```

## Production Best Practices

1. **Use Environment Secrets**
  ```bash
  aws secretsmanager create-secret --name student-db-password
  ```

2. **Enable HTTPS**
  - Use AWS ALB/NLB with SSL
  - Or use Let's Encrypt with Certbot

3. **Monitor Logs**
  ```bash
  docker-compose logs --tail=100 -f
  ```

4. **Backup MongoDB**
  ```bash
  docker exec student-management-mongodb mongodump --username admin --password password --authenticationDatabase admin --out /backup
  ```

5. **Use Auto-scaling Groups**
  - Use AWS ECS for better container orchestration
  - Configure auto-scaling policies

## Performance Tips

- Frontend Nginx caching for static assets (configured in nginx.conf)
- MongoDB indexes on email and rollNumber for fast lookups
- API response compression (add gzip to Express)
- CDN for static assets (optional)

## Security Checklist

- [ ] Change default MongoDB credentials
- [ ] Use AWS Secrets Manager or environment variables
- [ ] Enable HTTPS/SSL
- [ ] Restrict Security Group to required ports
- [ ] Enable MongoDB authentication
- [ ] Regular database backups
- [ ] Monitor CloudWatch logs
- [ ] Use IAM roles for EC2 instances

## Technologies Used

- **Frontend**: React 18, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MongoDB 6.0
- **Web Server**: Nginx
- **Containerization**: Docker, Docker Compose
- **Cloud**: AWS EC2

## License

MIT License

## Support


For detailed AWS EC2 deployment steps, see [AWS_EC2_DEPLOYMENT.md](AWS_EC2_DEPLOYMENT.md)

For issues or questions, please refer to the documentation or contact the development team.
