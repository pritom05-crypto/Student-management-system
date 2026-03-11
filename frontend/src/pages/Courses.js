import React, { useEffect, useState } from "react";
import axios from "axios";

function Courses() {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await axios.get("http://18.116.46.164:5000/api/courses");
    setCourses(res.data);
  };

  return (
    <div style={{padding:"20px"}}>
      <h2>Available Courses</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Name</th>
            <th>Credit</th>
            <th>Department</th>
          </tr>
        </thead>

        <tbody>
          {courses.map(course => (
            <tr key={course._id}>
              <td>{course.courseCode}</td>
              <td>{course.courseName}</td>
              <td>{course.credit}</td>
              <td>{course.department}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default Courses;
