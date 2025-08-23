 
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Profile from './Components/Profile/Profile';
import Home from './Components/Home/Home';

import NotFound from './Components/NotFound/NotFound';
import Register from './Components/Register/Register';
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';

import UserContextProvider from './Components/Context/UserContext';
import ProtectedRoute from './Components/protectedRoute/protectedRoute';
import PostContextProvider from './Components/Context/PostContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import PostDetails from './Components/PostDetails/PostDetails';
import { Toaster } from './../node_modules/react-hot-toast/src/components/toaster';











function App() {
const query =new QueryClient();
  let x=createBrowserRouter([
    {
      path:"",
      element:<Layout />,
      children:[

        {
          index:true,
          element:<ProtectedRoute><Home /></ProtectedRoute>
        },
         {
          path:"home",
          element:<ProtectedRoute><Home /></ProtectedRoute>
        },
        {
          path:"profile",
          element:<ProtectedRoute><Profile /></ProtectedRoute>
        },
        {
          path:"*",
          element:<NotFound />
        },
        {
          path:"register",
          element:<Register />
        },
       
        {
          path:"login",
          element:<Login/>
        },

        {
          path:"singlepost/:id",
          element:<ProtectedRoute><PostDetails/></ProtectedRoute>
        }
       
       


      ],
    },


  ])

  return (
    <>
    
 <UserContextProvider>
<PostContextProvider>
 <QueryClientProvider client={query}>
  <RouterProvider router={x}></RouterProvider> 
   <Toaster/>

 </QueryClientProvider>
</PostContextProvider>
   
 </UserContextProvider>


   

    </>
  )
}

export default App
