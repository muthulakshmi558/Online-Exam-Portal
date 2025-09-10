import React, { Component } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

class Results extends Component {
  state = { results: [] };

  componentDidMount() {
    api.get("results/").then(res => this.setState({ results: res.data }));
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="p-10 bg-[#F5F5F5] min-h-screen">
          <h2 className="text-3xl font-bold text-[#4B69A9] mb-6">Your Results</h2>
          {this.state.results.map(r => (
            <div key={r.id} className="bg-white p-4 mb-4 rounded shadow">
              <p className="font-semibold">Exam ID: {r.exam}</p>
              <p>Score: {r.score}</p>
              <p>Submitted: {new Date(r.submitted_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Results;
