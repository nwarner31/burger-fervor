import classes from "./BurgerTile.module.css";
import {burger} from "../data/burger";
import {currencyFormatter} from "../utility/formatting";
import {CartContext} from "../data/CartContext";
import {useState, useContext} from "react";

import AddToCart from "./AddToCart";

interface burgerTileProps {
    burger: burger
}
export default function BurgerTile(props: burgerTileProps) {
    const {burger} = props;
    const {cart} = useContext(CartContext);
    const cartIndex = cart.findIndex(cartItem => cartItem.burgerId === burger.id);
    const quantityInCart = cartIndex !== -1 ? cart[cartIndex].quantity : 0;

    const [showModal, setShowModal] = useState<boolean>(false);

    function openModal() {
        setShowModal(true);
    }
    function closeModal() {
        setShowModal(false);
    }

    return (
        <div className={classes.body}>
            <div className={`${classes.section} ${classes["s-left"]}`}>
                <h3>{burger.name}</h3>
                <p>{burger.description}</p>
                <p className={classes.price}>Starting at: {currencyFormatter.format(burger.smallPrice)}</p>
            </div>
            <div className={`${classes.section} ${classes["s-right"]}`}>
                <img className={classes.img} src={burger.imgSource}/>
                <button type="button" className={classes["add-button"]} onClick={openModal} disabled={quantityInCart !== 0}>{quantityInCart === 0 ? "+" : quantityInCart}</button>
            </div>
            {showModal && <AddToCart close={closeModal} burger={burger} />}
        </div>
    );
}