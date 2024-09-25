import axios from "axios";

export const SERVER_URL = "http://localhost:3005/api/v1";

export const axiosJWT = axios.create();
axiosJWT.interceptors.request.use;