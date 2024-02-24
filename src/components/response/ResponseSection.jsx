import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import './ResponseSection.css';

// Register Chart.js components
Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
function ResponseSection() {
    const [content, setContent] = useState(null);

    // Simulating an API call
    useEffect(() => {
        const fetchData = async () => {
            // Simulate an API call with a delay
            const response = await new Promise((resolve) => {
                setTimeout(() => {
                    // Simulate a response from the server
                    // This could be replaced with actual API call logic
                    const responseData = Math.random() > 0.5 ?
                        {
                            type: 'text',
                            data: 'This is a dynamically generated piece of text from the API.'
                        } :
                        {
                            type: 'graph',
                            data: {
                                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                datasets: [{
                                    label: 'Dataset from API',
                                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                    borderColor: 'rgba(54, 162, 235, 1)',
                                    borderWidth: 1,
                                    hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
                                    hoverBorderColor: 'rgba(54, 162, 235, 1)',
                                    data: [12, 19, 3, 5, 2, 3, 9],
                                }],
                            }
                        };
                    resolve(responseData);
                }, 1000); // Delay in milliseconds
            });

            setContent(response);
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs once on mount

    // Function to render content based on the data received from the API
    const renderContent = () => {
        if (!content) {
            return <p>Loading...</p>; // Display a loading state while waiting for the response
        }

        switch (content.type) {
            case 'text':
                return <p>{content.data}</p>;
            case 'graph':
                return <Bar data={content.data} />;
            default:
                return <p>Unsupported content type.</p>;
        }
    };

    return (
        <div className="response-section">
            <div className="response-content">{renderContent()}</div>
        </div>
    );
}

export default ResponseSection;
