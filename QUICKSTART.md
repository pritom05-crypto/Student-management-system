# Quick Setup Guide

## 🚀 For Local Development (Multi-Port)

```bash
# 1. Clone or navigate to project
cd student-management-system

# 2. Build and start all services
docker-compose up --build

# 3. Open in browser
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

## 🚀 For AWS EC2 (Single Port - Port 80)

```bash
# 1. On EC2 instance, install Docker
sudo apt-get update
sudo apt-get install docker.io docker-compose-v2 -y
sudo usermod -a -G docker $USER
logout  # Log out and back in

# 2. Clone repository
git clone <your-repo-url>
cd student-management-system

# 3. Update environment variables (optional)
nano .env

# 4. Start services with Nginx reverse proxy
docker-compose -f docker-compose.prod.yml up -d

# 5. Access application
# http://your-ec2-ip/
```

## 📋 File Structure for Full Stack

```
.
├── backend/
│   ├── server.js              # Express API
│   ├── package.json
│   ├── Dockerfile
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── components/
│   │   └── ...
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml         # Dev setup (ports 3000, 5000)
├── docker-compose.prod.yml    # Prod setup (port 80)
├── nginx.conf                 # Main Nginx reverse proxy
├── init-mongo.sh
├── .env
└── README.md
```

## 🔧 Services & Ports

### Development (docker-compose.yml)
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

### Production (docker-compose.prod.yml)
- Everything: http://localhost:80 (or EC2 IP)
  - Frontend: `/`
  - API: `/api/*`
  - Health: `/health`

## 📝 Key Commands

```bash
# View all running containers
docker-compose ps

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f app
docker-compose logs -f frontend
docker-compose logs -f mongodb

# Stop services
docker-compose down

# Stop and remove all data
docker-compose down -v

# Rebuild after code changes
docker-compose up --build

# Connect to MongoDB
docker exec -it student-management-mongodb mongosh -u admin -p password
```

## ✅ Testing

After starting services, test with:

```bash
# Get all students
curl http://localhost:3000/api/students          # Dev
curl http://localhost/api/students               # Prod

# Create a student
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Student",
    "email": "test@example.com",
    "phone": "1234567890",
    "rollNumber": "STU123",
    "course": "CS",
    "gpa": 3.5
  }'
```

## 🔑 Default Credentials

- MongoDB Username: `admin`
- MongoDB Password: `password`

⚠️ **Change these in `.env` for production!**

## 🐛 Troubleshooting

**Containers won't start?**
```bash
docker-compose logs -f
# Wait 40+ seconds for MongoDB healthcheck
```

**Port already in use?**
```bash
sudo lsof -i :3000   # or :5000, :80
sudo kill -9 <PID>
```

**MongoDB connection failed?**
```bash
docker logs student-management-mongodb
```

See [README.md](README.md) for detailed documentation.
