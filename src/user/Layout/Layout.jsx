import { Avatar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link,Navigate,Outlet,useNavigate } from "react-router-dom";

export function Layout() {
  const [products, setProducts] = useState([]);
  const [tokenState, setTokenState] = useState(Boolean(localStorage.getItem("token")));

 

  const navigate = useNavigate()
  useEffect(() => {
    if(!tokenState){
      navigate('/user-login')
    }
   
  }, [navigate,tokenState]);


  
  

  return (
    <>
    {
      tokenState ? 
      <div className="flex justify-center items-center h-screen">
      <div className="w-[90%] m-auto h-[100vh] bg-slate-600 rounded-xl ">


      <div className="flex justify-between ">

        <div className="my-8 mx-10 flex gap-2">
          <Avatar></Avatar>
          <p className="text-lg text-white hover:text-orange-200 cursor-pointer">{JSON.parse(localStorage.getItem("users")).fname} {JSON.parse(localStorage.getItem("users")).lname}</p>
        </div>

        <div className="flex gap-4 justify-end my-8 mx-10 ">


           <Link to={'/profile'}>
            <p className="text-lg text-white hover:text-orange-200 cursor-pointer">Profile</p>
           </Link>

           <Link to={'/cart'}>
           <p className="text-lg text-white hover:text-orange-200 cursor-pointer">Cart</p>
           </Link>

           <Link to={'/transaction'} >
           <p className="text-lg text-white hover:text-orange-200 cursor-pointer">Transactions</p>
           </Link>

           <Link to={'/orders'}>
            <p className="text-lg text-white hover:text-orange-200 cursor-pointer">Orders</p>
           </Link>

           <Link to={'/home'}>
            <p className="text-lg text-white hover:text-orange-200 cursor-pointer">Home</p>
           </Link>


           
           <p onClick={()=>{
            localStorage.removeItem("users")
            localStorage.removeItem("token")
            navigate('/user-login')
           }} className="text-lg text-white hover:text-orange-200 cursor-pointer" >Logout</p>
           
        </div>
        </div>


        <div className="mx-10 my-32 flex gap-10 flex-wrap justify-center">
       {console.log('Rendering Outlet, tokenState:', tokenState)}
<Outlet/>
        </div>
      </div>
    </div>
 :

 navigate('/user-login')
    }
    </>
    
  );
}
export default Layout
