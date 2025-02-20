import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../Firebase/firebase.init";


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const auth = getAuth(app);

    // create a new user
    const createUser = async (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .finally(() => setLoading(false))
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        });
      };


    // login registered user
    const login = async (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .finally(() => setLoading(false));
    }



    // log-out
    const logOut = async() => {
        setLoading(true);
        return signOut(auth)
            .finally(() => setLoading(false));
    }



    // google auth provider
    const provider = new GoogleAuthProvider();



    // google sign-in
    const googleSignIn = async() => {
        setLoading(true);
        return signInWithPopup(auth, provider)
        .finally(()=>setLoading(false))
    }



    // observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setLoading(false)
            } else {
                setUser(null);
            }
        });
        return unsubscribe;
    }, []);





    const authInfo = {
        loading,
        setLoading,
        user,
        setUser,
        createUser,
        updateUserProfile,
        login,
        googleSignIn,
        logOut,

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;