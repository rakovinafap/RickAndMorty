import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { Link, useLocation } from 'react-router-dom';
import './firebase.css';

const firebaseConfig = {
  apiKey: "AIzaSyDCrwvufMxQz57HJfZS3JR7KR7bWtbO9qo",
  authDomain: "rickandmortyauth-f682f.firebaseapp.com",
  projectId: "rickandmortyauth-f682f",
  storageBucket: "rickandmortyauth-f682f.appspot.com",
  messagingSenderId: "829790622562",
  appId: "1:829790622562:web:d7515343ba454050a2523b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

const AuthProvider = () => {
    const [user, setUser] = useState(auth.currentUser);
    console.log(user)

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (maybeUser) => {
            if (maybeUser != null) {
                setUser(maybeUser);
            }
        });

        return unSub;
    }, [auth]);

    const handleSignIn = () => {
        signInWithPopup(auth, googleAuthProvider)
            .then((credential) => setUser(credential.user))
            .catch(error => console.error('Error signing in:', error));
    };

    const handleSignOut = () => {
        signOut(auth)
            .then(() => setUser(null))
            .catch(error => console.error('Error signing out:', error));
    };

    const location = useLocation();

    return (
            <div className='mainComponent'>

                {location.pathname.includes('character') ? (
                        <div>
                        <Link className='buttonBack' to="/">
                        <span>⇦</span> GO BACK
                        </Link>
                        </div>
                    ): (
                        <p></p>
                    )}

                {user ? (
                <div className='userBar'>
                    {user.photoURL && (
                    <img
                        src={user.photoURL}
                        alt="User Profile"
                    />
                    )}
                    <span>{user.displayName}</span>
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
                ) : (
                <div className='authButton'>
                    <button onClick={handleSignIn}>Sign In with Google</button>
                </div>
                )}
            </div>
            );
}

export default AuthProvider;
