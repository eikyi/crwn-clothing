import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
const SignIn = () => {
    const loginGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocFef = await createUserDocumentFromAuth(user)
    }
    return(
        <div>
        <h1>I am sign in page</h1>
        <button onClick={loginGoogleUser}>Sign in with Google Pop up</button>
        </div>
        
    );
}
export default SignIn;