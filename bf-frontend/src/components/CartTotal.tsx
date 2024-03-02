import classes from "./CartTotal.module.css"
import {currencyFormatter} from "../utility/formatting";
import {cartItem} from "../data/cartItem";
import {useContext} from "react";
import {CartContext} from "../data/CartContext";


export default function CartTotal() {
    const {cart} = useContext(CartContext);
    const subTotal = cart.reduce((prevTotal:number, cartItem: cartItem) => prevTotal + (cartItem.itemPrice * cartItem.quantity), 0);
    const tax = subTotal * .05;
    return (
        <div>
            <div className={classes["price-row"]}>
                <div className={classes["price-label"]}>Subtotal</div>
                <div className={classes["price-amount"]}>{currencyFormatter.format(subTotal)}</div>
            </div>
            <div className={classes["price-row"]}>
                <div className={classes["price-label"]}>Sales Tax</div>
                <div className={classes["price-amount"]}>{currencyFormatter.format(tax)}</div>
            </div>
            <div className={classes["price-row"]}>
                <div className={classes["price-label"]}>Total</div>
                <div className={classes["price-amount"]}>{currencyFormatter.format(subTotal + tax)}</div>
            </div>

        </div>);
}