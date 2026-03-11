import React, { useState, useEffect } from 'react';
import './App.css';

import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';

import Courses from './pages/Courses';
import RegisterCourse from './pages/RegisterCourse';
import MyCourses from './pages/MyCourses';

function App() {

  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState("students");

  // Fetch all students
  const fetchStudents = async () => {
    setLoading(true);
    try {

      const response = await fetch('/api/students');

      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      }

    } catch (error) {

      console.error('Error fetching students:', error);

    }

    setLoading(false);
  };

  // Initial load
  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle form submission
  const handleFormSubmit = async (formData) => {

    try {

      const url = selectedStudent
        ? `/api/students/${selectedStudent._id}`
        : '/api/students';

      const method = selectedStudent ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {

        setShowForm(false);
        setSelectedStudent(null);
        fetchStudents();

        alert(selectedStudent ? 'Student updated!' : 'Student created!');

      }

    } catch (error) {

      console.error('Error submitting form:', error);
      alert('Error saving student');

    }

  };

  // Handle delete
  const handleDelete = async (id) => {

    if (window.confirm('Are you sure you want to delete this student?')) {

      try {

        const response = await fetch(`/api/students/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {

          fetchStudents();
          alert('Student deleted!');

        }

      } catch (error) {

        console.error('Error deleting student:', error);
        alert('Error deleting student');

      }

    }

  };

  // Handle edit
  const handleEdit = (student) => {

    setSelectedStudent(student);
    setShowForm(true);

  };

  // Handle form close
  const handleFormClose = () => {

    setShowForm(false);
    setSelectedStudent(null);

  };

  return (

    <div className="App">

      <header className="App-header">

        <h1>📚 Student Management System</h1>
        <p>Manage your students efficiently</p>

      </header>

      <main className="App-main">

        <div className="button-group">

          <button
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            + Add New Student
          </button>

          <button
            className="btn btn-secondary"
            onClick={fetchStudents}
          >
            🔄 Refresh
          </button>

          {/* NEW FEATURES */}

          <button
            className="btn btn-secondary"
            onClick={() => setPage("students")}
          >
            🎓 Students
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => setPage("courses")}
          >
            📘 Courses
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => setPage("register")}
          >
            📝 Register Course
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => setPage("mycourses")}
          >
            📚 My Courses
          </button>

        </div>

        {/* Student Form */}

        {showForm && (

          <StudentForm
            student={selectedStudent}
            onSubmit={handleFormSubmit}
            onCancel={handleFormClose}
          />

        )}

        {/* PAGE SWITCHING */}

        {page === "students" && (

          loading ? (
            <div className="loading">Loading students...</div>
          ) : (
            <StudentList
              students={students}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )

        )}

        {page === "courses" && <Courses />}

        {page === "register" && <RegisterCourse />}

        {page === "mycourses" && <MyCourses />}

      </main>

      <footer className="App-footer">

        <p>&copy; 2026 Student Management System. All rights reserved.</p>

      </footer>

    </div>

  );

}

export default App;
