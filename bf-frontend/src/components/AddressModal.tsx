import Modal from "./Modal";
import Input from "./Input";
import classes from "./AddressModal.module.css";
import {address} from "../data/address";
import {AddressContext} from "../data/AddressContext";
import React, {useState, useContext} from "react";
export default function AddressModal({close, address}: {close: ()=> void, address?: address}) {
    const [addressToSave, setAddressToSave] = useState(address ? address :
        {id: -1,
        name: "",
        street1: "",
        street2: "",
        city: "",
        state: ""});

    const [errors, setErrors] = useState( {name: false, street1: false, city: false, state: false})
    const {addAddress, updateAddress} = useContext(AddressContext)
    function save() {
        let isValid = true;
        for (const field in addressToSave) {
            if(!["id", "street2"].includes(field) && !validateField(field)) {
               isValid = false
            }
        }
        if (!isValid) return;
        if(addressToSave.id === -1) {
            addAddress(addressToSave);
        } else {
            updateAddress(addressToSave);
        }
        close();
    }
    function validateField(fieldName: string): boolean {
        if((addressToSave[fieldName as keyof address] as string).trim() === "") {
            setErrors(prevState => { return {...prevState, [fieldName]: true} })
            return false;
        }
        return true;
    }
    function removeError(fieldName: string) {
        setErrors(prevState => { return {...prevState, [fieldName]: false}})
    }
    function updateField(event: React.ChangeEvent<HTMLInputElement>) {
        setAddressToSave(prevState => { return {...prevState, [event.target.name]: event.target.value}; })
    }

    return (
        <Modal closeModal={close} className={classes.main}>

                <button className={classes.exit} onClick={close}>X</button>
                <Input
                    label="Name"
                    id="name"
                    name="name"
                    containerClass={classes.input}
                    value={addressToSave.name}
                    onChange={updateField}
                    onBlur={() => validateField("name")}
                    onFocus={() => removeError("name")}
                    className={errors.name ? classes.error : ""}/>
                <div className={classes["input-row"]}>
                    <Input
                        label="Street 1"
                        id="street-1"
                        name="street1"
                        containerClass={classes.input}
                        value={addressToSave.street1}
                        onChange={updateField}
                        onBlur={() => validateField("street1")}
                        onFocus={() => removeError("street1")}
                        className={errors.street1 ? classes.error : ""}/>
                    <Input label="Street 2" id="street-2" name="street2" containerClass={classes.input} value={addressToSave.street2} onChange={updateField} />
                </div>
                <div className={classes["input-row"]}>
                <Input
                    label="City"
                    id="city"
                    name="city"
                    containerClass={classes.input}
                    onChange={updateField} value={addressToSave.city}
                    onBlur={() => validateField("city")}
                    onFocus={() => removeError("city")}
                    className={errors.city ? classes.error : ""}/>
                <Input
                    label="State"
                    id="state"
                    name="state"
                    containerClass={classes.input}
                    onChange={updateField}
                    value={addressToSave.state}
                    onBlur={() => validateField("state")}
                    onFocus={() => removeError("state")}
                    className={errors.state ? classes.error : ""}/>
                </div>
    <div className={classes["input-row"]}>
        <button className={classes.cancel} onClick={close}>Cancel</button>
        <button className={classes.save} onClick={save}>{addressToSave.id === -1 ? "Save" : "Update"}</button>
    </div>
        </Modal>);
}