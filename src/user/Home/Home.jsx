import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products");
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const addtoCart = async (id)=>{
    try {
      const response = await axios.post("http://localhost:3000/api/users/addtocart",{productId:id},{headers:{'Authorization':localStorage.getItem("token"  )}});
    } catch (error) {
      console.log(error);
    }
  }


  return (

        <div className="mx-10 my-32 flex gap-10 flex-wrap justify-center">
          {products.map((item) => {
            return (
              <>
                  <div className="bg-slate-500 w-[300px] p-7 rounded hover:bg-slate-950">
                    <Link to={`/details/${item._id}`}  state={{products:item}}>
                      <img style={{width:"80px",height:"80px",borderRadius:"50%"}} src={`http://localhost:3000/${item.profile}`}/>
                      <h1 className="text-white">Item : {item.name}</h1>
                      <p className="text-white">Price : {item.price}</p>
                      <p className="text-white">Details : {item.details}</p> 
                    </Link>
                    <button onClick={()=>{
                      addtoCart(item._id)
                      }}>
                      <div className="text-white text-center">
                        <i class="fa-solid fa-cart-shopping"></i>
                      </div>
                    </button>
                  </div>
              </>
            );
          })}
        </div>

  );
}
