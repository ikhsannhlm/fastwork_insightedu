import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import SweetAlert2 from "react-sweetalert2";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios'; // Import Axios here

export function Signin() {
    const navigate = useNavigate();
    const [state, setState] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [swalProps, setSwalProps] = useState({
        show: false,
        title: '',
        text: '',
        icon: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                email: state.email,
                password: state.password
            });

            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', user._id); // Simpan userId ke localStorage
            localStorage.setItem('email', state.email);
            localStorage.setItem('username', user.username); // Simpan nama pengguna ke localStorage
            localStorage.setItem('personality', user.personality); // Simpan personality ke localStorage

            if (user.personality) {
                navigate('/dashboard');
            } else {
                navigate('/personalitytest');
            }
        } catch (error) {
            setSwalProps({
                show: true,
                title: 'Login Error',
                text: error.response?.data?.msg || 'Something went wrong!',
                icon: 'error'
            });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const email = localStorage.getItem('email');
        if (email) {
            // You can implement logic to check if the personality test is done by fetching user data from backend if necessary
        }
    }, []);

    return (
        <>
            <SweetAlert2 {...swalProps} />
            <Container>
                <Row>
                    <Col xs={8} md={3} className="mx-auto my-4 py-3">
                        <div className="">
                            <div className="bd-masthead p-4 rounded">
                                <img className="d-block mx-auto mb-1 img-fluid" src="/images/Insight_Enterprises_Logo.png" alt="" />
                            </div>

                            <div className="align-items-center text-center">
                                <h1 className="mb-5"><strong>Sign In</strong></h1>
                            </div>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup className="mb-4">
                                    <Form.Control type="email" name="email" placeholder="Email" className="bg-transparent border-dark p-2" onChange={handleChange} required />
                                </FormGroup>

                                <FormGroup className="mb-4 position-relative">
                                    <Form.Control 
                                        type={showPassword ? "text" : "password"} 
                                        name="password" 
                                        placeholder="Password" 
                                        className="bg-transparent border-dark p-2 pr-4" 
                                        onChange={handleChange} 
                                        required
                                    />
                                    <div className="position-absolute top-50 translate-middle-y end-0 pe-2">
                                        {showPassword ? (
                                            <FiEyeOff onClick={togglePasswordVisibility} />
                                        ) : (
                                            <FiEye onClick={togglePasswordVisibility} />
                                        )}
                                    </div>
                                </FormGroup>
                                <Row className="">
                                    <Col xs="12" className="mx-auto my-4">
                                        <div className="d-grid">
                                            <Button type="submit" variant="dark" className="rounded-pill p-2">Masuk</Button>
                                        </div>
                                    </Col>
                                </Row>
                                <Link to={`/signup`} className="d-block text-center py-3">Belum punya akun? Sign Up</Link>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
