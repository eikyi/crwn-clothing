import './checkout-item.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';


const CheckoutItem = ({checkoutItem}) =>{
    const {name,imageUrl,price,quantity,totalPrice} = checkoutItem;
    const {addItemToCart,removeItemFromCart,removeItemsFromCart} = useContext(CartContext);
    const addToCartHandler = () => addItemToCart(checkoutItem);
    const removeFromCartHandler = () => removeItemFromCart(checkoutItem);
    const removeItemsFromCartHandler = () => removeItemsFromCart(checkoutItem);
    
    return(
        <div className="checkout-item-container">
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`}/>
            </div>
            <span className='name'>{name}</span>
            <span className="quantity">
            <div onClick={removeFromCartHandler} className='arrow'>&#10094;</div>
            <span className='value'>{quantity}</span>
            <div onClick={addToCartHandler} className='arrow'>&#10095;</div>
            </span>
            <span className="price">{totalPrice}</span>
            <div className='remove-button' onClick={removeItemsFromCartHandler}> &#10005; </div>
           
            <div>
                
            </div>
           
        </div>
    )
}
export default CheckoutItem;   