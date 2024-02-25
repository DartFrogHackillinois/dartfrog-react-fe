import './ResponseInstance.css'
import React, {Fragment, useState, useEffect} from 'react';
import app from '../../firebaseconfig'; // Adjust the import path as necessary
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { where, query, getDocs, collection, getFirestore } from 'firebase/firestore'
import ChatInstance from '../chat-instance/ChatInstance';
const db = getFirestore(app);
const auth = getAuth(app);
function ResponseInstance({Text}) {


    var responses = [];

    useEffect(() => {
        // This useEffect will run once when the component mounts
        const getUserResponses = async () => {
            const responseMessagesQuery = query(collection(db, 'responseMessages'), where('fileID', '==', "tester"));
            const querySnapshot = await getDocs(responseMessagesQuery);
            querySnapshot.forEach((doc) => {
                responses.push({
                    id: String(responses.length),
                    response: doc.data().generated_response, // Assuming 'response' is the field you want
                });
            });
        };

        getUserResponses(); // Call the function to fetch data
    }); // Empty dependency array means this effect runs once on mount    
    
    const printLength = () => {
        console.log(responses.length)
        responses.at(0).response = "heyey";
    }

    return (
        <div>
            <button onClick={printLength}>Print length</button>
           {responses.map((chat) => (
                <Fragment key={chat.id}>
                    <div>{chat.response}</div>
                </Fragment>
            ))}
        </div>
    );
}

export default ResponseInstance;