import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ExerciseDetail = () => {
    const { id } = useParams();
    const [exercise, setExercise] = useState(null);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchExerciseDetails = async () => {
            try {
                // Fetch exercise details
                const response = await axios.get(
                    `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
                    {
                        headers: {
                            "X-RapidAPI-Key": "6d18465d1dmsha5acecb2f7e0f99p187ed3jsn610aec4a13b5",
                            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
                        },
                    }
                );
                setExercise(response.data);

                // Fetch YouTube videos related to the exercise
                const videoResponse = await axios.get(
                    `https://youtube-search-and-download.p.rapidapi.com/search`,
                    {
                        headers: {
                            "X-RapidAPI-Key": "6d18465d1dmsha5acecb2f7e0f99p187ed3jsn610aec4a13b5",
                            "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
                        },
                        params: { query: `${response.data.name} exercise`, maxResults: 6 },
                    }
                );

                setVideos(videoResponse.data.contents.slice(0, 6)); // Show only 6 videos
            } catch (error) {
                console.error("Error fetching exercise details:", error);
            }
        };

        fetchExerciseDetails();
    }, [id]);

    if (!exercise) return <p className="text-center text-lg font-semibold mt-10">Loading...</p>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Exercise Details */}
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center gap-6">
                <img src={exercise.gifUrl} alt={exercise.name} className="w-64 h-64 rounded-lg" />
                <div>
                    <h2 className="text-3xl font-bold capitalize">{exercise.name}</h2>
                    <p className="text-gray-600 mt-2"><strong>Target Muscle:</strong> {exercise.target}</p>
                    <p className="text-gray-600"><strong>Equipment:</strong> {exercise.equipment}</p>
                </div>
            </div>

            {/* YouTube Videos Section */}
            <h3 className="text-2xl font-semibold mt-8 mb-4 text-center">Related Exercise Videos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <iframe
                            className="w-full h-52"
                            src={`https://www.youtube.com/embed/${video.video.videoId}`}
                            title={video.video.title}
                            allowFullScreen
                        ></iframe>
                        <div className="p-4">
                            <a
                                href={`https://www.youtube.com/watch?v=${video.video.videoId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 font-semibold hover:underline"
                            >
                                Watch on YouTube
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExerciseDetail;
