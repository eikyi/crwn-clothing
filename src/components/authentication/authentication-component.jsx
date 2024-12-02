
import SingUpForm from "../sign-up/sign-up.component";
import SignInForm from "../sign-in/sign-in.component";
import './authentication.styles.scss'


const Authentication = () => {
    
    return(
        <div className="authenticaion-container">
            
        <SignInForm />
        <SingUpForm />
        </div>
        
    );
}
export default Authentication;