import { useEffect } from "react";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Announce from "./components/Announce";
import Footer from "./components/Footer";
import LogginGuard from "./components/LogginGuard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
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
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <LogginGuard>
        <Login />
      </LogginGuard>
    ),
  },
  {
    path: "/register",
    element: (
      <LogginGuard>
        <Register />
      </LogginGuard>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

function App() {
  return (
    <div>
      <Navbar />
      <Announce />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
