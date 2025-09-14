import React, { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../Context/UserContext'


export default function Navbar() {
  let { userLogin,setLogin } = useContext(UserContext);
  let navigate= useNavigate();
  function signout() {
    localStorage.removeItem("token");
    setLogin(null);
    navigate("/login");

  }
 
    function getUserData(){
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`,{

      headers:{
        token:localStorage.getItem("token"),
      },
    });
  }
let {data,isError,error,isLoading} = useQuery({
   queryKey:['userData'],
   queryFn: getUserData,
   select:(data)=> data.data.user

  })
  console.log(data);

  return <> 
  

<nav className="bg-cyan-600 text-white border-gray-200 dark:bg-gray-900">
  
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <Link to="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
    
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Social App</span>
  </Link>
  <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
    {userLogin !== null ?<>
     <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
     
        <img className="w-8 h-8 rounded-full" src={data?.photo} alt="user photo"/>
      </button>
   
      <div className="z-50 hidden my-4 text-base list-none bg-gray divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 dark:text-white">{data?.name}</span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{data?.email}</span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
            <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</Link>
          </li>
          <li>
            <span onClick={signout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">Sign out</span>
         
          </li>
        </ul>
      
      </div></>:<>  <ul className='flex gap-4 px-2 '>
          <li>
            <Link to="login">Login</Link>
           
          </li>
          <li>
          <Link to="register">Sign Up</Link>
          </li>
      </ul></>}
     

    
     
  </div>

  
 
  </div>
</nav>





  </>
}
