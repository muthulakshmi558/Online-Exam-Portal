import React, { Component } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import ExamCard from "../components/ExamCard";

class Dashboard extends Component {
  state = { exams: [] };

  componentDidMount() {
    api.get("exams/").then(res => this.setState({ exams: res.data }));
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="p-10 bg-[#F5F5F5] min-h-screen">
          <h2 className="text-3xl font-bold text-[#4B69A9] mb-6">Available Exams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {this.state.exams.map(exam => <ExamCard key={exam.id} exam={exam} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
