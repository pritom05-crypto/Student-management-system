db.createCollection('students');
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
