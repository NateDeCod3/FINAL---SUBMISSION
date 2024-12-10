import React, { useState, useEffect, Profiler } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Card, Col, Row, Alert } from 'react-bootstrap';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4000/users/details', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.code === "USER-FOUND") {
          setUser(data.result);
        }
      })
      .catch(error => {
        setMessage('Failed to fetch user data.');
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    fetch('http://localhost:4000/users/update-password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ oldPassword, newPassword, confirmNewPassword })
    })
      .then(response => response.json())
      .then(data => {
        setMessage(data.message);
      })
      .catch(error => {
        setMessage('Error updating password.');
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 display-3 fw-bold">Profile</h1>
      <Card className="shadow-sm p-4">
        <Card.Body>
          
          {user ? (
            <div>
                <h3 className="text-center mb-4">Welcome, {user.firstName} {user.lastName}!</h3>
              <div className="col-lg-6 mx-auto">
                <p><b>First Name:</b> {user.firstName} </p>
                <p><b>Middle Name:</b> {user.middleName} </p>
                <p><b>Last Name:</b> {user.lastName} </p>
                <p><b>Email:</b> {user.email} </p>
                <p><b>Status:</b> {user.isAdmin ? 'Admin' : 'Regular'} </p>
              </div>
              <hr className="mx-5 mt-4"></hr>
              
              <Row>
                <h3 className="text-center mb-4">Change  Password</h3>
                <Col md={6} className="mx-auto mt-3">
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="oldPassword" className="mb-3">
                      <Form.Label><b>Old Password</b></Form.Label>
                      <Form.Control type="password" placeholder="Enter old password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="newPassword" className="mb-3">
                      <Form.Label><b>New Password</b></Form.Label>
                      <Form.Control type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="confirmNewPassword" className="mb-3">
                      <Form.Label><b>Confirm New Password</b></Form.Label>
                      <Form.Control type="password" placeholder="Confirm new password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}/>
                    </Form.Group>

                    <Button variant="primary" type="submit" block>Update Password</Button>
                  </Form>

                  {message && (
                    <Alert variant={message.includes('Error') ? 'danger' : 'success'} className="mt-3">
                      {message}
                    </Alert>
                  )}
                </Col>
              </Row>
            </div>
          ) : (
            <div className="text-center">
              <p>Loading...</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
