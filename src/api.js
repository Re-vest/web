import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACK_END,
  headers: {
    'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqb2FvLnNpbHZhQGV4YW1wbGUuY29tIiwiaWF0IjoxNzM2MjkyNjEwLCJleHAiOjE3Mzk4OTI2MTB9.abaYOSHLAMvThidIq-hcN3yiYrlOhWVr4F7iDJReJuPf0BD5Pi6eeewHBG9uIamjkxSKpHw38CbTbCJNSqtOiA`
  }
})

export default api;