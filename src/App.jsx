 // src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import PillNavbar from "./components/PillNavbar";
import GhostCursor from "./components/GhostCursor"; // optional
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";   // 👈 ADD THIS

export default function App() {
  return (
    <>
      {/* global ghost cursor overlay */}
       <GhostCursor />  

      {/* navbar + routes */}
      <PillNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} /> {/* 👈 ADD THIS */}
      </Routes>
    </>
  );
}
