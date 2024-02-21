import { Card } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Orders() {

    useEffect(()=>{
        fetchorders()
    },[])

    const [orders,setOrders] = useState([])

    const fetchorders = async ()=>{
       const response = await axios.get('http://localhost:3000/api/orders',{headers:{'Authorization':localStorage.getItem('token')}})

       setOrders(response.data.products)
    }

  return (
    <div className='flex gap-10 flex-wrap text-center my-10'>

        {
            orders.map((item)=>{
                return (
                    <>
                    <Card className='p-5' style={{width:"200px",backgroundColor:"black",color:"white"}}>
                        <div className="">
                            <p>first_name :{item.fname}</p>
                            <p>last_name :{item.lname}</p>
                            <p>product :{item.products.map((item)=>{
                                return(
                                    <>
                                    <p>{item.name}</p>
                                    </>
                                )
                            })}</p>
                        </div>
                        </Card>
                    </>
                )
            })
        }
    </div>
  )
}
