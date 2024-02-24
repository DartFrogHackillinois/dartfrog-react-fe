import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './ResponseSection.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ResponseSection() {
    const [content, setContent] = useState([]);

    useEffect(() => {
        // Simulate fetching data and generate random content
        const generateContent = () => {
            const newContent = [];
            for (let i = 0; i < 10; i++) { // Generate 10 items
                if (Math.random() > 0.5) {
                    // Generate a chart
                    const chartData = {
                        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                        datasets: [{
                            label: `Dataset ${i}`,
                            data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 100)),
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                        }]
                    };
                    newContent.push({ type: 'graph', data: chartData });
                } else {
                    // Generate text
                    newContent.push({ type: 'text', data: `Random text content ${i}` });
                }
            }
            setContent(newContent);
        };

        generateContent();
    }, []);

    const renderContentItem = (item, index) => {
        switch (item.type) {
            case 'graph':
                return <div key={index} className="response-item"><Bar data={item.data} /></div>;
            case 'text':
                return <div key={index} className="response-item"><p>{item.data}</p></div>;
            default:
                return null;
        }
    };

    return (
        <div className="response-section">
            {content.map(renderContentItem)}
        </div>
    );
}

export default ResponseSection;
