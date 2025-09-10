import React, { Component } from "react";
import { Link } from "react-router-dom";

class ExamCard extends Component {
  render() {
    const { exam } = this.props;
    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
        <h3 className="text-2xl font-bold mb-3 text-primary animate-fade-in">{exam.title}</h3>
        <p className="mb-4 text-gray-700">{exam.description}</p>
        <p className="mb-2 font-semibold text-secondary">Duration: {exam.duration} mins</p>
        <Link to={`/exam/${exam.id}`} className="inline-block mt-2 bg-secondary text-white px-6 py-2 rounded-full hover:bg-[#FFA500] transition duration-300">
          Start Exam
        </Link>
      </div>
    );
  }
}

export default ExamCard;
