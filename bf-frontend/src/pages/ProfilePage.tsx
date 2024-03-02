import {useContext, useState} from "react";

import { AddressContext } from "../data/AddressContext";
import { CreditCardContext } from "../data/CreditCardContext";
import classes from "./ProfilePage.module.css"
import ProfileAddress from "../components/ProfileAddress";
import ProfileCreditCard from "../components/ProfileCreditCard";
import AddressModal from "../components/AddressModal";
import CreditCardModal from "../components/CreditCardModal";

export default function ProfilePage() {
    const { addresses } = useContext(AddressContext);
    const { creditCards } = useContext(CreditCardContext)
    const [addressModalOpen, setAddressModalOpen] = useState(false);
    const [creditCardModalOpen, setCreditCardModalOpen] = useState(false);
    return (
        <div className={classes.body}>
            {addressModalOpen && <AddressModal close={() => setAddressModalOpen(false)} />}
            {creditCardModalOpen && <CreditCardModal close={() => setCreditCardModalOpen(false)} />}
            <h2>Saved Addresses:</h2>
            { addresses.length === 0 && <div><h2>You do not have any saved addresses</h2></div> }
            { addresses.map(address => <ProfileAddress address={address} key={address.id} />)}
            <div className={classes["add-address"]} onClick={() => setAddressModalOpen(true)}><h2>+ Add a new Address</h2></div>
            <h2>Saved Credit Cards:</h2>
            {creditCards.length === 0 && <div><h2>You do not have any saved credit cards</h2></div>}
            {creditCards.map(creditCard => <ProfileCreditCard key={creditCard.id} creditCard={creditCard} />)}
            <div className={classes["add-credit-card"]} onClick={() => setCreditCardModalOpen(true)}><h2>+ Add a new Credit Card</h2></div>
        </div>);
}