import { useState } from "react";
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button-component";
import {SignUpContainer,SignUpHeader} from './sign-up.styles';

const defaultFormField ={
    displayName : '',
    email:'',
    password:'',
    confirmPassword:''
}
const SingUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormField);
    const {displayName, email, password, confirmPassword} = formFields;


    const resetFormFields = () => {
        setFormFields(defaultFormField);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword) {
            alert("Password and confirm password do not match!");
            return;
        };
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email,password);
            //setCurrentUser(user);
            const userDocRef = await createUserDocumentFromAuth(user,{ displayName })
            console.log(userDocRef);
            resetFormFields();

        }catch(error) {
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use');
            }else{
                console.log('User creation error: s',error);
            }
            
        }
        
    }

    const handleChange = (event) => {
        const {name,value} = event.target;
        setFormFields({ ...formFields, [name]:value})
    }
    return(
        <SignUpContainer>
            <SignUpHeader>Don't have an account?</SignUpHeader>
            <span>Sign up with your email and password</span>
            <form onSubmit={ handleSubmit }>
                <FormInput 
                label="Display Name"
                type="text" required onChange={handleChange} name="displayName" value={displayName}></FormInput>
                <FormInput 
                label="Email"
                type="email" required onChange={handleChange} name="email" value={email}></FormInput>
                <FormInput 
                label = "Password"
                type="password" required onChange={handleChange} name="password" value={password}></FormInput>
                <FormInput 
                label="Confirm Password"
                type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}></FormInput>
                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    );
}
export default SingUpForm;