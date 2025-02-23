import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACK_END,
  headers: {
    'Authorization': `Bearer ${sessionStorage.TOKEN}`
  }
})

export default api;