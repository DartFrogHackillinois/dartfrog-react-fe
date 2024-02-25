import React, { useState, useEffect } from 'react';
import { query, getDocs, collection, where, getFirestore } from 'firebase/firestore';
import app from '../../firebaseconfig'; // Adjust the import path as necessary
import {Bar, Line, Radar, Doughnut, Pie, PolarArea, Bubble, Scatter} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    PointElement
} from 'chart.js';

const db = getFirestore(app);

// Register the chart components you're using
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement, // Make sure to register the PointElement
    LineElement,
    Title,
    Tooltip,
    Legend
);

// Mapping from chart type string to the corresponding React component
const chartComponents = {
    line: Line,
    bar: Bar,
    radar: Radar,
    doughnut: Doughnut,
    pie: Pie,
    polarArea: PolarArea,
    bubble: Bubble,
    scatter: Scatter,
};

function ResponseChart() {
    const [chartData, setChartData] = useState(null);
    const [chartType, setChartType] = useState('');

    useEffect(() => {
        const getUserResponses = async () => {
            const responseMessagesQuery = query(
                collection(db, "graphData"),
                where("user_id", "==", localStorage.getItem("user_id")),
                where("file_id", "==", localStorage.getItem("component_id"))
            );
            const querySnapshot = await getDocs(responseMessagesQuery);

            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                console.log(doc.data());
                if (doc.exists()) {
                    const data = doc.data();
                    console.log(data.graph_response);
                    setChartType(data.graph_type.toLowerCase()); // Ensure lowercase to match keys in chartComponents
                    setChartData(data.graph_response); // Assuming this is the correct format for react-chartjs-2
                }else {
                    console.log("Document does not exist");
                }
            }
            else {
                console.log("Query snapshot is empty");
            }
        };

        getUserResponses();
    }, []); // Dependency array is empty, so this effect runs once on mount

    const SpecificChart = chartComponents[chartType];
    console.log(chartData);
    return (
        <div onClick={() => console.log("Clicked")} className='response-text-container'>
            {SpecificChart && chartData ? (
                <SpecificChart data={chartData.data} options={chartData.options} />
            ) : (
                <p>Loading chart...</p>
            )}
        </div>
    );
}

export default ResponseChart;
