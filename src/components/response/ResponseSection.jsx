import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './ResponseSection.css';
import app from '../../firebaseconfig'; // Adjust the path according to your project structure
import {collection, getDocs, getFirestore} from 'firebase/firestore';
import ResponseText from '../response-text/ResponseText';
import ResponseChart from "../response-chart/ResponseChart";
import ResponseInstance from '../response-instance/ResponseInstance';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const db = getFirestore(app);
function ResponseSection() {
    const [content, setContent] = useState([]);

    // Updates when component is re-run
    useEffect(() => {
        const fetchContent = async () => {
            const contentCollectionRef = collection(db, 'graphData'); // Replace 'yourCollectionName' with your actual collection name
            const contentDocs = await getDocs(contentCollectionRef);
            const contentData = contentDocs.docs.map(doc => ({
                type: doc.data().type, // Assuming each document has a 'type' field
                data: doc.data().data, // Assuming each document has a 'data' field
            }));


            setContent(contentData);
        };

        fetchContent();
    }, []);

    // const renderContentItem = (item, index) => {
    //     switch (item.type) {
    //         case 'graph':
    //             return <div key={index} className="response-item"><Bar data={item.data} /></div>;
    //         case 'text':
    //             return <div key={index} className="response-item"><p>{item.data}</p></div>;
    //         default:
    //             return null;
    //     }
    // };

    return (
        <div className="response-section">
            {/* {content.map(renderContentItem)} */}
            <ResponseChart tester={localStorage.getItem('component_id')}/>
            <ResponseText tester={localStorage.getItem('component_id')}/>
            <ResponseInstance Text={"hey"} />
        </div>
    );
}

export default ResponseSection;
