import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/admin';

export const fetchTickets = async (page, limit) => {
    const response = await axios.get(`${BASE_URL}/tickets?page=${page}&limit=${limit}`);
    return response.data;
};

export const fetchFilteredTickets = async (filters) => {
    const query = new URLSearchParams(filters).toString();
    const response = await axios.get(`${BASE_URL}/tickets/filter?${query}`);
    return response.data;
};
