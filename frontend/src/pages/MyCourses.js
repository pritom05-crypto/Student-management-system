import React, { useState } from "react";
import axios from "axios";

function MyCourses(){

  const [courses,setCourses] = useState([]);

  const loadCourses = async () => {

    const studentId = prompt("Enter Student ID");

    const res = await axios.get(
      "http://18.116.46.164:5000/api/student-courses/" + studentId
    );

    setCourses(res.data);

  };

  return(

    <div style={{padding:"20px"}}>

      <h2>My Registered Courses</h2>

      <button onClick={loadCourses}>
        Load My Courses
      </button>

      <ul>

        {courses.map(c => (

          <li key={c._id}>
            {c.courseId.courseCode} - {c.courseId.courseName}
          </li>

        ))}

      </ul>

    </div>

  );
}

export default MyCourses;
