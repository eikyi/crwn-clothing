import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';

const CartIcon = () => {
    const {isCartOpen,setIsCartOpen,totalNoOfCartItems} = useContext(CartContext);
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)
    return(
        <div className='cart-icon-container' onClick={toggleIsCartOpen}>
            <ShoppingIcon className="shopping-icon"></ShoppingIcon>
            <span className='item-count'>{totalNoOfCartItems}</span>
        </div>
    )
}
export default CartIcon;