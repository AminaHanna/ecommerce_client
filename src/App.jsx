import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminRegister from "./admin/Register/Register";
import AdminLogin from "./admin/Login/Login";
import Product from "./admin/Product/Product";
import Cart from "./admin/Cart/Cart";
import Orders from "./admin/Orders/Orders";
import Payment from "./admin/Payment/Payment";
import Home from "./user/Home/Home";
import User from "./admin/User/User";
import Protected from "./admin/Protected/Protected";
import Login from "./user/Login/Login";
import Register from "./user/Register/Register";
import Details from "./user/Product_details/Details";
import PlaceOrder from "./user/PlaceOrder/PlaceOrder";
import Order from "./user/Orders/Orders";
import Profile from "./user/Profile/Profile";
import Layout from "./user/Layout/Layout";
import Transactions from "./user/transactions/transactions";
import UserCart from "./user/Cart/UserCart";



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
          path:"home",
          element:<Home/>
        },
        {
          path: "details/:id",
          element: <Details/>,
        },
        {
          path: "orders",
          element: <Order/>,
        },
        {
          path: "place-order",
          element: <PlaceOrder/>,
        },
        {
          path:"profile",
          element:<Profile/>
        },
        {
          path:'/transaction',
          element:<Transactions/>
        },
        {
          path:'/cart',
          element:<UserCart/>
        }
      ]
    },
    



    {
      path: "/admin",
      element: <Protected/>,
      children: [
        {
          path: "product",
          element: <Product />,
        },
        {
          path: "home",
          element:<Home/> 
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "orders",
          element: <Orders />,
        },
        {
          path: "payment",
          element: <Payment />,
        },
        {
          path: "users",
          element:<User/>
        },
      ],
    },
   

    {
      path: "admin-register",
      element: <AdminRegister />,
    },
    {
      path: "admin-login",
      element: <AdminLogin />,
    },

    {
      path: "user-register",
      element: <Register/>,
    },
    {
      path: "user-login",
      element: <Login/>,
    },




    // {
    //   path:'/user',
    //   element:<>user</>,
    //   children:[
    //     {
    //       path:"about",
    //       element:<>about</>
    //     },
    //     {
    //       path:"/"
    //     }
    //   ]
      
    // }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
