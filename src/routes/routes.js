import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../pages/Main/Home";
import About from "../pages/Main/About";
import TopRated from "../pages/Main/About";
import Cart from "../pages/Main/Cart";

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
]);

export default routes;
