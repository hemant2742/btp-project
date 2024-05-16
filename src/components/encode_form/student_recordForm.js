import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import './studentrecord.css';

const StudentRecordForm = (props) => {
    console.log(props.encryptClickCount)
    const { name, rollNumber, subject, imageUrl } = props.data;
    const [showSpinner, setShowSpinner] = useState(false);
    const [showDecodedImage, setShowDecodedImage] = useState(false);
    
    const hjhh = localStorage.getItem('isEncryptClicked') === "true";

    useEffect(() => {
        if(props.encryptClickCount > 1) {
            setShowDecodedImage(true);
        }
    }, [props.encryptClickCount]);
    
    useEffect(() => {
        if (props.encryptClicked) {
            setShowSpinner(true);
            const timer = setTimeout(() => {
                setShowDecodedImage(true);
                setShowSpinner(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [props.encryptClicked]);

    return (
        <div>
            <Form className='card-container'>
                <Row>
                    <Col>
                        <Form.Group controlId="formStudentDetails">
                            <Form.Label>Student Details</Form.Label>
                            <Form.Text className='text-left'>
                                <p>Name: {name}</p>
                                <p>Roll Number: {rollNumber}</p>
                                <p>Branch: Computer Science</p>
                                <p>Year: 4th</p>
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Image className='student-image'
                            src={imageUrl}
                            alt="Student Image"
                        />
                        <span className='image-text'>Student Image</span>
                    </Col>
                    <Col>
                        {showSpinner && !showDecodedImage ? (
                            <div className='d-flex justify-content-center align-items-center h-100'>
                                <Spinner animation="border" role="status" >
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            </div>
                        ) : showDecodedImage && (
                            <>
                                <Image className='decoded-image'
                                    src={imageUrl}
                                    alt="Student Image"
                                    square
                                />
                                <span className='image-text'>Encoded Image</span>
                            </>
                        )}
                    </Col>
                </Row>
                <Row>
                    <h5 className='text-center m-2'>Subjects and Grades</h5>
                    <Form.Group controlId="formSubjects" className='subjects-container'>
                        {subject.map((subject, index) => (
                            <Row key={index}>
                                <Col>
                                    <Form.Group controlId={`subject${index + 1}`}>
                                        <Form.Label>{subject.name}</Form.Label>
                                        <Form.Select
                                            onChange={(e) => props.onGradeChange(e, index)}
                                            disabled={!hjhh}
                                            placeholder={subject.grade}
                                            defaultValue={subject.grade} 
                                        >
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                            <option value="D">D</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                        ))}
                    </Form.Group>
                </Row>
            </Form>
        </div>
    );
};

export default StudentRecordForm;
