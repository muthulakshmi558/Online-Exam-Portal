import React, { Component } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

class Exam extends Component {
  state = { exam: null, answers: {}, submitted: false, timeLeft: 0 };

  componentDidMount() {
    const examId = this.props.match.params.id;
    api.get(`exams/${examId}/`).then(res => {
      const duration = res.data.duration * 60; // convert to seconds
      this.setState({ exam: res.data, timeLeft: duration });
      this.startTimer();
    });
  }

  startTimer = () => {
    this.timer = setInterval(() => {
      if(this.state.timeLeft > 0) this.setState(prev => ({ timeLeft: prev.timeLeft - 1 }));
      else this.handleSubmit();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleChange = (qId, option) => {
    this.setState(prev => ({ answers: {...prev.answers, [qId]: option} }));
  }

  handleSubmit = () => {
    if(this.state.submitted) return;
    clearInterval(this.timer);
    const examId = this.state.exam.id;
    let score = 0;
    this.state.exam.questions.forEach(q => {
      if(this.state.answers[q.id] === q.correct_option) score++;
    });
    api.post("results/", { exam: examId, score }).then(() => this.setState({ submitted: true }));
  }

  formatTime = secs => {
    const m = Math.floor(secs/60);
    const s = secs % 60;
    return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  }

  render() {
    const { exam, submitted, timeLeft } = this.state;
    if(!exam) return <p>Loading...</p>;

    if(submitted) return (
      <div>
        <Navbar />
        <div className="p-10 text-center">
          <h2 className="text-3xl font-bold text-primary animate-bounce-slow">Exam Submitted!</h2>
        </div>
      </div>
    );

    return (
      <div>
        <Navbar />
        <div className="p-10 bg-lightbg min-h-screen">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-primary">{exam.title}</h2>
            <span className="text-secondary font-bold text-xl">{this.formatTime(timeLeft)}</span>
          </div>
          {exam.questions.map(q => (
            <div key={q.id} className="bg-white p-6 mb-4 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
              <p className="font-semibold mb-3">{q.question_text}</p>
              {["A","B","C","D"].map(opt => (
                <label key={opt} className="block mb-1 cursor-pointer hover:text-secondary transition">
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    onChange={() => this.handleChange(q.id, opt)}
                    className="mr-2"
                  />
                  {q[`option_${opt.toLowerCase()}`]}
                </label>
              ))}
            </div>
          ))}
          <button onClick={this.handleSubmit} className="mt-4 bg-secondary text-white px-6 py-2 rounded-full hover:bg-[#FFA500] transition duration-300">
            Submit Exam
          </button>
        </div>
      </div>
    );
  }
}

export default Exam;
