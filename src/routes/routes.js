import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
]);

export default routes;
