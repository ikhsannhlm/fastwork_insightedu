import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import SweetAlert2 from "react-sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Import Axios here

export function PersonalityTest() {
    const [swalProps, setSwalProps] = useState({
        show: false,
        onConfirmHandle: {}
    });

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

    const totalQuestions = Object.values(questions).reduce((total, traitQuestions) => total + traitQuestions.length, 0);

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

    const handleNext = async () => {
        if (!answers[`${currentTrait}${idxQ + 1}`]) {
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
    
        if (idxQ < questions[currentTrait].length - 1) {
            setIdxQ(idxQ + 1);
        } else {
            const traits = Object.keys(questions);
            const currentTraitIndex = traits.indexOf(currentTrait);
            if (currentTraitIndex < traits.length - 1) {
                setCurrentTrait(traits[currentTraitIndex + 1]);
                setIdxQ(0);
            } else {
                setOnLoading(true);
    
                try {
                    // Mengubah format data jawaban menjadi array 1 dimensi
                    const answerData = Object.values(answers).map(answer => parseInt(answer));
    
                    const response = await axios.post('http://localhost:5001/predict', {
                        data: [answerData]
                    });
    
                    console.log('Response from prediction API:', response.data); // Tampilkan respons API ke konsol
    
                    // Ambil nilai prediksi dari respons API
                    const predictionValue = response.data.predictions[0];
    
                    // Mapping nilai prediksi ke string personality
                    const personalityMapping = {
                        0: "EXTROVERSION",
                        1: "NEUROTIC",
                        2: "AGREEABLE",
                        3: "CONSCIENTIOUS",
                        4: "OPENNESS"
                    };
                    const personality = personalityMapping[predictionValue];
    
                    // Simpan nilai personality ke local storage
                    localStorage.setItem("personalityPrediction", personality);
    
                    // Simpan hasil tes kepribadian dan navigasi ke halaman hasil
                    localStorage.setItem("personalityTestDone", "true");
                    localStorage.setItem("personalityTestResults", JSON.stringify(response.data));
    
                    // Navigasi ke halaman hasil
                    navigate("/result");
                } catch (error) {
                    setSwalProps({
                        show: true,
                        title: 'Error',
                        text: 'Failed to save personality data. Please try again later.',
                        icon: 'error',
                        onConfirmHandle: () => {
                            setSwalProps({ show: false });
                        }
                    });
                    setOnLoading(false);
                }
            }
        }
    };
    
    
    
        

    const handleChange = (e) => {
        const answer = e.target.value;
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

    // const sendPersonalityDataToBackend = async (personalityData) => {
    //     const userId = localStorage.getItem('userId');
    //     try {
    //         await axios.post('http://localhost:5000/api/updateUserPersonality', {
    //             userId: userId,
    //             personality: personalityData
    //         });
    //         setTimeout(() => {
    //             navigate("/result");
    //         }, 3000);
    //     } catch (error) {
    //         setSwalProps({
    //             show: true,
    //             title: 'Error',
    //             text: 'Failed to save personality data. Please try again later.',
    //             icon: 'error',
    //             onConfirmHandle: () => {
    //                 setSwalProps({ show: false });
    //             }
    //         });
    //         setOnLoading(false);
    //     }
    // };

    return (
        <>
            <SweetAlert2 {...swalProps} onConfirm={swalProps.onConfirmHandle} />

            <div className="container my-4">
                <Row>
                    <Col lg="8" className="mx-auto">
                        <div className="bg-body-tertiary p-5 rounded mt-5">
                            {onLoading ? (
                                <h3>Terima kasih telah mengisi kuisioner, jawaban anda sedang diproses...</h3>
                            ) : (
                                <>
                                    <p className="fw-bolder">Jawab Pertanyaan Berikut ({calculateCurrentQuestionNumber()}/{totalQuestions})</p>
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

                                    <div className="d-flex justify-content-between">
                                        <Button variant="primary" onClick={handlePrev} disabled={onLoading}>
                                            Previous
                                        </Button>
                                        <Button variant="primary" onClick={handleNext} disabled={onLoading}>
                                            {calculateCurrentQuestionNumber() === totalQuestions ? 'Submit' : 'Next'}
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default PersonalityTest;
