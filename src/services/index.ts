import axios from "axios";

export const SERVER_URL = "http://crypto-db.khalil-dev.me/api/v1";

export const axiosJWT = axios.create();
axiosJWT.interceptors.request.use;