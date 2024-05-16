import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';

import "../encode_form/studentrecord.css";

const DataFromImg = (props) => {
    const { data } = props;


    if (!data) {
        return <span className='no-change-found'>No change found.</span>;
    }
    const { name, rollNumber, subject, imageUrl, username } = data;

    return (
        <div className='card-container'>
            <Row>
                <Col>
                    <div className='student-details'>
                        <p>Name: {name}</p>
                        <p>Roll Number: {rollNumber}</p>
                        <p>Branch: Computer Science</p>
                        <p>Year: 4th</p>
                    </div>
                </Col>
                <Col>
                    <div className='decoded-image-container'>
                        <Image className='decoded-image' src={imageUrl} alt="Decoded Image" />
                        <span className='image-text'>Encoded Image</span>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 className='text-center'>Subjects and Grades</h5>
                    <div className='subjects-container'>

                        {subject.map((subject, index) => (
                            <Form.Group controlId={`subject${index + 1}`} key={`subject${index + 1}`}>
                                <Form.Label>{subject.name}</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={subject.grade}
                                    value={subject.grade}
                                    disabled={true}
                                />
                            </Form.Group>
                        ))}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    {props.compare && (
                        <h5 className='text-center mt-3'>Changed Grades</h5>
                    )}
                    <div className='subjects-container'>
                        {props.compare && subject.map((subject, index) => (
                            <Form.Group controlId={`subject${index + 1}`} key={`subject${index + 1}`}>
                                <Form.Label>{subject.name}</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={subject.newGrade}
                                    value={subject.newGrade}
                                    disabled={true}
                                />
                            </Form.Group>
                        ))}
                    </div>

                    <div>
                        {props.compare && (
                            <div className='text-center'>
                                <span className='change-text mt-2'>Changed By: {username}</span> <br />
                                <span className='change-text '>Changed At: {new Date(data.updatedAt).toLocaleString()}</span>
                            </div>
                        )}
                    </div>


                </Col>
            </Row>
        </div>
    );
};

export default DataFromImg;
