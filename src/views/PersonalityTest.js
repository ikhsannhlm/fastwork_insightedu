import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SweetAlert2 from "react-sweetalert2";
import { Navbar } from "./Navbar";

export function PersonalityTest() {
    const [swalProps, setSwalProps] = useState({
        show: false,
        onConfirmHandle: {}
    });

    // Define questions for each Big Five personality trait
    const questions = {
        EXT: [
            "Saya adalah pusat perhatian di pesta",
            "Saya tidak banyak bicara",
            "Saya merasa nyaman di sekitar orang lain",
            "Saya tetap berada di latar belakang",
            "Saya memulai percakapan",
            "Saya tidak banyak berbicara",
            "Saya berbicara dengan banyak orang berbeda di pesta",
            "Saya tidak suka menarik perhatian",
            "Saya tidak keberatan menjadi pusat perhatian",
            "Saya pendiam di sekitar orang asing"
        ],
        EST: [
            "Saya mudah stres",
            "Saya santai sebagian besar waktu",
            "Saya sering khawatir tentang banyak hal",
            "Saya jarang merasa sedih",
            "Saya mudah terganggu",
            "Saya mudah marah",
            "Saya sering berubah suasana hati",
            "Saya sering mengalami perubahan suasana hati yang sering",
            "Saya mudah tersinggung",
            "Saya sering merasa sedih"
        ],
        AGR: [
            "Saya sedikit peduli terhadap orang lain",
            "Saya tertarik pada orang lain",
            "Saya suka menghina orang lain",
            "Saya bersimpati dengan perasaan orang lain",
            "Saya tidak tertarik pada masalah orang lain",
            "Saya memiliki hati yang lembut",
            "Saya tidak benar-benar tertarik pada orang lain",
            "Saya meluangkan waktu untuk orang lain",
            "Saya merasakan emosi orang lain",
            "Saya membuat orang merasa nyaman"
        ],
        CSN: [
            "Saya selalu siap",
            "Saya meninggalkan barang-barang saya berserakan",
            "Saya memperhatikan detail",
            "Saya membuat kekacauan",
            "Saya segera menyelesaikan pekerjaan rumah tangga",
            "Saya sering lupa menaruh kembali barang-barang pada tempatnya",
            "Saya suka ketertiban",
            "Saya mengabaikan tugas saya",
            "Saya mengikuti jadwal",
            "Saya teliti dalam pekerjaan saya"
        ],
        OPN: [
            "Saya memiliki kosakata yang kaya",
            "Saya kesulitan memahami ide-ide abstrak",
            "Saya memiliki imajinasi yang hidup",
            "Saya tidak tertarik pada ide-ide abstrak",
            "Saya memiliki ide-ide yang luar biasa",
            "Saya tidak memiliki imajinasi yang baik",
            "Saya cepat memahami banyak hal",
            "Saya menggunakan kata-kata yang sulit",
            "Saya meluangkan waktu untuk merenungkan sesuatu",
            "Saya penuh dengan ide"
        ]
    };

    const [answers, setAnswers] = useState({});
    const [currentTrait, setCurrentTrait] = useState("EXT");
    const [idxQ, setIdxQ] = useState(0);
    const [onLoading, setOnLoading] = useState(false);
    const navigate = useNavigate();

    // Calculate the total number of questions
    const totalQuestions = Object.values(questions).reduce((total, traitQuestions) => total + traitQuestions.length, 0);

    // Calculate the current question number across all traits
    const calculateCurrentQuestionNumber = () => {
        const traits = Object.keys(questions);
        const currentTraitIndex = traits.indexOf(currentTrait);
        const previousQuestionsCount = traits.slice(0, currentTraitIndex).reduce((total, trait) => total + questions[trait].length, 0);
        return previousQuestionsCount + idxQ + 1;
    };

    const handlePrev = () => {
        if (idxQ > 0) {
            setIdxQ(idxQ - 1);
        } else {
            const traits = Object.keys(questions);
            const currentTraitIndex = traits.indexOf(currentTrait);
            if (currentTraitIndex > 0) {
                const previousTrait = traits[currentTraitIndex - 1];
                setCurrentTrait(previousTrait);
                setIdxQ(questions[previousTrait].length - 1);
            }
        }
    };

    const handleNext = () => {
        // Pastikan pengguna telah memilih jawaban untuk pertanyaan saat ini
        if (!answers[`${currentTrait}${idxQ + 1}`]) {
            // Tampilkan pesan atau alert bahwa pengguna harus memilih jawaban
            setSwalProps({
                show: true,
                title: "Perhatian!",
                text: "Silakan pilih jawaban untuk melanjutkan.",
                onConfirmHandle: () => {
                    setSwalProps({ show: false });
                }
            });
            return;
        }
    
        // Lanjutkan ke pertanyaan atau halaman berikutnya
        if (idxQ < questions[currentTrait].length - 1) {
            setIdxQ(idxQ + 1);
        } else {
            const traits = Object.keys(questions);
            const currentTraitIndex = traits.indexOf(currentTrait);
            if (currentTraitIndex < traits.length - 1) {
                setCurrentTrait(traits[currentTraitIndex + 1]);
                setIdxQ(0);
            } else {
                // Handle submission logic here
                setOnLoading(true);
    
                // Simpan jawaban dan ubah status personalityTestDone di localStorage
                localStorage.setItem("personalityTestDone", "true");
                localStorage.setItem("personalityTestResults", JSON.stringify(answers));
    
                setTimeout(() => {
                    navigate("/result"); // Navigasi ke halaman hasil
                }, 3000);
            }
        }
    };
    

    const handleChange = (e) => {
        const answer = e.target.value;
        // Mapping jawaban ke nilai numerik
        const answerValue = {
            "Sangat Tidak Setuju": 1,
            "Tidak Setuju": 2,
            "Netral": 3,
            "Setuju": 4,
            "Sangat Setuju": 5
        }[answer];

        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [`${currentTrait}${idxQ + 1}`]: answerValue
        }));
    };

    useEffect(() => {
        setOnLoading(false);
    }, []);

    return (
        <>
            <SweetAlert2 {...swalProps} onConfirm={swalProps.onConfirmHandle} />
            <Navbar />

            <div className="container my-4">
                <Row>
                    <Col lg="8" className="mx-auto">
                        <div className="bg-body-tertiary p-5 rounded mt-5">
                            {onLoading ? (
                                <>
                                    <h3>
                                        Terima kasih telah mengisi kuisioner, jawaban anda sedang diproses...
                                    </h3>
                                </>
                            ) : (
                                <>
                                    <p className="fw-bolder">
                                        Jawab Pertanyaan Berikut ({calculateCurrentQuestionNumber()}/{totalQuestions})
                                    </p>
                                    <div className="my-4">
                                        <p className="h4 my-3">{questions[currentTrait][idxQ]}</p>
                                        <Form>
                                            <div>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name={`flexRadioDefault${idxQ}`}
                                                        id={`ans-${idxQ}-a`}
                                                        value="Sangat Tidak Setuju"
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor={`ans-${idxQ}-a`}>
                                                        Sangat Tidak Setuju
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name={`flexRadioDefault${idxQ}`}
                                                        id={`ans-${idxQ}-b`}
                                                        value="Tidak Setuju"
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor={`ans-${idxQ}-b`}>
                                                        Tidak Setuju
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name={`flexRadioDefault${idxQ}`}
                                                        id={`ans-${idxQ}-c`}
                                                        value="Netral"
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor={`ans-${idxQ}-c`}>
                                                        Netral
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name={`flexRadioDefault${idxQ}`}
                                                        id={`ans-${idxQ}-d`}
                                                        value="Setuju"
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor={`ans-${idxQ}-d`}>
                                                        Setuju
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name={`flexRadioDefault${idxQ}`}
                                                        id={`ans-${idxQ}-e`}
                                                        value="Sangat Setuju"
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor={`ans-${idxQ}-e`}>
                                                        Sangat Setuju
                                                    </label>
                                                </div>
                                            </div>
                                        </Form>
                                    </div>
                                    <Row>
                                        <Col lg="8">
                                            <div className="d-grid">
                                                <div className="btn-group justify-item-between">
                                                    <Button variant="outline-danger" onClick={handlePrev}>
                                                        &lt;&lt; Prev
                                                    </Button>
                                                    {idxQ === questions[currentTrait].length - 1 ? (
                                                        <Button variant="primary" onClick={handleNext}>
                                                            {currentTrait === "OPN" ? "Submit" : "Next >>"}
                                                        </Button>
                                                    ) : (
                                                        <Button className="bg-purple text-light" onClick={handleNext}>
                                                            Next
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </>
                            )}
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}
