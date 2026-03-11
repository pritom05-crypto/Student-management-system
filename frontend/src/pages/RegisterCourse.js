import React, { useEffect, useState } from "react";
import axios from "axios";

function RegisterCourse() {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const res = await axios.get("http://18.116.46.164:5000/api/courses");
    setCourses(res.data);
  };

  const registerCourse = async (courseId) => {

    const studentId = prompt("Enter Student ID");

    await axios.post("http://18.116.46.164:5000/api/register-course",{
      studentId: studentId,
      courseId: courseId,
      semester: "Spring 2026"
    });

    alert("Course Registered Successfully");

  };

  return (
    <div style={{padding:"20px"}}>

      <h2>Course Registration</h2>

      {courses.map(course => (

        <div key={course._id} style={{marginBottom:"10px"}}>

          <b>{course.courseCode}</b> - {course.courseName}

          <button
            style={{marginLeft:"10px"}}
            onClick={() => registerCourse(course._id)}
          >
            Register
          </button>

        </div>

      ))}

    </div>
  );
}

export default RegisterCourse;
