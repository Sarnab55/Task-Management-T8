import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/authentication/Login';
import SignUp from './components/authentication/SignUp';
import Forgotpassword from './components/authentication/Forgotpassword';
import Generatepassword from './components/authentication/GeneratePassword';
import Dashboard from './components/Content/Dashboard';
// import './App.css'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login></Login>
    },
    {
      path: "/signup",
      element: <SignUp></SignUp>
    },
    {
      path: "/forgotpassword",
      element: <Forgotpassword></Forgotpassword>
    },
    {
      path: "/generatepassword",
      element: <Generatepassword></Generatepassword>
    },
    //dashboard
    {
      path: "/dashboard",
      element: <Dashboard></Dashboard>
    }
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
