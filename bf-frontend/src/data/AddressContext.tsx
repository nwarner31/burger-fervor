import React, {createContext, useEffect, useState} from "react";
import {address} from "./address";


export const AddressContext = createContext<{
    addresses: address[],
    addAddress: (newAddress: address) => void,
    updateAddress: (updatedAddress: address) => void,
    deleteAddress: (addressId: number) => void}>({
    addresses: [],
    addAddress: () => {},
    updateAddress: () => {},
    deleteAddress: () => {}
})

export default function AddressContextProvider(props: {children?: React.ReactNode}) {
    const [addresses, setAddresses] = useState<address[]>([]);

    async function handleAddAddress(newAddress: address) {
        const id = addresses.length > 0 ? addresses[addresses.length -1].id + 1 : 1;
        newAddress.id = id;
        const response = await fetch("http://localhost:4000/address", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newAddress)
        });
        const data = await response.json();
        if (data.message === "Address saved") setAddresses(prevState => [...prevState, newAddress]);
    }
    async function handleUpdateAddress(updatedAddress: address) {
        const response = await fetch(`http://localhost:4000/address/${updatedAddress.id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updatedAddress)
        });
        const data = await response.json();
        if (data.message === "Address saved") {
            setAddresses(prevState => {
                const updatedAddresses = [...prevState];
                const indexToUpdate = updatedAddresses.findIndex(address => address.id === updatedAddress.id);
                updatedAddresses[indexToUpdate] = updatedAddress;
                return updatedAddresses;
            });
        }

    }
    async function handleDeleteAddress(addressId: number) {
        const response = await fetch(`http://localhost:4000/address/${addressId}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        });
        const data = await response.json();
        if (data.message === "Address deleted") {
            setAddresses(prevState => {
                const updatedAddresses = [...prevState];
                return updatedAddresses.filter(address => address.id !== addressId);
            });
        }

    }
    useEffect(() => {
        (async () => {
            const response = await fetch("http://localhost:4000/address");
            const data = await response.json();
            setAddresses(data as unknown as address[]);
        })();
    }, [])

    const contextValues = {
        addresses,
        addAddress: handleAddAddress,
        updateAddress: handleUpdateAddress,
        deleteAddress: handleDeleteAddress
    }
    return (
        <AddressContext.Provider value={contextValues}>
            {props.children}
        </AddressContext.Provider>);
}