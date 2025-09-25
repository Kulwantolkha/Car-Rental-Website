import React, {useState} from 'react'
import './App.css'
import Navbar from './components/Navbar.component'
import {Route, Routes, useLocation} from 'react-router-dom'
import Home from './Pages/Home'
import CarDetails from './Pages/CarDetails'
import Cars from './Pages/Cars'
import MyBookings from './Pages/MyBookings'
import Footer from './components/Footer'
import Dashboard from './Pages/owner/Dashboard'
import Layout from './Pages/owner/Layout'
import AddCar from './Pages/owner/Addcar'
import ManageCar from './Pages/owner/ManageCar'
import ManageBookings from './Pages/owner/ManageBookings'
import Login from './components/owner/Login'

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const isOwnerPath = useLocation().pathname.startsWith("/owner");
  return (
    <>
      {showLogin && <Login setShowLogin={setShowLogin}/>}
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin}/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/car-details/:id' element={<CarDetails/>}/>
        <Route path='/cars' element={<Cars/>}/>
        <Route path='/my-bookings' element={<MyBookings/>}/>
        <Route path='/owner' element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='add-car' element={<AddCar/>}/>
          <Route path='manage-car' element={<ManageCar/>}/>
          <Route path='manage-bookings' element={<ManageBookings/>}/>
        </Route>
      </Routes>
      {!isOwnerPath && <Footer/>}
    </>
  )
}

export default App
