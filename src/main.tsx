import ReactDOM from 'react-dom/client'
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import  Login from './pages/Login/login';
import  Home from './pages/Home/home';
import ErrorPage from './pages/ErrorPage/errorPage';
import './global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <Toaster position='top-right' toastOptions={{ duration: 2000 }} />
    <AuthProvider>
      {/* REACT ROUTER */}
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<ErrorPage />} />
          <Route path='/' index element={<Home />} />
          <Route path='/login' index element={<Login />} />
          {/* <Route path='/signup' index element={<Signup />} /> */}
          {/* <Route path='' element={<PrivateRoutes />}> */}
            {/* <Route path='/myDiscs' element={<Discs />} /> */}
            {/* <Route path='/dashboard' element={<Dashboard/>} /> */}
            {/* <Route path='/wallet' element={<Wallet />} /> */}
            {/* <Route path='/profile' element={<Profile />} /> */}
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
      {/* REACT ROUTER */}
    </AuthProvider>
  </React.Fragment>
)
