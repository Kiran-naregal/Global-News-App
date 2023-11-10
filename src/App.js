import React, { Component } from "react";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import News from "./components/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default class App extends Component {
  pageSize = 15
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<News key={"general"} pageSize={this.pageSize} country="in" category="general" />} />
            <Route exact path="/business" element={<News key={"Business"} pageSize={this.pageSize} country="in" category="business" />} />
            <Route exact path="/entertainment" element={<News key={"Entertainment"} pageSize={this.pageSize} country="in" category="entertainment" />} />
            <Route exact path="/health" element={<News key={"Health"} pageSize={this.pageSize} country="in" category="health" />} />
            <Route exact path="/science" element={<News key={"Science"} pageSize={this.pageSize} country="in" category="science" />} />
            <Route exact path="/sports" element={<News key={"Sports"} pageSize={this.pageSize} country="in" category="sports" />} />
            <Route exact path="/technology" element={<News key={"Technology"} pageSize={this.pageSize} country="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
