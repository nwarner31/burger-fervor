import {creditCard} from "../data/creditCard";
import classes from "./CheckoutCreditCard.module.css";

export default function CheckoutCreditCard({creditCard, className}: {creditCard: creditCard, className?: string}) {
    return (
        <div className={`${classes.body} ${className ? className : ""}`}>
            <div className={classes.header}>{creditCard.cardName}</div>
            <div>{creditCard.cardNumber}</div>
            <div>{creditCard.expirationDate}</div>
            <div>{creditCard.nameOnCard}</div>
        </div>);
}