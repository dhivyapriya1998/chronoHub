// src/services/api.js
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3001' // or your backend URL

const fetchEmails = async () => {
  const response = await axios.get(`${API_BASE_URL}/emails`)
  return response.data
}

const fetchEmailById = async (id) =>{
  const response = await axios.get(`${API_BASE_URL}/email/${id}`)
}
export default {
  fetchEmails,
  fetchEmailById
}

