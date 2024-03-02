import React, {createContext, useState} from "react";

import {cartItem} from "./cartItem";

export const CartContext = createContext<{
    cart: cartItem[],
    addToCart: (newCartItem: cartItem) => void,
    updateCartItem: (updatedCartItem: cartItem) => void,
    clearCart: () => void}>({
    cart: [],
    addToCart: () => {},
    updateCartItem: () => {},
    clearCart: () => {}
});

export default function CartContextProvider(props: {children?: React.ReactNode}) {
    const [cart, setCart] = useState<cartItem[]>([]);

    function handleAddToCart(newCartItem: cartItem) {
        setCart(prevState => [...prevState, newCartItem]);
    }
    function handleUpdateQuantity(updatedCartItem: cartItem) {
        if(updatedCartItem.quantity === 0) {
            setCart(prevState => prevState.filter(cartItem => cartItem.burgerId !== updatedCartItem.burgerId));
        } else {

            setCart(prevState => {
                const tempCart = [...prevState];
                const updatedIndex = prevState.findIndex(cartItem => cartItem.burgerId === updatedCartItem.burgerId);
                tempCart[updatedIndex] = updatedCartItem;
                return tempCart;
            })
        }
    }
    function handleClearCart() {
        setCart([]);
    }

    const contextValues = {
        cart,
        addToCart: handleAddToCart,
        updateCartItem: handleUpdateQuantity,
        clearCart: handleClearCart
    }

    return (
        <CartContext.Provider value={contextValues}>
            {props.children}
        </CartContext.Provider>
    )
}