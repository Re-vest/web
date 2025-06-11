import axios from "axios";

const api = axios.create({
  baseURL: window.env.VITE_BACK_END,
  headers: {
    'Authorization': `${sessionStorage.TOKEN && `Bearer ${sessionStorage.TOKEN}`}`
  }
})


export default api;