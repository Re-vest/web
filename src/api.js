import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqb2FvLnNpbHZhQGV4YW1wbGUuY29tIiwiaWF0IjoxNzMwMTU4ODYyLCJleHAiOjE3MzM3NTg4NjJ9.59vsrzrOewBX4Yax9_-xX7po9mrj54Q90rgr7Kr4aZLyKcBQVd0F7XgMpKFNRFOmHAyfR6Jr2uLenXMofykEcw'
  }
})

export default api;