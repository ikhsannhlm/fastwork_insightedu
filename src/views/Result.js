import React, { useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function Result() {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const results = JSON.parse(localStorage.getItem("personalityTestResults"));
    const personality = localStorage.getItem("personalityPrediction");

    useEffect(() => {
        const updatePersonalityInDB = async () => {
            const userId = localStorage.getItem('userId');
            try {
                await axios.post('http://localhost:5000/api/updateUserPersonality', {
                    userId: userId,
                    personality: personality
                });
            } catch (error) {
                console.error("Failed to update personality in the database", error);
            }
        };

        updatePersonalityInDB();
    }, [personality]);

    return (
        <>
            <div className="container my-4">
                <h2>Hasil Tes Kepribadian Anda</h2>
                <p>Kepribadian Anda: <strong>{personality}</strong></p>
                <Link to="/dashboard" className="btn btn-primary mt-3">
                    Lanjutkan ke Dashboard
                </Link>
            </div>
        </>
    );
}

export default Result;
