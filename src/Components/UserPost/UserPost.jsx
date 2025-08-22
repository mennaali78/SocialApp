import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router-dom';
import CreateCommentModel from '../CreateCommentModel/CreateCommentModel';
import Comment from '../Comment/Comment';
import UpdatePost from '../UpdatePost/UpdatePost';
import toast from './../../../node_modules/react-hot-toast/src/index'; 
import { useQueryClient } from '@tanstack/react-query'

export default function UserPost({id}) {
  let queryClient=useQueryClient();
   function getUserPost(){
      return axios.get(`https://linked-posts.routemisr.com/users/${id}/posts`,{
  
        headers:{
          token:localStorage.getItem("token"),
        },
      });
    }
  let {data,isError,error,isLoading} = useQuery({
     queryKey:['userPosts'],
     queryFn: getUserPost,
   

    });
    console.log(data?.data?.posts);
    function deletePost(postId){
      console.log(postId);
      axios.delete(`https://linked-posts.routemisr.com/posts/${id}`,{
        headers:{
          token:localStorage.getItem("token"),
        },
      }).then((res)=>{
        console.log(res);
        if(res.data.message === "success"){
               toast.success("post deleted successfuly");
            queryClient.invalidateQueries({ queryKey:['userPosts']})
            }

      }).catch((err)=>{
        toast.error(err.response.data.error);
      })
    }
  return <>
    {data?.data?.posts.map((post)=>(
        <div className='border p-4 my-2 w-full md:w-[80%] lg:w-[60%] rounded-md bg-slate-200 mx-auto'>
            <Link  key={post?.id} to={`/singlepost/${post?.id}`}>
        <div className='flex justify-between items-center gap-2 mb-2'>
      
          <div className='flex items-center gap-2 mb-2'>
         <img src={post?.user.photo} alt={post?.user.name} className='w-12 h-12 rounded-full s-[40px]' />
          <p>{post?.user.name}</p>
        
         </div>
         <div className="text-xs text-slate-500">
           {post?.createdAt}
         </div>
        </div>
   
      {post?.body &&<h2 className='mb-4'>{post?.body}</h2>}
       {post?.image && <img src={post?.image} className='w-full rounded-md' alt="" />}
      
       </Link>
    {post.comments.length > 0 && <Comment comment={post.comments[0]}  /> }
   
    
   
      <div className="my-3 p-4 bg-slate-300 flex flex-column gap-5">
     <button className="bg-yellow-500 p-2 rounded-md w-full cursor-pointer" onClick={()=>{deletePost(post.id)}}>Delete Post</button>
       <UpdatePost id={post?.id}/>
      {data?.data?.posts && <CreateCommentModel postId={post.id}/>}
      </div> 
      </div> 
     
         
     
       
      ))}
  </>
}
