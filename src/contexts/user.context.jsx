import { createContext, useState, useEffect } from "react";
import { onAuthStateChangeListener, createUserDocumentFromAuth} from "../utils/firebase/firebase.utils";

//actual user value
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser : ()=> null,

});


export const UserProvider = ({children}) => {
    const [currentUser,setCurrentUser] = useState(null);
    const value = {currentUser,setCurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangeListener( (user) => {
            console.log(user);
            if (user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        })
        return unsubscribe;
    }, [])
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>

}