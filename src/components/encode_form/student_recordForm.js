import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';


const StudentRecordForm = () => {
  return (
    <div>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="formRollNo">
              <Form.Label>Roll Number</Form.Label>
              <Form.Control type="text" placeholder="Enter Roll Number" readOnly />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formStudentDetails">
              <Form.Label>Student Details</Form.Label>
              <Form.Text>
                <p>Name: John Doe</p>
                <p>Branch: Computer Science</p>
                <p>Year: 3rd</p>
              </Form.Text>
              <Image src="path_to_student_image" rounded />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formSubjects">
              <Form.Label>Subjects and Grades</Form.Label>
              <Form.Control type="text" placeholder="Subject 1" />
              <Form.Control type="text" placeholder="Subject 2" />
              <Form.Control type="text" placeholder="Subject 3" />
              {/* Add more Form.Control elements for additional subjects */}
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default StudentRecordForm;
