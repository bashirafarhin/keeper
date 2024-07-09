import React from "react"
import { createBrowserRouter, Route, RouterProvider,createRoutesFromElements } from "react-router-dom"
import RootLayout from "./pages/RootLayout"
import LoginForm from "./components/LoginForm/LoginForm"
import RegistrationForm from "./components/RegistrationForm/RegistrationForm"
import Home from "./components/Home/Home.jsx"
import NotFound from "./components/NotFound/NotFound.jsx"
import './App.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  
  const router=createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout/>}>
        <Route index element={<LoginForm/>}/>
        <Route path='/registration' element={<RegistrationForm/>}/>

        <Route path='/home/:userId' element={<Home/>}/>
      <Route path="*" element={<NotFound/>}></Route>

      </Route>
    )
  )

  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </>
  )
}

export default App
