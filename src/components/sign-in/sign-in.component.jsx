import { useState } from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth,userSignInWithEmailAndPassword} from "../../utils/firebase/firebase.utils";
import SingUpForm from "../sign-up/sign-up.component";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button-component";
import './sign-in.styles.scss';

const SignInForm = () => {
    const defaultFormField ={
        email:'',
        password:'',
    }
    const [formFields, setFormFields] = useState(defaultFormField);
    const {displayName, email, password} = formFields;

    const loginGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocFef = await createUserDocumentFromAuth(user)
    }
    const handleChange = (event) => {
        const {name,value} = event.target;
        setFormFields({ ...formFields, [name]:value})
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const{ user }= await userSignInWithEmailAndPassword(email,password);
            console.log(user)
            
        }catch(error) {
            switch(error.code) {
                case 'auth/invalid-credential':
                    alert("Invalid Email or Password")
                    break;
                default:
                    console.log(error);
            }
        }
        
    }
    return(
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={ handleSubmit }>
                <FormInput 
                label="Email"
                type="email" required onChange={handleChange} name="email" value={email}></FormInput>
                <FormInput 
                label = "Password"
                type="password" required onChange={handleChange} name="password" value={password}></FormInput>
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType="google" onClick={loginGoogleUser}>Google Sign in</Button>
                </div>
                
            </form>
        </div>
        
    );
}
export default SignInForm;