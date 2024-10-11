import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CountryInfo from "./component/CountryInfo";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:id" element={<CountryInfo />} />{" "}
      {/* Dynamic route for the card page */}
    </Routes>
  </Router>
);
