import './ResponseInstance.css'
import React, {Fragment, useState, useEffect} from 'react';
import app from '../../firebaseconfig'; // Adjust the import path as necessary
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { where, query, getDocs, collection, getFirestore } from 'firebase/firestore'
import ChatInstance from '../chat-instance/ChatInstance';
import ReactMarkdown from 'react-markdown';
const db = getFirestore(app);
const auth = getAuth(app);
function ResponseInstance({Text}) {

    const [userResponses, setUserResponses] = useState([]);
    var responses = [];

    useEffect(() => {
        // This useEffect will run once when the component mounts
        const getUserResponses = async () => {
            const responseMessagesQuery = query(collection(db, 'responseMessages'), where('fileID', '==', "tester"));
            const querySnapshot = await getDocs(responseMessagesQuery);
            querySnapshot.forEach((doc) => {
                responses.push({
                    id: String(responses.length),
                    response: doc.data() // Assuming 'response' is the field you want
                });
                setUserResponses(responses);
            });
        };

        getUserResponses(); // Call the function to fetch data
    }); // Empty dependency array means this effect runs once on mount    
    var stra = "";
    const printLength = () => {
        
        stra = responses[0].response.generated_response;
    }

    return (
        <div className='response-instance-container'>
           <div className='mapped-contents'>
            {userResponses.map((chat) => (
                <Fragment key={chat.id}>
                    <ReactMarkdown>{chat.response.generated_response}</ReactMarkdown>    
                </Fragment>
            ))}
            </div>
        </div>
    );
}

export default ResponseInstance;