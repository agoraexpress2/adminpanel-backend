import api from "./index";

export const getStampCards = async () => {
  try {
    const response = await api.get("/stamp-cards");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStampCardById = async (id: number) => {
  try {
    const response = await api.get(`/stamp-cards/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createStampCard = async (cardData: any) => {
  try {
    const response = await api.post("/stamp-cards", cardData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateStampCard = async (id: number, cardData: any) => {
  try {
    const response = await api.put(`/stamp-cards/${id}`, cardData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteStampCard = async (id: number) => {
  try {
    const response = await api.delete(`/stamp-cards/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addStamp = async (cardId: number, userId: number) => {
  try {
    const response = await api.post(`/stamp-cards/${cardId}/stamps`, {
      userId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
