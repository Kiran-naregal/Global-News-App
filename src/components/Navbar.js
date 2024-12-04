import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar({ country, setCountry, language, setLanguage }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    navigate(`/news/${searchQuery}`);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Google News
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/business">
                Business
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/entertainment">
                Entertainment
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/health">
                Health
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/science">
                Science
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sports">
                Sports
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/technology">
                Technology
              </NavLink>
            </li>
          </ul>
          <form className="d-flex" onSubmit={onSubmit}>
            <input
              className="form-control me-2 opacity-50"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value) }}
            />
            <button className="btn btn-outline-success" type="button" onClick={onSubmit}>
              Search
            </button>
          </form>
          <div className="d-flex flex-column mx-2">
            <select className="btn btn-sm btn-outline-secondary" defaultValue={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="en">English</option>
            </select>
            <select className="btn btn-sm btn-outline-secondary mt-1" defaultValue={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="fr">France</option>
              <option value="de">Germany</option>
              <option value="in">India</option>
              <option value="gb">UK</option>
              <option value="us">US</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}
