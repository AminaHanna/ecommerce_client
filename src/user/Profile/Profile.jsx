import { Avatar, Card } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

function Profile() {


  const [profile,setProfile]= useState({})

  useEffect(() => {
    fetchData();
  }, []);



  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/profile",{headers:{'Authorization':`${localStorage.getItem("token")}`}});
      setProfile(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card style={{width:"400px",margin:"auto",marginTop:"5rem",backgroundColor:"lightgray",padding:"20px"}}>
        <div className="flex gap-5 justify-around">
            <Avatar></Avatar>
            <p>
                <h5>{profile.fname} {profile.lname}</h5>
                <p>{profile.email}</p>
            </p>
            <button className='bg-zinc-600 text-white px-3 rounded'>EDIT PROFILE</button>
        </div>
      </Card>

      <Card style={{width:"400px",margin:"auto",backgroundColor:"lightgray",padding:"20px"}}>
        <div className="flex gap-5 justify-around my-5">
            <NavLink to={'/orders'}><button className='bg-zinc-600 text-white p-2 rounded'>My Orders</button></NavLink>
        </div>
        <div className="flex justify-center">
            <button onClick={()=>{
              localStorage.removeItem("users")
              localStorage.removeItem("token")
              navigate('/user-login')
            }}>
                Log Out
            </button>
        </div>
      </Card>
    </div>
  )
}

export default Profile
