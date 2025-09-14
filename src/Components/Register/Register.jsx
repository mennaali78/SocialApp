import React from 'react'
import { useForm } from 'react-hook-form';
import z from "zod"
import { zodResolver } from '@hookform/resolvers/zod';

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';



export default function Register() {
  const navigate= useNavigate();
 const [apiError, setapiError] = useState("");
 const [isloading, setIsloading] = useState(false);
  const schema = z.object({

    name: z.string().min(1,"Name is required").max(10,"max length is 10"),
    email: z.email("Invalid email address"),
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"must include 1 capital letter at least & small letter at least & 1 spicial character at least & 1 number at least and min length 8"),
    rePassword:z.string(),
    dateOfBirth:z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((date) => {
      const userDate = new Date(date);
      const today= new Date();
      today.setHours(0, 0, 0, 0); // Set time to midnight for comparison 
      return userDate < today;
    },"Date of birth must be in the past"),
    gender:z.enum(["male","female"]),
  }).refine((object)=>{  return object.password === object.rePassword},{error:"Passwords do not match", path:["re Password"]});
 
  const form =useForm({
     defaultValues: {

      name: "",
    email:"",
    password:"",
    rePassword:"",
    dateOfBirth:"",
    gender:""

     },
    resolver: zodResolver(schema)


  });
  console.log(form);
  let {register,handleSubmit,formState}= form;
  // let {onChange,onBlur,ref,name}=register("name");
  function handleRegister(objectRedisterUserDetails){
    setIsloading(true);
    console.log(objectRedisterUserDetails);
    // call api
    axios.post(`https://linked-posts.routemisr.com/users/signup`,objectRedisterUserDetails).then((res)=>{
      if(res.data.message === "success"){
        // redirect to login page
         setIsloading(false); 
        navigate("/login");
        console.log(form);
      }
    }).catch((err)=>{
    setIsloading(false);
      setapiError(err.response.data.error);
    });
  
  } 
  return <>
 
<form onSubmit={handleSubmit(handleRegister)} className="max-w-md mx-auto my-12">
 {apiError && ( <h1 className="bg-red-500 text-center text-white rounded-md font-bold my-5 p-2">{apiError}</h1>)}
  <div className="relative z-0 w-full mb-5 group">
      <input type="text" {...register("name")} id="namel" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" />
      <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
    {formState.errors.name && formState.touchedFields.name ? <p className='text-red-500 text-sm my-2'>{formState.errors.name.message}</p>: ""}
  </div>
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
  <div className="relative z-0 w-full mb-5 group">
      <input type="password" {...register("rePassword")} id="repassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" />
      <label htmlFor="repassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">re-Password</label>
    {formState.errors.rePassword && formState.touchedFields.rePassword ? <p className='text-red-500 text-sm my-2'>{formState.errors.rePassword.message}</p> : ""}
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="date" {...register("dateOfBirth")} id="dateOfBirth" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" />
      <label htmlFor="dateOfBirth" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date of Birth</label>
    {formState.errors.dateOfBirth && formState.touchedFields.dateOfBirth ? <p className='text-red-500 text-sm my-2'>{formState.errors.dateOfBirth.message}</p> : ""}
  </div>

  <div className="flex gap-4" >
      <div className="flex items-center mb-4">
    <input id="male" type="radio" {...register("gender")} value="male" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"/>
    <label htmlFor="male" className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300">
     Male
    </label>
  
  </div>
   <div className="flex items-center mb-4">
    <input id="female" type="radio" {...register("gender")} value="female" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
    <label htmlFor="female" className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300">
     Female
    </label>
  
  </div>
  {formState.errors.gender && formState.touchedFields.gender ? <p className='text-red-500 text-sm my-2'>{formState.errors.gender.message}</p> : ""}
  </div>
  <p  className='text-gray-500 py-5'>do you have acount? <Link to="/login" className='text-blue-500 underline'>Login</Link></p>
  <button disabled={isloading} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isloading ? <i className="fas fa-spinner fa-spin text-white"></i> : "Submit"}</button>

</form>

  
  </>
}
