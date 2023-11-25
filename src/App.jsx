import { useEffect } from "react";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import { Navigate, createBrowserRouter, useLocation } from "react-router-dom";

const user = false;
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/products/:category",
    element: <ProductList />,
  },
  {
    path: "/product/:id",
    element: <Product />,
  },
  {
    path: "/login",
    element: user ? <Navigate to="/" replace={true} /> : <Login />,
  },
  {
    path: "/register",
    element: user ? <Navigate to="/" replace={true} /> : <Register />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

function App() {
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
