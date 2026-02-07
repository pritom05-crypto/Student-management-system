# AWS EC2 Deployment Guide

## Prerequisites

- AWS EC2 instance (Ubuntu 22.04 LTS or Amazon Linux 2)
- Security Group with ports 5000 (app) and 27017 (MongoDB) open
- SSH access to EC2 instance

## Step 1: Connect to EC2 Instance

```bash
ssh -i "your-key.pem" ec2-user@your-ec2-ip
# or for Ubuntu
ssh -i "your-key.pem" ubuntu@your-ec2-ip
```

## Step 2: Install Docker and Docker Compose

### For Amazon Linux 2:
```bash
sudo yum update -y
sudo yum install docker -y
sudo service docker start
sudo usermod -a -G docker ec2-user
```

### For Ubuntu 22.04:
```bash
sudo apt-get update
sudo apt-get install docker.io -y
sudo systemctl start docker
sudo usermod -a -G docker $USER
```

### Install Docker Compose:
```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

## Step 3: Clone or Upload Project

```bash
git clone <your-repo-url>
cd student-management-system
```

Or upload files using SCP:
```bash
scp -i "your-key.pem" -r . ec2-user@your-ec2-ip:~/student-management-system
```

## Step 4: Configure Environment Variables

Edit `.env` file for production:
```bash
nano .env
```

```env
PORT=5000
MONGODB_URI=mongodb://admin:password@mongodb:27017/student-management?authSource=admin
NODE_ENV=production
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password
MONGO_INITDB_DATABASE=student-management
```

⚠️ **Change default passwords** for production!

## Step 5: Start Services

```bash
# Log out and back in to apply Docker group permissions
logout

# Build and start containers
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

## Step 6: Verify Installation

```bash
# Check app is running
curl http://localhost:5000/health

# Get students list
curl http://localhost:5000/api/students
```

## Step 7: Setup Auto-restart (Optional)

Make Docker services restart on EC2 reboot:

```bash
# Edit docker-compose.yml and ensure restart policy is set
# Already included: restart: unless-stopped
```

## Security Best Practices for AWS

### 1. Update Security Group Rules
Only allow necessary traffic:
- Port 5000: Your IP or Load Balancer
- Port 27017: Only from app container (not public)

### 2. Use AWS Secrets Manager (Recommended)
Instead of .env file:
```bash
aws secretsmanager create-secret --name student-db-password --secret-string "your-secure-password"
```

### 3. Use MongoDB Atlas (Alternative)
Replace MongoDB container with AWS MongoDB Atlas:
```
MONGODB_URI=mongodb+srv://username:password@your-cluster.mongodb.net/student-management
```

### 4. Use RDS for MongoDB
Create RDS MongoDB cluster and update connection:
```
MONGODB_URI=mongodb://admin:password@your-rds-endpoint:27017/student-management
```

## Useful Commands

```bash
# View logs
docker-compose logs -f app
docker-compose logs -f mongodb

# Stop all services
docker-compose down

# Remove all data (WARNING)
docker-compose down -v

# Rebuild images
docker-compose up --build -d

# Connect to MongoDB shell
docker exec -it student-management-mongodb mongosh -u admin -p password

# Backup MongoDB data
docker exec student-management-mongodb mongodump --username admin --password password --authenticationDatabase admin --out /backup

# SSH into app container
docker exec -it student-management-app /bin/sh
```

## Troubleshooting

### MongoDB Connection Failed
```bash
# Check MongoDB logs
docker-compose logs mongodb

# Verify MongoDB is healthy
docker-compose ps

# Wait for healthcheck to pass (40s start period)
```

### Port Already in Use
```bash
# Change ports in docker-compose.yml
# Or kill existing process
sudo lsof -i :5000
sudo kill -9 <PID>
```

### Permissions Issues
```bash
# If Docker commands fail, log out and back in
# to apply group permissions
exit
ssh -i "your-key.pem" ec2-user@your-ec2-ip
```

## Production Deployment

For production, consider:
- Use AWS ALB/NLB for load balancing
- Use ECS instead of EC2 with docker-compose
- Use AWS RDS for MongoDB
- Enable CloudWatch monitoring
- Use IAM roles instead of hardcoded credentials
- Use VPC endpoints for private MongoDB access
- Enable auto-scaling groups

## Support

For issues, check logs with:
```bash
docker-compose logs --tail=50 -f
```
