import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Components/Root/Root';
import Home from './Components/Home';
import Item1 from './Components/Item1';
import Item2 from './Components/Item2';
import LogIn from './Components/login';
import Register from './Components/Register';
import AuthProvider from './Components/AuthProvider';


const router = createBrowserRouter([
  {
    path: "/",
    element:<Root></Root> ,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path:"/login",
        element:<LogIn></LogIn>
      },
      {
        path:"/register",
        element:<Register></Register>
      }

    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
