import axios from 'axios'
import React from 'react'
import toast from './../../../node_modules/react-hot-toast/src/index';
import { useQueryClient } from '@tanstack/react-query';

export default function DeleteComment({id}) {
  let queryClient=useQueryClient();
 async function handleDeleteComment(){
    axios.delete(`https://linked-posts.routemisr.com/comments/${id}`,{
    headers:{
      token:localStorage.getItem("token"),
    },
   }).then((res)=>{
       if(res.data.message === "success"){
          toast.success("comment deleted successfuly");
       queryClient.invalidateQueries({ queryKey:['getSingledata']});
       queryClient.invalidateQueries({ queryKey:['userPosts']});

       }
      
      }).catch((err)=>{
        toast.error("can't delete commnet")
      });
  }
  return <>
   <button onClick={handleDeleteComment}>Delete Comment</button>
  </>
}
