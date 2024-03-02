import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootPage from "./pages/RootPage";
import HomePage, { loader as homeLoader} from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderPage from "./pages/OrderPage";
import './App.css';

const router = createBrowserRouter([
  {path: "/", element: <RootPage />, children: [
          {element: <HomePage/>, index: true, loader: homeLoader},
          {path: "profile", element: <ProfilePage />},
          {path: "checkout", element: <CheckoutPage />},
          {path: "orders", element: <OrderPage />}
      ]}
]);
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
