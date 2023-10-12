import React, { useState } from 'react'
import { NavBar } from "./components/Shared/NavBar";
import Login from './pages/Authentication/Login'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useLocalStorage } from './helpers/useLocalStorage';
import { Register } from './pages/Authentication/Register';
import { Profile } from './pages/Profile/Profile';
import { Flights } from './pages/Flights/Flights';
import { BookFlight } from './pages/BookFlight/BookFlight';
import { BookFlightStepper } from './pages/BookFlight/BookStepper';

function App() {

    const [user, setUser] = useLocalStorage('user', '')

    return (
      <>
      <BrowserRouter>
        <NavBar user={user} setUser={setUser} />
        <Routes>
            <Route index element={user ? <Home /> : <Login user={user} setUser={setUser}/>} />
            <Route path="/login" element={<Login user={user} setUser={setUser}/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile user={user}/>} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/book-flight/:flightId/:flightBackId?" element={<BookFlightStepper />} />
        </Routes>
      </BrowserRouter>
      </>
    )
}
  export default App
