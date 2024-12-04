import { createContext, useState ,useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    //find if the cart item contains product to Add
    const existingCartItem = cartItems.find((element) => element.id === productToAdd.id)
    //if found increase the quantity
    if (existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
        {...cartItem,quantity:cartItem.quantity+1} :
        cartItem)
    }
    //return new array with modified cartItem / new cart item
    return [...cartItems, {...productToAdd,quantity:1}];
}
export const CartContext = createContext({
    isCartOpen : false,
    setIsCartOpen    : () => {},
    cartItems :[],
    addItemToCart: () => {},
    totalNoOfCartItems : 0,

})

export const CartProvider = ({children}) => {
    const [isCartOpen,setIsCartOpen] = useState(false);
    
    const [cartItems, setCartItems] = useState([]);
    const [totalNoOfCartItems,setTotalNoOfCartItems] = useState(0);

    useEffect( () => {
        const newCartCount = cartItems.reduce((total,cartItem)=> total+cartItem.quantity,0)
        setTotalNoOfCartItems(newCartCount);
    },[cartItems])
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems,productToAdd));
    };
    const value = {isCartOpen,setIsCartOpen,addItemToCart,cartItems,totalNoOfCartItems};
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )

}