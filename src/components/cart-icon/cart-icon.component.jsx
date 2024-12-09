
import {CartIconContainer,ShoppingIcon,ItemCount } from './cart-icon.styles';
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';

const CartIcon = () => {
    const {isCartOpen,setIsCartOpen,totalNoOfCartItems} = useContext(CartContext);
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)
    return(
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon></ShoppingIcon>
            <ItemCount>{totalNoOfCartItems}</ItemCount>
        </CartIconContainer>
    )
}
export default CartIcon;