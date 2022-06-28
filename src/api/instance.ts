import axios from "axios";

export const instance = axios.create({
   withCredentials: true,
   baseURL: 'https://social-network.samuraijs.com/api/1.1/',
   headers: {'API-KEY': '10561a86-fffc-466d-8f5b-31fc3e6b15e4'}
});
