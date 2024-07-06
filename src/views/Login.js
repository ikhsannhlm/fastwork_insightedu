import { useState } from "react";
import { Button, Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import SweetAlert2 from "react-sweetalert2";
import axios from 'axios';

export function Signin() {
    const navigate = useNavigate();
    const [state, setState] = useState({
        input: {}
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = state.input;

        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            setSwalProps({
                show: true,
                title: 'Login Failed',
                text: 'Invalid email or password.',
                icon: 'error',
                showCancelButton: false,
                onConfirmHandle: () => {
                    setSwalProps({ ...swalProps, show: false });
                }
            });
        }
    };

    return (
        <>
            <SweetAlert2 {...swalProps} onConfirm={swalProps.onConfirmHandle} />
            <Container>
                <Row>
                    <Col xs={8} md={3} className="mx-auto my-4 py-3">
                        <div className="">
                            <div className="bd-masthead p-4 rounded">
                                <img className="d-block mx-auto mb-1 img-fluid" src="/images/Insight_Enterprises_Logo.png" alt="" />
                            </div>

                            <div className="align-items-center text-center">
                                <h1 className="mb-5"><strong>Login</strong></h1>
                            </div>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup className="mb-4">
                                    <Form.Control name="email" placeholder="Email" className="bg-transparent border-dark p-2" onChange={handleChange} required />
                                </FormGroup>

                                <FormGroup className="mb-4">
                                    <Form.Control type="password" name="password" placeholder="Password" className="bg-transparent border-dark p-2" onChange={handleChange} required />
                                </FormGroup>
                                <Row className="">
                                    <Col xs="12" className="mx-auto my-4">
                                        <div className="d-grid">
                                            <Button type="submit" variant="dark" className="rounded-pill p-2">Masuk</Button>
                                        </div>
                                    </Col>
                                </Row>
                                <Link to={`/register`} className="d-block text-center py-3">Belum punya akun? Register</Link>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
