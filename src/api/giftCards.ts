import api from "./index";

export const getGiftCards = async () => {
  try {
    const response = await api.get("/gift-cards");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGiftCardById = async (id: number) => {
  try {
    const response = await api.get(`/gift-cards/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createGiftCard = async (cardData: any) => {
  try {
    const response = await api.post("/gift-cards", cardData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateGiftCard = async (id: number, cardData: any) => {
  try {
    const response = await api.put(`/gift-cards/${id}`, cardData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useGiftCard = async (id: number) => {
  try {
    const response = await api.post(`/gift-cards/${id}/use`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
