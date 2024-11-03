import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACK_END,
  headers: {
    'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqb2FvLnNpbHZhQGV4YW1wbGUuY29tIiwiaWF0IjoxNzMwMzExNzU5LCJleHAiOjE3MzM5MTE3NTl9.Vka8Uojwf07FNuFEm6ohPPVI4b_2QE5qBOolnswLMl9w0EoK0WsgtxvYGOP62a00ScbypZeFsT7UH-xTy4WBDg`
  }
})

export default api;