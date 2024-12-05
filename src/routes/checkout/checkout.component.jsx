import './checkout.styles.scss';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';


const Checkout = () => {
    const {cartItems,grandTotalAmount} = useContext(CartContext);
    console.log(cartItems);
    return(
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.map((item) => (
                <CheckoutItem key={item.id} checkoutItem={item} />
            ))}
            <span className='total'>Grand Total: {grandTotalAmount}</span>
        </div>
        
    );
}
export default Checkout;