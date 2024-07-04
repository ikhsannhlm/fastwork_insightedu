import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Navbar } from "./Navbar";

export function Result() {
    const location = useLocation();
    const { state } = location;
    const results = JSON.parse(localStorage.getItem("personalityTestResults"));

    return (
        <>
            <Navbar />
            <div className="container my-4">
                <h2>Hasil Tes Kepribadian Anda</h2>
                <pre>{JSON.stringify(results, null, 2)}</pre>
                <Link to="/dashboard" className="btn btn-primary mt-3">
                    Lanjutkan ke Dashboard
                </Link>
            </div>
        </>
    );
}
