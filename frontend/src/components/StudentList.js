import React from 'react';
import './StudentList.css';

function StudentList({ students, onEdit, onDelete }) {
  if (students.length === 0) {
    return (
      <div className="no-students">
        <p>No students found. Add a new student to get started!</p>
      </div>
    );
  }

  return (
    <div className="student-list">
      <table className="students-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roll Number</th>
            <th>Course</th>
            <th>GPA</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id} className="student-row">
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.rollNumber}</td>
              <td>{student.course}</td>
              <td>{student.gpa ? student.gpa.toFixed(2) : 'N/A'}</td>
              <td>{student.phone}</td>
              <td className="actions">
                <button
                  className="btn btn-edit"
                  onClick={() => onEdit(student)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(student._id)}
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
