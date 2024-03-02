import BurgerTile from "../components/BurgerTile";
import Cart from "../components/Cart";


import classes from "./HomePage.module.css";
import {useLoaderData, LoaderFunctionArgs} from "react-router-dom";

export default function HomePage() {
    const data = useLoaderData() as any[];


    console.log(data);
    return (
        <div className={classes.body}>
            <div className={`${classes.section} ${classes["s-left"]}`}>
                {data.map(burger => <BurgerTile key={burger.id} burger={burger} />)}

            </div>
            <div className={`${classes.section} ${classes["s-right"]}`}>
                <Cart />
            </div>

        </div>
    );
}

export async function loader(args: LoaderFunctionArgs<any>): Promise<any[]> {
    const response = await fetch("http://localhost:4000/burgers");
    const data = await response.json();
    return data;
}