import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        navigate('/signin');
    };

    return (
        <Container>
            <Row className="my-5">
                <Col className="text-center">
                    <h1>Welcome to your Dashboard</h1>
                    <p>This is a simple dashboard page.</p>
                    <Button variant="dark" onClick={handleSignOut}>Sign Out</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
