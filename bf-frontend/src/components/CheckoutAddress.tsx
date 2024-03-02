import {address} from "../data/address";
import classes from "./CheckoutAddress.module.css";


export default function CheckoutAddress({address, className}: {address: address, className?: string}) {
    return (
        <div className={`${classes.body} ${className ? className : ""}`}>
            <div className={classes.header}>{address.name}</div>
            <div>
                {address.street1}
            </div>
            <div>
                {address.street2}
            </div>
            <div>
                {address.city}, {address.state}
            </div>
        </div>);
}