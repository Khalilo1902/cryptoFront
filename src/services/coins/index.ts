import axios from "axios";
import { SERVER_URL } from "..";

//GET ALL COINS
export const getAllCoins = () => {
    const url = `${SERVER_URL}/coins`;
    return axios.get(url);
  };