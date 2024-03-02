import {burger} from "./burger";

export interface cartItem {
    burgerId: number,
    burgerName: string,
    itemPrice: number,
    size: string,
    quantity: number,
    burgerImg: string
}