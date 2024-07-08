import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [personality, setPersonality] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedPersonality = localStorage.getItem('personality'); // Ambil nilai personality dari localStorage
        if (storedUsername) {
            setUsername(storedUsername);
        }
        if (storedPersonality) {
            setPersonality(storedPersonality); // Set nilai personality ke state jika ada
        }
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('username');
        localStorage.removeItem('personality'); // Hapus personality dari localStorage saat sign out
        navigate('/signin');
    };

    return (
        <Container>
            <Row className="my-5">
                <Col className="text-center">
                    <h1>Welcome to your Dashboard</h1>
                    <p>Welcome, {username || 'Guest'}!</p>
                    {personality && <p>Your Personality: {personality}</p>} {/* Tampilkan nilai personality jika tersedia */}
                    <Button variant="dark" onClick={handleSignOut}>Sign Out</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
