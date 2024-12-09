import { initializeApp } from 'firebase/app';
import { getAuth , signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged} from 'firebase/auth'
import { getFirestore, doc,getDoc,setDoc,collection,writeBatch ,query,getDocs} from 'firebase/firestore'

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

  export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) => {
    const collectionRef = collection(db,collectionKey);
    const batch = writeBatch(db);
    console.log(objectsToAdd);
    if(objectsToAdd){
      objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef,object.title.toLowerCase());
        batch.set(docRef,object);
  
      });
    }
    
    await batch.commit();
    console.log("done");
  }

  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db,'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce( (acc,docSnapShot) => {
      const {title,items} = docSnapShot.data(); 
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
    return categoryMap;
  }

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
