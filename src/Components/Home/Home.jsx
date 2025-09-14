import React, { useContext, useEffect, useState } from 'react'
import { PostContext } from '../Context/PostContext';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Comment from '../Comment/Comment';
import { Link } from 'react-router-dom';
import CreateCommentModel from '../CreateCommentModel/CreateCommentModel';
import CreatePost from '../CreatePost/CreatePost';




export default function Home() {
  function getAllPosts(){
    return axios.get(`https://linked-posts.routemisr.com/posts?limit=50`,
      {
        headers:{
          token:localStorage.getItem("token"),
        }
      }
    )
  }
 
 let {data,isError,isLoading,error}= useQuery({
   queryKey: ["getposts"],
   queryFn: getAllPosts  ,
   staleTime:20000,
   select:(data)=>
    data?.data?.posts
  

  });
  console.log(data);

  if(isError){
    return <>
    <h3>{error.message}</h3>
    </> 
 
  }
  if(isLoading){
  return <>
  <div className="spinner"></div>
  </>
   
  
  
 
  }
  // const [posts, setposts] = useState([]);
  // let { getAllPosts } = useContext(PostContext);
// async function getPosts(){

//    let response = await getAllPosts();

//   if(response.length){
//     setposts(response);
//     console.log("Posts fetched successfully", response);
//   }
// }
   // try {
  //   let response = await getAllPosts();
  //   console.log("Posts fetched successfully", response);
  // } catch (error) {
  //   console.error("Error fetching posts:", error);
  // }
  // useEffect(()=>{
  //   getPosts();
  //   // You can also handle the response here if needed
  // },[]);
  
   return (
    <>
    <CreatePost/>
   {data?.map((post)=>(
     <div className='border p-4 my-2 w-full md:w-[80%] lg:w-[60%] rounded-md bg-slate-200 mx-auto'>
         <Link  key={post.id} to={`/singlepost/${post.id}`}>
     <div className='flex justify-between items-center gap-2 mb-2'>
   
       <div className='flex items-center gap-2 mb-2'>
      <img src={post.user.photo} alt={post.user.name} className='w-12 h-12 rounded-full s-[40px]' />
       <p>{post.user.name}</p>
     
      </div>
      <div className="text-xs text-slate-500">
        {post.createdAt}
      </div>
     </div>

   {post.body &&<h2 className='mb-4'>{post.body}</h2>}
    {post.image && <img src={post.image} className='w-full rounded-md' alt="" />}
   
    </Link>
        {post.comments.length > 0 && <Comment comment={post.comments[0]}  /> }
  <CreateCommentModel postId={post.id}/>
      </div> 
      
   
    
   ))}


  </>
   );
}
