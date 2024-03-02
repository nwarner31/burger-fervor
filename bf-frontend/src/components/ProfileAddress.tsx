import {useState, useContext} from "react";

import {address} from "../data/address";
import classes from "./ProfileAddress.module.css";
import {AddressContext} from "../data/AddressContext";
import AddressModal from "./AddressModal";


export default function ProfileAddress({address}: {address: address}) {
    const {deleteAddress} = useContext(AddressContext);
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className={classes.body}>
            {modalOpen && <AddressModal close={() => setModalOpen(false)} address={address} />}

            <div className={classes.main}>
                <div className={classes["info-panel"]}>
                    <h2 className={classes.header}>{address.name}</h2>
                        <div>
                            <div className={classes["display-field"]}>{address.street1}</div>
                            <div className={classes["display-field"]}>{address.street2}</div>
                        </div>
                        <div>
                            <div className={classes["display-field"]}>{address.city}</div>
                            <div className={classes["display-field"]}>{address.state}</div>
                        </div>
                </div>

                <div className={classes["button-container"]}>
                    <button type="button" className={classes["light-button"]} onClick={() => setModalOpen(true)}>Edit</button>
                    <button type="button" className={classes["dark-button"]} onClick={() => deleteAddress(address.id)}>Delete</button>
                </div>
            </div>

        </div>);
}