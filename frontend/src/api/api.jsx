import axios from "axios";

const api = axios.create({
  baseURL: "https://online-exam-portal-2-t2vs.onrender.com/api/",
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("jwt_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;


async function login(username, password) {
  try {
    const res = await axios.post("https://online-exam-portal-2-t2vs.onrender.com/api/token/", {
      username,
      password
    });
    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);
    return true;
  } catch (err) {
    console.error("Login failed", err);
    return false;
  }
}

async function getExams() {
  const token = localStorage.getItem("access");
  const res = await axios.get("http://127.0.0.1:8000/api/exams/", {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log(res.data);
}
