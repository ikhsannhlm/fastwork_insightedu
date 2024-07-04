import { useState } from "react";
import { Row, Container, Col, Image, Form, FormGroup, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Homepage() {
    const navigate = useNavigate();
    const [state, setState] = useState({
        input: {}
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            input: {
                ...prevState.input,
                [name]: value,
            }
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem('email', state.input.email)
        navigate('/dashboard')
    }
    return (
        <Container fluid className="bd-masthead">
            <Row className="py-4">
                <Col xl="10" className="mx-auto">
                    <div className="px-4 py-3 my-5 text-center">
                        <img className="d-block mx-auto mb-4" src="/images/Insight_Enterprises_Logo.png" alt="" width="400"  />
                        <h1 className="display-5 fw-bold text-body-emphasis">Welcome to InsightEdu</h1>
                        <div className="col-lg-10 mx-auto">
                            <p className="lead mb-4">Unlock a world of learning that's as unique as you are. InsighteDu combines the power of personality insights with cutting-edge educational tools to create a truly personalized learning experience.</p>
                            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                <Link to={'/signin'} className="btn btn-primary btn-lg px-4 gap-3">Sign In</Link>
                                <Link to={'/signup'} className="btn btn-outline-secondary btn-lg px-4">Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

        </Container>
    );
}

export default Homepage;