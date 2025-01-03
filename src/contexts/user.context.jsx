import { createContext, useEffect ,useReducer} from "react";
import { onAuthStateChangeListener, createUserDocumentFromAuth} from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducers/reducer.utils";

//actual user value
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser : ()=> null,

});
export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
    console.log("dispatched");
    console.log("action", action);
    const {type, payload} = action;

    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type: ${type} in userReducer`  );
    }   
};
const INITIAL_STATE = {
    currentUser: null
}
export const UserProvider = ({children}) => {
    //const [currentUser,setCurrentUser] = useState(null);
    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE );
    const {currentUser} = state;
    console.log("currentUser", currentUser);
    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    }
    const value = {currentUser,setCurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangeListener( (user) => {
            
            if (user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        })
        return unsubscribe;
    }, [])
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>

}
