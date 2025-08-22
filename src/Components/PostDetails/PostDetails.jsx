import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom'
import Comment from '../Comment/Comment';


export default function PostDetails() {
  let {id}= useParams();
  function getSingledata(){
    return axios.get(`https://linked-posts.routemisr.com/posts/${id}`,{
      headers:{
        token:localStorage.getItem("token"),
      }
    })
  }
 let {data,isError,isLoading,error}= useQuery({
    queryKey:["getSingledata"],
    queryFn:getSingledata,
    select:(data)=>data?.data?.post,
  });
  return <>
   <div className='border p-4 my-2 w-full md:w-[80%] lg:w-[60%] rounded-md bg-slate-200 mx-auto'>
     
       <div className='flex justify-between items-center gap-2 mb-2'>
         <div className='flex items-center gap-2 mb-2'>
        <img src={data?.user.photo} alt={data?.user.name} className='w-12 h-12 rounded-full s-[40px]' />
         <p>{data?.user.name}</p>
       
        </div>
        <div className="text-xs text-slate-500">
          {data?.createdAt}
        </div>
       </div>
  
     {data?.body &&<h2 className='mb-4'>{data?.body}</h2>}
      {data?.image && <img src={data?.image} className='w-full rounded-md' alt="" />}
     {data?.comments.map((comment)=> <Comment key={comment.id} comment={comment}/>)}
        </div> 
  
  </>
}
