import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import z from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UserContext } from '../Context/UserContext';



export default function Login() {
 let { userLogin, setLogin } = useContext(UserContext);
  const navigate= useNavigate();
 const [apiError, setapiError] = useState("");
 const [isloading, setIsloading] = useState(false);
  const schema = z.object({

  
    email: z.email("Invalid email address"),
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"must include 1 capital letter at least & small letter at least & 1 spicial character at least & 1 number at least and min length 8"),
  });

  const form =useForm({
     defaultValues: {

    
    email:"",
    password:"",
  

     },
    resolver: zodResolver(schema)


  });
  console.log(form);
  let {register,handleSubmit,formState}= form;
  // let {onChange,onBlur,ref,name}=register("name");
  function handleLogin(objectRedisterUserDetails){
    setIsloading(true);
    console.log(objectRedisterUserDetails);
    // call api
    axios.post(`${import.meta.env.VITE_BASE_URL}/users/signin`,objectRedisterUserDetails).then((res)=>{
      if(res.data.message === "success"){
        // redirect to login page
        setIsloading(false);
        localStorage.setItem("token",res.data.token);
         setLogin(res.data.token);
        navigate("/home");
      }
    }).catch((err)=>{
    setIsloading(false);
      setapiError(err.response.data.error);
    });
  
  }
  return <>
 
<form onSubmit={handleSubmit(handleLogin)} className="max-w-md mx-auto my-12">
 {apiError && ( <h1 className="bg-red-500 text-center text-white rounded-md font-bold my-5 p-2">{apiError}</h1>)}
 
  <div className="relative z-0 w-full mb-5 group">
      <input type="email" {...register("email")} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
    {formState.errors.email && formState.touchedFields.email ? <p className='text-red-500 text-sm my-2'>{formState.errors.email.message}</p> :""}
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="password" {...register("password")} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
   {formState.errors.password && formState.touchedFields.password ? <p className='text-red-500 text-sm my-2'>{formState.errors.password.message}</p> : ""}
  </div>
 
  

 
  <p  className='text-gray-500 py-5'>do you have acount? <Link to="/register" className='text-blue-500 underline'>Sign Up</Link></p>
  <button disabled={isloading} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isloading ? <i className="fas fa-spinner fa-spin text-white"></i> : "Login"}</button>

</form>

  
  </>
}
