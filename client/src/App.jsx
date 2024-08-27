import React from "react"
import { createBrowserRouter, Route, RouterProvider,createRoutesFromElements } from "react-router-dom"
import RootLayout from "./pages/RootLayout"
import LoginForm from "./components/LoginForm/LoginForm"
import RegistrationForm from "./components/RegistrationForm/RegistrationForm"
import Home from "./components/Home/Home.jsx"
import NotFound from "./components/NotFound/NotFound.jsx"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserContextProvider } from "./context/UserContext"
import "./App.css";

function App() {
  
  const router=createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout/>}>
        <Route index element={<LoginForm/>}/>
        <Route path='/registration' element={<RegistrationForm/>}/>

        <Route path='/home/:id' element={<Home/>}/>
      <Route path="*" element={<NotFound/>}></Route>

      </Route>
    )
  )

  return (
      <UserContextProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
      </GoogleOAuthProvider>
      </UserContextProvider>
  )
}

export default App
