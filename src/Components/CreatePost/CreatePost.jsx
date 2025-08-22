import React from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from './../../../node_modules/react-hot-toast/src/index';
export default function CreatePost() {
   let form =useForm({
    defaultValues:{
      body:"",
      image:"",
   },
  });
  let {register,handleSubmit}=form;
async  function handleAddPost(values){
    console.log(values);
    console.log(values.image[0]);
 console.log(values.body);
 let myData= new FormData()
 myData.append("body",values.body);
 myData.append("image",values.image[0]);
  try{
    let response = await axios.post(`https://linked-posts.routemisr.com/posts`,myData,{
  headers:{
    token:localStorage.getItem("token"),
  },
 });
 console.log(response);
 if(response.data.message === 'success'){
  toast.success("Post Added Success");
 }
  }
  
  catch(err){
   console.log(err);
   toast.error(err.response.data.message)
  }
}
  return <>
 
    <div className="w-full md:w-[60%] lg:w-[80%] mx-auto bg-slate-200 p-4 rounded-lg my-12">
     <form onSubmit={handleSubmit(handleAddPost)}>
         <div>
       
          <input {...register('body')} type="text" className="w-full border-4 border-slate-400 rounded-lg p-4" placeholder="Post Details"/>
         </div>
      
       <div className='my-4'>
         <label htmlFor='photo'className='bg-red-500 w-full block p-4 text-center cursor-pointer'>
          <i className='fa-solid fa-image fa-2xl'></i>
         </label>
         <input {...register('image')} type="file" className='hidden' id="photo"/>
       </div>
      <div>
        <button className='bg-blue-600 text-white w-full p-3 rounded-lg cursor-pointer'>Add Post</button>
      </div>
     </form>

    </div>
  
  </>


}
