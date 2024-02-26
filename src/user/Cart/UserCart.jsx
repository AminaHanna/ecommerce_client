import { Card } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function UserCart() {

    const [cart,setCart] = useState([])


    useEffect(()=>{
        fetchCart()
    },[])

 

    const fetchCart = async ()=>{
       const response = await axios.get('http://localhost:3000/api/users/listCart',{headers:{'Authorization':localStorage.getItem('token')}})
       setCart(response.data.data)
    }



  return (
    <div className=''>
      <div className="flex gap-5">
      {
        cart.map((item)=>{
            return(
                <div>
                  <Card className='p-5'>
                {item.product.map((product)=>{
                    return(
                        <div>
                            <img src={`http://localhost:3000/${product.profile}`} alt="loading" style={{width:"80px" ,height:"80px" , borderRadius:"15px" ,margin:"auto"}}/>
                            <p>{product.name}</p>
                            <p>price:{product.price}</p>
                            <p>Details:{product.details}</p>

                        </div>
                    )
                })}  
                </Card>
                </div>
            )
        })
      }
      </div>
    </div>
  )
}

export default UserCart
