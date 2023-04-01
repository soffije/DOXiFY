import React from 'react'
import { Routes, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import Home from './routes/Home/Home'
import Login from './routes/Login/Login'
import AboutUs from './routes/AboutUs/AboutUs'
import NotFound from './routes/NotFound/NotFound'

import ContactUs from './routes/ContactUs/ContactUs'
import AppLayout from './components/AppLayout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
