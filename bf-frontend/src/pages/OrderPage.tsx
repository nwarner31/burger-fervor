import Order from "../components/Order";
import {useEffect, useState} from "react";
import {order} from "../data/order";
import classes from "./OrderPage.module.css";

export default function OrderPage() {
    const [orders, setOrders] = useState<order[]>([]);

    useEffect(() => {
        (async () => {
            const response = await fetch("http://localhost:4000/order");
            const data = await response.json();
            setOrders(data as order[]);
        })();
    }, []);

    return (
        <div className={classes.body}>
            <h2>Your Previous Orders:</h2>
            {orders.map((order, index) => <Order key={index} order={order} />)}
        </div>);
}