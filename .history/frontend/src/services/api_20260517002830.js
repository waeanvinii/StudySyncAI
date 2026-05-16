import axios from "axios";

const API = axios.create({
  baseURL:
    "https://studysyncai-ai-backend.onrender.com"
});

export default API;