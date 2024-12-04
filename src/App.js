import Navbar from "./components/Navbar";
import Search from "./components/Search";
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/js/bootstrap.bundle'
import News from "./components/Category";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";

export default function App() {
  const [language, setLanguage] = useState("en");
  const [country, setCountry] = useState("us")
  const pageSize = 15;

  return (
    <div>
      <Router>
        <Navbar country={country} setCountry={setCountry} language={language} setLanguage={setLanguage} />
        <Routes>
          <Route path="/" element={<Navigate to={'/top-headlines'} replace />} />
          <Route path="/:category" element={<News pageSize={pageSize} country={country} language={language} />} />
          <Route exact path="news/:query" element={<Search pageSize={pageSize} />} />
        </Routes>
      </Router>
    </div>
  );
}
