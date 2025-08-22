import React from 'react'


import UpdateComment from './../UpdateComment/UpdateComment';
import DeleteComment from './../DeleteComment/DeleteComment';

export default function Comment({comment}) {
   let {commentCreator , createdAt , content,_id}= comment;


   console.log(comment);
  return <>
 
   <div className='w-full rounded-md border-2 my-2 border-slate-900 text-black p-3'>
  <div className='flex justify-between'>
      <div className="flex gap-2 items-center">
     <img src={commentCreator?.photo} className="size-[36px]"  alt="" />
     <p>{commentCreator?.name}</p>
   </div>
   <div className='text-slate-900 text-sm'>{createdAt}</div>
  </div>
  <div className="content px-12">
    {content}
  </div>
 
   </div>
   <div className="my-3 p-4 bg-slate-300 flex flex-column gap-3">
  

      <button className="bg-yellow-500 p-2 rounded-md w-full cursor-pointer"><UpdateComment id={_id}/></button>
    <button className="bg-red-500 p-2 rounded-md w-full cursor-pointer"><DeleteComment id={_id}/></button>
  
  
   </div>
 
  
  </>
}
