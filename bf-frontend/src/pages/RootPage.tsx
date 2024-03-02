import {Outlet} from "react-router-dom";
import CartContextProvider from "../data/CartContext";
import Header from "../components/Header";
import AddressContextProvider from "../data/AddressContext";
import CreditCardContextProvider from "../data/CreditCardContext";


export default function RootPage() {
    return (
        <CartContextProvider>
            <AddressContextProvider>
                <CreditCardContextProvider>
                    <Header />
                    <Outlet />
                </CreditCardContextProvider>
            </AddressContextProvider>

        </CartContextProvider>);
}