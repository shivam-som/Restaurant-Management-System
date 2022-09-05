import React from 'react';
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from './components/Signup';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';

const App = () => {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup/new" element={<Signup />} />
        </Routes>
    </>
  )
}

export default App;
