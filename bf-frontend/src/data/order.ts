import {address} from "./address";
import {creditCard} from "./creditCard";
import {cartItem} from "./cartItem";

export interface order {
    address: address,
    creditCard: creditCard,
    order: cartItem[]
}