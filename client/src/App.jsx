import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserProtectedWrapper from "./wrappers/UserProtectedWrapper.jsx";
const Home = lazy(() => import("./components/Home/Home.jsx"));
const NotFound = lazy(() => import("./components/NotFound/NotFound.jsx"));
const LoginForm = lazy(() => import("./pages/LoginForm/LoginForm.jsx"));
const RegistrationForm = lazy(() => import("./pages/RegistrationForm/RegistrationForm.jsx"));
import "./App.css";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route
            path="/home"
            element={
              <UserProtectedWrapper>
                <Home />
              </UserProtectedWrapper>
            }
          />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
