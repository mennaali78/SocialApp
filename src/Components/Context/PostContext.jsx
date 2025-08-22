import axios from "axios";
import { createContext } from "react";

export let PostContext = createContext();

export default function PostContextProvider(props){
//   function getAllPosts(){
//    return axios.get("https://linked-posts.routemisr.com/posts?limit=50",{
//         headers:{
//             token: localStorage.getItem("token"),
//         },
//     })
//     .then((res)=>{
//         // Handle successful response
//     return  res.data.posts;

//     })
//     .catch((error)=>{
//         // Handle error
//       return  error;
//     });
//   }
  return (
    <PostContext.Provider value={[]}>
      {props.children}
    </PostContext.Provider>
  );
}
