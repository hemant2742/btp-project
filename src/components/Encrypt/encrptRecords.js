// EncryptedRecords.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentRecordForm from '../encode_form/student_recordForm';
import { Button } from 'react-bootstrap';

import './encryptRecods.css';

const EncryptedRecords = () => {
    const [studentData, setStudentData] = useState([]);
    const [encryptClicked, setEncryptClicked] = useState(false);
    console.log(encryptClicked);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/records/records');
            setStudentData(response.data.records);
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    };

    const handleGradeChange = (e, index, subjectIndex) => {
        console.log(e.target.value, index);
        const body = {
            rollNumber: studentData[index].rollNumber,
            subject: studentData[index].subject[subjectIndex].name,
            grade: e.target.value
        };
        console.log(body)

        const token = localStorage.getItem('token');

        axios.post('http://localhost:5000/api/v1/records/update', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };


    const handleOnEncrypt = () => {
        setEncryptClicked(true);
        localStorage.setItem("isEncryptClicked", true);
    }

    return (
        <div className='main-content'>
            <div className='student-record-container'>
                {Array.isArray(studentData) && studentData.map((data, studentIndex) => (
                    <StudentRecordForm
                        key={studentIndex}
                        data={data}
                        onGradeChange={(e, subjectIndex) => handleGradeChange(e, studentIndex, subjectIndex)}
                        encryptClicked={encryptClicked}
                    />
                ))}
            </div>
            <div className='d-flex justify-center align-center mb-4'>
                <Button variant="primary" type="submit"
                    onClick={handleOnEncrypt}
                >
                    Encrypt Records
                </Button>
            </div>
        </div>
    );
};

export default EncryptedRecords;
