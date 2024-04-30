import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataFromImg from './dataFromImg';
import { Button } from 'react-bootstrap';
import '../encode_form/studentrecord.css';

const DecryptStudentData = () => {
    const [studentData, setStudentData] = useState([]);
    const [changedData, setChangedData] = useState([]);
    const[changedByUser, setChangedByUser] = useState([])
    console.log(changedByUser)

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

    const handleOnDecrypt = () => {
        axios.get('http://localhost:5000/api/v1/records/check')
            .then(response => {
                console.log(response)
                setChangedData(response.data.records);
                setChangedByUser(response.data.user)
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div>
            <div className='main-content'>
                <div className='d-flex justify-center align-center mb-4'>
                    <Button variant="danger" type="submit" onClick={handleOnDecrypt}>
                        Check Decoded Data
                    </Button>
                </div>
                <div className='student-record-container'>
                    {changedData.length > 0 && changedData.map((data, studentIndex) => (
                         <DataFromImg
                         key={studentIndex}
                         data={data}
                         compare={true}
                         changedByUser={changedByUser}
                     />
                    ))}


                    {changedData.length === 0 && studentData.length > 0 && studentData.map((data, studentIndex) => (
                        <DataFromImg key={studentIndex} data={data} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DecryptStudentData;
