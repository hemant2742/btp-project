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
      <h1 className="university-name text-3xl font-bold">CSJM University,Kanpur</h1>
      <h2 className="exam-name text-2xl font-bold">Exam: Mid Semester Examination </h2>
      <div className="student-details">
        <h3 className="text-center text-xl font-bold">Student Details</h3>
        <p>
          <strong>Name: </strong>
          {marksheetData["name"]}
        </p>
        <p>
          <strong>Roll No:</strong>
          {marksheetData["roll number"]}
        </p>
        <p>
          <strong>Father's Name:</strong>
          {marksheetData["father name"]}
        </p>
        <p>
          <strong>Session:</strong>
          {marksheetData["session"]}
        </p>
        <p>
          <strong>Branch:</strong>
          {marksheetData["branch"]}
        </p>
        <p>
          <strong>Year:</strong>
          {marksheetData["year"]}
        </p>
      </div>
      <h3 className="text-center text-xl font-bold mb-4">Grade Report</h3>
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
