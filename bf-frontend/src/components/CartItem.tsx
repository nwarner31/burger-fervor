import { useContext} from "react";

import {cartItem} from "../data/cartItem";
import {currencyFormatter} from "../utility/formatting";
import {CartContext} from "../data/CartContext";
import classes from "./CartItem.module.css"

export default function CartItem({cartItem}: {cartItem: cartItem}) {
    const {updateCartItem} = useContext(CartContext);

    function handleQuantityClick(direction: string) {
        const updatedCartItem = {...cartItem};
        if(direction === "up") {
            updatedCartItem.quantity++;
        } else {
            updatedCartItem.quantity--;
        }
        updateCartItem(updatedCartItem);
    }
    return (
        <div className={classes.body}>
            <img src={cartItem.burgerImg} className={classes.img} />
            <div className={classes["info-display"]}>
                <h3 className={classes.header}>{cartItem.burgerName}</h3>
                <p className={classes.size}>{cartItem.size}</p>
                <div className={classes["bottom-container"]}>
                    <span className={classes["cost-display"]}>{currencyFormatter.format(cartItem.itemPrice * cartItem.quantity)}</span>
                    <span className={classes["button-container"]}>
                        <button type="button" className={classes["left-button"]} onClick={() => handleQuantityClick("down")}>-</button>
                        <span className={classes.quantity}>{cartItem.quantity}</span>
                        <button type="button" className={classes["right-button"]} onClick={() => handleQuantityClick("up")}>+</button>
                    </span>
                </div>

            </div>
        </div>
    );
}