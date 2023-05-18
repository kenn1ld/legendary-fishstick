import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api-football-v1.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': 'e1eaee0d89msh3ee12d7ea099493p1dc8f3jsn00876a950278',
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
  },
});

export default apiClient;
