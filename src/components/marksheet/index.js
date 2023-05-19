import React from "react";
import "./marksheet.css"; // Import the CSS file for marksheet styles

const Marksheet = ({ marksheetData, marksheetSubjectData }) => {
  const sheetDatakeys = Object.keys(marksheetSubjectData);
  const sheetDataValues = Object.values(marksheetSubjectData);

  const initialValue = 0;
  const sumWithInitial = sheetDataValues.reduce(
    (accumulator, currentValue) => accumulator + parseInt(currentValue),
    initialValue
  );

  return (
    <div className="marksheet-page">
      <h1 className="university-name">CSJM University,Kanpur</h1>
      <h2 className="exam-name">Exam: Mid Semester Examination </h2>
      <div className="student-details">
        <h3>Student Details</h3>
        <p>
          <strong>Name: </strong>
          {marksheetData["name"]}
        </p>
        <p>
          <strong>Roll No:</strong>
          {marksheetData["roll number"]}
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
          {sheetDatakeys.map((item, index) => (
            <tr key={index}>
              <td>{item.toUpperCase()}</td>
              <td>{sheetDataValues[index]}</td>
            </tr>
          ))}
          <tr>
            <td>Total Marks: </td>
            <td>{sumWithInitial}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Marksheet;
