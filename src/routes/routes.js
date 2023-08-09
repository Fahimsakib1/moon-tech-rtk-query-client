import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/Dashboard/Dashboard";
import Main from "../layout/Main/Main";
import AddProduct from "../pages/Dashboard/AddProduct";
import ProductList from "../pages/Dashboard/ProductList";
import About from "../pages/Main/About";
import Cart from "../pages/Main/Cart";
import Home from "../pages/Main/Home";
import TopRated from "../pages/Main/TopRated";
import EditProduct from "../pages/Dashboard/EditProduct";
import Try from "../pages/Dashboard/Try";

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
      {
        path: "top-rated",
        element: <TopRated />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
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
      {
        path: "/dashboard/editProduct/:id",
        element: <EditProduct></EditProduct>,
        loader: ({params}) => fetch(`http://localhost:5000/allProducts/product/${params.id}`)
      },


      {
        path: "/dashboard/try",
        element: <Try/>,
      },
    ],
  },
]);

export default routes;
