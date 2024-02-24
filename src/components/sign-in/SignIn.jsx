import React, {useState, useEffect} from 'react';
import './SignIn.css';
import app from '../../firebaseconfig'; // Adjust the import path as necessary
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
const auth = getAuth(app);
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

    useEffect(()=> {
        setValue(localStorage.getItem("user_id"));
    })

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
                    <button onClick={handleSignIn} className="google-signin">Sign in with Google</button>
                </div>
                <div className="dartfrog-signin-footer">
                    <p>By signing in, you agree to our Terms of Service and Privacy Policy.</p>
                </div>
            </div>
        </div>
    );


}

export default SignIn;
