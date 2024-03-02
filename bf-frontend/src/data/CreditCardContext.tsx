import React, {createContext, useEffect, useState} from "react";

import {creditCard} from "./creditCard";

export const CreditCardContext = createContext<{
    creditCards: creditCard[],
    addCreditCard: (newCreditCard: creditCard) => void,
    updateCreditCard: (updatedCreditCard: creditCard) => void,
    deleteCreditCard: (creditCardId: number) => void
}>({
    creditCards: [],
    addCreditCard: () => {},
    updateCreditCard: () => {},
    deleteCreditCard: () => {}
})

export default function CreditCardContextProvider(props: {children?: React.ReactNode}) {
    const [creditCards, setCreditCards] = useState<creditCard[]>([]);

    async function handleAddCreditCard(newCreditCard: creditCard) {
        const id = creditCards.length > 0 ? creditCards[creditCards.length -1].id + 1 : 1;
        newCreditCard.id = id;
        const response = await fetch('http://localhost:4000/credit-card', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newCreditCard)
        });
        const data = await response.json();
        if (data.message === "Credit Card saved") setCreditCards(prevState => [...prevState, newCreditCard]);
    }
    async function handleUpdateCreditCard(updatedCreditCard: creditCard) {
        const response = await fetch(`http://localhost:4000/credit-card/${updatedCreditCard.id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updatedCreditCard)
        });
        const data = await response.json();
        if (data.message === "Credit Card saved") {
            setCreditCards(prevState => {
                const updatedCreditCards = [...prevState];
                const indexToUpdate = updatedCreditCards.findIndex(creditCard => creditCard.id === updatedCreditCard.id);
                updatedCreditCards[indexToUpdate] = updatedCreditCard;
                return updatedCreditCards;
            });
        }

    }
    async function handleDeleteCreditCard(creditCardId: number) {
        const response = await fetch(`http://localhost:4000/credit-card/${creditCardId}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        });
        const data = await response.json();
        if(data.message === "Credit Card deleted") {
            setCreditCards(prevState => {
                const updatedCreditCards = [...prevState];
                return updatedCreditCards.filter(creditCard => creditCard.id !== creditCardId);
            });
        }

    }

    useEffect(() => {
        (async () => {
            const response = await fetch("http://localhost:4000/credit-card");
            const data = await response.json();
            setCreditCards(data);
        })();
    }, [])

    const contextValues = {
        creditCards,
        addCreditCard: handleAddCreditCard,
        updateCreditCard: handleUpdateCreditCard,
        deleteCreditCard: handleDeleteCreditCard
    }
    return (<CreditCardContext.Provider value={contextValues}>
        {props.children}
    </CreditCardContext.Provider>);
}