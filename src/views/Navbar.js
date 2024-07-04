import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");

    useEffect(() => {
        // Ambil nama pengguna dari localStorage saat komponen Navbar dirender
        const storedUserName = localStorage.getItem("userName");
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <>
            <nav className="navbar navbar-dark navbar-expand-lg bg-purple">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <img className="d-block mx-auto mb-1" src="/images/Insight_Enterprises_Logo.png" alt="" width="100" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto me-0 mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            {userName ? (
                                <li className="nav-item">
                                    <span className="nav-link">Welcome, {userName}</span>
                                </li>
                            ) : null}
                            <li className="nav-item">
                                <a className="nav-link" href="/" onClick={handleLogout}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
