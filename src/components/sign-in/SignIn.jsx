import React from 'react';
import './SignIn.css';

function SignIn({ onSignIn }) {
    // Placeholder sign-in function
    const handleSignIn = () => {
        onSignIn();
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
