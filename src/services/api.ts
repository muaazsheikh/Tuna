import axios from 'axios';


const API_URL = process.env.API_URL || 'http://localhost:3000';

export const getTickets = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/tickets`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return [];
  }
};
