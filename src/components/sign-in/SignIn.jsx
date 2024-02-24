import React, {useState, useEffect} from 'react';
import './SignIn.css';
import app from '../../firebaseconfig'; // Adjust the import path as necessary
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { where, query, getDocs, collection, getFirestore } from 'firebase/firestore'
import ChatInstance from '../chat-instance/ChatInstance';

const db = getFirestore(app);
const auth = getAuth(app);
var files = [];
function SignIn({ onSignIn }) {
    const [value, setValue] = useState('');
    const handleSignIn = () => {
        const provider = new GoogleAuthProvider();
        
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                
                setValue(result.user.uid);
                localStorage.setItem("user_id", result.user.uid)
                onSignIn(); // Trigger the onSignIn callback after successful sign in
            })
            .catch((error) => {
                // Handle Errors here.
                console.error(error);
            });
    };

    const getUserFiles = async () => {
        try {
            var index = 0;
            const q = query(collection(db, "csvUploads"), where("userID", "==", localStorage.getItem('user_id')));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                files.push(
                    {
                        id: String(index),
                        component: ChatInstance(doc.get("name"), doc.get("content"))
                    }
                )
                index += 1;
                console.log(doc.data(), "uploaded by", localStorage.getItem('user_id'))
                // console.log(doc.name, " => ", doc.data());
            });
        } catch (error) {
            console.log("Error fetching data", error);
        }
    }

    useEffect(()=> {
        setValue(localStorage.getItem("user_id"));
    })

    const signInOps = () => {
        handleSignIn();
        getUserFiles();
    }

    return (
        <div className="dartfrog-signin-page">
            <div className="dynamic-circle circle-one"></div>
            <div className="dynamic-circle circle-two"></div>
            <div className="dynamic-circle circle-three"></div>
            <div className="dynamic-circle circle-four"></div>
            <div className="dynamic-circle circle-five"></div>
            <div className="dynamic-circle circle-six"></div>
            <div className="dynamic-circle circle-seven"></div>
            <div className="dynamic-circle circle-eight"></div>

            <div className="dartfrog-signin-container">
                <div className="dartfrog-signin-header">
                    <h1>Welcome to DartFrog</h1>
                    <p>Start your journey with us</p>
                </div>
                <div className="dartfrog-signin-content">
                    <button onClick={signInOps} className="google-signin">Sign in with Google</button>
                </div>
                <div className="dartfrog-signin-footer">
                    <p>By signing in, you agree to our Terms of Service and Privacy Policy.</p>
                </div>
            </div>
        </div>
    );


}

export { files };
export default SignIn;
