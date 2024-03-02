import {creditCard} from "../data/creditCard";
import { CreditCardContext } from "../data/CreditCardContext";
import classes from "./ProfileCreditCard.module.css";
import CreditCardModal from "./CreditCardModal";
import { useState, useContext } from "react";


export default function ProfileCreditCard({creditCard}: {creditCard: creditCard}) {
    const lastFour = creditCard.cardNumber.slice(-4);
    const [showModal, setShowModal] = useState(false);
    const { deleteCreditCard } = useContext(CreditCardContext);
    return (
        <div className={classes.body}>
            {showModal && <CreditCardModal close={() => setShowModal(false)} creditCard={creditCard} />}
            <div className={classes["main-container"]}>
                <h2 className={classes.header}>{creditCard.cardName}</h2>
                <div className={classes["info-container"]}>
                    <div className={classes["display-field"]}>({lastFour})</div>
                    <div className={classes["display-field"]}>{creditCard.nameOnCard}</div>
                    <div className={classes["display-field"]}>{creditCard.expirationDate}</div>
                </div>
            </div>
            <div className={classes["button-container"]}>
                <button className={classes["light-button"]} onClick={() => setShowModal(true)}>Edit</button>
                <button className={classes["dark-button"]} onClick={() => deleteCreditCard(creditCard.id)}>Delete</button>
            </div>

        </div>);
}