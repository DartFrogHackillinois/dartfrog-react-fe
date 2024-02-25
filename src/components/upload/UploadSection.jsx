import React, { Fragment, useState } from 'react';
import './UploadSection.css';
import { useDropzone } from 'react-dropzone';
import app from '../../firebaseconfig';
import { collection, addDoc, getFirestore, where, query, getDocs } from 'firebase/firestore';
import ChatInstance from '../chat-instance/ChatInstance';
import axios from 'axios';
import { files } from '../sign-in/SignIn';
import {v4} from 'uuid';
const db = getFirestore(app);
function UploadSection({setGenerating}) {
    const [uploadedFiles, setUploadedFiles] = useState([]);

    // Props for handling a file upload
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: async (acceptedFiles) => {
            setUploadedFiles(acceptedFiles);
            const reader = new FileReader();
            reader.addEventListener('load', function(e) {
                let fileContents = e.target.result
            });
            // Handle file uploads
            for (const file of acceptedFiles) {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const text = e.target.result;
                    try {
                        let newFileID = v4();
                        await addDoc(collection(db, 'csvUploads'), {
                            name: file.name,
                            userID: localStorage.getItem('user_id'),
                            fileID: newFileID,
                            timestamp: new Date(),
                            content: text,
                        });
                        // axios.post('http://172.16.131.44:52752/generate', {
                        //     userId: localStorage.getItem('user_id') // Ensure the key name matches what the server expects, e.g., userId vs userID
                        // }, {
                        //     headers: {
                        //         'Content-Type': 'application/json', // This is a common header for JSON requests
                        //     }
                        // })
                        //     .then(response => {
                        //         console.log(response.data);
                        //     })
                        //     .catch(error => {
                        //         console.error('There was an error!', error);
                        //     });
                        files.push(
                            {
                                id: newFileID,
                                component: ChatInstance(file.name, text)
                                // name: file.name,
                                // text: text
                            }
                        )
                        localStorage.setItem('generating','1');
                    } catch (error) {
                        console.error("Error uploading CSV content to Firestore:", error);
                    }
                };
                reader.readAsText(file); // Read the file as plain text
            }
        },
    });

    var chats = files;

    const [clickedComponent, setClickedComponent] = useState(null);

    // Handles clicks between components. More specifically, updates global storage variable component_id value with most recently clicked component
    const handleClick = (chat) => {
        setClickedComponent(chat.id);
        localStorage.setItem("component_id", chat.id)
    }

    return (
        <div className="upload-section">

            <div className="sidebar">
            Past Chats
            {chats.map((chat) =>
                <Fragment key={chat.id} >
                    <div onClick={() => handleClick(chat)}>{chat.component}</div>
                </Fragment>)}
            </div>
            <div className="upload-area" {...getRootProps()}>
                <input type="file" accept=".csv" {...getInputProps()}/>
                <p>Drag files here, or click to search your computer.</p>
            </div>
        </div>
    );
}
export default UploadSection;
