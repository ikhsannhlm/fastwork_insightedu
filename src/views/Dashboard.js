import React from "react";
import { Navbar } from "./Navbar";

export function Dashboard() {
    // Contoh data hasil tes kepribadian
    const personalityResults = JSON.parse(localStorage.getItem("personalityTestResults"));

    // Fungsi untuk menentukan rekomendasi pekerjaan berdasarkan hasil tes
    const getRecommendedJobs = () => {
        // Logika untuk menentukan rekomendasi pekerjaan
        // Misalnya, berdasarkan nilai dari personalityResults
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

    // Fungsi untuk menampilkan roadmap belajar
    const renderLearningRoadmap = (jobTitle) => {
        // Logika untuk menentukan roadmap belajar untuk setiap pekerjaan
        // Contoh sederhana:
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
        // Tambahkan logika untuk pekerjaan lainnya
    };

    return (
        <>
            <Navbar />
            <div className="container my-4">
                <h2>Selamat Datang di Dashboard Anda</h2>
                <h3>Rekomendasi Pekerjaan Berdasarkan Hasil Tes Kepribadian</h3>
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
                <hr />
                <h3>Roadmap untuk Pekerjaan</h3>
                {renderLearningRoadmap("Pengembang Perangkat Lunak")}
                {/* Tambahkan bagian untuk pekerjaan lainnya */}
            </div>
        </>
    );
}
