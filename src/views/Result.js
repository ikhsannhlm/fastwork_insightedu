import React, { useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function Result() {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const personality = localStorage.getItem("personalityPrediction");
    const userId = localStorage.getItem("userId"); // Menambahkan pengambilan userId dari localStorage

    useEffect(() => {
        const updatePersonalityInDB = async () => {
            try {
                await axios.put(`http://localhost:5000/api/users/updateUserPersonality/${userId}`, {
                    personality: personality
                });
                console.log("Personality updated successfully");
            } catch (error) {
                console.error("Failed to update personality in the database", error);
            }
        };

        if (userId && personality) { // Menambahkan pengecekan untuk userId dan personality sebelum melakukan update
            updatePersonalityInDB();
        }
    }, [userId, personality]);

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
