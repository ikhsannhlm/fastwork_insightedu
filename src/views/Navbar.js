import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    useEffect(() => {
        const username = localStorage.getItem("username");
        if (username) {
            setUsername(username);
        }
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('username');
        localStorage.removeItem('personality');
        localStorage.removeItem('userId');
        navigate('/signin');
    };

    const handleTestAgain = () => {
        localStorage.removeItem('personality');
        navigate('/personalitytest');
    };

    return (
        <>
            <nav className="navbar navbar-dark navbar-expand-lg bg-purple">
                <div className="container">
                    <span className="navbar-brand">
                        <img className="d-block mx-auto mb-1" src="/images/Insight_Enterprises_Logo2.png" alt="" width="100" />
                    </span>
                    <ul className="navbar-nav ms-auto me-0 mb-2 mb-lg-0">
                        {username ? (
                            <li className="nav-item">
                                <span className="nav-link active">Welcome, {username}</span>
                            </li>
                        ) : null}
                    </ul>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto me-0 mb-2 mb-lg-0">
                            <li className="nav-item">
                                <button className="btn btn-link nav-link" onClick={handleTestAgain}>Test again</button>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-dark nav-link" onClick={handleSignOut}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
