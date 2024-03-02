import {cartItem} from "../data/cartItem";
import {currencyFormatter} from "../utility/formatting";
import classes from "./CheckoutCartItem.module.css";


export default function CheckoutCartItem({cartItem}: {cartItem: cartItem}) {
    return (
        <div className={classes.body}>
            <img className={classes.image} src={cartItem.burgerImg} />
            <div className={classes.details}>
                <div className={classes.header}>{cartItem.burgerName}</div>
                <div>{cartItem.size}</div>
                <div className={classes["price-line"]}>
                    <span>{cartItem.quantity}</span>
                    <span className={classes.total}>{currencyFormatter.format(cartItem.itemPrice * cartItem.quantity)}</span>
                </div>
            </div>
        </div>);
}