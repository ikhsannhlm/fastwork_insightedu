import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';

const Dashboard = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [personality, setPersonality] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const username = localStorage.getItem('username');
        const personality = localStorage.getItem('personality');
        const userId = localStorage.getItem('userId');

        if (username) {
            setUsername(username);
        }
        if (personality !== null) {
            setPersonality(personality);
        }
        if (userId) {
            setUserId(userId);
        }
    }, []);

    const getRecommendedJobs = () => {
        return [
            {
                jobTitle: "Pengembang Perangkat Lunak",
                description: "Pekerjaan yang membutuhkan kreativitas dan pemecahan masalah."
            },
            {
                jobTitle: "Desainer UX/UI",
                description: "Pekerjaan yang melibatkan desain antarmuka pengguna dan pengalaman pengguna."
            },
            {
                jobTitle: "Analis Data",
                description: "Pekerjaan yang mengolah dan menganalisis data untuk membuat keputusan bisnis."
            }
        ];
    };

    const renderLearningRoadmap = (jobTitle) => {
        if (jobTitle === "Pengembang Perangkat Lunak") {
            return (
                <div>
                    <h4>Roadmap untuk Menjadi Pengembang Perangkat Lunak</h4>
                    <ul>
                        <li>Mempelajari bahasa pemrograman seperti JavaScript, Python, dll.</li>
                        <li>Mengembangkan proyek sederhana untuk mempraktikkan keterampilan.</li>
                        <li>Memahami konsep dasar pengembangan perangkat lunak dan algoritma.</li>
                    </ul>
                    <a href="/link-to-resources" className="btn btn-primary">Mulai Belajar</a>
                </div>
            );
        }
    };

    return (
        <>
            <Navbar />
            <Container>
                <Row className="my-5">
                    <Col className="text-center">
                        <h1>Welcome to your Dashboard!</h1>
                        {personality && <h3>Your Personality is {personality}</h3>}
                    </Col>
                </Row>
                <Row className="my-4">
                    <Col>
                        <h3>Rekomendasi Pekerjaan Berdasarkan Kepribadianmu </h3>
                        <div className="row">
                            {getRecommendedJobs().map((job, index) => (
                                <div className="col-lg-4 mb-4" key={index}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">{job.jobTitle}</h5>
                                            <p className="card-text">{job.description}</p>
                                            <button className="btn btn-primary">Pelajari lebih lanjut</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <hr />
                        <h3>Roadmap untuk Pekerjaan</h3>
                        {renderLearningRoadmap("Pengembang Perangkat Lunak")}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Dashboard;
