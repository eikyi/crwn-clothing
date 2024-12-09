import {CheckoutContainer,CheckoutHeader,HeaderBlock,Total} from './checkout.styles.jsx';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';


const Checkout = () => {
    const {cartItems,grandTotalAmount} = useContext(CartContext);
    console.log(cartItems);
    return(
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {cartItems.map((item) => (
                <CheckoutItem key={item.id} checkoutItem={item} />
            ))}
            <Total>Grand Total: {grandTotalAmount}</Total>
        </CheckoutContainer>
        
    );
}
export default Checkout;