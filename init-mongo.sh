#!/bin/bash

# Wait for MongoDB to be ready
echo "Waiting for MongoDB to be ready..."
sleep 10

# Create the database and collections
mongosh --eval "
  db = db.getSiblingDB('student-management');
  
  // Create students collection with schema validation
  db.createCollection('students', {
    validator: {
      \$jsonSchema: {
        bsonType: 'object',
        required: ['name', 'email', 'phone', 'rollNumber', 'course'],
        properties: {
          _id: { bsonType: 'objectId' },
          name: { bsonType: 'string' },
          email: { bsonType: 'string' },
          phone: { bsonType: 'string' },
          rollNumber: { bsonType: 'string' },
          course: { bsonType: 'string' },
          enrollmentDate: { bsonType: 'date' },
          gpa: { bsonType: 'double', minimum: 0, maximum: 4.0 },
          address: { bsonType: 'string' },
          createdAt: { bsonType: 'date' },
          updatedAt: { bsonType: 'date' }
        }
      }
    }
  });

  // Create indexes
  db.students.createIndex({ email: 1 }, { unique: true });
  db.students.createIndex({ rollNumber: 1 }, { unique: true });
  db.students.createIndex({ name: 'text' });

  // Insert sample data
  db.students.insertMany([
    {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      rollNumber: 'STU001',
      course: 'Computer Science',
      gpa: 3.8,
      address: '123 Main Street',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '0987654321',
      rollNumber: 'STU002',
      course: 'Information Technology',
      gpa: 3.9,
      address: '456 Oak Avenue',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  print('Database initialized successfully');
" --username admin --password password --authenticationDatabase admin
