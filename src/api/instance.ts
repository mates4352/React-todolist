import axios from "axios";

export const instance = axios.create({
   withCredentials: true,
   baseURL: 'https://social-network.samuraijs.com/api/1.1/',
   headers: {'API-KEY': 'd19fe2de-f792-4a7f-95e3-efc1b71b7741'}
});
