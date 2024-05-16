import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentRecordForm from '../encode_form/student_recordForm';
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './encryptRecods.css';

const EncryptedRecords = () => {
    const [studentData, setStudentData] = useState([]);
    const [encryptClicked, setEncryptClicked] = useState(false);
    const [encryptClickCount, setEncryptClickCount] = useState(() => {
        // Retrieve the count from localStorage or default to 0
        return parseInt(localStorage.getItem('encryptClickCount')) || 0;
    });
    console.log(encryptClickCount)

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/records/records');
            setStudentData(response.data.records);
        } catch (error) {
            console.log(error);
        }
    };

    const handleGradeChange = (e, index, subjectIndex) => {
        const body = {
            rollNumber: studentData[index].rollNumber,
            subject: studentData[index].subject[subjectIndex].name,
            grade: e.target.value
        };

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
    if (encryptClickCount > 1) {
        toast.warn('Records are already Encrypted!', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
    } else {
        setEncryptClicked(true);
        localStorage.setItem("isEncryptClicked", true);
        setEncryptClickCount(encryptClickCount + 1);
        localStorage.setItem("encryptClickCount", encryptClickCount + 1);
    }
};

return (
    <div className='main-content'>
        <ToastContainer
            position='bottom-center'


        />
        <div className='d-flex justify-center align-center mb-4'>
            <Button variant="primary" type="submit" onClick={handleOnEncrypt}>
                Encrypt Records
            </Button>
        </div>
        <div className='student-record-container'>
            {Array.isArray(studentData) && studentData.map((data, studentIndex) => (
                <StudentRecordForm
                    key={studentIndex}
                    data={data}
                    onGradeChange={(e, subjectIndex) => handleGradeChange(e, studentIndex, subjectIndex)}
                    encryptClicked={encryptClicked}
                    encryptClickCount={encryptClickCount}
                />
            ))}
        </div>
    </div>
);
};

export default EncryptedRecords;
