import React, { useState, useContext } from "react";

import Modal from "./Modal";
import {creditCard} from "../data/creditCard";
import { CreditCardContext } from "../data/CreditCardContext";
import classes from "./CreditCardModal.module.css";
import Input from "./Input";

export default function CreditCardModal({close, creditCard}: {close: () => void, creditCard?: creditCard}) {
    const [creditCardToSave, setCreditCardToSave] = useState(creditCard ? creditCard :
        {id: -1,
        cardName: "",
        nameOnCard: "",
        expirationDate: "",
        cardNumber: ""});

    const [errors, setErrors] = useState({cardName: false, nameOnCard: false, expirationDate: false, cardNumber: false});
    const {addCreditCard, updateCreditCard} = useContext(CreditCardContext);
    function updateField(event: React.ChangeEvent<HTMLInputElement>) {
        setCreditCardToSave(prevState => {
            const fieldName = event.target.name;
            const newValue = event.target.value;
            return {...prevState, [fieldName]: newValue};
        })
    }
    function save() {
        let isValid = true;
        for (const field in creditCardToSave) {
            if (field !== "id" && !validateField(field)) isValid = false;
        }
        if(!isValid) return;
        if(creditCardToSave.id === -1) {
            addCreditCard(creditCardToSave);
        } else {
            updateCreditCard(creditCardToSave);
        }
        close();
    }

    function validateField(fieldName: string): boolean {
        if(creditCardToSave[fieldName as keyof creditCard].toString().trim() === "") {
            setErrors(prevState => { return {...prevState, [fieldName]: true}});
            return false;
        }
        return true;
    }
    function removeError(fieldName: string) {
        setErrors(prevState => { return {...prevState, [fieldName]: false} });
    }
    return (
        <Modal closeModal={close} className={classes.body}>
            <button className={classes.exit} onClick={close}>X</button>
            <div className={classes["input-row"]}>
                <Input
                    label="Card Name"
                    id="cardName"
                    name="cardName"
                    value={creditCardToSave.cardName}
                    containerClass={classes.input}
                    className={`${classes.text} ${errors.cardName ? classes.error : ""}`}
                    onChange={updateField}
                    onFocus={() => removeError("cardName")}
                    onBlur={() => validateField("cardName")}/>
                <Input
                    label="Name on Card"
                    id="nameOnCard"
                    name="nameOnCard"
                    value={creditCardToSave.nameOnCard}
                    containerClass={classes.input}
                    className={`${classes.text} ${errors.nameOnCard ? classes.error : ""}`}
                    onChange={updateField}
                    onFocus={() => removeError("nameOnCard")}
                    onBlur={() => validateField("nameOnCard")}/>
            </div>
           <div className={classes["input-row"]}>
               <Input
                   label="Card Number"
                   id="cardNumber"
                   name="cardNumber"
                    value={creditCardToSave.cardNumber}
                   containerClass={classes.input}
                   className={`${classes.text} ${errors.cardNumber ? classes.error : ""}`}
                   onChange={updateField}
                   onFocus={() => removeError("cardNumber")}
                   onBlur={() => validateField("cardNumber")}/>
               <Input
                   label="Expiration Date"
                   id="expirationDate"
                   name="expirationDate"
                    value={creditCardToSave.expirationDate}
                   containerClass={classes.input}
                   className={`${classes.text} ${errors.expirationDate ? classes.error : ""}`}
                   onChange={updateField}
                   onFocus={() => removeError("expirationDate")}
                    onBlur={() => validateField("expirationDate")}/>
           </div>
            <div className={classes["button-container"]}>
                <button className={classes.cancel} onClick={close}>Cancel</button>
                <button type="button" className={classes.save} onClick={save}>{creditCardToSave.id === -1 ? "Save" : "Update"}</button>
            </div>


        </Modal>);
}