import {order} from "../data/order";
import CheckoutCartItem from "./CheckoutCartItem";
import classes from "./Order.module.css";


export default function Order({order}: {order: order}) {
    const {address, creditCard, order: orderItems} = order;
    return (
        <div className={classes.body}>
            <div className={classes["info-container"]}>
                <div className={classes.info}>
                    <h3>Address</h3>
                    <h4>{address.name}</h4>
                    <div>{address.street1}</div>
                    <div>{address.street2}</div>
                    <div>{address.city}, {address.state}</div>
                </div>
                <div className={classes.info}>
                    <h3>Credit Card</h3>
                    <h4>{creditCard.cardName}</h4>
                    <div>{creditCard.cardNumber}</div>
                    <div>{creditCard.expirationDate}</div>
                    <div>{creditCard.nameOnCard}</div>
                </div>
            </div>
            <div className={classes["border-div"]}></div>
            <div className={classes["item-container"]}>
                {orderItems.map((orderItem) => <div className={classes.item}><CheckoutCartItem key={orderItem.burgerId} cartItem={orderItem} /></div>)}
            </div>
        </div>);
}