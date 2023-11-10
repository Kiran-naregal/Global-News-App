import React, { Component } from "react";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import News from "./components/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  pageSize = 15;
  constructor() {
    super();
    this.state = {
      progress: 10,
    };
  }
  setProgress = (value) => {
    this.setState({ progress: value });
  };
  render() {
    return (
      <div>
        <LoadingBar
          // color='#f11946'
          progress={this.state.progress}
          onLoaderFinished={() => this.setProgress(0)}
          height={3}
        />
        <Router>
          <Navbar />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  setProgress={this.setProgress}
                  key={"general"}
                  pageSize={this.pageSize}
                  country="in"
                  category="general"
                />
              }
            />
            <Route
              exact
              path="/business"
              element={
                <News
                  setProgress={this.setProgress}
                  key={"Business"}
                  pageSize={this.pageSize}
                  country="in"
                  category="business"
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News
                  setProgress={this.setProgress}
                  key={"Entertainment"}
                  pageSize={this.pageSize}
                  country="in"
                  category="entertainment"
                />
              }
            />
            <Route
              exact
              path="/health"
              element={
                <News
                  setProgress={this.setProgress}
                  key={"Health"}
                  pageSize={this.pageSize}
                  country="in"
                  category="health"
                />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <News
                  setProgress={this.setProgress}
                  key={"Science"}
                  pageSize={this.pageSize}
                  country="in"
                  category="science"
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <News
                  setProgress={this.setProgress}
                  key={"Sports"}
                  pageSize={this.pageSize}
                  country="in"
                  category="sports"
                />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <News
                  setProgress={this.setProgress}
                  key={"Technology"}
                  pageSize={this.pageSize}
                  country="in"
                  category="technology"
                />
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
