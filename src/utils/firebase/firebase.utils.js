import { initializeApp } from "firebase/app";
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider, 
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

const provider =  new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const singInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db,'users', userAuth.uid); 
    
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error ){
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
};