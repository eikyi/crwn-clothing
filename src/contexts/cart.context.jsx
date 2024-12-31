import { createContext ,useReducer} from "react";
import { createAction } from "../utils/reducers/reducer.utils";

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
    cartCount : 0,
    grandTotal:0,

})
const INITIAL_STATE = {
    isCartOpen : false,
    cartItems :[],
    cartCount : 0,
    grandTotal:0
}
export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
    
}
const cartReducer = (state, action) => {
    const {type,payload} = action;
    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`Unhandled type: ${type} in cartReducer`);
    }
}

export const CartProvider = ({children}) => {

    const [{cartItems,isCartOpen,cartCount,grandTotal}, dispatch] = 
        useReducer(cartReducer, INITIAL_STATE);
    // const [isCartOpen,setIsCartOpen] = useState(false);
    
    // const [cartItems, setCartItems] = useState([]);
    // const [totalNoOfCartItems,setTotalNoOfCartItems] = useState(0);
    // const [grandTotalAmount,setGrandTotalAmount] = useState(0);

    // useEffect( () => {
    //     const newCartCount = cartItems.reduce((total,cartItem)=> total+cartItem.quantity,0);
    //     const newGrandTotal = cartItems.reduce((total,cartItem)=> total+cartItem.totalPrice,0);
    //     setTotalNoOfCartItems(newCartCount);
    //     setGrandTotalAmount(newGrandTotal);
    // },[cartItems]);

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total,cartItem)=> total+cartItem.quantity,0);
        const newGrandTotal = newCartItems.reduce((total,cartItem)=> total+cartItem.totalPrice,0);
        console.log("newCartItems", newCartItems);
        console.log("newCartCount", newCartCount);
        console.log("newGrandTotal", newGrandTotal);
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS,{cartItems : newCartItems, cartCount: newCartCount, grandTotal: newGrandTotal}));
    }   

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems,productToAdd);
        updateCartItemsReducer(newCartItems);
    };
    const removeItemFromCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems,productToRemove);
        updateCartItemsReducer(newCartItems);
    }
    const removeItemsFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItems(cartItems,cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }
    const setIsCartOpen = (isOpen) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,isOpen));
    }
    const value = {isCartOpen,setIsCartOpen,addItemToCart,cartItems,
    cartCount,removeItemFromCart,removeItemsFromCart,
    grandTotal};
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )

}