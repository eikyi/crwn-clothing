import { useState } from "react";
import { signInWithGooglePopup,userSignInWithEmailAndPassword} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button,{BUTTON_TYPE_CLASSES} from "../button/button-component";
import {SignUpContainer,SignUpHeader,ButtonContainer} from '../sign-up/sign-up.styles';

const SignInForm = () => {
    const defaultFormField ={
        email:'',
        password:'',
    }
    const [formFields, setFormFields] = useState(defaultFormField);
    const { email, password} = formFields;

    const loginGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        console.log(user);
    }
    const handleChange = (event) => {
        const {name,value} = event.target;
        setFormFields({ ...formFields, [name]:value})
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const{ user }= await userSignInWithEmailAndPassword(email,password);
            console.log(user);
            //setCurrentUser(user);
            
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
        <SignUpContainer>
            <SignUpHeader>Already have an account?</SignUpHeader>
            <span>Sign in with your email and password</span>
            <form onSubmit={ handleSubmit }>
                <FormInput 
                label="Email"
                type="email" required onChange={handleChange} name="email" value={email}></FormInput>
                <FormInput 
                label = "Password"
                type="password" required onChange={handleChange} name="password" value={password}></FormInput>
                <ButtonContainer>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={loginGoogleUser}>Google Sign in</Button>
                </ButtonContainer>
                
            </form>
        </SignUpContainer>
        
    );
}
export default SignInForm;