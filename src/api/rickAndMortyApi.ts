import axios from "axios";

const API_URL = "https://rickandmortyapi.com/api";

export const fetchCharacters = async (page: number = 1) => {
  try {
    const response = await axios.get(`${API_URL}/character?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch characters:", error);
    throw error;
  }
};
