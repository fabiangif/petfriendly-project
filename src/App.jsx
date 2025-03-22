import React from "react";
import { Routes, Route } from "react-router-dom";
import PetFriendlyApp from "./Components/Home/Home";
import { BrowserRouter } from 'react-router-dom';
import Navbar from "./Components/Navbar/Navbar";
import PetFriendlyChatbot from "./Components/Chat/Chat";
import Footer from "./Components/Footer/Footer";
import SimplePetFriendlyMap from "./Components/Map/Map";
import PlaceDetail from "./Components/Section/Section";
import PlanesturisticosPetFriendly from "./Components/Treaveler/Traveler";
import image from './assets/images/bg.png'
import NormativasMascotasColombia from "./Components/Info/Info";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<PetFriendlyApp />} />
        <Route path="/explorar" element={<SimplePetFriendlyMap />} />
        <Route path="/normativas" element={<NormativasMascotasColombia />} />
        <Route path="/asistente" element={<PetFriendlyChatbot />} />
        <Route path="/place-info" element={<PlaceDetail />} />
        <Route path="/traveler" element={<PlanesturisticosPetFriendly />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}