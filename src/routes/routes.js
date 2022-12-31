import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../pages/Main/Home";
import About from "../pages/Main/About";
import TopRated from "../pages/Main/About";
import Cart from "../pages/Main/Cart";
import Dashboard from "../layout/Dashboard/Dashboard";
import ProductList from "../pages/Dashborad/ProductList";
import AddProduct from "../pages/Dashborad/AddProduct";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      { path: "top-rated", element: <TopRated /> },
      { path: "cart", element: <Cart /> },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard",
        element: <ProductList />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
    ],
  },
]);

export default routes;
