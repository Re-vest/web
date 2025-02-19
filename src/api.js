import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACK_END,
  headers: {
    'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqb2FvLnNpbHZhQGV4YW1wbGUuY29tIiwiaWF0IjoxNzM5OTI3MjEwLCJleHAiOjE3NDM1MjcyMTB9.BWqCBIfW1T2TN9DpuL29KPVHUX_si4ABQG62eHMr5yS1gBRbNm1CEW_hA1f8dssgvox2qY70K9Xs9nF4mwRtzQ`
  }
})

export default api;