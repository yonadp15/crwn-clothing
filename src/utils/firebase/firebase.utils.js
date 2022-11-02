import { initializeApp } from "firebase/app";
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA6pOOLTPoOlMeVF0wUJ3rlgS0oHYWsmwQ",
  authDomain: "crwn-clothing-db-f60f6.firebaseapp.com",
  projectId: "crwn-clothing-db-f60f6",
  storageBucket: "crwn-clothing-db-f60f6.appspot.com",
  messagingSenderId: "415698057367",
  appId: "1:415698057367:web:2e50563af82484550411d2"
};


const firebaseApp = initializeApp(firebaseConfig);

const googleProvider =  new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const singInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const singInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);


export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {}
    ) => {
    if(!userAuth) return;

    const userDocRef = doc(db,'users', userAuth.uid); 

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error ){
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth,email,password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth,email,password)
}