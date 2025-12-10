 // src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import PillNavbar from "./components/PillNavbar";
import GhostCursor from "./components/GhostCursor";

// ⭐ FIXED IMPORTS (Linux/Vercel case-sensitive)
import Home from "./Pages/Home";
import About from "./Pages/About";
import Work from "./Pages/Work";
import Blog from "./Pages/Blog";
import Contact from "./Pages/Contact";

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
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}
