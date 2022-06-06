import axios from "axios";

export const instance = axios.create({
   withCredentials: true,
   baseURL: 'https://social-network.samuraijs.com/api/1.1/',
   headers: {'API-KEY': '761ede80-64c0-4da4-9c38-3e03c36b7678'}
});
