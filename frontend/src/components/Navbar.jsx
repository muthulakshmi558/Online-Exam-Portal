import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="bg-[#4B69A9] text-white p-4 flex justify-between">
        <h1 className="font-bold text-xl">Online Exam Portal</h1>
        <div>
          <Link to="/dashboard" className="mr-4 hover:text-[#FFAB0D]">Dashboard</Link>
          <button
            onClick={() => { localStorage.removeItem("jwt_token"); window.location.href="/"; }}
            className="hover:text-[#FFAB0D]"
          >
            Logout
          </button>
        </div>
      </nav>
    );
  }
}

export default Navbar;
