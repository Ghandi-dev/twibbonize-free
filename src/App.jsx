import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./pages/Create.jsx";
import Home from "./pages/Home.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
