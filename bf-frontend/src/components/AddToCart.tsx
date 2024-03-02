import Modal from "./Modal";
import {burger} from "../data/burger";
import {currencyFormatter} from "../utility/formatting";
import classes from "./AddToCart.module.css";
import React, {useState, useContext} from "react";
import {cartItem} from "../data/cartItem";
import {CartContext} from "../data/CartContext";

interface addToCartProps {
    close: () => void,
    burger: burger
}
export default function AddToCart(props: addToCartProps) {
    const { close, burger } = props;
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("small");
    const {addToCart} = useContext(CartContext);
    function newQuantity(direction: string) {
        if(direction === "up") {
            setQuantity(prevState => prevState + 1);
        } else {
            setQuantity(prevState => prevState - 1);
        }
    }

    function handleSizeChange(event: React.FormEvent<HTMLInputElement>) {
        setSize(event.currentTarget.value);
    }

    function handleAddToCart() {
        const sizeKey = `${size}Price` as keyof burger
        const cartItem: cartItem = {
            burgerId: burger.id,
            burgerName: burger.name,
            itemPrice: burger[sizeKey] as number,
            size,
            quantity,
            burgerImg: burger.imgSource
        };
        console.log(cartItem);
        addToCart(cartItem);
        close();
    }
    return (
        <Modal closeModal={close} className={classes.body} >

                <div className={classes["image-container"]}>
                    <img
                        alt={burger.name}
                        src={burger.imgSource}
                        className={classes["cart-img"]}/>
                    <button className={classes["close-button"]} onClick={close}>X</button>
                </div>
            <div className={classes["body-container"]}>
                 <h1 className={classes.header}>{burger.name}</h1>
                <p>{burger.description}</p>
                <p>{currencyFormatter.format(burger.smallPrice)}</p>
                <hr />
                <div className={classes["size-container"]}>
                    <h3 className={classes["size-header"]}>Select a size:</h3>
                    <div>
                        <input type="radio" id="small" name="size" value="small" onChange={handleSizeChange} checked={size === "small"} />
                        <label htmlFor="small">small (3 oz) <span className="bold">{currencyFormatter.format(burger.smallPrice)}</span></label>
                    </div>
                    <div>
                        <input type="radio" id="medium" name="size" value="medium" onChange={handleSizeChange} checked={size === "medium"} />
                        <label htmlFor="medium">medium (4 oz) <span className="bold">{currencyFormatter.format(burger.mediumPrice)}</span></label>
                    </div>
                    <div>
                        <input type="radio" id="large" name="size" value="large" onChange={handleSizeChange} checked={size === "large"} />
                        <label htmlFor="large">large (5.5 oz) <span className="bold">{currencyFormatter.format(burger.largePrice)}</span></label>
                    </div>
                    <div>
                        <input type="radio" id="massive" name="size" value="massive" onChange={handleSizeChange} checked={size === "massive"} />
                        <label htmlFor="massive">massive (8 oz) <span className="bold">{currencyFormatter.format(burger.massivePrice)}</span></label>
                    </div>
                </div>
            </div>
            <div className={classes["button-container"]}>
                <button
                    disabled={quantity === 1}
                    onClick={() => newQuantity("down")}
                    type="button"
                    className={classes["quantity-button"]}>-</button>
                {quantity}
                <button
                    onClick={() => newQuantity("up")}
                    type="button"
                    className={classes["quantity-button"]}>+</button>
                <button className={classes["add-to-cart"]} onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </Modal>
    );
}