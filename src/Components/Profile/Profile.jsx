import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

import ChangePasswordModel from '../ChangePasswordModel/ChangePasswordModel';
import UploadProfilePhoto from '../UploadProfilePhoto/UploadProfilePhoto';
import CreatePost from '../CreatePost/CreatePost';
import UserPost from '../UserPost/UserPost';
import Comment from '../Comment/Comment';

export default async function Profile() {
  async function getUserData(){
    return await axios.get(`https://linked-posts.routemisr.com/users/profile-data`,{

      headers:{
        token:localStorage.getItem("token"),
      },
    });
  }
let {data,isError,error,isLoading} = useQuery({
   queryKey:['userData'],
   queryFn: getUserData,
   select:(data)=> data?.data?.user,

  });
  console.log(data);
  let x = await getUserData();
  console.log(x);
  return <>
 <div className='w-full md:w[80%] lg:w-[60%] mx-auto border-2 border-slate-800 rounded-lg p-4 mt-12 text-center'>
   <img src={data?.photo} className='size-[50px] mx-auto' />
   <p>Name: {data?.name}</p>
   <p>Gender: {data?.gender}</p>
   <p>Email: {data?.email}</p>
      <p>BirthDay: {data?.dateOfBirth}</p>
 </div>
  <div className='gap-5 w-full md:w[80%] lg:w-[60%] mx-auto border-2 border-slate-800 rounded-lg p-4 mt-12 text-center flex justify-center  items-center'>
  <ChangePasswordModel/>
 <UploadProfilePhoto/>
 
  </div>
  <CreatePost/>
{data && <UserPost id={data?._id} />}

  
  </>
}
 