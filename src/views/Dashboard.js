import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('username');
        navigate('/signin');
    };

    return (
        <Container>
            <Row className="my-5">
                <Col className="text-center">
                    <h1>Welcome to your Dashboard</h1>
                    <p>Welcome, {username || 'Guest'}!</p>
                    <Button variant="dark" onClick={handleSignOut}>Sign Out</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
