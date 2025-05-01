import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./ExercisePlan.css";

const ExercisePlan = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { bmiCategory, bmiScore, userId } = location.state || {};

    const [selectedCategory, setSelectedCategory] = useState("");
    const [allExercises, setAllExercises] = useState([]);
    const [completedExercises, setCompletedExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [customPlan, setCustomPlan] = useState([]);
    const [isCustomPlanActive, setIsCustomPlanActive] = useState(false);
    const [currentDay, setCurrentDay] = useState(1);
    const [customPlanSaved, setCustomPlanSaved] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [showSaveAlert, setShowSaveAlert] = useState(false);

    const exercisesPerPage = 20;

    const defaultCategoryMapping = {
        Underweight: "chest",
        Normal: "cardio",
        Overweight: "waist",
        Obese: "lower legs"
    };

    useEffect(() => {
        if (!bmiCategory || !bmiScore || !userId) {
            navigate('/bmi');
        } else {
            setSelectedCategory(defaultCategoryMapping[bmiCategory] || "cardio");
        }
    }, [bmiCategory, bmiScore, userId, navigate]);

    useEffect(() => {
        const fetchUserPlan = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get-exercise-plan/${userId}`);
                const data = response.data;
                if (data.exercisePlan?.length) {
                    setCustomPlan(data.exercisePlan);
                    setCurrentDay(data.currentDay || 1);
                    setCompletedExercises(data.completedExercises || []);
                    setIsCustomPlanActive(true);
                    setCustomPlanSaved(true);
                }
            } catch (error) {
                console.log("No saved plan found, loading suggested plan.");
            } finally {
                setLoading(false);
            }
        };

        if (userId) fetchUserPlan();
    }, [userId]);

    useEffect(() => {
        const fetchExercises = async () => {
            if (!selectedCategory) return;
            setLoading(true);

            const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${selectedCategory}?limit=100&offset=0`;
            const options = {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
                    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
                }
            };

            try {
                const response = await axios.get(url, options);
                setAllExercises(response.data);
            } catch (error) {
                console.error("Error fetching exercises:", error);
            } finally {
                setTimeout(() => setLoading(false), 800);
            }
        };

        fetchExercises();
    }, [selectedCategory]);

    const getCustomStage = () => {
        const len = customPlan.length;
        if (len <= 3) return "Advanced";
        if (len <= 6) return "Intermediate";
        return "Beginner";
    };

    const getRepsByStage = (stage) => ({
        Beginner: "10 reps × 3 sets",
        Intermediate: "15 reps × 4 sets",
        Advanced: "20 reps × 5 sets"
    }[stage]);

    const getDailyPlan = (exercises, days = 7, perDay = 4) => {
        const plan = [];
        for (let i = 0; i < days; i++) {
            plan.push(exercises.slice(i * perDay, (i + 1) * perDay));
        }
        return plan;
    };

    const dailySuggestedPlan = useMemo(() => {
        const selected = allExercises.slice(0, 28);
        return getDailyPlan(selected);
    }, [allExercises]);

    const dailyCustomPlan = useMemo(() => getDailyPlan(customPlan), [customPlan]);

    const todayExercises = Array.isArray(customPlan) && customPlan.length > 0
        ? dailyCustomPlan[currentDay - 1] || []
        : dailySuggestedPlan[currentDay - 1] || [];

    const savePlan = async () => {
        if (!userId) {
            alert("User ID is missing");
            return;
        }

        const planToSave = customPlan.length ? customPlan : allExercises.slice(0, 28);

        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/save-exercise-plan`, {
                userId,
                bmiCategory,
                bmiScore,
                exercisePlan: planToSave,
                currentDay,
                completedExercises
            });

            setIsCustomPlanActive(customPlan.length > 0);
            setCustomPlanSaved(true);
            setShowSaveAlert(true);
            setTimeout(() => setShowSaveAlert(false), 3000);
        } catch (err) {
            console.error("Error saving plan:", err);
            alert("Failed to save plan");
        }
    };

    const toggleCompletion = async (id) => {
        const updated = completedExercises.includes(id)
            ? completedExercises.filter(eid => eid !== id)
            : [...completedExercises, id];

        setCompletedExercises(updated);

        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/save-exercise-plan`, {
                userId,
                bmiCategory,
                bmiScore,
                exercisePlan: customPlan.length ? customPlan : allExercises.slice(0, 28),
                currentDay,
                completedExercises: updated
            });
        } catch (err) {
            console.error("Error updating completion:", err);
        }
    };

    const toggleCustomPlan = (exercise) => {
        const exists = customPlan.find(e => e.id === exercise.id);
        if (exists) {
            setCustomPlan(customPlan.filter(e => e.id !== exercise.id));
        } else {
            if (customPlan.length < 4) {
                setCustomPlan([...customPlan, exercise]);
            }
        }
    };

    const changeDay = async (newDay) => {
        if (newDay < 1 || newDay > 7) return;

        setCurrentDay(newDay);

        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/save-exercise-plan`, {
                userId,
                bmiCategory,
                bmiScore,
                exercisePlan: customPlan.length ? customPlan : allExercises.slice(0, 28),
                currentDay: newDay,
                completedExercises
            });
        } catch (err) {
            console.error("Error updating current day:", err);
        }
    };

    const progressPercentage = todayExercises.length > 0
        ? (completedExercises.filter(id => todayExercises.some(ex => ex.id === id)).length / todayExercises.length) * 100
        : 0;

    const currentExercises = useMemo(() => {
        const start = (currentPage - 1) * exercisesPerPage;
        return allExercises.slice(start, start + exercisesPerPage);
    }, [currentPage, allExercises]);

    return (
        <div className="exercise-page-container">
            <div className="bmi-info">
                <h2>
                    {Array.isArray(customPlan) && customPlan.length > 0
                        ? "Your Custom Exercise Plan is below"
                        : `According to your BMI score (${bmiScore}) - ${bmiCategory}, your suggested exercise plan is given below`}
                </h2>
            </div>

            <div className="day-navigation">
                <button className="styled-button" onClick={() => changeDay(currentDay - 1)}>Previous Day</button>
                <span>Day {currentDay}</span>
                <button className="styled-button" onClick={() => changeDay(currentDay + 1)}>Next Day</button>
            </div>

            <div className="progress-container">
                <h3>Exercise Progress (Day {currentDay})</h3>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <p>{completedExercises.filter(id => todayExercises.some(ex => ex.id === id)).length} / {todayExercises.length} Completed</p>
            </div>

            <div className="exercise-grid">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    todayExercises.map((exercise) => (
                        <div key={exercise.id} className={`exercise-card ${completedExercises.includes(exercise.id) ? "completed" : ""}`}>
                            <h3>{exercise.name}</h3>
                            <Link to={`/exercise/${exercise.id}`}>
                                <img src={exercise.gifUrl} alt={exercise.name} />
                            </Link>
                            <p><strong>Reps:</strong> {getRepsByStage(customPlan.length > 0 ? getCustomStage() : "Beginner")}</p>
                            <button className="styled-button" onClick={() => toggleCompletion(exercise.id)}>
                                {completedExercises.includes(exercise.id) ? "Completed" : "Mark as Done"}
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className="custom-plan-section">
                <h2>Create Your Own Plan (Select up to 4)</h2>
                <div className="custom-exercise-list">
                    {currentExercises.map((exercise) => {
                        const isSelected = customPlan.some(e => e.id === exercise.id);
                        return (
                            <div key={exercise.id}>
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => toggleCustomPlan(exercise)}
                                    disabled={!isSelected && customPlan.length >= 4}
                                />
                                <img src={exercise.gifUrl} alt={exercise.name} width="50" />
                                <span>{exercise.name}</span>
                            </div>
                        );
                    })}
                </div>

                <button className="styled-button" onClick={savePlan}>Save Plan</button>
                {showSaveAlert && <div className="save-alert">Exercise plan saved successfully!</div>}

                <div className="pagination">
                    {Array.from({ length: Math.ceil(allExercises.length / exercisesPerPage) }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`page-button ${currentPage === index + 1 ? "active" : ""}`}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExercisePlan;
