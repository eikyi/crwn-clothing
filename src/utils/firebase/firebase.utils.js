import { initializeApp } from 'firebase/app';
import { getAuth , signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged} from 'firebase/auth'
import { getFirestore, doc,getDoc,setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC_2CZzT8yX6hUWkFBFc9kU0kbkcUoDrxs",
    authDomain: "crwn-clothing-db254.firebaseapp.com",
    projectId: "crwn-clothing-db254",
    storageBucket: "crwn-clothing-db254.firebasestorage.app",
    messagingSenderId: "499829481060",
    appId: "1:499829481060:web:d618001d4ac20dcc2f4971"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.getCustomParameters(
    {
        prompt:"select_account"
    }
  );

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth,provider);
  export const db = getFirestore();

  export const userSignInWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth,email,password);
  }

  export const createUserDocumentFromAuth = async (userAuth,addationalInformaion) => {
    const userDocRef = doc( db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());
    if(!userSnapshot.exists()){
        const { displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...addationalInformaion,
            });
        }catch (error){
            console.log("error creating user",error.message);
        }
    }
  }

  export const createAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth,email,password);

  }
  export const signOutUser = async() => await signOut(auth);
  
  export const onAuthStateChangeListener = (callback) => { 
    onAuthStateChanged(auth,callback)
};
