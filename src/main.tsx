import ReactDOM from 'react-dom/client'
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login/login';
import Home from './pages/Home/home';
import ErrorPage from './pages/ErrorPage/errorPage';
import About from './pages/About/about';
import './global.css';
import Annotate from './pages/Annotate/annotate';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <Toaster position='top-right' toastOptions={{ duration: 2000 }} />
    <AuthProvider>
      {/* REACT ROUTER */}
      <BrowserRouter>
        <Routes>
          <Route path='/login' index element={<Login />} />
          <Route path='*' element={<ErrorPage />} />
          <Route path='/' index element={<Home />} />
          <Route path='/about' index element={<About />} />
          <Route path='/annotate/:id' index element={<Annotate />} />
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
