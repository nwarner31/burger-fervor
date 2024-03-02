import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";

import classes from "./CheckoutPage.module.css";
import {AddressContext} from "../data/AddressContext";
import {CreditCardContext} from "../data/CreditCardContext";
import {CartContext} from "../data/CartContext";
import usePost from "../hooks/usePost";
import CheckoutAddress from "../components/CheckoutAddress";
import CheckoutCreditCard from "../components/CheckoutCreditCard";
import CheckoutCartItem from "../components/CheckoutCartItem";
import CartTotal from "../components/CartTotal";

export default function CheckoutPage() {
    const {addresses} = useContext(AddressContext);
    const {creditCards} = useContext(CreditCardContext);
    const {cart, clearCart} = useContext(CartContext);
    const [selectedAddress, setSelectedAddress] = useState(-1);
    const [selectedCreditCard, setSelectedCreditCard] = useState(-1);
    const navigate = useNavigate();

    async function submitOrder() {
        const address = addresses[addresses.findIndex(address => address.id === selectedAddress)];
        if (address.street2 === "") delete address.street2;
        const body = {
            address ,
            creditCard: creditCards[creditCards.findIndex(creditCard => creditCard.id === selectedCreditCard)],
            order: cart
        }
        const response = await fetch("http://localhost:4000/order", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });
        const jsonData = await response.json();

        if (jsonData.message === "Order saved") {
            clearCart();
            navigate("/");
        }
    }
    return (
        <div className={classes.main}>
            <div>
                Select an Address:
                {addresses.map(address =>
                    <div key={address.id} className={classes["radio-container"]}>
                        <input
                            type="radio"
                            className={classes.radio}
                            name="address"
                            id={`address-${address.id}`}
                            value={address.id}
                            onChange={() => setSelectedAddress(address.id)}/>
                        <label htmlFor={`address-${address.id}`}>
                            <CheckoutAddress address={address} className={selectedAddress === address.id ? classes.selected : ""} />
                        </label>
                    </div>)}
                Select a Credit Card:
                {creditCards.map(creditCard =>
                    <div key={creditCard.id} className={classes["radio-container"]}>
                        <input type="radio" className={classes.radio} name="credit-card" id={`credit-card-${creditCard.id}`} onChange={() => setSelectedCreditCard(creditCard.id)} />
                        <label htmlFor={`credit-card-${creditCard.id}`}>
                            <CheckoutCreditCard creditCard={creditCard} className={selectedCreditCard === creditCard.id ? classes.selected : undefined} />
                        </label>
                    </div>)}
            </div>
            <div>
                <h2>Your Cart:</h2>
                {cart.map(cartItem => <CheckoutCartItem cartItem={cartItem} />)}
                <CartTotal />
                <button
                    type="button"
                    className={classes["order-button"]}
                    disabled={selectedAddress === -1 || selectedCreditCard === -1}
                    onClick={submitOrder}>
                    Order
                </button>
            </div>
        </div>);
}