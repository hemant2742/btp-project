import React from "react";
import "./marksheet.css"; // Import the CSS file for marksheet styles

const Marksheet = (
  {
    //   universityName,
    //   examName,
    //   studentName,
    //   rollNo,
    //   fatherName,
    //   session,
    //   branch,
    //   year,
    //   subjects,
    //   totalMarks,
  }
) => {
  const student = {
    name: "John Doe",
    rollNo: "2021001",
    fatherName: "Robert Doe",
    session: "2021-2022",
    branch: "Computer Science",
    year: "Final Year",
    subjects: [
      { name: "Mathematics", marks: 90 },
      { name: "Science", marks: 85 },
      { name: "English", marks: 95 },
    ],
    totalMarks: 270,
  };

  return (
    <div className="marksheet-page">
      <h1 className="university-name">CSJM University,Kanpur</h1>
      <h2 className="exam-name">Exam: Mid Semester Examination </h2>
      <div className="student-details">
        <h3>Student Details</h3>
        <p>
          <strong>Name: Vibhanshu Pandey</strong>
        </p>
        <p>
          <strong>Roll No:CSJMA19001390059</strong>
        </p>
        <p>
          <strong>Father's Name:Parmatma Pandey</strong>
        </p>
        <p>
          <strong>Session:2022-23</strong>
        </p>
        <p>
          <strong>Branch:Computer Science and Engineering</strong>
        </p>
        <p>
          <strong>Year:2019</strong>
        </p>
      </div>
      <table className="marks-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {student.subjects.map((subject, index) => (
            <tr key={index}>
              <td>{subject.name}</td>
              <td>{subject.marks}</td>
            </tr>
          ))}
          <tr>
            <td>Total Marks:</td>
            <td>{student.totalMarks}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Marksheet;
