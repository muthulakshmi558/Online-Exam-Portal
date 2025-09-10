import React, { Component } from "react";
import api from "../api/api";

class Login extends Component {
  state = { username: "", password: "", error: "" };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    api.post("token/", { username: this.state.username, password: this.state.password })
      .then(res => {
        localStorage.setItem("jwt_token", res.data.access);
        window.location.href = "/dashboard";
      })
      .catch(() => this.setState({ error: "Invalid credentials" }));
  }

  render() {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F5F5F5]">
        <form onSubmit={this.handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-[#4B69A9]">Student Login</h2>
          {this.state.error && <p className="text-red-500 mb-2">{this.state.error}</p>}
          <input type="text" name="username" placeholder="Username"
            className="w-full p-2 mb-4 border rounded"
            onChange={this.handleChange} />
          <input type="password" name="password" placeholder="Password"
            className="w-full p-2 mb-4 border rounded"
            onChange={this.handleChange} />
          <button className="w-full bg-[#FFAB0D] text-white p-2 rounded hover:bg-[#FFA500]">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
