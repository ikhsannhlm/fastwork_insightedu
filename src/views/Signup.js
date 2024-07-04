import React, { useState } from "react";
import { Row, Container, Col, FormGroup, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import SweetAlert2 from "react-sweetalert2";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Signup() {
    const navigate = useNavigate();
    const [state, setState] = useState({
        input: {},
        showPassword: false, // State to toggle password visibility
        showRepassword: false, // State to toggle repassword visibility
    });

    const [swalProps, setSwalProps] = useState({
        show: false,
        onConfirmHandle: {}
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            input: {
                ...prevState.input,
                [name]: value,
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { email, password, repassword } = state.input;

        if (!validateEmail(email)) {
            setSwalProps({
                show: true,
                title: 'Input error',
                text: 'Format email tidak valid',
                icon: 'warning',
                showCancelButton: false,
                onConfirmHandle: () => {
                    setSwalProps({ ...swalProps, show: false });
                }
            });
            return;
        }

        if (password !== repassword) {
            setSwalProps({
                show: true,
                title: 'Input error',
                text: 'Password tidak sama',
                icon: 'warning',
                showCancelButton: false,
                onConfirmHandle: () => {
                    setSwalProps({ ...swalProps, show: false });
                }
            });
            return;
        }

        setSwalProps({
            show: true,
            title: 'Sign Up Success',
            text: 'Thank you, your registration accepted, please login.',
            icon: 'success',
            showCancelButton: false,
            onConfirmHandle: () => {
                navigate(`/signin`);
            }
        });
    };

    const togglePasswordVisibility = (field) => {
        setState((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    return (
        <>
            <SweetAlert2 {...swalProps} onConfirm={swalProps.onConfirmHandle} />
            <Container className="mt-3">
                <Row>
                    <Col xs={4} className="mx-auto">
                        <div className="">
                            <div className="bd-masthead p-4 rounded">
                                <img className="d-block mx-auto mb-1 img-fluid" src="/images/Insight_Enterprises_Logo.png" alt="" />
                            </div>
                            <div className="align-items-center text-center">
                                <h1 className="h3 mb-1 fw-normal"><strong>Sign Up</strong></h1>
                            </div>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup className="mb-1">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control name="username" className="bg-transparent border-dark p-2" onChange={handleChange} required />
                                </FormGroup>

                                <FormGroup className="mb-1">
                                    <Form.Label>Password</Form.Label>
                                    <div className="input-group">
                                        <Form.Control type={state.showPassword ? "text" : "password"} name="password" className="bg-transparent border-dark p-2" onChange={handleChange} required />
                                        <Button
                                            variant="light"
                                            className="border-start-0 px-2"
                                            onClick={() => togglePasswordVisibility("showPassword")}
                                        >
                                            {state.showPassword ? <FiEyeOff /> : <FiEye />}
                                        </Button>
                                    </div>
                                </FormGroup>

                                <FormGroup className="mb-1">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <div className="input-group">
                                        <Form.Control type={state.showRepassword ? "text" : "password"} name="repassword" className="bg-transparent border-dark p-2" onChange={handleChange} required />
                                        <Button
                                            variant="light"
                                            className="border-start-0 px-2"
                                            onClick={() => togglePasswordVisibility("showRepassword")}
                                        >
                                            {state.showRepassword ? <FiEyeOff /> : <FiEye />}
                                        </Button>
                                    </div>
                                </FormGroup>

                                <FormGroup className="mb-1">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name="email" className="bg-transparent border-dark p-2" onChange={handleChange} required />
                                </FormGroup>

                                <Row>
                                    <Col md="9" className="mx-auto my-3">
                                        <div className="d-grid">
                                            <Button type="submit" variant="dark" className="rounded-pill p-2">Daftar</Button>
                                            <Link to={'/signin'} className="d-block text-center my-3">Sudah punya akun? Sign in</Link>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Signup;
