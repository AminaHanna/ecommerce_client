import { Card } from '@mui/material';
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Details() {


  const value = useLocation();
  console.log(value,'value');

  return (
    <div className=''>
      <h1 className="text-4xl text-center">PRODUCT_DETAILS</h1>
      <Card className='p-5 m-auto my-5' style={{width:"300px"}}>
        <img className='' style={{width:"200px",height:"200px",borderRadius:"10%"}} src={`http://localhost:3000/${value.state.products.profile}`}/> 
        <p>{value.state.products.name}</p>
          <Link to={'/place-order'} state={{
            product:value.state.products
          }}>
          <div className=" h-[10px] flex justify-center items-center w-[160px] rounded-md ms-7 mt-8 text-white px-10 py-7 bg-green-700">
            <button>Place order</button>
          </div>
          </Link>
      </Card>
    </div>
  )
}

export default Details
