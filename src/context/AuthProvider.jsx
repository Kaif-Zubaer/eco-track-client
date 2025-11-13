import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updatePassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

const googlrProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setloading] = useState(true);
    // console.log(user);

    const createUser = (email, password) => {
        setloading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const userLogin = (email, password) => {
        setloading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleLogin = () => {
        setloading(true);
        return signInWithPopup(auth, googlrProvider);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setloading(false);
        })
        return () => {
            unsubscribe();
        }
    })

    const userUpdate = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    }

    const passwordUpdate = (newPassword) => {
        return updatePassword(auth.currentUser, newPassword);
    }

    const forgetpassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    const userLogout = () => {
        return signOut(auth);
    }

    const authInfo = {
        user,
        loading,
        setUser,
        setloading,
        createUser,
        userLogin,
        googleLogin,
        userUpdate,
        passwordUpdate,
        forgetpassword,
        userLogout,
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;