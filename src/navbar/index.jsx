import React from "react";
import logo from "./../images/logo.png";
import "./index.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
    </div>
  );
};

export default Navbar;
