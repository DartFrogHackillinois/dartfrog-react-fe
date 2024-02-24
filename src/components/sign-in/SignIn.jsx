import React from 'react';
import './SignIn.css';
import app from '../../firebaseconfig'; // Adjust the import path as necessary
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
const auth = getAuth(app);
function SignIn({ onSignIn }) {
    const handleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                console.log(result);
                onSignIn(); // Trigger the onSignIn callback after successful sign in
            })
            .catch((error) => {
                // Handle Errors here.
                console.error(error);
            });
    };

    return (
        <div className="sign-in-overlay">
            <div className="sign-in-box">
                <button onClick={handleSignIn}>Sign in with Google</button>
            </div>
        </div>
    );
}

export default SignIn;
