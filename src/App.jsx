import React from "react";
import { Routes, Route } from "react-router-dom";
import PetFriendlyApp from "./Components/Home/Home";
import { BrowserRouter } from 'react-router-dom';
import Navbar from "./Components/Navbar/Navbar";
import PetFriendlyChatbot from "./Components/Chat/Chat";
import Footer from "./Components/Footer/Footer";
import SimplePetFriendlyMap from "./Components/Map/Map";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<PetFriendlyApp />} />
        <Route path="/explorar" element={<SimplePetFriendlyMap />} />
        <Route path="/normativas" element={<PetFriendlyApp />} />
        <Route path="/asistente" element={<PetFriendlyChatbot />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}