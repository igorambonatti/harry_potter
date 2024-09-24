import axios from "axios";

const BASE_URL = "https://hp-api.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchCharacters = async () => {
  try {
    const response = await api.get("/characters");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchCharacterById = async (id: string) => {
  try {
    const response = await api.get(`/character/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const handleApiError = (error: any) => {
  if (axios.isCancel(error)) {
    console.error("Request canceled", error.message);
  } else if (error.response) {
    console.error("API error:", error.response.status, error.response.data);
  } else if (error.request) {
    console.error("No response from server:", error.request);
  } else {
    console.error("Error:", error.message);
  }

  throw new Error("Failed to fetch data");
};
