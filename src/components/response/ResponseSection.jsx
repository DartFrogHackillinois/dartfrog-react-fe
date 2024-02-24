import React, { useEffect, useState, useContext } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line, Scatter, PolarArea, Doughnut, Bubble, Radar, Pie } from 'react-chartjs-2';
import './ResponseSection.css';
import app from '../../firebaseconfig'; // Adjust the path according to your project structure
import { collection, query, where, onSnapshot, getFirestore } from 'firebase/firestore';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);
const db = getFirestore(app);
const chartComponents = {
    bar: Bar,
    line: Line,
    scatter: Scatter,
    polarArea: PolarArea,
    doughnut: Doughnut,
    bubble: Bubble,
    radar: Radar,
    pie: Pie
};

function ResponseSection({ generating, setGenerating }) {
    const [content, setContent] = useState([]);
    const userID = localStorage.getItem('user_id');
    console.log(generating);
    useEffect(() => {
        console.log(generating);
        if(generating){
            setGenerating(false);
            if (!userID) return; // Ensure userID exists

            const unsubscribes = [];

            const fetchData = async () => {
                setContent([]); // Clear previous content

                // Handle graphData
                const graphDataQuery = query(collection(db, 'graphData'), where('user_id', '==', userID));
                unsubscribes.push(onSnapshot(graphDataQuery, (snapshot) => {
                    const graphData = snapshot.docs.map(doc => ({
                        type: doc.data().chartType, // 'bar', 'line', etc.
                        data: doc.data().data,
                    }));
                    setContent(prevContent => [...prevContent, ...graphData]);
                }));

                // Handle text responses
                const responseMessagesQuery = query(collection(db, 'responseMessages'), where('user_id', '==', userID));
                unsubscribes.push(onSnapshot(responseMessagesQuery, (snapshot) => {
                    const responseMessages = snapshot.docs.map(doc => ({
                        type: 'text',
                        data: doc.get('generated_response'),
                    }));
                    setContent(prevContent => [...prevContent, ...responseMessages]);
                }));
            };

            fetchData();

            // Cleanup function to unsubscribe from onSnapshot listeners when component unmounts or refreshData changes
            return () => {
                unsubscribes.forEach(unsubscribe => unsubscribe());
            };

        }
    }, [generating]); // Depend on userID and refreshData to refetch on changes

    const renderContentItem = (item, index) => {
        const ChartComponent = chartComponents[item.type];
        if (ChartComponent) {
            return <div key={index} className="response-item"><ChartComponent data={item.data} /></div>;
        } else if (item.type === 'text') {
            return <div key={index} className="response-item"><p>{item.data}</p></div>;
        }
        return null;
    };

    return (
        <div className="response-section">
            {content.map(renderContentItem)}
        </div>
    );
}

export default ResponseSection;
