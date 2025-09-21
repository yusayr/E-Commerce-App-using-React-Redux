import axios from "axios";

export const getProducts = async () => {
  try {
    const response = await axios.get("https://api.escuelajs.co/api/v1/products");
    console.log(response.data);
    return response.data;
  } catch (error) {
    return [];
  }
};