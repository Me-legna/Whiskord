import React from "react";
import { Link } from "react-router-dom";
import "./UnderDevelopment.css";

export default function UnderDevelopment() {
  return (
    <div className="main-background">
    <div id="background"></div><div className="top">
          <h1>Under Development</h1>
          <h3>COMING SOON !!!</h3>
      </div><div className="container">
              <div className="ghost-copy">
                  <div className="one"></div>
                  <div className="two"></div>
                  <div className="three"></div>
                  <div className="four"></div>
              </div>
              <div className="ghost">
                  <div className="face">
                      <div className="eye"></div>
                      <div className="eye-right"></div>
                      <div className="mouth"></div>
                  </div>
              </div>
              <div className="shadow"></div>
          </div><div className="bottom">
              <p>Boo, looks like a ghost is styling this page!</p>
              <div className="link-button">
                  <Link to="/home"  className="btn">Home</Link>
              </div>
          </div>
          </div>
  );
}
