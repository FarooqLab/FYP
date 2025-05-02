import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ExercisePlan.css";

const ExercisePlan = ({ bmiCategory }) => {
    const defaultCategoryMapping = {
        Underweight: "chest",
        Normal: "cardio",
        Overweight: "waist",
        Obese: "lower legs"
    };

    const exerciseCategories = [
        "cardio", "waist", "lower legs", "upper legs", "chest", "arms", "back", "shoulders"
    ];

    const stageReps = {
        Beginner: "10 reps × 3 sets",
        Intermediate: "15 reps × 4 sets",
        Advanced: "20 reps × 5 sets"
    };

    const [selectedCategory, setSelectedCategory] = useState(defaultCategoryMapping[bmiCategory] || "cardio");
    const [exercises, setExercises] = useState([]);
    const [stage, setStage] = useState("Beginner");
    const [completedExercises, setCompletedExercises] = useState(() => {
        return JSON.parse(localStorage.getItem("completedExercises")) || [];
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const exercisesPerPage = 6;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExercises = async () => {
            setLoading(true);
            const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${selectedCategory}?limit=100&offset=0`;
            const options = {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": "6d18465d1dmsha5acecb2f7e0f99p187ed3jsn610aec4a13b5",
                    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
                }
            };

            try {
                const response = await axios.get(url, options);
                setExercises(response.data);
            } catch (error) {
                console.error("Error fetching exercises:", error);
            } finally {
                setTimeout(() => setLoading(false), 1000);
            }
        };

        fetchExercises();
    }, [selectedCategory]);

    const handlePageChange = (pageNumber) => {
        setLoading(true);
        setCurrentPage(pageNumber);
        setTimeout(() => setLoading(false), 1000);
    };

    const handleExerciseClick = (id) => {
        navigate(`/exercise/${id}`);
    };

    const toggleCompletion = (id) => {
        let updatedExercises;
        if (completedExercises.includes(id)) {
            updatedExercises = completedExercises.filter(exerciseId => exerciseId !== id);
        } else {
            updatedExercises = [...completedExercises, id];
        }
        setCompletedExercises(updatedExercises);
        localStorage.setItem("completedExercises", JSON.stringify(updatedExercises));
    };

    const totalPages = Math.ceil(exercises.length / exercisesPerPage);
    const indexOfLastExercise = currentPage * exercisesPerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
    const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

    const progressPercentage = exercises.length > 0 
        ? (completedExercises.length / exercises.length) * 100 
        : 0;

    return (
        <div className="exercise-page-container">
            <div className="progress-container">
                <h3>Exercise Progress</h3>
                <div className="progress-bar">
                    <div 
                        className="progress-fill" 
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
                <p>{completedExercises.length} / {exercises.length} Completed</p>

                {/* Completed Exercises GIFs */}
                <div className="completed-exercises">
                    {completedExercises.map((exerciseId) => {
                        const exercise = exercises.find(ex => ex.id === exerciseId);
                        return exercise ? (
                            <img
                                key={exercise.id}
                                src={exercise.gifUrl}
                                alt={exercise.name}
                                className="completed-exercise-gif"
                                onClick={() => handleExerciseClick(exercise.id)}
                            />
                        ) : null;
                    })}
                </div>
            </div>

            <div className="exercise-content">
                <h2>Exercise Plan ({stage} Level)</h2>

                <div className="select-container">
                    <label>Select Exercise Type:</label>
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        {exerciseCategories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                <div className="select-container">
                    <label>Select Stage:</label>
                    <select value={stage} onChange={(e) => setStage(e.target.value)}>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>

                <div className="exercise-grid">
                    {loading ? (
                        Array.from({ length: exercisesPerPage }).map((_, index) => (
                            <div key={index} className="exercise-card loading-box"></div>
                        ))
                    ) : (
                        currentExercises.map((exercise) => (
                            <div 
                                key={exercise.id} 
                                className={`exercise-card ${completedExercises.includes(exercise.id) ? "completed" : ""}`} 
                            >
                                <h3 
                                    onClick={() => handleExerciseClick(exercise.id)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {exercise.name}
                                </h3>
                                <img 
                                    src={exercise.gifUrl} 
                                    alt={exercise.name} 
                                    onClick={() => handleExerciseClick(exercise.id)}
                                    style={{ cursor: "pointer" }}
                                />
                                <p className="exercise-reps"><strong>Repetitions:</strong> {stageReps[stage]}</p>
                                <button 
                                    onClick={() => toggleCompletion(exercise.id)}
                                    className={completedExercises.includes(exercise.id) ? "completed-btn" : "incomplete-btn"}
                                >
                                    {completedExercises.includes(exercise.id) ? "Completed" : "Mark as Done"}
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination Controls */}
                <div className="pagination">
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)} 
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => (
                        <button 
                            key={index + 1} 
                            className={currentPage === index + 1 ? "active-page" : ""}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button 
                        onClick={() => handlePageChange(currentPage + 1)} 
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExercisePlan;
