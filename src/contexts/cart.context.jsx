import { createContext, useState ,useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    //find if the cart item contains product to Add
    const existingCartItem = cartItems.find((element) => element.id === productToAdd.id)
    //if found increase the quantity
    if (existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
        {...cartItem,quantity:cartItem.quantity+1,totalPrice:cartItem.price * (cartItem.quantity+1)} :
        cartItem)
    }
    //return new array with modified cartItem / new cart item
    return [...cartItems, {...productToAdd,quantity:1,totalPrice:productToAdd.price}];
}
const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find((element) => element.id === productToRemove.id)
    //If quantity is 1 remove the item from array
    if(existingCartItem.quantity ===1){
        return cartItems.filter(cartItem => cartItem.id !== existingCartItem.id);
    }

    return cartItems.map((cartItem) => cartItem.id === productToRemove.id ?
        {...cartItem,quantity:cartItem.quantity-1,totalPrice:cartItem.price * (cartItem.quantity-1)} :
        cartItem)
}

const removeCartItems = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find((element) => element.id === productToRemove.id)
    return cartItems.filter(cartItem => cartItem !== existingCartItem);

}

export const CartContext = createContext({
    isCartOpen : false,
    setIsCartOpen    : () => {},
    cartItems :[],
    addItemToCart: () => {},
    totalNoOfCartItems : 0,
    grandTotalAmount:0,

})

export const CartProvider = ({children}) => {
    const [isCartOpen,setIsCartOpen] = useState(false);
    
    const [cartItems, setCartItems] = useState([]);
    const [totalNoOfCartItems,setTotalNoOfCartItems] = useState(0);
    const [grandTotalAmount,setGrandTotalAmount] = useState(0);

    useEffect( () => {
        const newCartCount = cartItems.reduce((total,cartItem)=> total+cartItem.quantity,0);
        const newGrandTotal = cartItems.reduce((total,cartItem)=> total+cartItem.totalPrice,0);
        setTotalNoOfCartItems(newCartCount);
        setGrandTotalAmount(newGrandTotal);
    },[cartItems])
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems,productToAdd));
    };
    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems,productToRemove));
    }
    const removeItemsFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItems(cartItems,cartItemToRemove));
    }
    const value = {isCartOpen,setIsCartOpen,addItemToCart,cartItems,
        totalNoOfCartItems,removeItemFromCart,removeItemsFromCart,
        grandTotalAmount};
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )

}