import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { errorToast } from '../../components/Toast'
import { Card } from '@mui/material'

function User() {

  const [products,setProducts] = useState([])

  useEffect(()=>{
    fetchUsers()
  },[])

  const fetchUsers=async()=>{
    try {
      const response = await axios.get("http://localhost:3000/api/users")
    setProducts(response.data.users)      
    } catch (error) {
      errorToast(error.message || 'error')
    }
  }
  return (
    <div className=''>
      
      <table className='m-auto bg-white '>
            <tr style={{border:"1px solid black"}}>
              <th className='text-black p-5'>User</th>
              <th className='text-black p-5'>email</th>
            </tr>
         
      {/* login cheytha usersne view cheyyaan */}
      
    {
      products.map((item)=>{
        return( 
        <Fragment>
          <tr>
            <td style={{border:"1px solid black"}} className='text-black p-5'>{item.fname} {item.lname}</td>
            <td style={{border:"1px solid black"}} className='text-black p-5'>{item.email}</td>
          </tr>
        </Fragment>
        )
      })
    }
    </table>
    </div>


  )
}

export default User
