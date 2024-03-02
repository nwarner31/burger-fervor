import {useNavigate} from "react-router-dom";


import CartItem from "./CartItem";
import {cartItem} from "../data/cartItem";
import classes from "./Cart.module.css";
import {useContext} from "react";
import {CartContext} from "../data/CartContext";
import CartTotal from "./CartTotal";


export default function Cart() {
    const {cart} = useContext(CartContext);
    const navigate = useNavigate();
    const subTotal = cart.reduce((prevTotal:number, cartItem: cartItem) => prevTotal + (cartItem.itemPrice * cartItem.quantity), 0);
    const tax = subTotal * .05;
    function goToCheckout() {
        navigate("/checkout");
    }
    return (
        <div>
            <div>
                {cart.map(cartItem => <CartItem cartItem={cartItem} key={cartItem.burgerId} />)}
            </div>
           <div>
               <CartTotal />
               <button type="button" disabled={cart.length === 0} className={classes["checkout-button"]} onClick={goToCheckout} >Go to Checkout</button>
           </div>
        </div>
    );
}