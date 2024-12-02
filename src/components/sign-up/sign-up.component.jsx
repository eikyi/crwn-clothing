import { useState } from "react";
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button-component";
import './sign-up.styles.scss';

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
        if(password != confirmPassword) {
            alert("Password and confirm password do not match!");
            return;
        };
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email,password);
            console.log(user)
            const userDocFef = await createUserDocumentFromAuth(user,{ displayName })
            resetFormFields();

        }catch(error) {
            if(error.code == 'auth/email-already-in-use'){
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
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
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
        </div>
    );
}
export default SingUpForm;