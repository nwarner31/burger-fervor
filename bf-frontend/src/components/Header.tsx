import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";

export default function Header() {
    return (
        <header>
            <h1>BURGER FERVOR</h1>
            <ul className={classes["nav-list"]}>
                <li className={classes["nav-button"]}><NavLink to="/" end className={({isActive}) => isActive ? classes.active : classes.inactive}>Home</NavLink></li>
                <li className={classes["nav-button"]}><NavLink to="/profile" className={({isActive}) => isActive ? classes.active : classes.inactive}>Profile</NavLink></li>
                <li className={classes["nav-button"]}><NavLink to="/orders" className={({isActive}) => isActive ? classes.active : classes.inactive}>Orders</NavLink></li>
            </ul>
        </header>
    );
}