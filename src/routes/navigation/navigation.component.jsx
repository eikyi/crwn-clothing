import { Fragment , useContext} from "react";
import { Outlet,Link } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import {NavigationContainer,LogoContainer,NavLinks,NavLink} from './navigation.styles';
import { ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

const Navigation = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);
    //console.log(currentUser);
    
    return(
      <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
            <CrwnLogo className='logo'/>
            </LogoContainer>
          
            <NavLinks>
                <NavLink to='/shop'>
                    SHOP
                </NavLink>
                { currentUser? (<NavLink as='span'
                  onClick={signOutUser}>SIGN OUT</NavLink>)
                : (<NavLink className="nav-link" to='/auth'>
                    SIGN IN
                </NavLink>)}
                <CartIcon></CartIcon>
                
            </NavLinks>
            {isCartOpen && <CartDropdown></CartDropdown>}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    );
  }
export default Navigation;