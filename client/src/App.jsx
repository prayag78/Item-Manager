import React from "react";
import AddItems from "./pages/AddItems";
import ViewItems from "./pages/ViewItems";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
    <Navbar />
    <div className="mt-8">
    <Routes>
      <Route path="/" element={<ViewItems />} />
      <Route path="/add-item" element={<AddItems />} />
      <Route path="/view-items" element={<ViewItems />} />
    </Routes>
    </div>
    <Toaster />
  </div>
  );
};

export default App;
 