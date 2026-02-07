import React, { useState, useEffect } from 'react';
import './StudentForm.css';

function StudentForm({ student, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    rollNumber: '',
    course: '',
    gpa: '',
    address: ''
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        email: student.email || '',
        phone: student.phone || '',
        rollNumber: student.rollNumber || '',
        course: student.course || '',
        gpa: student.gpa || '',
        address: student.address || ''
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.rollNumber || !formData.course) {
      alert('Please fill in all required fields');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="form-container">
        <h2>{student ? 'Edit Student' : 'Add New Student'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter student name"
                required
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />
            </div>
            <div className="form-group">
              <label>Roll Number *</label>
              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                placeholder="Enter roll number"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Course *</label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="Enter course"
                required
              />
            </div>
            <div className="form-group">
              <label>GPA</label>
              <input
                type="number"
                name="gpa"
                value={formData.gpa}
                onChange={handleChange}
                placeholder="Enter GPA (0-4.0)"
                min="0"
                max="4.0"
                step="0.1"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {student ? 'Update Student' : 'Create Student'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentForm;
